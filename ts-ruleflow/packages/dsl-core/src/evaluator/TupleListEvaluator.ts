import { RuleFlowLanguageParser, TupleListContext, ValidPropertyContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Visitor } from '../visitors/Visitor';

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

export class TupleListEvaluator {
  evaluate(ctx: TupleListContext, visitor: Visitor): boolean {
    const type = ctx._op?.type;
    const isNegated = !!ctx._not;

    let result: boolean;
    if (type === RuleFlowLanguageParser.K_IN) {
      result = this.evalIn(ctx, visitor);
    } else if (type === RuleFlowLanguageParser.K_CONTAINS) {
      result = this.evalContains(ctx, visitor);
    } else if (type === RuleFlowLanguageParser.K_STARTS_WITH) {
      result = this.evalStartsWith(ctx, visitor);
    } else {
      throw new Error(`Unknown operation: ${ctx._op?.text}`);
    }

    return isNegated ? !result : result;
  }

  private evalIn(ctx: TupleListContext, visitor: Visitor): boolean {
    const props = ctx.propertyTuple().validProperty() as ValidPropertyContext[];
    const inputTuple = props.map((p) => String(visitor.visit(p)));

    const values = ctx.listElems();
    if (!values) return false;

    if (values.string_literal().length > 0 && !values.K_LIST()) {
      const literals = values.string_literal().map((lit) => stripQuotes(lit.text || ''));
      const tupleSize = inputTuple.length;
      if (literals.length % tupleSize !== 0) return false;
      for (let i = 0; i < literals.length; i += tupleSize) {
        const tuple = literals.slice(i, i + tupleSize);
        if (this.tupleEquals(tuple, inputTuple)) return true;
      }
      return false;
    }

    if (values.K_LIST()) {
      const key = stripQuotes(values.string_literal(0)?.text || '');
      const list = visitor.getLists()[key];
      if (Array.isArray(list)) {
        for (const item of list) {
          if (Array.isArray(item) && (item as any[]).length === inputTuple.length) {
            const tuple = (item as any[]).map((x) => String(x));
            if (this.tupleEquals(tuple, inputTuple)) return true;
          }
        }
      }
      return false;
    }

    if (values.validProperty()) {
      const arr = visitor.visit(values.validProperty());
      if (Array.isArray(arr)) {
        return arr.some((item) => {
          if (Array.isArray(item) && (item as any[]).length === inputTuple.length) {
            const tuple = (item as any[]).map((x) => String(x));
            return this.tupleEquals(tuple, inputTuple);
          }
          return false;
        });
      }
      return false;
    }

    return false;
  }

  private evalContains(ctx: TupleListContext, visitor: Visitor): boolean {
    // Simplified: check if any literal/stored value is contained in the concatenated property tuple string
    const props = ctx.propertyTuple().validProperty() as ValidPropertyContext[];
    const input = props.map((p) => String(visitor.visit(p))).join(',');
    const values = this.resolveStringList(ctx, visitor);
    return values.some((v) => input.includes(v));
  }

  private evalStartsWith(ctx: TupleListContext, visitor: Visitor): boolean {
    const props = ctx.propertyTuple().validProperty() as ValidPropertyContext[];
    const input = props.map((p) => String(visitor.visit(p))).join(',');
    const values = this.resolveStringList(ctx, visitor);
    return values.some((v) => input.startsWith(v));
  }

  private resolveStringList(ctx: TupleListContext, visitor: Visitor): string[] {
    const values = ctx.listElems();
    if (!values) return [];
    if (values.string_literal().length > 0 && !values.K_LIST()) {
      return values.string_literal().map((s) => stripQuotes(s.text || ''));
    }
    if (values.K_LIST()) {
      const key = stripQuotes(values.string_literal(0)?.text || '');
      const list = visitor.getLists()[key];
      return Array.isArray(list) ? list.map((x) => String(x)) : [];
    }
    if (values.validProperty()) {
      const arr = visitor.visit(values.validProperty());
      return Array.isArray(arr) ? arr.map((x) => String(x)) : [];
    }
    return [];
  }

  private tupleEquals(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}
