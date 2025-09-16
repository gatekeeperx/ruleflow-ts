import type { Visitor } from '../../visitors/Visitor';
import type { GeohashDecodeContext } from '../../generated/src/grammar/RuleFlowLanguageParser';
import { geohashDecode } from './geohash';

export class GeohashDecodeEvaluator {
  evaluate(ctx: GeohashDecodeContext, visitor: Visitor): [number, number] {
    const geohash = String(visitor.visit(ctx.expr()));
    return geohashDecode(geohash);
  }
}