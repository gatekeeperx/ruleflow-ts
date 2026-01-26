// Generated from src/grammar/RuleFlowLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { DateDiffContext } from "./RuleFlowLanguageParser";
import { DayOfWeekContext } from "./RuleFlowLanguageParser";
import { NowContext } from "./RuleFlowLanguageParser";
import { DateAddContext } from "./RuleFlowLanguageParser";
import { DateSubtractContext } from "./RuleFlowLanguageParser";
import { ParenthesisContext } from "./RuleFlowLanguageParser";
import { MathMulContext } from "./RuleFlowLanguageParser";
import { MathAddContext } from "./RuleFlowLanguageParser";
import { ComparatorContext } from "./RuleFlowLanguageParser";
import { ListContext } from "./RuleFlowLanguageParser";
import { TupleListContext } from "./RuleFlowLanguageParser";
import { AggregationContext } from "./RuleFlowLanguageParser";
import { DateOperationContext } from "./RuleFlowLanguageParser";
import { RegexlikeContext } from "./RuleFlowLanguageParser";
import { UnaryContext } from "./RuleFlowLanguageParser";
import { EvalInListContext } from "./RuleFlowLanguageParser";
import { BinaryAndContext } from "./RuleFlowLanguageParser";
import { BinaryOrContext } from "./RuleFlowLanguageParser";
import { DateParseExprContext } from "./RuleFlowLanguageParser";
import { ValueContext } from "./RuleFlowLanguageParser";
import { PropertyContext } from "./RuleFlowLanguageParser";
import { StringDistanceContext } from "./RuleFlowLanguageParser";
import { PartialRatioContext } from "./RuleFlowLanguageParser";
import { TokenSortRatioContext } from "./RuleFlowLanguageParser";
import { TokenSetRatioContext } from "./RuleFlowLanguageParser";
import { StringSimilarityScoreContext } from "./RuleFlowLanguageParser";
import { GeoOperationContext } from "./RuleFlowLanguageParser";
import { GeohashEncodeContext } from "./RuleFlowLanguageParser";
import { GeohashDecodeContext } from "./RuleFlowLanguageParser";
import { DistanceContext } from "./RuleFlowLanguageParser";
import { DistanceGeohashContext } from "./RuleFlowLanguageParser";
import { WithinRadiusContext } from "./RuleFlowLanguageParser";
import { ParseContext } from "./RuleFlowLanguageParser";
import { ErrorContext } from "./RuleFlowLanguageParser";
import { WorkflowContext } from "./RuleFlowLanguageParser";
import { Workflow_nameContext } from "./RuleFlowLanguageParser";
import { String_literalContext } from "./RuleFlowLanguageParser";
import { RulesetsContext } from "./RuleFlowLanguageParser";
import { Ruleset_conditionContext } from "./RuleFlowLanguageParser";
import { RulesContext } from "./RuleFlowLanguageParser";
import { Rule_bodyContext } from "./RuleFlowLanguageParser";
import { NameContext } from "./RuleFlowLanguageParser";
import { Default_clauseContext } from "./RuleFlowLanguageParser";
import { ConfigurationContext } from "./RuleFlowLanguageParser";
import { Evaluation_modeContext } from "./RuleFlowLanguageParser";
import { Return_resultContext } from "./RuleFlowLanguageParser";
import { State_ruleContext } from "./RuleFlowLanguageParser";
import { ActionsContext } from "./RuleFlowLanguageParser";
import { ActionContext } from "./RuleFlowLanguageParser";
import { Action_paramsContext } from "./RuleFlowLanguageParser";
import { Param_pairsContext } from "./RuleFlowLanguageParser";
import { Param_pairContext } from "./RuleFlowLanguageParser";
import { ExprContext } from "./RuleFlowLanguageParser";
import { GeoExprContext } from "./RuleFlowLanguageParser";
import { DateExprContext } from "./RuleFlowLanguageParser";
import { PropertyTupleContext } from "./RuleFlowLanguageParser";
import { ListElemsContext } from "./RuleFlowLanguageParser";
import { ValidValueContext } from "./RuleFlowLanguageParser";
import { ActionParamValueContext } from "./RuleFlowLanguageParser";
import { DateParseContext } from "./RuleFlowLanguageParser";
import { DateValueContext } from "./RuleFlowLanguageParser";
import { TimeUnitContext } from "./RuleFlowLanguageParser";
import { ValidPropertyContext } from "./RuleFlowLanguageParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RuleFlowLanguageParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface RuleFlowLanguageVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `dateDiff`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateDiff?: (ctx: DateDiffContext) => Result;

	/**
	 * Visit a parse tree produced by the `dayOfWeek`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDayOfWeek?: (ctx: DayOfWeekContext) => Result;

	/**
	 * Visit a parse tree produced by the `now`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNow?: (ctx: NowContext) => Result;

	/**
	 * Visit a parse tree produced by the `dateAdd`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateAdd?: (ctx: DateAddContext) => Result;

	/**
	 * Visit a parse tree produced by the `dateSubtract`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateSubtract?: (ctx: DateSubtractContext) => Result;

	/**
	 * Visit a parse tree produced by the `parenthesis`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesis?: (ctx: ParenthesisContext) => Result;

	/**
	 * Visit a parse tree produced by the `mathMul`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathMul?: (ctx: MathMulContext) => Result;

	/**
	 * Visit a parse tree produced by the `mathAdd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathAdd?: (ctx: MathAddContext) => Result;

	/**
	 * Visit a parse tree produced by the `comparator`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparator?: (ctx: ComparatorContext) => Result;

	/**
	 * Visit a parse tree produced by the `list`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList?: (ctx: ListContext) => Result;

	/**
	 * Visit a parse tree produced by the `tupleList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleList?: (ctx: TupleListContext) => Result;

	/**
	 * Visit a parse tree produced by the `aggregation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggregation?: (ctx: AggregationContext) => Result;

	/**
	 * Visit a parse tree produced by the `dateOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateOperation?: (ctx: DateOperationContext) => Result;

	/**
	 * Visit a parse tree produced by the `regexlike`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegexlike?: (ctx: RegexlikeContext) => Result;

	/**
	 * Visit a parse tree produced by the `unary`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary?: (ctx: UnaryContext) => Result;

	/**
	 * Visit a parse tree produced by the `evalInList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalInList?: (ctx: EvalInListContext) => Result;

	/**
	 * Visit a parse tree produced by the `binaryAnd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryAnd?: (ctx: BinaryAndContext) => Result;

	/**
	 * Visit a parse tree produced by the `binaryOr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryOr?: (ctx: BinaryOrContext) => Result;

	/**
	 * Visit a parse tree produced by the `dateParseExpr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateParseExpr?: (ctx: DateParseExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `value`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;

	/**
	 * Visit a parse tree produced by the `property`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by the `stringDistance`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringDistance?: (ctx: StringDistanceContext) => Result;

	/**
	 * Visit a parse tree produced by the `partialRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartialRatio?: (ctx: PartialRatioContext) => Result;

	/**
	 * Visit a parse tree produced by the `tokenSortRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTokenSortRatio?: (ctx: TokenSortRatioContext) => Result;

	/**
	 * Visit a parse tree produced by the `tokenSetRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTokenSetRatio?: (ctx: TokenSetRatioContext) => Result;

	/**
	 * Visit a parse tree produced by the `stringSimilarityScore`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringSimilarityScore?: (ctx: StringSimilarityScoreContext) => Result;

	/**
	 * Visit a parse tree produced by the `geoOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeoOperation?: (ctx: GeoOperationContext) => Result;

	/**
	 * Visit a parse tree produced by the `geohashEncode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeohashEncode?: (ctx: GeohashEncodeContext) => Result;

	/**
	 * Visit a parse tree produced by the `geohashDecode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeohashDecode?: (ctx: GeohashDecodeContext) => Result;

	/**
	 * Visit a parse tree produced by the `distance`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDistance?: (ctx: DistanceContext) => Result;

	/**
	 * Visit a parse tree produced by the `distanceGeohash`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDistanceGeohash?: (ctx: DistanceGeohashContext) => Result;

	/**
	 * Visit a parse tree produced by the `withinRadius`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithinRadius?: (ctx: WithinRadiusContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.parse`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParse?: (ctx: ParseContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.error`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitError?: (ctx: ErrorContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.workflow`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWorkflow?: (ctx: WorkflowContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.workflow_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWorkflow_name?: (ctx: Workflow_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.string_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_literal?: (ctx: String_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.rulesets`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRulesets?: (ctx: RulesetsContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.ruleset_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleset_condition?: (ctx: Ruleset_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.rules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRules?: (ctx: RulesContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.rule_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRule_body?: (ctx: Rule_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.default_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault_clause?: (ctx: Default_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.configuration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfiguration?: (ctx: ConfigurationContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.evaluation_mode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvaluation_mode?: (ctx: Evaluation_modeContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.return_result`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturn_result?: (ctx: Return_resultContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.state_rule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitState_rule?: (ctx: State_ruleContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.actions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActions?: (ctx: ActionsContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction?: (ctx: ActionContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.action_params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_params?: (ctx: Action_paramsContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.param_pairs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_pairs?: (ctx: Param_pairsContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.param_pair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_pair?: (ctx: Param_pairContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGeoExpr?: (ctx: GeoExprContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateExpr?: (ctx: DateExprContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.propertyTuple`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropertyTuple?: (ctx: PropertyTupleContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.listElems`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListElems?: (ctx: ListElemsContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.validValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValidValue?: (ctx: ValidValueContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.actionParamValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActionParamValue?: (ctx: ActionParamValueContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.dateParse`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateParse?: (ctx: DateParseContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.dateValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateValue?: (ctx: DateValueContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.timeUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeUnit?: (ctx: TimeUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `RuleFlowLanguageParser.validProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValidProperty?: (ctx: ValidPropertyContext) => Result;
}

