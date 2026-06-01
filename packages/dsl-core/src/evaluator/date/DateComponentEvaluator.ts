import type { Visitor } from '../../visitors/Visitor';
import type { DateComponentContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { RuleFlowLanguageParser } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { DateValueEvaluator } from './DateValueEvaluator';

/**
 * Extracts a single component (year, month, day, hour, minute) from a date value.
 * Mirrors ruleflow-java's DateComponentContextEvaluator. Uses UTC getters so that
 * inputs with an explicit offset (e.g. '2024-06-01T12:30Z') are read consistently,
 * matching the day_of_week behaviour in this engine.
 */
export class DateComponentEvaluator {
  private dv = new DateValueEvaluator();

  evaluate(ctx: DateComponentContext, visitor: Visitor): number {
    const value = this.dv.evaluate(ctx.dateValue(), visitor);

    switch (ctx._op.type) {
      case RuleFlowLanguageParser.K_YEAR:
        return value.getUTCFullYear();
      case RuleFlowLanguageParser.K_MONTH:
        return value.getUTCMonth() + 1;
      case RuleFlowLanguageParser.DAY:
        return value.getUTCDate();
      case RuleFlowLanguageParser.HOUR:
        return value.getUTCHours();
      case RuleFlowLanguageParser.MINUTE:
        return value.getUTCMinutes();
      default:
        throw new Error(`Operation not supported: ${ctx._op.text}`);
    }
  }
}
