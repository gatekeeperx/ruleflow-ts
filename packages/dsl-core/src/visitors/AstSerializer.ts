import type { ParseContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Token } from 'antlr4ts/Token';

export interface AstWorkflow {
  type: 'Workflow';
  name: string;
  evaluationMode: 'multi_match' | 'single_match';
  rulesets: AstRuleset[];
  default: { result: AstReturn; actions: AstAction[] };
}

export interface AstRuleset {
  type: 'Ruleset';
  name: string;
  condition?: { kind: 'expr'; text: string };
  rules: AstRule[];
}

export interface AstRule {
  type: 'Rule';
  name: string;
  predicate: { kind: 'expr'; text: string };
  result: AstReturn;
  actions: AstAction[];
}

export interface AstAction {
  type: 'Action';
  name: string;
  params: Record<string, AstActionParam>;
}

export type AstActionParam =
  | { kind: 'value'; value: string | number | boolean | null | { currentDate: true } }
  | { kind: 'property'; path: string[] };

export type AstReturn =
  | { kind: 'state'; value: string }
  | { kind: 'value'; value: string | number | boolean | null | { currentDate: true } }
  | { kind: 'property'; path: string[] }
  | { kind: 'expr'; text: string };

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

function parseBooleanLiteral(t: string): boolean | undefined {
  const v = t.toLowerCase();
  if (v === 'true') return true;
  if (v === 'false') return false;
  return undefined;
}

function parseNullLiteral(t: string): null | undefined {
  const v = t.toLowerCase();
  if (v === 'null') return null;
  return undefined;
}

function parseCurrentDateLiteral(t: string): { currentDate: true } | undefined {
  const v = t.toLowerCase();
  if (v === 'currentdate()') return { currentDate: true };
  return undefined;
}

function parseNumericLiteral(t: string): number | undefined {
  if (!t) return undefined;
  if (t.startsWith("'")) return undefined;
  const n = Number(t);
  if (Number.isFinite(n)) return n;
  return undefined;
}

function parseStringLiteral(t: string): string | undefined {
  if (!t) return undefined;
  if (t.startsWith("'")) return stripQuotes(t);
  return undefined;
}

function parseValidValueText(t: string): string | number | boolean | null | { currentDate: true } {
  const curr = parseCurrentDateLiteral(t);
  if (curr) return curr;
  const nul = parseNullLiteral(t);
  if (nul === null) return null;
  const b = parseBooleanLiteral(t);
  if (b !== undefined) return b;
  const s = parseStringLiteral(t);
  if (s !== undefined) return s;
  const n = parseNumericLiteral(t);
  if (n !== undefined) return n;
  return stripQuotes(t);
}

function parsePropertyPath(text: string): string[] {
  if (!text) return [];
  const s = text.startsWith('.') ? text.slice(1) : text;
  return s.split('.').filter(Boolean);
}

export class AstSerializer {
  constructor(private readonly source?: string) {}

  private textOf(node: { start?: Token; stop?: Token; text?: string } | undefined): string {
    if (
      this.source &&
      node &&
      node.start &&
      node.stop &&
      typeof (node.start as any).startIndex === 'number' &&
      typeof (node.stop as any).stopIndex === 'number'
    ) {
      const a = (node.start as any).startIndex as number;
      const b = (node.stop as any).stopIndex as number;
      if (a >= 0 && b >= a && b + 1 <= this.source.length) {
        return this.source.substring(a, b + 1);
      }
    }
    return String((node as any)?.text || '');
  }
  serialize(root: ParseContext): AstWorkflow {
    const wf = root.workflow();
    if (!wf) throw new Error('No workflow found');
    const workflowName = stripQuotes(wf.workflow_name().text || '');

    const evalMode = wf.configuration?.()?.evaluation_mode?.();
    const multiMatch = !!(evalMode && evalMode.K_MULTI_MATCH?.());

    const rulesets = wf.rulesets().map((rs: any) => this.serializeRuleset(rs));

    const def = wf.default_clause();
    const result = this.serializeReturn(def.return_result?.());
    const actions = this.serializeActions(def.actions?.());

    return {
      type: 'Workflow',
      name: workflowName,
      evaluationMode: multiMatch ? 'multi_match' : 'single_match',
      rulesets,
      default: { result, actions },
    };
  }

  private serializeRuleset(ctx: any): AstRuleset {
    const name = stripQuotes(ctx.name().text || '');
    const condCtx = ctx.ruleset_condition?.();
    const condition = condCtx ? { kind: 'expr' as const, text: this.textOf(condCtx.expr(0)) } : undefined;

    const rules = ctx.rules().map((r: any) => this.serializeRule(r));

    return { type: 'Ruleset', name, condition, rules };
  }

  private serializeRule(ctx: any): AstRule {
    const name = stripQuotes(ctx.name().text || '');
    const body = ctx.rule_body();

    const predicateText = this.textOf(body.expr());
    const retCtx = body.return_result?.();
    const result = this.serializeReturn(retCtx) || { kind: 'state', value: 'allow' };
    const actions = this.serializeActions(body.actions?.());

    return {
      type: 'Rule',
      name,
      predicate: { kind: 'expr' as const, text: predicateText },
      result,
      actions,
    };
  }

  private serializeReturn(ret: any | undefined): AstReturn {
    if (!ret) return { kind: 'state', value: 'allow' };

    const st = ret.state_rule?.();
    if (st) return { kind: 'state', value: (st.text || '').trim() };

    const vp = ret.validProperty?.();
    if (vp) return { kind: 'property', path: parsePropertyPath(vp.text || '') };

    const vv = ret.validValue?.();
    if (vv) return { kind: 'value', value: parseValidValueText(vv.text || '') };

    const expr0 = ret.expr?.(0);
    if (expr0) return { kind: 'expr' as const, text: this.textOf(expr0) };

    return { kind: 'state', value: 'allow' };
  }

  private serializeActions(ctx: any | undefined): AstAction[] {
    if (!ctx) return [];
    const actions = ctx.action();
    const out: AstAction[] = [];
    for (const a of actions) {
      const name = this.resolveActionName(a);
      const params = this.resolveParams(a);
      out.push({ type: 'Action', name, params });
    }
    return out;
  }

  private resolveActionName(action: any): string {
    const kAction = action.K_ACTION?.();
    if (kAction) {
      const pv = action._param_value || action.param_value;
      return stripQuotes(pv?.text || '');
    }
    const actionId = action._action_id || action.action_id;
    if (actionId && actionId.text) return stripQuotes(actionId.text);
    return '';
  }

  private resolveParams(action: any): Record<string, AstActionParam> {
    const paramsCtx = action.action_params?.();
    if (!paramsCtx) return {};
    const pairsCtx = paramsCtx.param_pairs();
    const pairList = pairsCtx.param_pair();
    const out: Record<string, AstActionParam> = {};
    for (const p of pairList) {
      const key = stripQuotes((p as any)._field_name?.text || '');
      const value = (p as any)._field_value;
      out[key] = this.evalActionParamValue(value);
    }
    return out;
  }

  private evalActionParamValue(fieldValue: any): AstActionParam {
    if (!fieldValue) return { kind: 'value', value: '' };
    const vv = fieldValue.validValue?.();
    if (vv) return { kind: 'value', value: parseValidValueText(vv.text || '') };
    const vp = fieldValue.validProperty?.();
    if (vp) return { kind: 'property', path: parsePropertyPath(vp.text || '') };
    return { kind: 'value', value: '' };
  }
}
