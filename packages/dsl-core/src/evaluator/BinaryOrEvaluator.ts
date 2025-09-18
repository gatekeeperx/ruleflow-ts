import type { Visitor } from '../visitors/Visitor';
import type { BinaryOrContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class BinaryOrEvaluator {
  evaluate(ctx: BinaryOrContext, visitor: Visitor): boolean {
    const left = Boolean(visitor.visit(ctx.expr(0)));
    if (left) return true; // short-circuit
    const right = Boolean(visitor.visit(ctx.expr(1)));
    return left || right;
  }
}
