import type { Visitor } from '../visitors/Visitor';

export class ParenthesisEvaluator {
  evaluate(ctx: any, visitor: Visitor): any {
    return visitor.visit(ctx.expr());
  }
}
