import type { Visitor } from '../../visitors/Visitor';
import type { DayOfWeekContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { DateValueEvaluator } from './DateValueEvaluator';

const DAY_NAMES = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

export class DayOfWeekEvaluator {
  private dv = new DateValueEvaluator();
  evaluate(ctx: DayOfWeekContext, visitor: Visitor): string {
    const d = this.dv.evaluate(ctx.dateValue(), visitor);
    return DAY_NAMES[d.getUTCDay()];
  }
}
