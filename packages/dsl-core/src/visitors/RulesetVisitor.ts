import type { ParseContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { InputMap, ListsMap, FunctionsMap, WorkflowResult } from '../types';
import { Visitor } from './Visitor';
import { ActionsVisitorTs } from './ActionsVisitor';

export class RulesetVisitor {
  private readonly eval: Visitor;
  private readonly variables: Record<string, unknown> = {};

  constructor(
    private readonly data: InputMap,
    private readonly lists: ListsMap = {},
    private readonly functions: FunctionsMap = {}
  ) {
    this.eval = new Visitor(data, lists, data, functions, this.variables);
  }

  visit(root: ParseContext): WorkflowResult {
    const wf = root.workflow();
    if (!wf) throw new Error('No workflow found');
    return this.visitWorkflow(wf as any);
  }

  private visitWorkflow(ctx: any): WorkflowResult {
    const workflowName = this.stripQuotes(ctx.workflow_name().text || '');
    const warnings: string[] = [];

    const evalMode = ctx.configuration?.()?.evaluation_mode?.();
    const multiMatch = !!(evalMode && evalMode.K_MULTI_MATCH?.());

    const matchedRules: Array<{ ruleSet: string; rule: string; result: string; actions: any[] }> = [];

    for (const ruleset of ctx.rulesets()) {
      if (ruleset.ruleset_condition()) {
        const condExpr = ruleset.ruleset_condition().expr(0);
        try {
          const cond = this.eval.visit(condExpr);
          if (!cond) continue;
        } catch (e: any) {
          warnings.push(this.formatWarning('Ruleset condition', e));
          continue;
        }
      }

      for (const rule of ruleset.rules()) {
        const ruleBody = rule.rule_body();
        const predicate = ruleBody.expr();

        let passed = false;
        try {
          passed = Boolean(this.eval.visit(predicate));
        } catch (e: any) {
          warnings.push(this.formatWarning(`Rule predicate ${this.getName(rule.name())}`, e));
          continue;
        }

        if (passed) {
          try {
            // Execute SET clauses
            for (const setClause of ruleBody.set_clause()) {
              const value = this.eval.visit(setClause.expr());
              const rawName = setClause._variable.text as string;
              this.variables[rawName.substring(1)] = value; // strip '$'
            }

            // Handle CONTINUE: variables are set, move to next rule/ruleset
            if (ruleBody.K_CONTINUE?.()) {
              continue;
            }

            const result = this.resolveRuleResult(ruleBody);
            const actions = this.collectActions(ruleBody, warnings);

            if (multiMatch) {
              matchedRules.push({
                ruleSet: this.getName(ruleset.name()),
                rule: this.getName(rule.name()),
                result,
                actions,
              });
            } else {
              return {
                workflow: workflowName,
                ruleSet: this.getName(ruleset.name()),
                rule: this.getName(rule.name()),
                result,
                warnings,
                actions,
                variables: { ...this.variables },
                error: false,
              };
            }
          } catch (e: any) {
            warnings.push(this.formatWarning(`Rule return ${this.getName(rule.name())}`, e));
            continue;
          }
        }
      }
    }

    if (multiMatch && matchedRules.length > 0) {
      const first = matchedRules[0];
      return {
        workflow: workflowName,
        ruleSet: first.ruleSet,
        rule: first.rule,
        result: first.result,
        actions: first.actions,
        matchedRules,
        warnings,
        variables: { ...this.variables },
        error: false,
      };
    }

    const def = ctx.default_clause();
    let result = 'allow';
    try {
      result = this.resolveReturn(def.return_result());
    } catch (e: any) {
      warnings.push(this.formatWarning('Default return', e));
    }
    const defActions = this.collectDefaultActions(def, warnings);

    return {
      workflow: workflowName,
      ruleSet: 'default',
      rule: 'default',
      result,
      warnings,
      actions: defActions,
      matchedRules: multiMatch ? [] : undefined,
      variables: { ...this.variables },
      error: false,
    };
  }

  private resolveRuleResult(ruleBody: any): string {
    const ret = ruleBody.return_result?.();
    if (ret) return this.resolveReturn(ret);
    return 'allow';
  }

  private resolveReturn(ret: any): string {
    const st = ret.state_rule?.();
    if (st) return (st.text || '').trim();

    const prop = ret.validProperty?.();
    if (prop) return String(this.eval.visit(prop));

    const val = ret.validValue?.();
    if (val) return this.stripQuotes(val.text || '');

    const expr0 = ret.expr?.(0);
    if (expr0) return String(this.eval.visit(expr0));

    throw new Error('No return result found');
  }

  private getName(nameCtx: any): string {
    return this.stripQuotes(nameCtx.text || '');
  }

  private stripQuotes(s: string): string {
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.substring(1, s.length - 1);
    }
    return s;
  }

  private formatWarning(where: string, e: any): string {
    if (e && typeof e === 'object') {
      if (e.name === 'PropertyNotFoundError') {
        return `${where}: ${e.message}`;
      }
      if (e.message) return `${where}: ${e.message}`;
    }
    return `${where}: ${String(e)}`;
  }

  private collectActions(ruleBody: any, warnings: string[]): any[] {
    try {
      const actionsCtx = ruleBody.actions?.();
      return new ActionsVisitorTs(this.eval).visit(actionsCtx);
    } catch (e: any) {
      warnings.push(this.formatWarning('Actions', e));
      return [];
    }
    }

  private collectDefaultActions(def: any, warnings: string[]): any[] {
    try {
      const actionsCtx = def.actions?.();
      return new ActionsVisitorTs(this.eval).visit(actionsCtx);
    } catch (e: any) {
      warnings.push(this.formatWarning('Default actions', e));
      return [];
    }
  }
}