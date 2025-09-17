import type { Visitor } from '../../visitors/Visitor';
import type { DateValueContext } from '../../generated/src/grammar/RuleFlowLanguageParser';

export class DateValueEvaluator {
  evaluate(ctx: DateValueContext, visitor: Visitor): Date {
    // K_NOW()
    const hasNow = (ctx as any).K_NOW?.();
    if (hasNow) {
      return new Date();
    }

    // string_literal
    const strLit = ctx.string_literal?.();
    if (strLit) {
      const raw = strLit.text || '';
      const value = this.stripQuotes(raw);
      const d = new Date(value);
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid date string: ${value}`);
      }
      return d;
    }

    // validProperty
    const vp = ctx.validProperty?.();
    if (vp) {
      const v = visitor.visit(vp);
      const d = new Date(String(v));
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid date from property: ${String(v)}`);
      }
      return d;
    }

    throw new Error(`Date not supported: ${ctx.text}`);
  }

  private stripQuotes(s: string): string {
    if (!s) return s;
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.substring(1, s.length - 1);
    }
    return s;
  }
}
