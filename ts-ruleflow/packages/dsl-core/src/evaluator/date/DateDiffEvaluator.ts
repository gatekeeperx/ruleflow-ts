import type { Visitor } from '../../visitors/Visitor';
import type { DateDiffContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { RuleFlowLanguageParser } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { DateValueEvaluator } from './DateValueEvaluator';

export class DateDiffEvaluator {
  private dv = new DateValueEvaluator();

  evaluate(ctx: DateDiffContext, visitor: Visitor): number {
    const left = this.dv.evaluate(ctx.dateValue(0), visitor);
    const right = this.dv.evaluate(ctx.dateValue(1), visitor);
    const ms = Math.abs(right.getTime() - left.getTime());

    if (ctx.MINUTE()) {
      return Math.floor(ms / 60000);
    } else if (ctx.HOUR()) {
      return Math.floor(ms / 3600000);
    } else if (ctx.DAY()) {
      return Math.floor(ms / 86400000);
    }
    throw new Error(`Interval not supported in ${ctx.text}`);
  }
}
