import type { Visitor } from '../../visitors/Visitor';
import type { DateOperationContext } from '../../generated/src/grammar/RuleFlowLanguageParser';

export class DateOperationEvaluator {
  evaluate(ctx: DateOperationContext, visitor: Visitor): any {
    const de = (ctx as any).dateExpr?.();
    if (de) return visitor.visit(de);
    throw new Error(`Unexpected symbol ${ctx.text}`);
  }
}
