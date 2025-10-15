import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { RuleFlowLanguageLexer } from './generated/src/grammar/RuleFlowLanguageLexer';
import { RuleFlowLanguageParser } from './generated/src/grammar/RuleFlowLanguageParser';
import { BailErrorStrategy } from 'antlr4ts/BailErrorStrategy';
import { PredictionMode } from 'antlr4ts/atn/PredictionMode';
import { ErrorListener } from './listeners/ErrorListener';
import type { InputMap, ListsMap, WorkflowResult } from './types';
import { RulesetVisitor } from './visitors/RulesetVisitor';
import type { ParseContext } from './generated/src/grammar/RuleFlowLanguageParser';
import { AstSerializer } from './visitors/AstSerializer';
import type { AstWorkflow } from './visitors/AstSerializer';

export class Workflow {
  private tree: any;
  private readonly source: string;

  constructor(workflow: string) {
    this.source = workflow;
    const input = CharStreams.fromString(workflow);
    const lexer = new RuleFlowLanguageLexer(input as any);
    const tokens = new CommonTokenStream(lexer as any);
    const parser = new RuleFlowLanguageParser(tokens as any);
    if (typeof (parser as any).removeErrorListeners === 'function') {
      (parser as any).removeErrorListeners();
    }
    if (typeof (parser as any).addErrorListener === 'function') {
      (parser as any).addErrorListener(new ErrorListener());
    }
    // Avoid inline recovery bugs in antlr4ts by bailing on first syntax error
    (parser as any)._errHandler = new BailErrorStrategy();
    // Use LL prediction for stability on left-recursive expr rules
    if ((parser as any).interpreter) {
      (parser as any).interpreter.predictionMode = PredictionMode.LL;
    }
    (parser as any).buildParseTree = true;
    this.tree = typeof (parser as any).parse === 'function' ? (parser as any).parse() : {};
  }

  evaluate(request: InputMap, lists: ListsMap = {}): WorkflowResult {
    const rs = new RulesetVisitor(request, lists);
    return rs.visit(this.tree as ParseContext);
  }

  validateAndGetWorkflowName(): string {
    const root = this.tree as ParseContext;
    const wf = root.workflow?.();
    const raw = wf?.workflow_name()?.text ?? '';
    return this.stripQuotes(raw);
  }

  toJSON(): AstWorkflow {
    const serializer = new AstSerializer(this.source);
    return serializer.serialize(this.tree as ParseContext);
  }

  private stripQuotes(s: string): string {
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.substring(1, s.length - 1);
    }
    return s;
  }
}

