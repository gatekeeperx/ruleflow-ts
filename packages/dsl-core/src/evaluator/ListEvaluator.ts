import { RuleFlowLanguageParser, ListContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Visitor } from '../visitors/Visitor';

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

export class ListEvaluator {
  evaluate(ctx: ListContext, visitor: Visitor): boolean {
    const op = ctx._op?.type;
    const not = !!ctx._not;
    let result: boolean;

    if (op === RuleFlowLanguageParser.K_CONTAINS) {
      result = this.evalContains(ctx, visitor);
    } else if (op === RuleFlowLanguageParser.K_IN) {
      result = this.evalIn(ctx, visitor);
    } else if (op === RuleFlowLanguageParser.K_STARTS_WITH) {
      result = this.evalStartsWith(ctx, visitor);
    } else {
      throw new Error(`Unexpected list op: ${ctx._op?.text}`);
    }

    return not ? !result : result;
  }

  private evalIn(ctx: ListContext, visitor: Visitor): boolean {
    const value = visitor.visit(ctx.expr());
    const values = this.resolveValues(ctx, visitor);
    return values.some((v) => v === String(value));
  }

  private evalContains(ctx: ListContext, visitor: Visitor): boolean {
    const value = String(visitor.visit(ctx.expr()));
    const values = this.resolveValues(ctx, visitor);
    return values.some((v) => value.includes(v));
  }

  private evalStartsWith(ctx: ListContext, visitor: Visitor): boolean {
    const value = String(visitor.visit(ctx.expr()));
    const values = this.resolveValues(ctx, visitor);
    return values.some((v) => value.startsWith(v));
  }

  private resolveValues(ctx: ListContext, visitor: Visitor): string[] {
    const listElems = ctx.listElems();
    if (!listElems) return [];

    if (listElems.validProperty()) {
      const list = visitor.visit(listElems.validProperty());
      if (Array.isArray(list)) return list.map((x) => String(x));
      return [];
    }

    if (listElems.K_LIST()) {
      const key = stripQuotes(listElems.string_literal(0)?.text || '');
      const list = visitor.getLists()[key];
      return Array.isArray(list) ? list.map((x) => String(x)) : [];
    }

    // literal list
    const literals = listElems.string_literal();
    if (Array.isArray(literals) && literals.length > 0) {
      return literals.map((lit) => stripQuotes(lit.text || ''));
    }

    return [];
  }
}
