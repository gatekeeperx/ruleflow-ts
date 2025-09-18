import type { Visitor } from '../visitors/Visitor';
import type { BinaryAndContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class BinaryAndEvaluator {
  evaluate(ctx: BinaryAndContext, visitor: Visitor): boolean {
    const left = Boolean(visitor.visit(ctx.expr(0)));
    if (!left) return false; // short-circuit
    const right = Boolean(visitor.visit(ctx.expr(1)));
    return left && right;
  }
}
