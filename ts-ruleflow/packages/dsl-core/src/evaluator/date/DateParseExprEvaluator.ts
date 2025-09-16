import type { Visitor } from '../../visitors/Visitor';
import type { DateParseExprContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { DateValueEvaluator } from './DateValueEvaluator';

export class DateParseExprEvaluator {
  private dv = new DateValueEvaluator();

  evaluate(ctx: DateParseExprContext, visitor: Visitor): Date {
    const dp = ctx.dateParse();
    const isDate = !!(dp as any).K_DATE?.();
    const isDateTime = !!(dp as any).K_DATETIME?.();

    // dateValue can be string, property or NOW
    const dvCtx = dp.dateValue();
    const hasNow = !!(dvCtx as any).K_NOW?.();

    if (isDate) {
      let base: Date;
      if (hasNow) {
        base = new Date();
      } else {
        base = this.dv.evaluate(dvCtx, visitor);
      }
      // Truncate to local midnight to emulate LocalDate
      const d = new Date(base.getTime());
      d.setHours(0, 0, 0, 0);
      return d;
    }

    if (isDateTime) {
      if (hasNow) {
        return new Date();
      }
      return this.dv.evaluate(dvCtx, visitor);
    }

    throw new Error(`Date not supported: ${ctx.text}`);
  }
}
