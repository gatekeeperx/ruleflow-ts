import type { Visitor } from '../../visitors/Visitor';
import type { StringSimilarityScoreContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { similarityScore } from './levenshtein';

export class StringSimilarityScoreEvaluator {
  evaluate(ctx: StringSimilarityScoreContext, visitor: Visitor): number {
    const left = String(visitor.visit(ctx.expr(0)) ?? '');
    const right = String(visitor.visit(ctx.expr(1)) ?? '');
    return similarityScore(left, right);
  }
}
