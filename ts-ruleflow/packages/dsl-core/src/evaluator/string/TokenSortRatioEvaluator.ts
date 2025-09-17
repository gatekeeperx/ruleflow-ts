import type { Visitor } from '../../visitors/Visitor';
import type { TokenSortRatioContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { tokenSort, similarityPercent } from './levenshtein';

export class TokenSortRatioEvaluator {
  evaluate(ctx: TokenSortRatioContext, visitor: Visitor): number {
    const left = String(visitor.visit(ctx.expr(0)) ?? '');
    const right = String(visitor.visit(ctx.expr(1)) ?? '');
    const a = tokenSort(left);
    const b = tokenSort(right);
    return similarityPercent(a, b);
  }
}
