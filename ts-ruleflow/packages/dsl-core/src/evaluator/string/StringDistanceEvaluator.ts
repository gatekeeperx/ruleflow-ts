import type { Visitor } from '../../visitors/Visitor';
import type { StringDistanceContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { levenshtein } from './levenshtein';

export class StringDistanceEvaluator {
  evaluate(ctx: StringDistanceContext, visitor: Visitor): number {
    const left = String(visitor.visit(ctx.expr(0)) ?? '');
    const right = String(visitor.visit(ctx.expr(1)) ?? '');
    return levenshtein(left, right);
  }
}
