import type { Visitor } from '../visitors/Visitor';
import type { UnaryContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class UnaryEvaluator {
  evaluate(ctx: UnaryContext, visitor: Visitor): number {
    const val = Number(visitor.visit(ctx.expr()));
    // For now only ABS is defined in grammar as unary
    return Math.abs(val);
  }
}
