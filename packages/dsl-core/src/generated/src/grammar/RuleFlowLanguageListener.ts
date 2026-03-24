// Generated from src/grammar/RuleFlowLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DateDiffContext } from "./RuleFlowLanguageParser";
import { DayOfWeekContext } from "./RuleFlowLanguageParser";
import { NowContext } from "./RuleFlowLanguageParser";
import { DateAddContext } from "./RuleFlowLanguageParser";
import { DateSubtractContext } from "./RuleFlowLanguageParser";
import { ParenthesisContext } from "./RuleFlowLanguageParser";
import { VariableRefContext } from "./RuleFlowLanguageParser";
import { MemberAccessContext } from "./RuleFlowLanguageParser";
import { MathMulContext } from "./RuleFlowLanguageParser";
import { MathAddContext } from "./RuleFlowLanguageParser";
import { ComparatorContext } from "./RuleFlowLanguageParser";
import { StoredListExprContext } from "./RuleFlowLanguageParser";
import { ListContext } from "./RuleFlowLanguageParser";
import { TupleListContext } from "./RuleFlowLanguageParser";
import { AggregationContext } from "./RuleFlowLanguageParser";
import { DateOperationContext } from "./RuleFlowLanguageParser";
import { RegexlikeContext } from "./RuleFlowLanguageParser";
import { UnaryContext } from "./RuleFlowLanguageParser";
import { EvalInListContext } from "./RuleFlowLanguageParser";
import { CustomFunctionCallContext } from "./RuleFlowLanguageParser";
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
import { Set_clauseContext } from "./RuleFlowLanguageParser";
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
import { FuncCallArgContext } from "./RuleFlowLanguageParser";
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
 * This interface defines a complete listener for a parse tree produced by
 * `RuleFlowLanguageParser`.
 */
export interface RuleFlowLanguageListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `dateDiff`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterDateDiff?: (ctx: DateDiffContext) => void;
	/**
	 * Exit a parse tree produced by the `dateDiff`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitDateDiff?: (ctx: DateDiffContext) => void;

	/**
	 * Enter a parse tree produced by the `dayOfWeek`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterDayOfWeek?: (ctx: DayOfWeekContext) => void;
	/**
	 * Exit a parse tree produced by the `dayOfWeek`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitDayOfWeek?: (ctx: DayOfWeekContext) => void;

	/**
	 * Enter a parse tree produced by the `now`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterNow?: (ctx: NowContext) => void;
	/**
	 * Exit a parse tree produced by the `now`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitNow?: (ctx: NowContext) => void;

	/**
	 * Enter a parse tree produced by the `dateAdd`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterDateAdd?: (ctx: DateAddContext) => void;
	/**
	 * Exit a parse tree produced by the `dateAdd`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitDateAdd?: (ctx: DateAddContext) => void;

	/**
	 * Enter a parse tree produced by the `dateSubtract`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterDateSubtract?: (ctx: DateSubtractContext) => void;
	/**
	 * Exit a parse tree produced by the `dateSubtract`
	 * labeled alternative in `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitDateSubtract?: (ctx: DateSubtractContext) => void;

	/**
	 * Enter a parse tree produced by the `parenthesis`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterParenthesis?: (ctx: ParenthesisContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesis`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitParenthesis?: (ctx: ParenthesisContext) => void;

	/**
	 * Enter a parse tree produced by the `variableRef`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterVariableRef?: (ctx: VariableRefContext) => void;
	/**
	 * Exit a parse tree produced by the `variableRef`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitVariableRef?: (ctx: VariableRefContext) => void;

	/**
	 * Enter a parse tree produced by the `memberAccess`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMemberAccess?: (ctx: MemberAccessContext) => void;
	/**
	 * Exit a parse tree produced by the `memberAccess`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMemberAccess?: (ctx: MemberAccessContext) => void;

	/**
	 * Enter a parse tree produced by the `mathMul`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMathMul?: (ctx: MathMulContext) => void;
	/**
	 * Exit a parse tree produced by the `mathMul`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMathMul?: (ctx: MathMulContext) => void;

	/**
	 * Enter a parse tree produced by the `mathAdd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterMathAdd?: (ctx: MathAddContext) => void;
	/**
	 * Exit a parse tree produced by the `mathAdd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitMathAdd?: (ctx: MathAddContext) => void;

	/**
	 * Enter a parse tree produced by the `comparator`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterComparator?: (ctx: ComparatorContext) => void;
	/**
	 * Exit a parse tree produced by the `comparator`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitComparator?: (ctx: ComparatorContext) => void;

	/**
	 * Enter a parse tree produced by the `storedListExpr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterStoredListExpr?: (ctx: StoredListExprContext) => void;
	/**
	 * Exit a parse tree produced by the `storedListExpr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitStoredListExpr?: (ctx: StoredListExprContext) => void;

	/**
	 * Enter a parse tree produced by the `list`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by the `list`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;

	/**
	 * Enter a parse tree produced by the `tupleList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTupleList?: (ctx: TupleListContext) => void;
	/**
	 * Exit a parse tree produced by the `tupleList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTupleList?: (ctx: TupleListContext) => void;

	/**
	 * Enter a parse tree produced by the `aggregation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAggregation?: (ctx: AggregationContext) => void;
	/**
	 * Exit a parse tree produced by the `aggregation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAggregation?: (ctx: AggregationContext) => void;

	/**
	 * Enter a parse tree produced by the `dateOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterDateOperation?: (ctx: DateOperationContext) => void;
	/**
	 * Exit a parse tree produced by the `dateOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitDateOperation?: (ctx: DateOperationContext) => void;

	/**
	 * Enter a parse tree produced by the `regexlike`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterRegexlike?: (ctx: RegexlikeContext) => void;
	/**
	 * Exit a parse tree produced by the `regexlike`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitRegexlike?: (ctx: RegexlikeContext) => void;

	/**
	 * Enter a parse tree produced by the `unary`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterUnary?: (ctx: UnaryContext) => void;
	/**
	 * Exit a parse tree produced by the `unary`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitUnary?: (ctx: UnaryContext) => void;

	/**
	 * Enter a parse tree produced by the `evalInList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterEvalInList?: (ctx: EvalInListContext) => void;
	/**
	 * Exit a parse tree produced by the `evalInList`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitEvalInList?: (ctx: EvalInListContext) => void;

	/**
	 * Enter a parse tree produced by the `customFunctionCall`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterCustomFunctionCall?: (ctx: CustomFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by the `customFunctionCall`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitCustomFunctionCall?: (ctx: CustomFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by the `binaryAnd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterBinaryAnd?: (ctx: BinaryAndContext) => void;
	/**
	 * Exit a parse tree produced by the `binaryAnd`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitBinaryAnd?: (ctx: BinaryAndContext) => void;

	/**
	 * Enter a parse tree produced by the `binaryOr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterBinaryOr?: (ctx: BinaryOrContext) => void;
	/**
	 * Exit a parse tree produced by the `binaryOr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitBinaryOr?: (ctx: BinaryOrContext) => void;

	/**
	 * Enter a parse tree produced by the `dateParseExpr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterDateParseExpr?: (ctx: DateParseExprContext) => void;
	/**
	 * Exit a parse tree produced by the `dateParseExpr`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitDateParseExpr?: (ctx: DateParseExprContext) => void;

	/**
	 * Enter a parse tree produced by the `value`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by the `value`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by the `property`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by the `property`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by the `stringDistance`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterStringDistance?: (ctx: StringDistanceContext) => void;
	/**
	 * Exit a parse tree produced by the `stringDistance`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitStringDistance?: (ctx: StringDistanceContext) => void;

	/**
	 * Enter a parse tree produced by the `partialRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterPartialRatio?: (ctx: PartialRatioContext) => void;
	/**
	 * Exit a parse tree produced by the `partialRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitPartialRatio?: (ctx: PartialRatioContext) => void;

	/**
	 * Enter a parse tree produced by the `tokenSortRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTokenSortRatio?: (ctx: TokenSortRatioContext) => void;
	/**
	 * Exit a parse tree produced by the `tokenSortRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTokenSortRatio?: (ctx: TokenSortRatioContext) => void;

	/**
	 * Enter a parse tree produced by the `tokenSetRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterTokenSetRatio?: (ctx: TokenSetRatioContext) => void;
	/**
	 * Exit a parse tree produced by the `tokenSetRatio`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitTokenSetRatio?: (ctx: TokenSetRatioContext) => void;

	/**
	 * Enter a parse tree produced by the `stringSimilarityScore`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterStringSimilarityScore?: (ctx: StringSimilarityScoreContext) => void;
	/**
	 * Exit a parse tree produced by the `stringSimilarityScore`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitStringSimilarityScore?: (ctx: StringSimilarityScoreContext) => void;

	/**
	 * Enter a parse tree produced by the `geoOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterGeoOperation?: (ctx: GeoOperationContext) => void;
	/**
	 * Exit a parse tree produced by the `geoOperation`
	 * labeled alternative in `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitGeoOperation?: (ctx: GeoOperationContext) => void;

	/**
	 * Enter a parse tree produced by the `geohashEncode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterGeohashEncode?: (ctx: GeohashEncodeContext) => void;
	/**
	 * Exit a parse tree produced by the `geohashEncode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitGeohashEncode?: (ctx: GeohashEncodeContext) => void;

	/**
	 * Enter a parse tree produced by the `geohashDecode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterGeohashDecode?: (ctx: GeohashDecodeContext) => void;
	/**
	 * Exit a parse tree produced by the `geohashDecode`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitGeohashDecode?: (ctx: GeohashDecodeContext) => void;

	/**
	 * Enter a parse tree produced by the `distance`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterDistance?: (ctx: DistanceContext) => void;
	/**
	 * Exit a parse tree produced by the `distance`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitDistance?: (ctx: DistanceContext) => void;

	/**
	 * Enter a parse tree produced by the `distanceGeohash`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterDistanceGeohash?: (ctx: DistanceGeohashContext) => void;
	/**
	 * Exit a parse tree produced by the `distanceGeohash`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitDistanceGeohash?: (ctx: DistanceGeohashContext) => void;

	/**
	 * Enter a parse tree produced by the `withinRadius`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterWithinRadius?: (ctx: WithinRadiusContext) => void;
	/**
	 * Exit a parse tree produced by the `withinRadius`
	 * labeled alternative in `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitWithinRadius?: (ctx: WithinRadiusContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.parse`.
	 * @param ctx the parse tree
	 */
	enterParse?: (ctx: ParseContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.parse`.
	 * @param ctx the parse tree
	 */
	exitParse?: (ctx: ParseContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.error`.
	 * @param ctx the parse tree
	 */
	enterError?: (ctx: ErrorContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.error`.
	 * @param ctx the parse tree
	 */
	exitError?: (ctx: ErrorContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.workflow`.
	 * @param ctx the parse tree
	 */
	enterWorkflow?: (ctx: WorkflowContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.workflow`.
	 * @param ctx the parse tree
	 */
	exitWorkflow?: (ctx: WorkflowContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.workflow_name`.
	 * @param ctx the parse tree
	 */
	enterWorkflow_name?: (ctx: Workflow_nameContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.workflow_name`.
	 * @param ctx the parse tree
	 */
	exitWorkflow_name?: (ctx: Workflow_nameContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.string_literal`.
	 * @param ctx the parse tree
	 */
	enterString_literal?: (ctx: String_literalContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.string_literal`.
	 * @param ctx the parse tree
	 */
	exitString_literal?: (ctx: String_literalContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.rulesets`.
	 * @param ctx the parse tree
	 */
	enterRulesets?: (ctx: RulesetsContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.rulesets`.
	 * @param ctx the parse tree
	 */
	exitRulesets?: (ctx: RulesetsContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.ruleset_condition`.
	 * @param ctx the parse tree
	 */
	enterRuleset_condition?: (ctx: Ruleset_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.ruleset_condition`.
	 * @param ctx the parse tree
	 */
	exitRuleset_condition?: (ctx: Ruleset_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.rules`.
	 * @param ctx the parse tree
	 */
	enterRules?: (ctx: RulesContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.rules`.
	 * @param ctx the parse tree
	 */
	exitRules?: (ctx: RulesContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.rule_body`.
	 * @param ctx the parse tree
	 */
	enterRule_body?: (ctx: Rule_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.rule_body`.
	 * @param ctx the parse tree
	 */
	exitRule_body?: (ctx: Rule_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.set_clause`.
	 * @param ctx the parse tree
	 */
	enterSet_clause?: (ctx: Set_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.set_clause`.
	 * @param ctx the parse tree
	 */
	exitSet_clause?: (ctx: Set_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.default_clause`.
	 * @param ctx the parse tree
	 */
	enterDefault_clause?: (ctx: Default_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.default_clause`.
	 * @param ctx the parse tree
	 */
	exitDefault_clause?: (ctx: Default_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.configuration`.
	 * @param ctx the parse tree
	 */
	enterConfiguration?: (ctx: ConfigurationContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.configuration`.
	 * @param ctx the parse tree
	 */
	exitConfiguration?: (ctx: ConfigurationContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.evaluation_mode`.
	 * @param ctx the parse tree
	 */
	enterEvaluation_mode?: (ctx: Evaluation_modeContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.evaluation_mode`.
	 * @param ctx the parse tree
	 */
	exitEvaluation_mode?: (ctx: Evaluation_modeContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.return_result`.
	 * @param ctx the parse tree
	 */
	enterReturn_result?: (ctx: Return_resultContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.return_result`.
	 * @param ctx the parse tree
	 */
	exitReturn_result?: (ctx: Return_resultContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.state_rule`.
	 * @param ctx the parse tree
	 */
	enterState_rule?: (ctx: State_ruleContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.state_rule`.
	 * @param ctx the parse tree
	 */
	exitState_rule?: (ctx: State_ruleContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.actions`.
	 * @param ctx the parse tree
	 */
	enterActions?: (ctx: ActionsContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.actions`.
	 * @param ctx the parse tree
	 */
	exitActions?: (ctx: ActionsContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.action`.
	 * @param ctx the parse tree
	 */
	enterAction?: (ctx: ActionContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.action`.
	 * @param ctx the parse tree
	 */
	exitAction?: (ctx: ActionContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.action_params`.
	 * @param ctx the parse tree
	 */
	enterAction_params?: (ctx: Action_paramsContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.action_params`.
	 * @param ctx the parse tree
	 */
	exitAction_params?: (ctx: Action_paramsContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.param_pairs`.
	 * @param ctx the parse tree
	 */
	enterParam_pairs?: (ctx: Param_pairsContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.param_pairs`.
	 * @param ctx the parse tree
	 */
	exitParam_pairs?: (ctx: Param_pairsContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.param_pair`.
	 * @param ctx the parse tree
	 */
	enterParam_pair?: (ctx: Param_pairContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.param_pair`.
	 * @param ctx the parse tree
	 */
	exitParam_pair?: (ctx: Param_pairContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.funcCallArg`.
	 * @param ctx the parse tree
	 */
	enterFuncCallArg?: (ctx: FuncCallArgContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.funcCallArg`.
	 * @param ctx the parse tree
	 */
	exitFuncCallArg?: (ctx: FuncCallArgContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	enterGeoExpr?: (ctx: GeoExprContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.geoExpr`.
	 * @param ctx the parse tree
	 */
	exitGeoExpr?: (ctx: GeoExprContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	enterDateExpr?: (ctx: DateExprContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.dateExpr`.
	 * @param ctx the parse tree
	 */
	exitDateExpr?: (ctx: DateExprContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.propertyTuple`.
	 * @param ctx the parse tree
	 */
	enterPropertyTuple?: (ctx: PropertyTupleContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.propertyTuple`.
	 * @param ctx the parse tree
	 */
	exitPropertyTuple?: (ctx: PropertyTupleContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.listElems`.
	 * @param ctx the parse tree
	 */
	enterListElems?: (ctx: ListElemsContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.listElems`.
	 * @param ctx the parse tree
	 */
	exitListElems?: (ctx: ListElemsContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.validValue`.
	 * @param ctx the parse tree
	 */
	enterValidValue?: (ctx: ValidValueContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.validValue`.
	 * @param ctx the parse tree
	 */
	exitValidValue?: (ctx: ValidValueContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.actionParamValue`.
	 * @param ctx the parse tree
	 */
	enterActionParamValue?: (ctx: ActionParamValueContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.actionParamValue`.
	 * @param ctx the parse tree
	 */
	exitActionParamValue?: (ctx: ActionParamValueContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.dateParse`.
	 * @param ctx the parse tree
	 */
	enterDateParse?: (ctx: DateParseContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.dateParse`.
	 * @param ctx the parse tree
	 */
	exitDateParse?: (ctx: DateParseContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.dateValue`.
	 * @param ctx the parse tree
	 */
	enterDateValue?: (ctx: DateValueContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.dateValue`.
	 * @param ctx the parse tree
	 */
	exitDateValue?: (ctx: DateValueContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.timeUnit`.
	 * @param ctx the parse tree
	 */
	enterTimeUnit?: (ctx: TimeUnitContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.timeUnit`.
	 * @param ctx the parse tree
	 */
	exitTimeUnit?: (ctx: TimeUnitContext) => void;

	/**
	 * Enter a parse tree produced by `RuleFlowLanguageParser.validProperty`.
	 * @param ctx the parse tree
	 */
	enterValidProperty?: (ctx: ValidPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `RuleFlowLanguageParser.validProperty`.
	 * @param ctx the parse tree
	 */
	exitValidProperty?: (ctx: ValidPropertyContext) => void;
}

