import type { Visitor } from '../../visitors/Visitor';
import type { WithinRadiusContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { haversineKm } from './geohash';

export class WithinRadiusEvaluator {
  evaluate(ctx: WithinRadiusContext, visitor: Visitor): boolean {
    const lat1 = Number(visitor.visit(ctx.expr(0)));
    const lon1 = Number(visitor.visit(ctx.expr(1)));
    const lat2 = Number(visitor.visit(ctx.expr(2)));
    const lon2 = Number(visitor.visit(ctx.expr(3)));
    const radius = Number(visitor.visit(ctx.expr(4)));
    const d = haversineKm(lat1, lon1, lat2, lon2);
    return d <= radius;
  }
}