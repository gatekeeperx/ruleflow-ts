import type { Visitor } from '../../visitors/Visitor';
import type { DistanceContext as GeoDistanceContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { haversineKm } from './geohash';

export class DistanceEvaluator {
  evaluate(ctx: GeoDistanceContext, visitor: Visitor): number {
    const lat1 = Number(visitor.visit(ctx.expr(0)));
    const lon1 = Number(visitor.visit(ctx.expr(1)));
    const lat2 = Number(visitor.visit(ctx.expr(2)));
    const lon2 = Number(visitor.visit(ctx.expr(3)));
    return haversineKm(lat1, lon1, lat2, lon2);
  }
}