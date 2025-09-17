import type { ActionsContext, ActionContext, ActionParamValueContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Visitor } from './Visitor';
import type { Action } from '../types';

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

export class ActionsVisitorTs {
  constructor(private readonly evalVisitor: Visitor) {}

  visit(ctx: ActionsContext | undefined): Action[] {
    if (!ctx) return [];
    const actions = ctx.action();
    const result: Action[] = [];
    for (const a of actions) {
      const name = this.resolveActionName(a);
      const params = this.resolveParams(a);
      result.push({ name, params });
    }
    return result;
  }

  private resolveActionName(action: ActionContext): string {
    // Form 1: action('name', {...})
    const kAction = (action as any).K_ACTION?.();
    if (kAction) {
      const paramValue = (action as any)._param_value || (action as any).param_value;
      return stripQuotes(paramValue?.text || '');
    }
    // Form 2: action_id(...)
    const actionId = (action as any)._action_id || (action as any).action_id;
    if (actionId && actionId.text) {
      return stripQuotes(actionId.text);
    }
    throw new Error(`Cannot find action name or identifier in ${action.text}`);
  }

  private resolveParams(action: ActionContext): Record<string, string> {
    const paramsCtx = action.action_params?.();
    if (!paramsCtx) return {};

    const pairsCtx = paramsCtx.param_pairs();
    const pairList = pairsCtx.param_pair();
    const out: Record<string, string> = {};
    for (const p of pairList) {
      const key = stripQuotes((p as any)._field_name?.text || '');
      const value = this.evalActionParamValue((p as any)._field_value);
      out[key] = value;
    }
    return out;
  }

  private evalActionParamValue(fieldValue: ActionParamValueContext): string {
    if (!fieldValue) return '';
    const vv = fieldValue.validValue?.();
    if (vv) {
      return stripQuotes(vv.text || '');
    }
    const vp = fieldValue.validProperty?.();
    if (vp) {
      try {
        const resolved = this.evalVisitor.visit(vp);
        return resolved != null ? String(resolved) : 'null';
      } catch (e: any) {
        throw new Error(
          `Failed to resolve property '${vp.text}' in action parameter: ${e?.message || e}`
        );
      }
    }
    throw new Error(`Unsupported action parameter value type: ${fieldValue.text}`);
  }
}
