import type { Visitor } from '../../visitors/Visitor';
import type { DistanceGeohashContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { geohashDecode, haversineKm } from './geohash';

export class DistanceGeohashEvaluator {
  evaluate(ctx: DistanceGeohashContext, visitor: Visitor): number {
    const gh1 = String(visitor.visit(ctx.expr(0)));
    const gh2 = String(visitor.visit(ctx.expr(1)));
    const [lat1, lon1] = geohashDecode(gh1);
    const [lat2, lon2] = geohashDecode(gh2);
    return haversineKm(lat1, lon1, lat2, lon2);
  }
}