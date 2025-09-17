import type { Visitor } from '../../visitors/Visitor';
import type { PartialRatioContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { partialRatio } from './levenshtein';

export class PartialRatioEvaluator {
  evaluate(ctx: PartialRatioContext, visitor: Visitor): number {
    const left = String(visitor.visit(ctx.expr(0)) ?? '');
    const right = String(visitor.visit(ctx.expr(1)) ?? '');
    return partialRatio(left, right);
  }
}
