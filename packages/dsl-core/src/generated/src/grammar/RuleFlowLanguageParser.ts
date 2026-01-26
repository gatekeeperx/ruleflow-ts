// Generated from src/grammar/RuleFlowLanguage.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { RuleFlowLanguageListener } from "./RuleFlowLanguageListener";
import { RuleFlowLanguageVisitor } from "./RuleFlowLanguageVisitor";


export class RuleFlowLanguageParser extends Parser {
	public static readonly STRING_NOT_SPECIAL_CHARS = 1;
	public static readonly DOT = 2;
	public static readonly COMMA = 3;
	public static readonly ADD = 4;
	public static readonly MINUS = 5;
	public static readonly MULTIPLY = 6;
	public static readonly DIVIDE = 7;
	public static readonly LT = 8;
	public static readonly LT_EQ = 9;
	public static readonly GT = 10;
	public static readonly GT_EQ = 11;
	public static readonly EQ_IC = 12;
	public static readonly EQ = 13;
	public static readonly NOT_EQ = 14;
	public static readonly MINUTE = 15;
	public static readonly HOUR = 16;
	public static readonly DAY = 17;
	public static readonly CURRENT_DATE = 18;
	public static readonly DATE_DIFF = 19;
	public static readonly ABS = 20;
	public static readonly REGEX_STRIP = 21;
	public static readonly MODULO = 22;
	public static readonly K_STARTS_WITH = 23;
	public static readonly K_LIST = 24;
	public static readonly K_ELEM = 25;
	public static readonly K_EVAL_IN_LIST = 26;
	public static readonly L_BRACE = 27;
	public static readonly R_BRACE = 28;
	public static readonly L_PAREN = 29;
	public static readonly R_PAREN = 30;
	public static readonly K_COLON = 31;
	public static readonly K_ACTION = 32;
	public static readonly K_WORKFLOW = 33;
	public static readonly K_RULESET = 34;
	public static readonly K_RETURN = 35;
	public static readonly K_THEN = 36;
	public static readonly K_DEFAULT = 37;
	public static readonly K_WITH = 38;
	public static readonly K_END = 39;
	public static readonly K_ELSE = 40;
	public static readonly K_AND = 41;
	public static readonly K_OR = 42;
	public static readonly K_CONTAINS = 43;
	public static readonly K_IS = 44;
	public static readonly K_NOT = 45;
	public static readonly K_IS_NOT = 46;
	public static readonly K_IN = 47;
	public static readonly K_ANY = 48;
	public static readonly K_NONE = 49;
	public static readonly K_ALL = 50;
	public static readonly K_COUNT = 51;
	public static readonly K_AVERAGE = 52;
	public static readonly K_DISTINCT = 53;
	public static readonly K_NULL = 54;
	public static readonly DAY_OF_WEEK = 55;
	public static readonly K_EXPR = 56;
	public static readonly K_EVALUATION_MODE = 57;
	public static readonly K_MULTI_MATCH = 58;
	public static readonly K_SINGLE_MATCH = 59;
	public static readonly K_NOW = 60;
	public static readonly K_DATE = 61;
	public static readonly K_DATETIME = 62;
	public static readonly K_DATE_ADD = 63;
	public static readonly K_DATE_SUBTRACT = 64;
	public static readonly STRING_DISTANCE = 65;
	public static readonly PARTIAL_RATIO = 66;
	public static readonly TOKEN_SORT_RATIO = 67;
	public static readonly TOKEN_SET_RATIO = 68;
	public static readonly STRING_SIMILARITY_SCORE = 69;
	public static readonly GEOHASH_ENCODE = 70;
	public static readonly GEOHASH_DECODE = 71;
	public static readonly DISTANCE = 72;
	public static readonly WITHIN_RADIUS = 73;
	public static readonly NUMERIC_LITERAL = 74;
	public static readonly BOOLEAN_LITERAL = 75;
	public static readonly DQUOTA_STRING = 76;
	public static readonly SQUOTA_STRING = 77;
	public static readonly ID = 78;
	public static readonly SINGLE_LINE_COMMENT = 79;
	public static readonly MULTILINE_COMMENT = 80;
	public static readonly SPACES = 81;
	public static readonly UNEXPECTED_CHAR = 82;
	public static readonly RULE_parse = 0;
	public static readonly RULE_error = 1;
	public static readonly RULE_workflow = 2;
	public static readonly RULE_workflow_name = 3;
	public static readonly RULE_string_literal = 4;
	public static readonly RULE_rulesets = 5;
	public static readonly RULE_ruleset_condition = 6;
	public static readonly RULE_rules = 7;
	public static readonly RULE_rule_body = 8;
	public static readonly RULE_name = 9;
	public static readonly RULE_default_clause = 10;
	public static readonly RULE_configuration = 11;
	public static readonly RULE_evaluation_mode = 12;
	public static readonly RULE_return_result = 13;
	public static readonly RULE_state_rule = 14;
	public static readonly RULE_actions = 15;
	public static readonly RULE_action = 16;
	public static readonly RULE_action_params = 17;
	public static readonly RULE_param_pairs = 18;
	public static readonly RULE_param_pair = 19;
	public static readonly RULE_expr = 20;
	public static readonly RULE_geoExpr = 21;
	public static readonly RULE_dateExpr = 22;
	public static readonly RULE_propertyTuple = 23;
	public static readonly RULE_listElems = 24;
	public static readonly RULE_validValue = 25;
	public static readonly RULE_actionParamValue = 26;
	public static readonly RULE_dateParse = 27;
	public static readonly RULE_dateValue = 28;
	public static readonly RULE_timeUnit = 29;
	public static readonly RULE_validProperty = 30;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"parse", "error", "workflow", "workflow_name", "string_literal", "rulesets", 
		"ruleset_condition", "rules", "rule_body", "name", "default_clause", "configuration", 
		"evaluation_mode", "return_result", "state_rule", "actions", "action", 
		"action_params", "param_pairs", "param_pair", "expr", "geoExpr", "dateExpr", 
		"propertyTuple", "listElems", "validValue", "actionParamValue", "dateParse", 
		"dateValue", "timeUnit", "validProperty",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'.'", "','", "'+'", "'-'", "'*'", "'/'", "'<'", 
		"'<='", "'>'", "'>='", "'='", "'=='", "'<>'", "'minute'", "'hour'", "'day'", 
		undefined, undefined, "'abs'", undefined, undefined, undefined, "'list'", 
		"'elem'", undefined, "'{'", "'}'", "'('", "')'", "':'", "'action'", undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "'distance'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "STRING_NOT_SPECIAL_CHARS", "DOT", "COMMA", "ADD", "MINUS", 
		"MULTIPLY", "DIVIDE", "LT", "LT_EQ", "GT", "GT_EQ", "EQ_IC", "EQ", "NOT_EQ", 
		"MINUTE", "HOUR", "DAY", "CURRENT_DATE", "DATE_DIFF", "ABS", "REGEX_STRIP", 
		"MODULO", "K_STARTS_WITH", "K_LIST", "K_ELEM", "K_EVAL_IN_LIST", "L_BRACE", 
		"R_BRACE", "L_PAREN", "R_PAREN", "K_COLON", "K_ACTION", "K_WORKFLOW", 
		"K_RULESET", "K_RETURN", "K_THEN", "K_DEFAULT", "K_WITH", "K_END", "K_ELSE", 
		"K_AND", "K_OR", "K_CONTAINS", "K_IS", "K_NOT", "K_IS_NOT", "K_IN", "K_ANY", 
		"K_NONE", "K_ALL", "K_COUNT", "K_AVERAGE", "K_DISTINCT", "K_NULL", "DAY_OF_WEEK", 
		"K_EXPR", "K_EVALUATION_MODE", "K_MULTI_MATCH", "K_SINGLE_MATCH", "K_NOW", 
		"K_DATE", "K_DATETIME", "K_DATE_ADD", "K_DATE_SUBTRACT", "STRING_DISTANCE", 
		"PARTIAL_RATIO", "TOKEN_SORT_RATIO", "TOKEN_SET_RATIO", "STRING_SIMILARITY_SCORE", 
		"GEOHASH_ENCODE", "GEOHASH_DECODE", "DISTANCE", "WITHIN_RADIUS", "NUMERIC_LITERAL", 
		"BOOLEAN_LITERAL", "DQUOTA_STRING", "SQUOTA_STRING", "ID", "SINGLE_LINE_COMMENT", 
		"MULTILINE_COMMENT", "SPACES", "UNEXPECTED_CHAR",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RuleFlowLanguageParser._LITERAL_NAMES, RuleFlowLanguageParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RuleFlowLanguageParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "RuleFlowLanguage.g4"; }

	// @Override
	public get ruleNames(): string[] { return RuleFlowLanguageParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return RuleFlowLanguageParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RuleFlowLanguageParser._ATN, this);
	}
	// @RuleVersion(0)
	public parse(): ParseContext {
		let _localctx: ParseContext = new ParseContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RuleFlowLanguageParser.RULE_parse);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.K_WORKFLOW:
				{
				this.state = 62;
				this.workflow();
				}
				break;
			case RuleFlowLanguageParser.UNEXPECTED_CHAR:
				{
				this.state = 63;
				this.error();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 66;
			this.match(RuleFlowLanguageParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public error(): ErrorContext {
		let _localctx: ErrorContext = new ErrorContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, RuleFlowLanguageParser.RULE_error);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 68;
			this.match(RuleFlowLanguageParser.UNEXPECTED_CHAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public workflow(): WorkflowContext {
		let _localctx: WorkflowContext = new WorkflowContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RuleFlowLanguageParser.RULE_workflow);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 70;
			this.match(RuleFlowLanguageParser.K_WORKFLOW);
			this.state = 71;
			this.workflow_name();
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 72;
				this.configuration();
				}
				break;
			}
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RuleFlowLanguageParser.K_RULESET) {
				{
				{
				this.state = 75;
				this.rulesets();
				}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 81;
			this.default_clause();
			this.state = 82;
			this.match(RuleFlowLanguageParser.K_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public workflow_name(): Workflow_nameContext {
		let _localctx: Workflow_nameContext = new Workflow_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RuleFlowLanguageParser.RULE_workflow_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this.match(RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public string_literal(): String_literalContext {
		let _localctx: String_literalContext = new String_literalContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RuleFlowLanguageParser.RULE_string_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 86;
			_la = this._input.LA(1);
			if (!(_la === RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS || _la === RuleFlowLanguageParser.SQUOTA_STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rulesets(): RulesetsContext {
		let _localctx: RulesetsContext = new RulesetsContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, RuleFlowLanguageParser.RULE_rulesets);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(RuleFlowLanguageParser.K_RULESET);
			this.state = 89;
			this.name();
			this.state = 91;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 90;
				this.ruleset_condition();
				}
				break;
			}
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 93;
				this.rules();
				}
				}
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS || _la === RuleFlowLanguageParser.SQUOTA_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ruleset_condition(): Ruleset_conditionContext {
		let _localctx: Ruleset_conditionContext = new Ruleset_conditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RuleFlowLanguageParser.RULE_ruleset_condition);
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 98;
				this.expr(0);
				this.state = 99;
				this.match(RuleFlowLanguageParser.K_THEN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 101;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 102;
				this.expr(0);
				this.state = 103;
				this.match(RuleFlowLanguageParser.R_PAREN);
				this.state = 104;
				this.match(RuleFlowLanguageParser.K_THEN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rules(): RulesContext {
		let _localctx: RulesContext = new RulesContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, RuleFlowLanguageParser.RULE_rules);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 108;
			this.name();
			this.state = 110;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 109;
				this.match(RuleFlowLanguageParser.L_PAREN);
				}
				break;
			}
			this.state = 112;
			this.rule_body();
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RuleFlowLanguageParser.R_PAREN) {
				{
				this.state = 113;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rule_body(): Rule_bodyContext {
		let _localctx: Rule_bodyContext = new Rule_bodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, RuleFlowLanguageParser.RULE_rule_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 116;
			this.expr(0);
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.K_THEN:
				{
				{
				this.state = 117;
				this.match(RuleFlowLanguageParser.K_THEN);
				this.state = 119;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
				case 1:
					{
					this.state = 118;
					_la = this._input.LA(1);
					if (!(_la === RuleFlowLanguageParser.K_WITH || _la === RuleFlowLanguageParser.K_AND)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					break;
				}
				this.state = 121;
				_localctx._then_result = this.actions();
				}
				}
				break;
			case RuleFlowLanguageParser.K_RETURN:
				{
				{
				this.state = 122;
				this.match(RuleFlowLanguageParser.K_RETURN);
				this.state = 123;
				_localctx._result = this.return_result();
				this.state = 125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (RuleFlowLanguageParser.K_ACTION - 32)) | (1 << (RuleFlowLanguageParser.K_WITH - 32)) | (1 << (RuleFlowLanguageParser.K_AND - 32)))) !== 0) || _la === RuleFlowLanguageParser.ID) {
					{
					this.state = 124;
					this.actions();
					}
				}

				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let _localctx: NameContext = new NameContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, RuleFlowLanguageParser.RULE_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 129;
			this.string_literal();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public default_clause(): Default_clauseContext {
		let _localctx: Default_clauseContext = new Default_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, RuleFlowLanguageParser.RULE_default_clause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 131;
			this.match(RuleFlowLanguageParser.K_DEFAULT);
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RuleFlowLanguageParser.K_RETURN || _la === RuleFlowLanguageParser.K_THEN) {
				{
				this.state = 132;
				_la = this._input.LA(1);
				if (!(_la === RuleFlowLanguageParser.K_RETURN || _la === RuleFlowLanguageParser.K_THEN)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 135;
			_localctx._default_result = this.return_result();
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (RuleFlowLanguageParser.K_ACTION - 32)) | (1 << (RuleFlowLanguageParser.K_WITH - 32)) | (1 << (RuleFlowLanguageParser.K_AND - 32)))) !== 0) || _la === RuleFlowLanguageParser.ID) {
				{
				this.state = 136;
				this.actions();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public configuration(): ConfigurationContext {
		let _localctx: ConfigurationContext = new ConfigurationContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, RuleFlowLanguageParser.RULE_configuration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RuleFlowLanguageParser.K_EVALUATION_MODE) {
				{
				this.state = 139;
				this.evaluation_mode();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evaluation_mode(): Evaluation_modeContext {
		let _localctx: Evaluation_modeContext = new Evaluation_modeContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, RuleFlowLanguageParser.RULE_evaluation_mode);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 142;
			this.match(RuleFlowLanguageParser.K_EVALUATION_MODE);
			this.state = 143;
			_la = this._input.LA(1);
			if (!(_la === RuleFlowLanguageParser.K_MULTI_MATCH || _la === RuleFlowLanguageParser.K_SINGLE_MATCH)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public return_result(): Return_resultContext {
		let _localctx: Return_resultContext = new Return_resultContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, RuleFlowLanguageParser.RULE_return_result);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 153;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 145;
				this.state_rule();
				}
				break;

			case 2:
				{
				this.state = 146;
				this.validProperty();
				}
				break;

			case 3:
				{
				this.state = 147;
				this.validValue();
				}
				break;

			case 4:
				{
				this.state = 148;
				this.match(RuleFlowLanguageParser.K_EXPR);
				this.state = 149;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 150;
				this.expr(0);
				this.state = 151;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public state_rule(): State_ruleContext {
		let _localctx: State_ruleContext = new State_ruleContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, RuleFlowLanguageParser.RULE_state_rule);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			this.match(RuleFlowLanguageParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actions(): ActionsContext {
		let _localctx: ActionsContext = new ActionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, RuleFlowLanguageParser.RULE_actions);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RuleFlowLanguageParser.K_WITH || _la === RuleFlowLanguageParser.K_AND) {
				{
				this.state = 157;
				_la = this._input.LA(1);
				if (!(_la === RuleFlowLanguageParser.K_WITH || _la === RuleFlowLanguageParser.K_AND)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 160;
			this.action();
			this.state = 165;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 161;
					this.match(RuleFlowLanguageParser.K_AND);
					this.state = 162;
					this.action();
					}
					}
				}
				this.state = 167;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action(): ActionContext {
		let _localctx: ActionContext = new ActionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, RuleFlowLanguageParser.RULE_action);
		let _la: number;
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.K_ACTION:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 168;
				this.match(RuleFlowLanguageParser.K_ACTION);
				this.state = 169;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 170;
				_localctx._param_value = this.string_literal();
				this.state = 173;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.COMMA) {
					{
					this.state = 171;
					this.match(RuleFlowLanguageParser.COMMA);
					this.state = 172;
					this.action_params();
					}
				}

				this.state = 175;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 177;
				_localctx._action_id = this.match(RuleFlowLanguageParser.ID);
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.L_PAREN) {
					{
					this.state = 178;
					this.match(RuleFlowLanguageParser.L_PAREN);
					this.state = 179;
					this.action_params();
					this.state = 180;
					this.match(RuleFlowLanguageParser.R_PAREN);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action_params(): Action_paramsContext {
		let _localctx: Action_paramsContext = new Action_paramsContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, RuleFlowLanguageParser.RULE_action_params);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 186;
			this.match(RuleFlowLanguageParser.L_BRACE);
			this.state = 187;
			this.param_pairs();
			this.state = 188;
			this.match(RuleFlowLanguageParser.R_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_pairs(): Param_pairsContext {
		let _localctx: Param_pairsContext = new Param_pairsContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, RuleFlowLanguageParser.RULE_param_pairs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 190;
			this.param_pair();
			this.state = 195;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RuleFlowLanguageParser.COMMA) {
				{
				{
				this.state = 191;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 192;
				this.param_pair();
				}
				}
				this.state = 197;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param_pair(): Param_pairContext {
		let _localctx: Param_pairContext = new Param_pairContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, RuleFlowLanguageParser.RULE_param_pair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 198;
			_localctx._field_name = this.string_literal();
			this.state = 199;
			this.match(RuleFlowLanguageParser.K_COLON);
			this.state = 200;
			_localctx._field_value = this.actionParamValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 40;
		this.enterRecursionRule(_localctx, 40, RuleFlowLanguageParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				_localctx = new ParenthesisContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 203;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 204;
				this.expr(0);
				this.state = 205;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 2:
				{
				_localctx = new TupleListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 207;
				(_localctx as TupleListContext)._value = this.propertyTuple();
				this.state = 209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.K_NOT) {
					{
					this.state = 208;
					(_localctx as TupleListContext)._not = this.match(RuleFlowLanguageParser.K_NOT);
					}
				}

				this.state = 211;
				(_localctx as TupleListContext)._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (RuleFlowLanguageParser.K_STARTS_WITH - 23)) | (1 << (RuleFlowLanguageParser.K_CONTAINS - 23)) | (1 << (RuleFlowLanguageParser.K_IN - 23)))) !== 0))) {
					(_localctx as TupleListContext)._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 212;
				(_localctx as TupleListContext)._values = this.listElems();
				}
				break;

			case 3:
				{
				_localctx = new DateOperationContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 214;
				this.dateExpr();
				}
				break;

			case 4:
				{
				_localctx = new RegexlikeContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 215;
				(_localctx as RegexlikeContext)._op = this.match(RuleFlowLanguageParser.REGEX_STRIP);
				this.state = 216;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 217;
				(_localctx as RegexlikeContext)._value = this.validProperty();
				this.state = 218;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 219;
				(_localctx as RegexlikeContext)._regex = this.match(RuleFlowLanguageParser.SQUOTA_STRING);
				this.state = 220;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 5:
				{
				_localctx = new UnaryContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 222;
				(_localctx as UnaryContext)._op = this.match(RuleFlowLanguageParser.ABS);
				this.state = 223;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 224;
				(_localctx as UnaryContext)._left = this.expr(0);
				this.state = 225;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 6:
				{
				_localctx = new EvalInListContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 227;
				(_localctx as EvalInListContext)._op = this.match(RuleFlowLanguageParser.K_EVAL_IN_LIST);
				this.state = 228;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 229;
				(_localctx as EvalInListContext)._listName = this.string_literal();
				this.state = 230;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 231;
				(_localctx as EvalInListContext)._predicate = this.expr(0);
				this.state = 232;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 7:
				{
				_localctx = new DateParseExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 234;
				this.dateParse();
				}
				break;

			case 8:
				{
				_localctx = new ValueContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 235;
				this.validValue();
				}
				break;

			case 9:
				{
				_localctx = new PropertyContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 236;
				this.validProperty();
				}
				break;

			case 10:
				{
				_localctx = new StringDistanceContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 237;
				(_localctx as StringDistanceContext)._op = this.match(RuleFlowLanguageParser.STRING_DISTANCE);
				this.state = 238;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 239;
				(_localctx as StringDistanceContext)._left = this.expr(0);
				this.state = 240;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 241;
				(_localctx as StringDistanceContext)._right = this.expr(0);
				this.state = 242;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 11:
				{
				_localctx = new PartialRatioContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 244;
				(_localctx as PartialRatioContext)._op = this.match(RuleFlowLanguageParser.PARTIAL_RATIO);
				this.state = 245;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 246;
				(_localctx as PartialRatioContext)._left = this.expr(0);
				this.state = 247;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 248;
				(_localctx as PartialRatioContext)._right = this.expr(0);
				this.state = 249;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 12:
				{
				_localctx = new TokenSortRatioContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 251;
				(_localctx as TokenSortRatioContext)._op = this.match(RuleFlowLanguageParser.TOKEN_SORT_RATIO);
				this.state = 252;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 253;
				(_localctx as TokenSortRatioContext)._left = this.expr(0);
				this.state = 254;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 255;
				(_localctx as TokenSortRatioContext)._right = this.expr(0);
				this.state = 256;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 13:
				{
				_localctx = new TokenSetRatioContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 258;
				(_localctx as TokenSetRatioContext)._op = this.match(RuleFlowLanguageParser.TOKEN_SET_RATIO);
				this.state = 259;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 260;
				(_localctx as TokenSetRatioContext)._left = this.expr(0);
				this.state = 261;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 262;
				(_localctx as TokenSetRatioContext)._right = this.expr(0);
				this.state = 263;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 14:
				{
				_localctx = new StringSimilarityScoreContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 265;
				(_localctx as StringSimilarityScoreContext)._op = this.match(RuleFlowLanguageParser.STRING_SIMILARITY_SCORE);
				this.state = 266;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 267;
				(_localctx as StringSimilarityScoreContext)._left = this.expr(0);
				this.state = 268;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 269;
				(_localctx as StringSimilarityScoreContext)._right = this.expr(0);
				this.state = 270;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 15:
				{
				_localctx = new GeoOperationContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 272;
				this.geoExpr();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 309;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 307;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
					case 1:
						{
						_localctx = new MathMulContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MathMulContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 275;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 276;
						(_localctx as MathMulContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RuleFlowLanguageParser.MULTIPLY) | (1 << RuleFlowLanguageParser.DIVIDE) | (1 << RuleFlowLanguageParser.MODULO))) !== 0))) {
							(_localctx as MathMulContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 277;
						(_localctx as MathMulContext)._right = this.expr(22);
						}
						break;

					case 2:
						{
						_localctx = new MathAddContext(new ExprContext(_parentctx, _parentState));
						(_localctx as MathAddContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 278;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 279;
						(_localctx as MathAddContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RuleFlowLanguageParser.ADD || _la === RuleFlowLanguageParser.MINUS)) {
							(_localctx as MathAddContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 280;
						(_localctx as MathAddContext)._right = this.expr(21);
						}
						break;

					case 3:
						{
						_localctx = new ComparatorContext(new ExprContext(_parentctx, _parentState));
						(_localctx as ComparatorContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 281;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 282;
						(_localctx as ComparatorContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RuleFlowLanguageParser.LT) | (1 << RuleFlowLanguageParser.LT_EQ) | (1 << RuleFlowLanguageParser.GT) | (1 << RuleFlowLanguageParser.GT_EQ) | (1 << RuleFlowLanguageParser.EQ_IC) | (1 << RuleFlowLanguageParser.EQ) | (1 << RuleFlowLanguageParser.NOT_EQ))) !== 0))) {
							(_localctx as ComparatorContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 283;
						(_localctx as ComparatorContext)._right = this.expr(20);
						}
						break;

					case 4:
						{
						_localctx = new BinaryAndContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinaryAndContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 284;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 285;
						(_localctx as BinaryAndContext)._op = this.match(RuleFlowLanguageParser.K_AND);
						this.state = 286;
						(_localctx as BinaryAndContext)._right = this.expr(12);
						}
						break;

					case 5:
						{
						_localctx = new BinaryOrContext(new ExprContext(_parentctx, _parentState));
						(_localctx as BinaryOrContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 287;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 288;
						(_localctx as BinaryOrContext)._op = this.match(RuleFlowLanguageParser.K_OR);
						this.state = 289;
						(_localctx as BinaryOrContext)._right = this.expr(11);
						}
						break;

					case 6:
						{
						_localctx = new ListContext(new ExprContext(_parentctx, _parentState));
						(_localctx as ListContext)._value = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 290;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 292;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === RuleFlowLanguageParser.K_NOT) {
							{
							this.state = 291;
							(_localctx as ListContext)._not = this.match(RuleFlowLanguageParser.K_NOT);
							}
						}

						this.state = 294;
						(_localctx as ListContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (RuleFlowLanguageParser.K_STARTS_WITH - 23)) | (1 << (RuleFlowLanguageParser.K_CONTAINS - 23)) | (1 << (RuleFlowLanguageParser.K_IN - 23)))) !== 0))) {
							(_localctx as ListContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 295;
						(_localctx as ListContext)._values = this.listElems();
						}
						break;

					case 7:
						{
						_localctx = new AggregationContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AggregationContext)._value = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RuleFlowLanguageParser.RULE_expr);
						this.state = 296;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 297;
						this.match(RuleFlowLanguageParser.DOT);
						this.state = 298;
						(_localctx as AggregationContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (RuleFlowLanguageParser.K_ANY - 48)) | (1 << (RuleFlowLanguageParser.K_NONE - 48)) | (1 << (RuleFlowLanguageParser.K_ALL - 48)) | (1 << (RuleFlowLanguageParser.K_COUNT - 48)) | (1 << (RuleFlowLanguageParser.K_AVERAGE - 48)) | (1 << (RuleFlowLanguageParser.K_DISTINCT - 48)))) !== 0))) {
							(_localctx as AggregationContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 305;
						this._errHandler.sync(this);
						switch (this._input.LA(1)) {
						case RuleFlowLanguageParser.L_BRACE:
							{
							this.state = 299;
							this.match(RuleFlowLanguageParser.L_BRACE);
							this.state = 300;
							(_localctx as AggregationContext)._predicate = this.expr(0);
							this.state = 301;
							this.match(RuleFlowLanguageParser.R_BRACE);
							}
							break;
						case RuleFlowLanguageParser.L_PAREN:
							{
							this.state = 303;
							this.match(RuleFlowLanguageParser.L_PAREN);
							this.state = 304;
							this.match(RuleFlowLanguageParser.R_PAREN);
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						}
						break;
					}
					}
				}
				this.state = 311;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public geoExpr(): GeoExprContext {
		let _localctx: GeoExprContext = new GeoExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, RuleFlowLanguageParser.RULE_geoExpr);
		let _la: number;
		try {
			this.state = 359;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				_localctx = new GeohashEncodeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 312;
				this.match(RuleFlowLanguageParser.GEOHASH_ENCODE);
				this.state = 313;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 314;
				(_localctx as GeohashEncodeContext)._lat = this.expr(0);
				this.state = 315;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 316;
				(_localctx as GeohashEncodeContext)._lon = this.expr(0);
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.COMMA) {
					{
					this.state = 317;
					this.match(RuleFlowLanguageParser.COMMA);
					this.state = 318;
					(_localctx as GeohashEncodeContext)._precision = this.expr(0);
					}
				}

				this.state = 321;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 2:
				_localctx = new GeohashDecodeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 323;
				this.match(RuleFlowLanguageParser.GEOHASH_DECODE);
				this.state = 324;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 325;
				(_localctx as GeohashDecodeContext)._geohash = this.expr(0);
				this.state = 326;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 3:
				_localctx = new DistanceContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 328;
				this.match(RuleFlowLanguageParser.DISTANCE);
				this.state = 329;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 330;
				(_localctx as DistanceContext)._lat1 = this.expr(0);
				this.state = 331;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 332;
				(_localctx as DistanceContext)._lon1 = this.expr(0);
				this.state = 333;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 334;
				(_localctx as DistanceContext)._lat2 = this.expr(0);
				this.state = 335;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 336;
				(_localctx as DistanceContext)._lon2 = this.expr(0);
				this.state = 337;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 4:
				_localctx = new DistanceGeohashContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 339;
				this.match(RuleFlowLanguageParser.DISTANCE);
				this.state = 340;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 341;
				(_localctx as DistanceGeohashContext)._geohash1 = this.expr(0);
				this.state = 342;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 343;
				(_localctx as DistanceGeohashContext)._geohash2 = this.expr(0);
				this.state = 344;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;

			case 5:
				_localctx = new WithinRadiusContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 346;
				this.match(RuleFlowLanguageParser.WITHIN_RADIUS);
				this.state = 347;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 348;
				(_localctx as WithinRadiusContext)._lat1 = this.expr(0);
				this.state = 349;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 350;
				(_localctx as WithinRadiusContext)._lon1 = this.expr(0);
				this.state = 351;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 352;
				(_localctx as WithinRadiusContext)._lat2 = this.expr(0);
				this.state = 353;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 354;
				(_localctx as WithinRadiusContext)._lon2 = this.expr(0);
				this.state = 355;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 356;
				(_localctx as WithinRadiusContext)._radius = this.expr(0);
				this.state = 357;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dateExpr(): DateExprContext {
		let _localctx: DateExprContext = new DateExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, RuleFlowLanguageParser.RULE_dateExpr);
		let _la: number;
		try {
			this.state = 396;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.DATE_DIFF:
				_localctx = new DateDiffContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 361;
				this.match(RuleFlowLanguageParser.DATE_DIFF);
				this.state = 362;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 363;
				(_localctx as DateDiffContext)._left = this.dateValue();
				this.state = 364;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 365;
				(_localctx as DateDiffContext)._right = this.dateValue();
				this.state = 366;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 367;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RuleFlowLanguageParser.MINUTE) | (1 << RuleFlowLanguageParser.HOUR) | (1 << RuleFlowLanguageParser.DAY))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 368;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.DAY_OF_WEEK:
				_localctx = new DayOfWeekContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 370;
				(_localctx as DayOfWeekContext)._op = this.match(RuleFlowLanguageParser.DAY_OF_WEEK);
				this.state = 371;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 372;
				(_localctx as DayOfWeekContext)._left = this.dateValue();
				this.state = 373;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.K_NOW:
				_localctx = new NowContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 375;
				(_localctx as NowContext)._op = this.match(RuleFlowLanguageParser.K_NOW);
				this.state = 376;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 377;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.K_DATE_ADD:
				_localctx = new DateAddContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 378;
				(_localctx as DateAddContext)._op = this.match(RuleFlowLanguageParser.K_DATE_ADD);
				this.state = 379;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 380;
				(_localctx as DateAddContext)._date = this.dateValue();
				this.state = 381;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 382;
				(_localctx as DateAddContext)._amount = this.expr(0);
				this.state = 383;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 384;
				(_localctx as DateAddContext)._unit = this.timeUnit();
				this.state = 385;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.K_DATE_SUBTRACT:
				_localctx = new DateSubtractContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 387;
				(_localctx as DateSubtractContext)._op = this.match(RuleFlowLanguageParser.K_DATE_SUBTRACT);
				this.state = 388;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 389;
				(_localctx as DateSubtractContext)._date = this.dateValue();
				this.state = 390;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 391;
				(_localctx as DateSubtractContext)._amount = this.expr(0);
				this.state = 392;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 393;
				(_localctx as DateSubtractContext)._unit = this.timeUnit();
				this.state = 394;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propertyTuple(): PropertyTupleContext {
		let _localctx: PropertyTupleContext = new PropertyTupleContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, RuleFlowLanguageParser.RULE_propertyTuple);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 398;
			this.match(RuleFlowLanguageParser.L_PAREN);
			this.state = 399;
			this.validProperty();
			this.state = 404;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RuleFlowLanguageParser.COMMA) {
				{
				{
				this.state = 400;
				this.match(RuleFlowLanguageParser.COMMA);
				this.state = 401;
				this.validProperty();
				}
				}
				this.state = 406;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 407;
			this.match(RuleFlowLanguageParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listElems(): ListElemsContext {
		let _localctx: ListElemsContext = new ListElemsContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, RuleFlowLanguageParser.RULE_listElems);
		let _la: number;
		try {
			let _alt: number;
			this.state = 453;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.K_LIST:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 409;
				_localctx._storedList = this.match(RuleFlowLanguageParser.K_LIST);
				this.state = 410;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 411;
				this.string_literal();
				this.state = 412;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS:
			case RuleFlowLanguageParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 414;
				_localctx._literalList = this.string_literal();
				this.state = 419;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 31, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 415;
						this.match(RuleFlowLanguageParser.COMMA);
						this.state = 416;
						this.string_literal();
						}
						}
					}
					this.state = 421;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 31, this._ctx);
				}
				}
				break;
			case RuleFlowLanguageParser.L_PAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 422;
				_localctx._literalTupleList = this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 423;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 424;
				this.string_literal();
				this.state = 429;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === RuleFlowLanguageParser.COMMA) {
					{
					{
					this.state = 425;
					this.match(RuleFlowLanguageParser.COMMA);
					this.state = 426;
					this.string_literal();
					}
					}
					this.state = 431;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 432;
				this.match(RuleFlowLanguageParser.R_PAREN);
				this.state = 447;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === RuleFlowLanguageParser.COMMA) {
					{
					{
					this.state = 433;
					this.match(RuleFlowLanguageParser.COMMA);
					this.state = 434;
					this.match(RuleFlowLanguageParser.L_PAREN);
					this.state = 435;
					this.string_literal();
					this.state = 440;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === RuleFlowLanguageParser.COMMA) {
						{
						{
						this.state = 436;
						this.match(RuleFlowLanguageParser.COMMA);
						this.state = 437;
						this.string_literal();
						}
						}
						this.state = 442;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 443;
					this.match(RuleFlowLanguageParser.R_PAREN);
					}
					}
					this.state = 449;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 450;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.DOT:
			case RuleFlowLanguageParser.K_ELEM:
			case RuleFlowLanguageParser.ID:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 452;
				this.validProperty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public validValue(): ValidValueContext {
		let _localctx: ValidValueContext = new ValidValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, RuleFlowLanguageParser.RULE_validValue);
		try {
			this.state = 460;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS:
			case RuleFlowLanguageParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 455;
				_localctx._string = this.string_literal();
				}
				break;
			case RuleFlowLanguageParser.NUMERIC_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 456;
				_localctx._number = this.match(RuleFlowLanguageParser.NUMERIC_LITERAL);
				}
				break;
			case RuleFlowLanguageParser.BOOLEAN_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 457;
				_localctx._booleanLiteral = this.match(RuleFlowLanguageParser.BOOLEAN_LITERAL);
				}
				break;
			case RuleFlowLanguageParser.K_NULL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 458;
				_localctx._nullValue = this.match(RuleFlowLanguageParser.K_NULL);
				}
				break;
			case RuleFlowLanguageParser.CURRENT_DATE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 459;
				_localctx._currentDate = this.match(RuleFlowLanguageParser.CURRENT_DATE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public actionParamValue(): ActionParamValueContext {
		let _localctx: ActionParamValueContext = new ActionParamValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, RuleFlowLanguageParser.RULE_actionParamValue);
		try {
			this.state = 464;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS:
			case RuleFlowLanguageParser.CURRENT_DATE:
			case RuleFlowLanguageParser.K_NULL:
			case RuleFlowLanguageParser.NUMERIC_LITERAL:
			case RuleFlowLanguageParser.BOOLEAN_LITERAL:
			case RuleFlowLanguageParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 462;
				this.validValue();
				}
				break;
			case RuleFlowLanguageParser.DOT:
			case RuleFlowLanguageParser.K_ELEM:
			case RuleFlowLanguageParser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 463;
				this.validProperty();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dateParse(): DateParseContext {
		let _localctx: DateParseContext = new DateParseContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, RuleFlowLanguageParser.RULE_dateParse);
		try {
			this.state = 476;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.K_DATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 466;
				this.match(RuleFlowLanguageParser.K_DATE);
				this.state = 467;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 468;
				this.dateValue();
				this.state = 469;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			case RuleFlowLanguageParser.K_DATETIME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 471;
				this.match(RuleFlowLanguageParser.K_DATETIME);
				this.state = 472;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 473;
				this.dateValue();
				this.state = 474;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dateValue(): DateValueContext {
		let _localctx: DateValueContext = new DateValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, RuleFlowLanguageParser.RULE_dateValue);
		try {
			this.state = 483;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS:
			case RuleFlowLanguageParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 478;
				this.string_literal();
				}
				break;
			case RuleFlowLanguageParser.DOT:
			case RuleFlowLanguageParser.K_ELEM:
			case RuleFlowLanguageParser.ID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 479;
				this.validProperty();
				}
				break;
			case RuleFlowLanguageParser.K_NOW:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 480;
				this.match(RuleFlowLanguageParser.K_NOW);
				this.state = 481;
				this.match(RuleFlowLanguageParser.L_PAREN);
				this.state = 482;
				this.match(RuleFlowLanguageParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public timeUnit(): TimeUnitContext {
		let _localctx: TimeUnitContext = new TimeUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, RuleFlowLanguageParser.RULE_timeUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 485;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RuleFlowLanguageParser.MINUTE) | (1 << RuleFlowLanguageParser.HOUR) | (1 << RuleFlowLanguageParser.DAY))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public validProperty(): ValidPropertyContext {
		let _localctx: ValidPropertyContext = new ValidPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, RuleFlowLanguageParser.RULE_validProperty);
		let _la: number;
		try {
			let _alt: number;
			this.state = 501;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 488;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.DOT) {
					{
					this.state = 487;
					_localctx._root = this.match(RuleFlowLanguageParser.DOT);
					}
				}

				this.state = 490;
				_localctx._property = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === RuleFlowLanguageParser.K_ELEM || _la === RuleFlowLanguageParser.ID)) {
					_localctx._property = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === RuleFlowLanguageParser.DOT) {
					{
					this.state = 491;
					_localctx._root = this.match(RuleFlowLanguageParser.DOT);
					}
				}

				this.state = 494;
				_localctx._nestedProperty = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === RuleFlowLanguageParser.K_ELEM || _la === RuleFlowLanguageParser.ID)) {
					_localctx._nestedProperty = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 497;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 495;
						this.match(RuleFlowLanguageParser.DOT);
						this.state = 496;
						_la = this._input.LA(1);
						if (!(_la === RuleFlowLanguageParser.K_ELEM || _la === RuleFlowLanguageParser.ID)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 499;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 20:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 21);

		case 1:
			return this.precpred(this._ctx, 20);

		case 2:
			return this.precpred(this._ctx, 19);

		case 3:
			return this.precpred(this._ctx, 11);

		case 4:
			return this.precpred(this._ctx, 10);

		case 5:
			return this.precpred(this._ctx, 18);

		case 6:
			return this.precpred(this._ctx, 16);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03T\u01FA\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x03\x02\x03\x02\x05\x02" +
		"C\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x05\x04" +
		"L\n\x04\x03\x04\x07\x04O\n\x04\f\x04\x0E\x04R\v\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x05\x07^" +
		"\n\x07\x03\x07\x06\x07a\n\x07\r\x07\x0E\x07b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x03\b\x05\bm\n\b\x03\t\x03\t\x05\tq\n\t\x03\t\x03\t\x05" +
		"\tu\n\t\x03\n\x03\n\x03\n\x05\nz\n\n\x03\n\x03\n\x03\n\x03\n\x05\n\x80" +
		"\n\n\x05\n\x82\n\n\x03\v\x03\v\x03\f\x03\f\x05\f\x88\n\f\x03\f\x03\f\x05" +
		"\f\x8C\n\f\x03\r\x05\r\x8F\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\x9C\n\x0F\x03" +
		"\x10\x03\x10\x03\x11\x05\x11\xA1\n\x11\x03\x11\x03\x11\x03\x11\x07\x11" +
		"\xA6\n\x11\f\x11\x0E\x11\xA9\v\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03" +
		"\x12\x05\x12\xB0\n\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x05\x12\xB9\n\x12\x05\x12\xBB\n\x12\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x03\x14\x07\x14\xC4\n\x14\f\x14\x0E\x14\xC7\v\x14" +
		"\x03\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x05\x16\xD4\n\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0114\n\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0127\n\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x05\x16\u0134\n\x16\x07\x16\u0136\n\x16\f\x16\x0E\x16\u0139\v\x16" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\u0142" +
		"\n\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x05\x17\u016A\n\x17\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\u018F\n\x18\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x07\x19\u0195\n\x19\f\x19\x0E\x19\u0198\v\x19\x03\x19" +
		"\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x07\x1A\u01A4\n\x1A\f\x1A\x0E\x1A\u01A7\v\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x07\x1A\u01AE\n\x1A\f\x1A\x0E\x1A\u01B1\v\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u01B9\n\x1A\f\x1A\x0E" +
		"\x1A\u01BC\v\x1A\x03\x1A\x03\x1A\x07\x1A\u01C0\n\x1A\f\x1A\x0E\x1A\u01C3" +
		"\v\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u01C8\n\x1A\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1B\x05\x1B\u01CF\n\x1B\x03\x1C\x03\x1C\x05\x1C\u01D3" +
		"\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x05\x1D\u01DF\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03" +
		"\x1E\x05\x1E\u01E6\n\x1E\x03\x1F\x03\x1F\x03 \x05 \u01EB\n \x03 \x03 " +
		"\x05 \u01EF\n \x03 \x03 \x03 \x06 \u01F4\n \r \x0E \u01F5\x05 \u01F8\n" +
		" \x03 \x03\xA7\x02\x03*!\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 " +
		"\x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"<\x02>\x02\x02\r\x04\x02\x03\x03OO\x04\x02((++\x03\x02%&\x03\x02<=\x05" +
		"\x02\x19\x19--11\x04\x02\b\t\x18\x18\x03\x02\x06\x07\x03\x02\n\x10\x03" +
		"\x0227\x03\x02\x11\x13\x04\x02\x1B\x1BPP\x02\u0226\x02B\x03\x02\x02\x02" +
		"\x04F\x03\x02\x02\x02\x06H\x03\x02\x02\x02\bV\x03\x02\x02\x02\nX\x03\x02" +
		"\x02\x02\fZ\x03\x02\x02\x02\x0El\x03\x02\x02\x02\x10n\x03\x02\x02\x02" +
		"\x12v\x03\x02\x02\x02\x14\x83\x03\x02\x02\x02\x16\x85\x03\x02\x02\x02" +
		"\x18\x8E\x03\x02\x02\x02\x1A\x90\x03\x02\x02\x02\x1C\x9B\x03\x02\x02\x02" +
		"\x1E\x9D\x03\x02\x02\x02 \xA0\x03\x02\x02\x02\"\xBA\x03\x02\x02\x02$\xBC" +
		"\x03\x02\x02\x02&\xC0\x03\x02\x02\x02(\xC8\x03\x02\x02\x02*\u0113\x03" +
		"\x02\x02\x02,\u0169\x03\x02\x02\x02.\u018E\x03\x02\x02\x020\u0190\x03" +
		"\x02\x02\x022\u01C7\x03\x02\x02\x024\u01CE\x03\x02\x02\x026\u01D2\x03" +
		"\x02\x02\x028\u01DE\x03\x02\x02\x02:\u01E5\x03\x02\x02\x02<\u01E7\x03" +
		"\x02\x02\x02>\u01F7\x03\x02\x02\x02@C\x05\x06\x04\x02AC\x05\x04\x03\x02" +
		"B@\x03\x02\x02\x02BA\x03\x02\x02\x02CD\x03\x02\x02\x02DE\x07\x02\x02\x03" +
		"E\x03\x03\x02\x02\x02FG\x07T\x02\x02G\x05\x03\x02\x02\x02HI\x07#\x02\x02" +
		"IK\x05\b\x05\x02JL\x05\x18\r\x02KJ\x03\x02\x02\x02KL\x03\x02\x02\x02L" +
		"P\x03\x02\x02\x02MO\x05\f\x07\x02NM\x03\x02\x02\x02OR\x03\x02\x02\x02" +
		"PN\x03\x02\x02\x02PQ\x03\x02\x02\x02QS\x03\x02\x02\x02RP\x03\x02\x02\x02" +
		"ST\x05\x16\f\x02TU\x07)\x02\x02U\x07\x03\x02\x02\x02VW\x07\x03\x02\x02" +
		"W\t\x03\x02\x02\x02XY\t\x02\x02\x02Y\v\x03\x02\x02\x02Z[\x07$\x02\x02" +
		"[]\x05\x14\v\x02\\^\x05\x0E\b\x02]\\\x03\x02\x02\x02]^\x03\x02\x02\x02" +
		"^`\x03\x02\x02\x02_a\x05\x10\t\x02`_\x03\x02\x02\x02ab\x03\x02\x02\x02" +
		"b`\x03\x02\x02\x02bc\x03\x02\x02\x02c\r\x03\x02\x02\x02de\x05*\x16\x02" +
		"ef\x07&\x02\x02fm\x03\x02\x02\x02gh\x07\x1F\x02\x02hi\x05*\x16\x02ij\x07" +
		" \x02\x02jk\x07&\x02\x02km\x03\x02\x02\x02ld\x03\x02\x02\x02lg\x03\x02" +
		"\x02\x02m\x0F\x03\x02\x02\x02np\x05\x14\v\x02oq\x07\x1F\x02\x02po\x03" +
		"\x02\x02\x02pq\x03\x02\x02\x02qr\x03\x02\x02\x02rt\x05\x12\n\x02su\x07" +
		" \x02\x02ts\x03\x02\x02\x02tu\x03\x02\x02\x02u\x11\x03\x02\x02\x02v\x81" +
		"\x05*\x16\x02wy\x07&\x02\x02xz\t\x03\x02\x02yx\x03\x02\x02\x02yz\x03\x02" +
		"\x02\x02z{\x03\x02\x02\x02{\x82\x05 \x11\x02|}\x07%\x02\x02}\x7F\x05\x1C" +
		"\x0F\x02~\x80\x05 \x11\x02\x7F~\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02" +
		"\x80\x82\x03\x02\x02\x02\x81w\x03\x02\x02\x02\x81|\x03\x02\x02\x02\x82" +
		"\x13\x03\x02\x02\x02\x83\x84\x05\n\x06\x02\x84\x15\x03\x02\x02\x02\x85" +
		"\x87\x07\'\x02\x02\x86\x88\t\x04\x02\x02\x87\x86\x03\x02\x02\x02\x87\x88" +
		"\x03\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\x8B\x05\x1C\x0F\x02\x8A\x8C" +
		"\x05 \x11\x02\x8B\x8A\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C\x17" +
		"\x03\x02\x02\x02\x8D\x8F\x05\x1A\x0E\x02\x8E\x8D\x03\x02\x02\x02\x8E\x8F" +
		"\x03\x02\x02\x02\x8F\x19\x03\x02\x02\x02\x90\x91\x07;\x02\x02\x91\x92" +
		"\t\x05\x02\x02\x92\x1B\x03\x02\x02\x02\x93\x9C\x05\x1E\x10\x02\x94\x9C" +
		"\x05> \x02\x95\x9C\x054\x1B\x02\x96\x97\x07:\x02\x02\x97\x98\x07\x1F\x02" +
		"\x02\x98\x99\x05*\x16\x02\x99\x9A\x07 \x02\x02\x9A\x9C\x03\x02\x02\x02" +
		"\x9B\x93\x03\x02\x02\x02\x9B\x94\x03\x02\x02\x02\x9B\x95\x03\x02\x02\x02" +
		"\x9B\x96\x03\x02\x02\x02\x9C\x1D\x03\x02\x02\x02\x9D\x9E\x07P\x02\x02" +
		"\x9E\x1F\x03\x02\x02\x02\x9F\xA1\t\x03\x02\x02\xA0\x9F\x03\x02\x02\x02" +
		"\xA0\xA1\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA7\x05\"\x12\x02" +
		"\xA3\xA4\x07+\x02\x02\xA4\xA6\x05\"\x12\x02\xA5\xA3\x03\x02\x02\x02\xA6" +
		"\xA9\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA7\xA5\x03\x02\x02\x02\xA8" +
		"!\x03\x02\x02\x02\xA9\xA7\x03\x02\x02\x02\xAA\xAB\x07\"\x02\x02\xAB\xAC" +
		"\x07\x1F\x02\x02\xAC\xAF\x05\n\x06\x02\xAD\xAE\x07\x05\x02\x02\xAE\xB0" +
		"\x05$\x13\x02\xAF\xAD\x03\x02\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB1" +
		"\x03\x02\x02\x02\xB1\xB2\x07 \x02\x02\xB2\xBB\x03\x02\x02\x02\xB3\xB8" +
		"\x07P\x02\x02\xB4\xB5\x07\x1F\x02\x02\xB5\xB6\x05$\x13\x02\xB6\xB7\x07" +
		" \x02\x02\xB7\xB9\x03\x02\x02\x02\xB8\xB4\x03\x02\x02\x02\xB8\xB9\x03" +
		"\x02\x02\x02\xB9\xBB\x03\x02\x02\x02\xBA\xAA\x03\x02\x02\x02\xBA\xB3\x03" +
		"\x02\x02\x02\xBB#\x03\x02\x02\x02\xBC\xBD\x07\x1D\x02\x02\xBD\xBE\x05" +
		"&\x14\x02\xBE\xBF\x07\x1E\x02\x02\xBF%\x03\x02\x02\x02\xC0\xC5\x05(\x15" +
		"\x02\xC1\xC2\x07\x05\x02\x02\xC2\xC4\x05(\x15\x02\xC3\xC1\x03\x02\x02" +
		"\x02\xC4\xC7\x03\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC5\xC6\x03\x02\x02" +
		"\x02\xC6\'\x03\x02\x02\x02\xC7\xC5\x03\x02\x02\x02\xC8\xC9\x05\n\x06\x02" +
		"\xC9\xCA\x07!\x02\x02\xCA\xCB\x056\x1C\x02\xCB)\x03\x02\x02\x02\xCC\xCD" +
		"\b\x16\x01\x02\xCD\xCE\x07\x1F\x02\x02\xCE\xCF\x05*\x16\x02\xCF\xD0\x07" +
		" \x02\x02\xD0\u0114\x03\x02\x02\x02\xD1\xD3\x050\x19\x02\xD2\xD4\x07/" +
		"\x02\x02\xD3\xD2\x03\x02\x02\x02\xD3\xD4\x03\x02\x02\x02\xD4\xD5\x03\x02" +
		"\x02\x02\xD5\xD6\t\x06\x02\x02\xD6\xD7\x052\x1A\x02\xD7\u0114\x03\x02" +
		"\x02\x02\xD8\u0114\x05.\x18\x02\xD9\xDA\x07\x17\x02\x02\xDA\xDB\x07\x1F" +
		"\x02\x02\xDB\xDC\x05> \x02\xDC\xDD\x07\x05\x02\x02\xDD\xDE\x07O\x02\x02" +
		"\xDE\xDF\x07 \x02\x02\xDF\u0114\x03\x02\x02\x02\xE0\xE1\x07\x16\x02\x02" +
		"\xE1\xE2\x07\x1F\x02\x02\xE2\xE3\x05*\x16\x02\xE3\xE4\x07 \x02\x02\xE4" +
		"\u0114\x03\x02\x02\x02\xE5\xE6\x07\x1C\x02\x02\xE6\xE7\x07\x1F\x02\x02" +
		"\xE7\xE8\x05\n\x06\x02\xE8\xE9\x07\x05\x02\x02\xE9\xEA\x05*\x16\x02\xEA" +
		"\xEB\x07 \x02\x02\xEB\u0114\x03\x02\x02\x02\xEC\u0114\x058\x1D\x02\xED" +
		"\u0114\x054\x1B\x02\xEE\u0114\x05> \x02\xEF\xF0\x07C\x02\x02\xF0\xF1\x07" +
		"\x1F\x02\x02\xF1\xF2\x05*\x16\x02\xF2\xF3\x07\x05\x02\x02\xF3\xF4\x05" +
		"*\x16\x02\xF4\xF5\x07 \x02\x02\xF5\u0114\x03\x02\x02\x02\xF6\xF7\x07D" +
		"\x02\x02\xF7\xF8\x07\x1F\x02\x02\xF8\xF9\x05*\x16\x02\xF9\xFA\x07\x05" +
		"\x02\x02\xFA\xFB\x05*\x16\x02\xFB\xFC\x07 \x02\x02\xFC\u0114\x03\x02\x02" +
		"\x02\xFD\xFE\x07E\x02\x02\xFE\xFF\x07\x1F\x02\x02\xFF\u0100\x05*\x16\x02" +
		"\u0100\u0101\x07\x05\x02\x02\u0101\u0102\x05*\x16\x02\u0102\u0103\x07" +
		" \x02\x02\u0103\u0114\x03\x02\x02\x02\u0104\u0105\x07F\x02\x02\u0105\u0106" +
		"\x07\x1F\x02\x02\u0106\u0107\x05*\x16\x02\u0107\u0108\x07\x05\x02\x02" +
		"\u0108\u0109\x05*\x16\x02\u0109\u010A\x07 \x02\x02\u010A\u0114\x03\x02" +
		"\x02\x02\u010B\u010C\x07G\x02\x02\u010C\u010D\x07\x1F\x02\x02\u010D\u010E" +
		"\x05*\x16\x02\u010E\u010F\x07\x05\x02\x02\u010F\u0110\x05*\x16\x02\u0110" +
		"\u0111\x07 \x02\x02\u0111\u0114\x03\x02\x02\x02\u0112\u0114\x05,\x17\x02" +
		"\u0113\xCC\x03\x02\x02\x02\u0113\xD1\x03\x02\x02\x02\u0113\xD8\x03\x02" +
		"\x02\x02\u0113\xD9\x03\x02\x02\x02\u0113\xE0\x03\x02\x02\x02\u0113\xE5" +
		"\x03\x02\x02\x02\u0113\xEC\x03\x02\x02\x02\u0113\xED\x03\x02\x02\x02\u0113" +
		"\xEE\x03\x02\x02\x02\u0113\xEF\x03\x02\x02\x02\u0113\xF6\x03\x02\x02\x02" +
		"\u0113\xFD\x03\x02\x02\x02\u0113\u0104\x03\x02\x02\x02\u0113\u010B\x03" +
		"\x02\x02\x02\u0113\u0112\x03\x02\x02\x02\u0114\u0137\x03\x02\x02\x02\u0115" +
		"\u0116\f\x17\x02\x02\u0116\u0117\t\x07\x02\x02\u0117\u0136\x05*\x16\x18" +
		"\u0118\u0119\f\x16\x02\x02\u0119\u011A\t\b\x02\x02\u011A\u0136\x05*\x16" +
		"\x17\u011B\u011C\f\x15\x02\x02\u011C\u011D\t\t\x02\x02\u011D\u0136\x05" +
		"*\x16\x16\u011E\u011F\f\r\x02\x02\u011F\u0120\x07+\x02\x02\u0120\u0136" +
		"\x05*\x16\x0E\u0121\u0122\f\f\x02\x02\u0122\u0123\x07,\x02\x02\u0123\u0136" +
		"\x05*\x16\r\u0124\u0126\f\x14\x02\x02\u0125\u0127\x07/\x02\x02\u0126\u0125" +
		"\x03\x02\x02\x02\u0126\u0127\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02" +
		"\u0128\u0129\t\x06\x02\x02\u0129\u0136\x052\x1A\x02\u012A\u012B\f\x12" +
		"\x02\x02\u012B\u012C\x07\x04\x02\x02\u012C\u0133\t\n\x02\x02\u012D\u012E" +
		"\x07\x1D\x02\x02\u012E\u012F\x05*\x16\x02\u012F\u0130\x07\x1E\x02\x02" +
		"\u0130\u0134\x03\x02\x02\x02\u0131\u0132\x07\x1F\x02\x02\u0132\u0134\x07" +
		" \x02\x02\u0133\u012D\x03\x02\x02\x02\u0133\u0131\x03\x02\x02\x02\u0134" +
		"\u0136\x03\x02\x02\x02\u0135\u0115\x03\x02\x02\x02\u0135\u0118\x03\x02" +
		"\x02\x02\u0135\u011B\x03\x02\x02\x02\u0135\u011E\x03\x02\x02\x02\u0135" +
		"\u0121\x03\x02\x02\x02\u0135\u0124\x03\x02\x02\x02\u0135\u012A\x03\x02" +
		"\x02\x02\u0136\u0139\x03\x02\x02\x02\u0137\u0135\x03\x02\x02\x02\u0137" +
		"\u0138\x03\x02\x02\x02\u0138+\x03\x02\x02\x02\u0139\u0137\x03\x02\x02" +
		"\x02\u013A\u013B\x07H\x02\x02\u013B\u013C\x07\x1F\x02\x02\u013C\u013D" +
		"\x05*\x16\x02\u013D\u013E\x07\x05\x02\x02\u013E\u0141\x05*\x16\x02\u013F" +
		"\u0140\x07\x05\x02\x02\u0140\u0142\x05*\x16\x02\u0141\u013F\x03\x02\x02" +
		"\x02\u0141\u0142\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0144" +
		"\x07 \x02\x02\u0144\u016A\x03\x02\x02\x02\u0145\u0146\x07I\x02\x02\u0146" +
		"\u0147\x07\x1F\x02\x02\u0147\u0148\x05*\x16\x02\u0148\u0149\x07 \x02\x02" +
		"\u0149\u016A\x03\x02\x02\x02\u014A\u014B\x07J\x02\x02\u014B\u014C\x07" +
		"\x1F\x02\x02\u014C\u014D\x05*\x16\x02\u014D\u014E\x07\x05\x02\x02\u014E" +
		"\u014F\x05*\x16\x02\u014F\u0150\x07\x05\x02\x02\u0150\u0151\x05*\x16\x02" +
		"\u0151\u0152\x07\x05\x02\x02\u0152\u0153\x05*\x16\x02\u0153\u0154\x07" +
		" \x02\x02\u0154\u016A\x03\x02\x02\x02\u0155\u0156\x07J\x02\x02\u0156\u0157" +
		"\x07\x1F\x02\x02\u0157\u0158\x05*\x16\x02\u0158\u0159\x07\x05\x02\x02" +
		"\u0159\u015A\x05*\x16\x02\u015A\u015B\x07 \x02\x02\u015B\u016A\x03\x02" +
		"\x02\x02\u015C\u015D\x07K\x02\x02\u015D\u015E\x07\x1F\x02\x02\u015E\u015F" +
		"\x05*\x16\x02\u015F\u0160\x07\x05\x02\x02\u0160\u0161\x05*\x16\x02\u0161" +
		"\u0162\x07\x05\x02\x02\u0162\u0163\x05*\x16\x02\u0163\u0164\x07\x05\x02" +
		"\x02\u0164\u0165\x05*\x16\x02\u0165\u0166\x07\x05\x02\x02\u0166\u0167" +
		"\x05*\x16\x02\u0167\u0168\x07 \x02\x02\u0168\u016A\x03\x02\x02\x02\u0169" +
		"\u013A\x03\x02\x02\x02\u0169\u0145\x03\x02\x02\x02\u0169\u014A\x03\x02" +
		"\x02\x02\u0169\u0155\x03\x02\x02\x02\u0169\u015C\x03\x02\x02\x02\u016A" +
		"-\x03\x02\x02\x02\u016B\u016C\x07\x15\x02\x02\u016C\u016D\x07\x1F\x02" +
		"\x02\u016D\u016E\x05:\x1E\x02\u016E\u016F\x07\x05\x02\x02\u016F\u0170" +
		"\x05:\x1E\x02\u0170\u0171\x07\x05\x02\x02\u0171\u0172\t\v\x02\x02\u0172" +
		"\u0173\x07 \x02\x02\u0173\u018F\x03\x02\x02\x02\u0174\u0175\x079\x02\x02" +
		"\u0175\u0176\x07\x1F\x02\x02\u0176\u0177\x05:\x1E\x02\u0177\u0178\x07" +
		" \x02\x02\u0178\u018F\x03\x02\x02\x02\u0179\u017A\x07>\x02\x02\u017A\u017B" +
		"\x07\x1F\x02\x02\u017B\u018F\x07 \x02\x02\u017C\u017D\x07A\x02\x02\u017D" +
		"\u017E\x07\x1F\x02\x02\u017E\u017F\x05:\x1E\x02\u017F\u0180\x07\x05\x02" +
		"\x02\u0180\u0181\x05*\x16\x02\u0181\u0182\x07\x05\x02\x02\u0182\u0183" +
		"\x05<\x1F\x02\u0183\u0184\x07 \x02\x02\u0184\u018F\x03\x02\x02\x02\u0185" +
		"\u0186\x07B\x02\x02\u0186\u0187\x07\x1F\x02\x02\u0187\u0188\x05:\x1E\x02" +
		"\u0188\u0189\x07\x05\x02\x02\u0189\u018A\x05*\x16\x02\u018A\u018B\x07" +
		"\x05\x02\x02\u018B\u018C\x05<\x1F\x02\u018C\u018D\x07 \x02\x02\u018D\u018F" +
		"\x03\x02\x02\x02\u018E\u016B\x03\x02\x02\x02\u018E\u0174\x03\x02\x02\x02" +
		"\u018E\u0179\x03\x02\x02\x02\u018E\u017C\x03\x02\x02\x02\u018E\u0185\x03" +
		"\x02\x02\x02\u018F/\x03\x02\x02\x02\u0190\u0191\x07\x1F\x02\x02\u0191" +
		"\u0196\x05> \x02\u0192\u0193\x07\x05\x02\x02\u0193\u0195\x05> \x02\u0194" +
		"\u0192\x03\x02\x02\x02\u0195\u0198\x03\x02\x02\x02\u0196\u0194\x03\x02" +
		"\x02\x02\u0196\u0197\x03\x02\x02\x02\u0197\u0199\x03\x02\x02\x02\u0198" +
		"\u0196\x03\x02\x02\x02\u0199\u019A\x07 \x02\x02\u019A1\x03\x02\x02\x02" +
		"\u019B\u019C\x07\x1A\x02\x02\u019C\u019D\x07\x1F\x02\x02\u019D\u019E\x05" +
		"\n\x06\x02\u019E\u019F\x07 \x02\x02\u019F\u01C8\x03\x02\x02\x02\u01A0" +
		"\u01A5\x05\n\x06\x02\u01A1\u01A2\x07\x05\x02\x02\u01A2\u01A4\x05\n\x06" +
		"\x02\u01A3\u01A1\x03\x02\x02\x02\u01A4\u01A7\x03\x02\x02\x02\u01A5\u01A3" +
		"\x03\x02\x02\x02\u01A5\u01A6\x03\x02\x02\x02\u01A6\u01C8\x03\x02\x02\x02" +
		"\u01A7\u01A5\x03\x02\x02\x02\u01A8\u01A9\x07\x1F\x02\x02\u01A9\u01AA\x07" +
		"\x1F\x02\x02\u01AA\u01AF\x05\n\x06\x02\u01AB\u01AC\x07\x05\x02\x02\u01AC" +
		"\u01AE\x05\n\x06\x02\u01AD\u01AB\x03\x02\x02\x02\u01AE\u01B1\x03\x02\x02" +
		"\x02\u01AF\u01AD\x03\x02\x02\x02\u01AF\u01B0\x03\x02\x02\x02\u01B0\u01B2" +
		"\x03\x02\x02\x02\u01B1\u01AF\x03\x02\x02\x02\u01B2\u01C1\x07 \x02\x02" +
		"\u01B3\u01B4\x07\x05\x02\x02\u01B4\u01B5\x07\x1F\x02\x02\u01B5\u01BA\x05" +
		"\n\x06\x02\u01B6\u01B7\x07\x05\x02\x02\u01B7\u01B9\x05\n\x06\x02\u01B8" +
		"\u01B6\x03\x02\x02\x02\u01B9\u01BC\x03\x02\x02\x02\u01BA\u01B8\x03\x02" +
		"\x02\x02\u01BA\u01BB\x03\x02\x02\x02\u01BB\u01BD\x03\x02\x02\x02\u01BC" +
		"\u01BA\x03\x02\x02\x02\u01BD\u01BE\x07 \x02\x02\u01BE\u01C0\x03\x02\x02" +
		"\x02\u01BF\u01B3\x03\x02\x02\x02\u01C0\u01C3\x03\x02\x02\x02\u01C1\u01BF" +
		"\x03\x02\x02\x02\u01C1\u01C2\x03\x02\x02\x02\u01C2\u01C4\x03\x02\x02\x02" +
		"\u01C3\u01C1\x03\x02\x02\x02\u01C4\u01C5\x07 \x02\x02\u01C5\u01C8\x03" +
		"\x02\x02\x02\u01C6\u01C8\x05> \x02\u01C7\u019B\x03\x02\x02\x02\u01C7\u01A0" +
		"\x03\x02\x02\x02\u01C7\u01A8\x03\x02\x02\x02\u01C7\u01C6\x03\x02\x02\x02" +
		"\u01C83\x03\x02\x02\x02\u01C9\u01CF\x05\n\x06\x02\u01CA\u01CF\x07L\x02" +
		"\x02\u01CB\u01CF\x07M\x02\x02\u01CC\u01CF\x078\x02\x02\u01CD\u01CF\x07" +
		"\x14\x02\x02\u01CE\u01C9\x03\x02\x02\x02\u01CE\u01CA\x03\x02\x02\x02\u01CE" +
		"\u01CB\x03\x02\x02\x02\u01CE\u01CC\x03\x02\x02\x02\u01CE\u01CD\x03\x02" +
		"\x02\x02\u01CF5\x03\x02\x02\x02\u01D0\u01D3\x054\x1B\x02\u01D1\u01D3\x05" +
		"> \x02\u01D2\u01D0\x03\x02\x02\x02\u01D2\u01D1\x03\x02\x02\x02\u01D37" +
		"\x03\x02\x02\x02\u01D4\u01D5\x07?\x02\x02\u01D5\u01D6\x07\x1F\x02\x02" +
		"\u01D6\u01D7\x05:\x1E\x02\u01D7\u01D8\x07 \x02\x02\u01D8\u01DF\x03\x02" +
		"\x02\x02\u01D9\u01DA\x07@\x02\x02\u01DA\u01DB\x07\x1F\x02\x02\u01DB\u01DC" +
		"\x05:\x1E\x02\u01DC\u01DD\x07 \x02\x02\u01DD\u01DF\x03\x02\x02\x02\u01DE" +
		"\u01D4\x03\x02\x02\x02\u01DE\u01D9\x03\x02\x02\x02\u01DF9\x03\x02\x02" +
		"\x02\u01E0\u01E6\x05\n\x06\x02\u01E1\u01E6\x05> \x02\u01E2\u01E3\x07>" +
		"\x02\x02\u01E3\u01E4\x07\x1F\x02\x02\u01E4\u01E6\x07 \x02\x02\u01E5\u01E0" +
		"\x03\x02\x02\x02\u01E5\u01E1\x03\x02\x02\x02\u01E5\u01E2\x03\x02\x02\x02" +
		"\u01E6;\x03\x02\x02\x02\u01E7\u01E8\t\v\x02\x02\u01E8=\x03\x02\x02\x02" +
		"\u01E9\u01EB\x07\x04\x02\x02\u01EA\u01E9\x03\x02\x02\x02\u01EA\u01EB\x03" +
		"\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC\u01F8\t\f\x02\x02\u01ED" +
		"\u01EF\x07\x04\x02\x02\u01EE\u01ED\x03\x02\x02\x02\u01EE\u01EF\x03\x02" +
		"\x02\x02\u01EF\u01F0\x03\x02\x02\x02\u01F0\u01F3\t\f\x02\x02\u01F1\u01F2" +
		"\x07\x04\x02\x02\u01F2\u01F4\t\f\x02\x02\u01F3\u01F1\x03\x02\x02\x02\u01F4" +
		"\u01F5\x03\x02\x02\x02\u01F5\u01F3\x03\x02\x02\x02\u01F5\u01F6\x03\x02" +
		"\x02\x02\u01F6\u01F8\x03\x02\x02\x02\u01F7\u01EA\x03\x02\x02\x02\u01F7" +
		"\u01EE\x03\x02\x02\x02\u01F8?\x03\x02\x02\x02.BKP]blpty\x7F\x81\x87\x8B" +
		"\x8E\x9B\xA0\xA7\xAF\xB8\xBA\xC5\xD3\u0113\u0126\u0133\u0135\u0137\u0141" +
		"\u0169\u018E\u0196\u01A5\u01AF\u01BA\u01C1\u01C7\u01CE\u01D2\u01DE\u01E5" +
		"\u01EA\u01EE\u01F5\u01F7";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RuleFlowLanguageParser.__ATN) {
			RuleFlowLanguageParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RuleFlowLanguageParser._serializedATN));
		}

		return RuleFlowLanguageParser.__ATN;
	}

}

export class ParseContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(RuleFlowLanguageParser.EOF, 0); }
	public workflow(): WorkflowContext | undefined {
		return this.tryGetRuleContext(0, WorkflowContext);
	}
	public error(): ErrorContext | undefined {
		return this.tryGetRuleContext(0, ErrorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_parse; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterParse) {
			listener.enterParse(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitParse) {
			listener.exitParse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitParse) {
			return visitor.visitParse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ErrorContext extends ParserRuleContext {
	public UNEXPECTED_CHAR(): TerminalNode { return this.getToken(RuleFlowLanguageParser.UNEXPECTED_CHAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_error; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterError) {
			listener.enterError(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitError) {
			listener.exitError(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitError) {
			return visitor.visitError(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WorkflowContext extends ParserRuleContext {
	public K_WORKFLOW(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_WORKFLOW, 0); }
	public workflow_name(): Workflow_nameContext {
		return this.getRuleContext(0, Workflow_nameContext);
	}
	public default_clause(): Default_clauseContext {
		return this.getRuleContext(0, Default_clauseContext);
	}
	public K_END(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_END, 0); }
	public configuration(): ConfigurationContext | undefined {
		return this.tryGetRuleContext(0, ConfigurationContext);
	}
	public rulesets(): RulesetsContext[];
	public rulesets(i: number): RulesetsContext;
	public rulesets(i?: number): RulesetsContext | RulesetsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RulesetsContext);
		} else {
			return this.getRuleContext(i, RulesetsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_workflow; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterWorkflow) {
			listener.enterWorkflow(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitWorkflow) {
			listener.exitWorkflow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitWorkflow) {
			return visitor.visitWorkflow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Workflow_nameContext extends ParserRuleContext {
	public STRING_NOT_SPECIAL_CHARS(): TerminalNode { return this.getToken(RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_workflow_name; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterWorkflow_name) {
			listener.enterWorkflow_name(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitWorkflow_name) {
			listener.exitWorkflow_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitWorkflow_name) {
			return visitor.visitWorkflow_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_literalContext extends ParserRuleContext {
	public STRING_NOT_SPECIAL_CHARS(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.STRING_NOT_SPECIAL_CHARS, 0); }
	public SQUOTA_STRING(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.SQUOTA_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_string_literal; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterString_literal) {
			listener.enterString_literal(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitString_literal) {
			listener.exitString_literal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitString_literal) {
			return visitor.visitString_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulesetsContext extends ParserRuleContext {
	public K_RULESET(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_RULESET, 0); }
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public ruleset_condition(): Ruleset_conditionContext | undefined {
		return this.tryGetRuleContext(0, Ruleset_conditionContext);
	}
	public rules(): RulesContext[];
	public rules(i: number): RulesContext;
	public rules(i?: number): RulesContext | RulesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RulesContext);
		} else {
			return this.getRuleContext(i, RulesContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_rulesets; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterRulesets) {
			listener.enterRulesets(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitRulesets) {
			listener.exitRulesets(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitRulesets) {
			return visitor.visitRulesets(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ruleset_conditionContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public K_THEN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_THEN, 0); }
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_ruleset_condition; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterRuleset_condition) {
			listener.enterRuleset_condition(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitRuleset_condition) {
			listener.exitRuleset_condition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitRuleset_condition) {
			return visitor.visitRuleset_condition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulesContext extends ParserRuleContext {
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	public rule_body(): Rule_bodyContext {
		return this.getRuleContext(0, Rule_bodyContext);
	}
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_rules; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterRules) {
			listener.enterRules(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitRules) {
			listener.exitRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitRules) {
			return visitor.visitRules(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Rule_bodyContext extends ParserRuleContext {
	public _then_result!: ActionsContext;
	public _result!: Return_resultContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public K_THEN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_THEN, 0); }
	public K_RETURN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_RETURN, 0); }
	public actions(): ActionsContext | undefined {
		return this.tryGetRuleContext(0, ActionsContext);
	}
	public return_result(): Return_resultContext | undefined {
		return this.tryGetRuleContext(0, Return_resultContext);
	}
	public K_WITH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_WITH, 0); }
	public K_AND(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_AND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_rule_body; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterRule_body) {
			listener.enterRule_body(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitRule_body) {
			listener.exitRule_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitRule_body) {
			return visitor.visitRule_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public string_literal(): String_literalContext {
		return this.getRuleContext(0, String_literalContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_name; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Default_clauseContext extends ParserRuleContext {
	public _default_result!: Return_resultContext;
	public K_DEFAULT(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_DEFAULT, 0); }
	public return_result(): Return_resultContext {
		return this.getRuleContext(0, Return_resultContext);
	}
	public actions(): ActionsContext | undefined {
		return this.tryGetRuleContext(0, ActionsContext);
	}
	public K_THEN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_THEN, 0); }
	public K_RETURN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_RETURN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_default_clause; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDefault_clause) {
			listener.enterDefault_clause(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDefault_clause) {
			listener.exitDefault_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDefault_clause) {
			return visitor.visitDefault_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConfigurationContext extends ParserRuleContext {
	public evaluation_mode(): Evaluation_modeContext | undefined {
		return this.tryGetRuleContext(0, Evaluation_modeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_configuration; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterConfiguration) {
			listener.enterConfiguration(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitConfiguration) {
			listener.exitConfiguration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitConfiguration) {
			return visitor.visitConfiguration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Evaluation_modeContext extends ParserRuleContext {
	public K_EVALUATION_MODE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_EVALUATION_MODE, 0); }
	public K_MULTI_MATCH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_MULTI_MATCH, 0); }
	public K_SINGLE_MATCH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_SINGLE_MATCH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_evaluation_mode; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterEvaluation_mode) {
			listener.enterEvaluation_mode(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitEvaluation_mode) {
			listener.exitEvaluation_mode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitEvaluation_mode) {
			return visitor.visitEvaluation_mode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Return_resultContext extends ParserRuleContext {
	public state_rule(): State_ruleContext | undefined {
		return this.tryGetRuleContext(0, State_ruleContext);
	}
	public validProperty(): ValidPropertyContext | undefined {
		return this.tryGetRuleContext(0, ValidPropertyContext);
	}
	public validValue(): ValidValueContext | undefined {
		return this.tryGetRuleContext(0, ValidValueContext);
	}
	public K_EXPR(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_EXPR, 0); }
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_return_result; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterReturn_result) {
			listener.enterReturn_result(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitReturn_result) {
			listener.exitReturn_result(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitReturn_result) {
			return visitor.visitReturn_result(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_ruleContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(RuleFlowLanguageParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_state_rule; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterState_rule) {
			listener.enterState_rule(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitState_rule) {
			listener.exitState_rule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitState_rule) {
			return visitor.visitState_rule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionsContext extends ParserRuleContext {
	public action(): ActionContext[];
	public action(i: number): ActionContext;
	public action(i?: number): ActionContext | ActionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActionContext);
		} else {
			return this.getRuleContext(i, ActionContext);
		}
	}
	public K_AND(): TerminalNode[];
	public K_AND(i: number): TerminalNode;
	public K_AND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.K_AND);
		} else {
			return this.getToken(RuleFlowLanguageParser.K_AND, i);
		}
	}
	public K_WITH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_WITH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_actions; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterActions) {
			listener.enterActions(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitActions) {
			listener.exitActions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitActions) {
			return visitor.visitActions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionContext extends ParserRuleContext {
	public _param_value!: String_literalContext;
	public _action_id!: Token;
	public K_ACTION(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_ACTION, 0); }
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.COMMA, 0); }
	public action_params(): Action_paramsContext | undefined {
		return this.tryGetRuleContext(0, Action_paramsContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_action; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterAction) {
			listener.enterAction(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitAction) {
			listener.exitAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitAction) {
			return visitor.visitAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_paramsContext extends ParserRuleContext {
	public L_BRACE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_BRACE, 0); }
	public param_pairs(): Param_pairsContext {
		return this.getRuleContext(0, Param_pairsContext);
	}
	public R_BRACE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_action_params; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterAction_params) {
			listener.enterAction_params(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitAction_params) {
			listener.exitAction_params(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitAction_params) {
			return visitor.visitAction_params(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_pairsContext extends ParserRuleContext {
	public param_pair(): Param_pairContext[];
	public param_pair(i: number): Param_pairContext;
	public param_pair(i?: number): Param_pairContext | Param_pairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Param_pairContext);
		} else {
			return this.getRuleContext(i, Param_pairContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_param_pairs; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterParam_pairs) {
			listener.enterParam_pairs(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitParam_pairs) {
			listener.exitParam_pairs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitParam_pairs) {
			return visitor.visitParam_pairs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_pairContext extends ParserRuleContext {
	public _field_name!: String_literalContext;
	public _field_value!: ActionParamValueContext;
	public K_COLON(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_COLON, 0); }
	public string_literal(): String_literalContext {
		return this.getRuleContext(0, String_literalContext);
	}
	public actionParamValue(): ActionParamValueContext {
		return this.getRuleContext(0, ActionParamValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_param_pair; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterParam_pair) {
			listener.enterParam_pair(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitParam_pair) {
			listener.exitParam_pair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitParam_pair) {
			return visitor.visitParam_pair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class ParenthesisContext extends ExprContext {
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterParenthesis) {
			listener.enterParenthesis(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitParenthesis) {
			listener.exitParenthesis(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitParenthesis) {
			return visitor.visitParenthesis(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MathMulContext extends ExprContext {
	public _left!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public MULTIPLY(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.MULTIPLY, 0); }
	public DIVIDE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.DIVIDE, 0); }
	public MODULO(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.MODULO, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterMathMul) {
			listener.enterMathMul(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitMathMul) {
			listener.exitMathMul(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitMathMul) {
			return visitor.visitMathMul(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MathAddContext extends ExprContext {
	public _left!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.ADD, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.MINUS, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterMathAdd) {
			listener.enterMathAdd(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitMathAdd) {
			listener.exitMathAdd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitMathAdd) {
			return visitor.visitMathAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComparatorContext extends ExprContext {
	public _left!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public LT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.LT, 0); }
	public LT_EQ(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.LT_EQ, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.GT, 0); }
	public GT_EQ(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.GT_EQ, 0); }
	public EQ(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.EQ, 0); }
	public EQ_IC(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.EQ_IC, 0); }
	public NOT_EQ(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.NOT_EQ, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterComparator) {
			listener.enterComparator(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitComparator) {
			listener.exitComparator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitComparator) {
			return visitor.visitComparator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListContext extends ExprContext {
	public _value!: ExprContext;
	public _not!: Token;
	public _op!: Token;
	public _values!: ListElemsContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public listElems(): ListElemsContext {
		return this.getRuleContext(0, ListElemsContext);
	}
	public K_CONTAINS(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_CONTAINS, 0); }
	public K_IN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_IN, 0); }
	public K_STARTS_WITH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_STARTS_WITH, 0); }
	public K_NOT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_NOT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterList) {
			listener.enterList(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitList) {
			listener.exitList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleListContext extends ExprContext {
	public _value!: PropertyTupleContext;
	public _not!: Token;
	public _op!: Token;
	public _values!: ListElemsContext;
	public propertyTuple(): PropertyTupleContext {
		return this.getRuleContext(0, PropertyTupleContext);
	}
	public listElems(): ListElemsContext {
		return this.getRuleContext(0, ListElemsContext);
	}
	public K_CONTAINS(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_CONTAINS, 0); }
	public K_IN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_IN, 0); }
	public K_STARTS_WITH(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_STARTS_WITH, 0); }
	public K_NOT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_NOT, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterTupleList) {
			listener.enterTupleList(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitTupleList) {
			listener.exitTupleList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitTupleList) {
			return visitor.visitTupleList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AggregationContext extends ExprContext {
	public _value!: ExprContext;
	public _op!: Token;
	public _predicate!: ExprContext;
	public DOT(): TerminalNode { return this.getToken(RuleFlowLanguageParser.DOT, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public K_COUNT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_COUNT, 0); }
	public K_AVERAGE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_AVERAGE, 0); }
	public K_ANY(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_ANY, 0); }
	public K_ALL(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_ALL, 0); }
	public K_DISTINCT(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_DISTINCT, 0); }
	public K_NONE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_NONE, 0); }
	public L_BRACE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_BRACE, 0); }
	public R_BRACE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_BRACE, 0); }
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterAggregation) {
			listener.enterAggregation(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitAggregation) {
			listener.exitAggregation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitAggregation) {
			return visitor.visitAggregation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateOperationContext extends ExprContext {
	public dateExpr(): DateExprContext {
		return this.getRuleContext(0, DateExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateOperation) {
			listener.enterDateOperation(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateOperation) {
			listener.exitDateOperation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateOperation) {
			return visitor.visitDateOperation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RegexlikeContext extends ExprContext {
	public _op!: Token;
	public _value!: ValidPropertyContext;
	public _regex!: Token;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public REGEX_STRIP(): TerminalNode { return this.getToken(RuleFlowLanguageParser.REGEX_STRIP, 0); }
	public validProperty(): ValidPropertyContext {
		return this.getRuleContext(0, ValidPropertyContext);
	}
	public SQUOTA_STRING(): TerminalNode { return this.getToken(RuleFlowLanguageParser.SQUOTA_STRING, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterRegexlike) {
			listener.enterRegexlike(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitRegexlike) {
			listener.exitRegexlike(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitRegexlike) {
			return visitor.visitRegexlike(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public ABS(): TerminalNode { return this.getToken(RuleFlowLanguageParser.ABS, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterUnary) {
			listener.enterUnary(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitUnary) {
			listener.exitUnary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitUnary) {
			return visitor.visitUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EvalInListContext extends ExprContext {
	public _op!: Token;
	public _listName!: String_literalContext;
	public _predicate!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public K_EVAL_IN_LIST(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_EVAL_IN_LIST, 0); }
	public string_literal(): String_literalContext {
		return this.getRuleContext(0, String_literalContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterEvalInList) {
			listener.enterEvalInList(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitEvalInList) {
			listener.exitEvalInList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitEvalInList) {
			return visitor.visitEvalInList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryAndContext extends ExprContext {
	public _left!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public K_AND(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_AND, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterBinaryAnd) {
			listener.enterBinaryAnd(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitBinaryAnd) {
			listener.exitBinaryAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitBinaryAnd) {
			return visitor.visitBinaryAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryOrContext extends ExprContext {
	public _left!: ExprContext;
	public _op!: Token;
	public _right!: ExprContext;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public K_OR(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_OR, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterBinaryOr) {
			listener.enterBinaryOr(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitBinaryOr) {
			listener.exitBinaryOr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitBinaryOr) {
			return visitor.visitBinaryOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateParseExprContext extends ExprContext {
	public dateParse(): DateParseContext {
		return this.getRuleContext(0, DateParseContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateParseExpr) {
			listener.enterDateParseExpr(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateParseExpr) {
			listener.exitDateParseExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateParseExpr) {
			return visitor.visitDateParseExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueContext extends ExprContext {
	public validValue(): ValidValueContext {
		return this.getRuleContext(0, ValidValueContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PropertyContext extends ExprContext {
	public validProperty(): ValidPropertyContext {
		return this.getRuleContext(0, ValidPropertyContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringDistanceContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public _right!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public STRING_DISTANCE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.STRING_DISTANCE, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterStringDistance) {
			listener.enterStringDistance(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitStringDistance) {
			listener.exitStringDistance(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitStringDistance) {
			return visitor.visitStringDistance(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PartialRatioContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public _right!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public PARTIAL_RATIO(): TerminalNode { return this.getToken(RuleFlowLanguageParser.PARTIAL_RATIO, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterPartialRatio) {
			listener.enterPartialRatio(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitPartialRatio) {
			listener.exitPartialRatio(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitPartialRatio) {
			return visitor.visitPartialRatio(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TokenSortRatioContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public _right!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public TOKEN_SORT_RATIO(): TerminalNode { return this.getToken(RuleFlowLanguageParser.TOKEN_SORT_RATIO, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterTokenSortRatio) {
			listener.enterTokenSortRatio(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitTokenSortRatio) {
			listener.exitTokenSortRatio(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitTokenSortRatio) {
			return visitor.visitTokenSortRatio(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TokenSetRatioContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public _right!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public TOKEN_SET_RATIO(): TerminalNode { return this.getToken(RuleFlowLanguageParser.TOKEN_SET_RATIO, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterTokenSetRatio) {
			listener.enterTokenSetRatio(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitTokenSetRatio) {
			listener.exitTokenSetRatio(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitTokenSetRatio) {
			return visitor.visitTokenSetRatio(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringSimilarityScoreContext extends ExprContext {
	public _op!: Token;
	public _left!: ExprContext;
	public _right!: ExprContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public STRING_SIMILARITY_SCORE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.STRING_SIMILARITY_SCORE, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterStringSimilarityScore) {
			listener.enterStringSimilarityScore(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitStringSimilarityScore) {
			listener.exitStringSimilarityScore(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitStringSimilarityScore) {
			return visitor.visitStringSimilarityScore(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GeoOperationContext extends ExprContext {
	public geoExpr(): GeoExprContext {
		return this.getRuleContext(0, GeoExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterGeoOperation) {
			listener.enterGeoOperation(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitGeoOperation) {
			listener.exitGeoOperation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitGeoOperation) {
			return visitor.visitGeoOperation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GeoExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_geoExpr; }
	public copyFrom(ctx: GeoExprContext): void {
		super.copyFrom(ctx);
	}
}
export class GeohashEncodeContext extends GeoExprContext {
	public _lat!: ExprContext;
	public _lon!: ExprContext;
	public _precision!: ExprContext;
	public GEOHASH_ENCODE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.GEOHASH_ENCODE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: GeoExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterGeohashEncode) {
			listener.enterGeohashEncode(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitGeohashEncode) {
			listener.exitGeohashEncode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitGeohashEncode) {
			return visitor.visitGeohashEncode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GeohashDecodeContext extends GeoExprContext {
	public _geohash!: ExprContext;
	public GEOHASH_DECODE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.GEOHASH_DECODE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: GeoExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterGeohashDecode) {
			listener.enterGeohashDecode(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitGeohashDecode) {
			listener.exitGeohashDecode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitGeohashDecode) {
			return visitor.visitGeohashDecode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DistanceContext extends GeoExprContext {
	public _lat1!: ExprContext;
	public _lon1!: ExprContext;
	public _lat2!: ExprContext;
	public _lon2!: ExprContext;
	public DISTANCE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.DISTANCE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: GeoExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDistance) {
			listener.enterDistance(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDistance) {
			listener.exitDistance(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDistance) {
			return visitor.visitDistance(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DistanceGeohashContext extends GeoExprContext {
	public _geohash1!: ExprContext;
	public _geohash2!: ExprContext;
	public DISTANCE(): TerminalNode { return this.getToken(RuleFlowLanguageParser.DISTANCE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode { return this.getToken(RuleFlowLanguageParser.COMMA, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: GeoExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDistanceGeohash) {
			listener.enterDistanceGeohash(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDistanceGeohash) {
			listener.exitDistanceGeohash(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDistanceGeohash) {
			return visitor.visitDistanceGeohash(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class WithinRadiusContext extends GeoExprContext {
	public _lat1!: ExprContext;
	public _lon1!: ExprContext;
	public _lat2!: ExprContext;
	public _lon2!: ExprContext;
	public _radius!: ExprContext;
	public WITHIN_RADIUS(): TerminalNode { return this.getToken(RuleFlowLanguageParser.WITHIN_RADIUS, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: GeoExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterWithinRadius) {
			listener.enterWithinRadius(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitWithinRadius) {
			listener.exitWithinRadius(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitWithinRadius) {
			return visitor.visitWithinRadius(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_dateExpr; }
	public copyFrom(ctx: DateExprContext): void {
		super.copyFrom(ctx);
	}
}
export class DateDiffContext extends DateExprContext {
	public _left!: DateValueContext;
	public _right!: DateValueContext;
	public DATE_DIFF(): TerminalNode { return this.getToken(RuleFlowLanguageParser.DATE_DIFF, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public dateValue(): DateValueContext[];
	public dateValue(i: number): DateValueContext;
	public dateValue(i?: number): DateValueContext | DateValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DateValueContext);
		} else {
			return this.getRuleContext(i, DateValueContext);
		}
	}
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.HOUR, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.DAY, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.MINUTE, 0); }
	constructor(ctx: DateExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateDiff) {
			listener.enterDateDiff(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateDiff) {
			listener.exitDateDiff(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateDiff) {
			return visitor.visitDateDiff(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DayOfWeekContext extends DateExprContext {
	public _op!: Token;
	public _left!: DateValueContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public DAY_OF_WEEK(): TerminalNode { return this.getToken(RuleFlowLanguageParser.DAY_OF_WEEK, 0); }
	public dateValue(): DateValueContext {
		return this.getRuleContext(0, DateValueContext);
	}
	constructor(ctx: DateExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDayOfWeek) {
			listener.enterDayOfWeek(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDayOfWeek) {
			listener.exitDayOfWeek(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDayOfWeek) {
			return visitor.visitDayOfWeek(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NowContext extends DateExprContext {
	public _op!: Token;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public K_NOW(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_NOW, 0); }
	constructor(ctx: DateExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterNow) {
			listener.enterNow(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitNow) {
			listener.exitNow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitNow) {
			return visitor.visitNow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateAddContext extends DateExprContext {
	public _op!: Token;
	public _date!: DateValueContext;
	public _amount!: ExprContext;
	public _unit!: TimeUnitContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public K_DATE_ADD(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_DATE_ADD, 0); }
	public dateValue(): DateValueContext {
		return this.getRuleContext(0, DateValueContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public timeUnit(): TimeUnitContext {
		return this.getRuleContext(0, TimeUnitContext);
	}
	constructor(ctx: DateExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateAdd) {
			listener.enterDateAdd(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateAdd) {
			listener.exitDateAdd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateAdd) {
			return visitor.visitDateAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateSubtractContext extends DateExprContext {
	public _op!: Token;
	public _date!: DateValueContext;
	public _amount!: ExprContext;
	public _unit!: TimeUnitContext;
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public K_DATE_SUBTRACT(): TerminalNode { return this.getToken(RuleFlowLanguageParser.K_DATE_SUBTRACT, 0); }
	public dateValue(): DateValueContext {
		return this.getRuleContext(0, DateValueContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public timeUnit(): TimeUnitContext {
		return this.getRuleContext(0, TimeUnitContext);
	}
	constructor(ctx: DateExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateSubtract) {
			listener.enterDateSubtract(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateSubtract) {
			listener.exitDateSubtract(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateSubtract) {
			return visitor.visitDateSubtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyTupleContext extends ParserRuleContext {
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public validProperty(): ValidPropertyContext[];
	public validProperty(i: number): ValidPropertyContext;
	public validProperty(i?: number): ValidPropertyContext | ValidPropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValidPropertyContext);
		} else {
			return this.getRuleContext(i, ValidPropertyContext);
		}
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_propertyTuple; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterPropertyTuple) {
			listener.enterPropertyTuple(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitPropertyTuple) {
			listener.exitPropertyTuple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitPropertyTuple) {
			return visitor.visitPropertyTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListElemsContext extends ParserRuleContext {
	public _storedList!: Token;
	public _literalList!: String_literalContext;
	public _literalTupleList!: Token;
	public L_PAREN(): TerminalNode[];
	public L_PAREN(i: number): TerminalNode;
	public L_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.L_PAREN);
		} else {
			return this.getToken(RuleFlowLanguageParser.L_PAREN, i);
		}
	}
	public string_literal(): String_literalContext[];
	public string_literal(i: number): String_literalContext;
	public string_literal(i?: number): String_literalContext | String_literalContext[] {
		if (i === undefined) {
			return this.getRuleContexts(String_literalContext);
		} else {
			return this.getRuleContext(i, String_literalContext);
		}
	}
	public R_PAREN(): TerminalNode[];
	public R_PAREN(i: number): TerminalNode;
	public R_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.R_PAREN);
		} else {
			return this.getToken(RuleFlowLanguageParser.R_PAREN, i);
		}
	}
	public K_LIST(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_LIST, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.COMMA);
		} else {
			return this.getToken(RuleFlowLanguageParser.COMMA, i);
		}
	}
	public validProperty(): ValidPropertyContext | undefined {
		return this.tryGetRuleContext(0, ValidPropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_listElems; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterListElems) {
			listener.enterListElems(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitListElems) {
			listener.exitListElems(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitListElems) {
			return visitor.visitListElems(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValidValueContext extends ParserRuleContext {
	public _string!: String_literalContext;
	public _number!: Token;
	public _booleanLiteral!: Token;
	public _nullValue!: Token;
	public _currentDate!: Token;
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	public NUMERIC_LITERAL(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.NUMERIC_LITERAL, 0); }
	public BOOLEAN_LITERAL(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.BOOLEAN_LITERAL, 0); }
	public K_NULL(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_NULL, 0); }
	public CURRENT_DATE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.CURRENT_DATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_validValue; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterValidValue) {
			listener.enterValidValue(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitValidValue) {
			listener.exitValidValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitValidValue) {
			return visitor.visitValidValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionParamValueContext extends ParserRuleContext {
	public validValue(): ValidValueContext | undefined {
		return this.tryGetRuleContext(0, ValidValueContext);
	}
	public validProperty(): ValidPropertyContext | undefined {
		return this.tryGetRuleContext(0, ValidPropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_actionParamValue; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterActionParamValue) {
			listener.enterActionParamValue(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitActionParamValue) {
			listener.exitActionParamValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitActionParamValue) {
			return visitor.visitActionParamValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateParseContext extends ParserRuleContext {
	public K_DATE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_DATE, 0); }
	public L_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public dateValue(): DateValueContext {
		return this.getRuleContext(0, DateValueContext);
	}
	public R_PAREN(): TerminalNode { return this.getToken(RuleFlowLanguageParser.R_PAREN, 0); }
	public K_DATETIME(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_DATETIME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_dateParse; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateParse) {
			listener.enterDateParse(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateParse) {
			listener.exitDateParse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateParse) {
			return visitor.visitDateParse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateValueContext extends ParserRuleContext {
	public string_literal(): String_literalContext | undefined {
		return this.tryGetRuleContext(0, String_literalContext);
	}
	public validProperty(): ValidPropertyContext | undefined {
		return this.tryGetRuleContext(0, ValidPropertyContext);
	}
	public K_NOW(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.K_NOW, 0); }
	public L_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.L_PAREN, 0); }
	public R_PAREN(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.R_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_dateValue; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterDateValue) {
			listener.enterDateValue(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitDateValue) {
			listener.exitDateValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitDateValue) {
			return visitor.visitDateValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeUnitContext extends ParserRuleContext {
	public DAY(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.DAY, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.HOUR, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(RuleFlowLanguageParser.MINUTE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_timeUnit; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterTimeUnit) {
			listener.enterTimeUnit(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitTimeUnit) {
			listener.exitTimeUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitTimeUnit) {
			return visitor.visitTimeUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValidPropertyContext extends ParserRuleContext {
	public _root!: Token;
	public _property!: Token;
	public _nestedProperty!: Token;
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.ID);
		} else {
			return this.getToken(RuleFlowLanguageParser.ID, i);
		}
	}
	public K_ELEM(): TerminalNode[];
	public K_ELEM(i: number): TerminalNode;
	public K_ELEM(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.K_ELEM);
		} else {
			return this.getToken(RuleFlowLanguageParser.K_ELEM, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RuleFlowLanguageParser.DOT);
		} else {
			return this.getToken(RuleFlowLanguageParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RuleFlowLanguageParser.RULE_validProperty; }
	// @Override
	public enterRule(listener: RuleFlowLanguageListener): void {
		if (listener.enterValidProperty) {
			listener.enterValidProperty(this);
		}
	}
	// @Override
	public exitRule(listener: RuleFlowLanguageListener): void {
		if (listener.exitValidProperty) {
			listener.exitValidProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RuleFlowLanguageVisitor<Result>): Result {
		if (visitor.visitValidProperty) {
			return visitor.visitValidProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


