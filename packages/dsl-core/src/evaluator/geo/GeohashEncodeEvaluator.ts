import type { Visitor } from '../../visitors/Visitor';
import type { GeohashEncodeContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { geohashEncode } from './geohash';

export class GeohashEncodeEvaluator {
  evaluate(ctx: GeohashEncodeContext, visitor: Visitor): string {
    const lat = Number(visitor.visit(ctx.expr(0)));
    const lon = Number(visitor.visit(ctx.expr(1)));
    const hasPrecision = ctx.expr().length > 2;
    const precision = hasPrecision ? Number(visitor.visit(ctx.expr(2))) : 12;
    return geohashEncode(lat, lon, precision);
  }
}