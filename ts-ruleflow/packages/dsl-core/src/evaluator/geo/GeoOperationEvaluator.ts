import type { Visitor } from '../../visitors/Visitor';
import type { GeoOperationContext } from '../../generated/src/grammar/RuleFlowLanguageParser';

export class GeoOperationEvaluator {
  evaluate(ctx: GeoOperationContext, visitor: Visitor): any {
    const g = ctx.geoExpr();
    return visitor.visit(g);
  }
}