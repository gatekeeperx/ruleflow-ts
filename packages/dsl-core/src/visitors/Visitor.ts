import {
  ComparatorContext,
  MathMulContext,
  MathAddContext,
  ParenthesisContext,
  ValueContext,
  PropertyContext,
  ValidPropertyContext,
  ListContext,
  TupleListContext,
  BinaryAndContext,
  BinaryOrContext,
  UnaryContext,
  RegexlikeContext,
  DateOperationContext,
  DateDiffContext,
  DayOfWeekContext,
  NowContext,
  DateAddContext,
  DateSubtractContext,
  DateParseExprContext,
  AggregationContext,
  GeoOperationContext,
  GeohashEncodeContext,
  GeohashDecodeContext,
  DistanceContext as GeoDistanceContext,
  DistanceGeohashContext,
  WithinRadiusContext,
  StringDistanceContext,
  PartialRatioContext,
  TokenSortRatioContext,
  TokenSetRatioContext,
  StringSimilarityScoreContext,
  EvalInListContext,
} from '../generated/src/grammar/RuleFlowLanguageParser';

import { ComparatorEvaluator } from '../evaluator/ComparatorEvaluator';
import { MathMulEvaluator } from '../evaluator/MathMulEvaluator';
import { MathAddEvaluator } from '../evaluator/MathAddEvaluator';
import { ParenthesisEvaluator } from '../evaluator/ParenthesisEvaluator';
import { ValueEvaluator } from '../evaluator/ValueEvaluator';
import { ValidPropertyEvaluator } from '../evaluator/ValidPropertyEvaluator';
import { ListEvaluator } from '../evaluator/ListEvaluator';
import { TupleListEvaluator } from '../evaluator/TupleListEvaluator';
import { BinaryAndEvaluator } from '../evaluator/BinaryAndEvaluator';
import { BinaryOrEvaluator } from '../evaluator/BinaryOrEvaluator';
import { UnaryEvaluator } from '../evaluator/UnaryEvaluator';
import { RegexlikeEvaluator } from '../evaluator/RegexlikeEvaluator';
import { DateDiffEvaluator } from '../evaluator/date/DateDiffEvaluator';
import { DayOfWeekEvaluator } from '../evaluator/date/DayOfWeekEvaluator';
import { NowEvaluator } from '../evaluator/date/NowEvaluator';
import { DateAddEvaluator } from '../evaluator/date/DateAddEvaluator';
import { DateSubtractEvaluator } from '../evaluator/date/DateSubtractEvaluator';
import { DateOperationEvaluator } from '../evaluator/date/DateOperationEvaluator';
import { DateParseExprEvaluator } from '../evaluator/date/DateParseExprEvaluator';
import { GeoOperationEvaluator } from '../evaluator/geo/GeoOperationEvaluator';
import { GeohashEncodeEvaluator } from '../evaluator/geo/GeohashEncodeEvaluator';
import { GeohashDecodeEvaluator } from '../evaluator/geo/GeohashDecodeEvaluator';
import { AggregationEvaluator } from '../evaluator/AggregationEvaluator';
import { DistanceGeohashEvaluator } from '../evaluator/geo/DistanceGeohashEvaluator';
import { WithinRadiusEvaluator } from '../evaluator/geo/WithinRadiusEvaluator';
import { DistanceEvaluator as GeoDistanceEvaluator } from '../evaluator/geo/DistanceEvaluator';
import { StringDistanceEvaluator } from '../evaluator/string/StringDistanceEvaluator';
import { PartialRatioEvaluator } from '../evaluator/string/PartialRatioEvaluator';
import { TokenSortRatioEvaluator } from '../evaluator/string/TokenSortRatioEvaluator';
import { TokenSetRatioEvaluator } from '../evaluator/string/TokenSetRatioEvaluator';
import { StringSimilarityScoreEvaluator } from '../evaluator/string/StringSimilarityScoreEvaluator';
import { EvalInListEvaluator } from '../evaluator/EvalInListEvaluator';

export type DataMap = Record<string, unknown>;
export type ListsMap = Record<string, unknown[]>;

export class Visitor {
  constructor(
    private readonly data: DataMap,
    private readonly lists: ListsMap = {},
    private readonly root: DataMap = data
  ) { }

  visit(tree: any): any {
    const ctx = tree as any;

    if (ctx instanceof ComparatorContext) {
      return new ComparatorEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof MathMulContext) {
      return new MathMulEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof MathAddContext) {
      return new MathAddEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof ParenthesisContext) {
      return new ParenthesisEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof ValueContext) {
      return new ValueEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof PropertyContext) {
      // delegate to validProperty
      return new ValidPropertyEvaluator().evaluate(ctx.validProperty(), this);
    } else if (ctx instanceof ValidPropertyContext) {
      return new ValidPropertyEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof ListContext) {
      return new ListEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof TupleListContext) {
      return new TupleListEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof BinaryAndContext) {
      return new BinaryAndEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof BinaryOrContext) {
      return new BinaryOrEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof UnaryContext) {
      return new UnaryEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof RegexlikeContext) {
      return new RegexlikeEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DateOperationContext) {
      return new DateOperationEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DateDiffContext) {
      return new DateDiffEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DayOfWeekContext) {
      return new DayOfWeekEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof NowContext) {
      return new NowEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DateAddContext) {
      return new DateAddEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DateSubtractContext) {
      return new DateSubtractEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DateParseExprContext) {
      return new DateParseExprEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof AggregationContext) {
      return new AggregationEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof GeoOperationContext) {
      return new GeoOperationEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof GeohashEncodeContext) {
      return new GeohashEncodeEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof GeohashDecodeContext) {
      return new GeohashDecodeEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof GeoDistanceContext) {
      return new GeoDistanceEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof DistanceGeohashContext) {
      return new DistanceGeohashEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof WithinRadiusContext) {
      return new WithinRadiusEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof StringDistanceContext) {
      return new StringDistanceEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof PartialRatioContext) {
      return new PartialRatioEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof TokenSortRatioContext) {
      return new TokenSortRatioEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof TokenSetRatioContext) {
      return new TokenSetRatioEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof StringSimilarityScoreContext) {
      return new StringSimilarityScoreEvaluator().evaluate(ctx, this);
    } else if (ctx instanceof EvalInListContext) {
      return new EvalInListEvaluator().evaluate(ctx, this);
    }

    throw new Error(`Operation not supported: ${ctx?.constructor?.name ?? typeof ctx}`);
  }

  getData() {
    return this.data;
  }

  getLists() {
    return this.lists;
  }

  getRoot() {
    return this.root;
  }
}
