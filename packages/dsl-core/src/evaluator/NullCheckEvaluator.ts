import { RuleFlowLanguageParser, NullCheckContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Visitor } from '../visitors/Visitor';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';

export class NullCheckEvaluator {
  evaluate(ctx: NullCheckContext, visitor: Visitor): boolean {
    let value: unknown;
    try {
      value = visitor.visit(ctx._value);
    } catch (e: unknown) {
      if (e instanceof PropertyNotFoundError) {
        value = null;
      } else {
        throw e;
      }
    }

    const checkType = ctx._check?.type;
    let result: boolean;

    switch (checkType) {
      case RuleFlowLanguageParser.K_NULL:
        result = value == null;
        break;
      case RuleFlowLanguageParser.K_EMPTY:
        result = value == null || (typeof value === 'string' && value === '');
        break;
      case RuleFlowLanguageParser.K_BLANK:
        result = value == null || (typeof value === 'string' && value.trim() === '');
        break;
      default:
        result = false;
    }

    if (ctx._not != null) {
      result = !result;
    }

    return result;
  }
}
