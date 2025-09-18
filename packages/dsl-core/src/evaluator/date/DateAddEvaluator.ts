import type { Visitor } from '../../visitors/Visitor';
import type { DateAddContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { DateValueEvaluator } from './DateValueEvaluator';

export class DateAddEvaluator {
  private dv = new DateValueEvaluator();

  evaluate(ctx: DateAddContext, visitor: Visitor): Date {
    const base = this.dv.evaluate(ctx.dateValue(), visitor);
    const amount = Number(visitor.visit(ctx.expr()));
    const unitText = (ctx.timeUnit().text || '').toLowerCase();

    const d = new Date(base.getTime());
    switch (unitText) {
      case 'day':
        d.setDate(d.getDate() + amount);
        break;
      case 'hour':
        d.setHours(d.getHours() + amount);
        break;
      case 'minute':
        d.setMinutes(d.getMinutes() + amount);
        break;
      default:
        throw new Error(`Unsupported time unit: ${unitText}`);
    }
    return d;
  }
}
