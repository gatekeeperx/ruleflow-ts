import type { Visitor } from '../visitors/Visitor';

export class MathAddEvaluator {
  evaluate(ctx: any, visitor: Visitor): number {
    const left = Number(visitor.visit(ctx.expr(0)));
    const op = String(ctx._op?.text ?? ctx.getChild(1)?.text ?? '+');
    const right = Number(visitor.visit(ctx.expr(1)));

    switch (op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      default:
        throw new Error(`Operation not supported: ${op}`);
    }
  }
}
