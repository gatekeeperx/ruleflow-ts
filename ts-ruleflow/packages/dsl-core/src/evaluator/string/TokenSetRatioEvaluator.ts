import type { Visitor } from '../../visitors/Visitor';
import type { TokenSetRatioContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { tokenSet, similarityPercent } from './levenshtein';

export class TokenSetRatioEvaluator {
  evaluate(ctx: TokenSetRatioContext, visitor: Visitor): number {
    const left = String(visitor.visit(ctx.expr(0)) ?? '');
    const right = String(visitor.visit(ctx.expr(1)) ?? '');
    const a = tokenSet(left);
    const b = tokenSet(right);
    return similarityPercent(a, b);
  }
}
