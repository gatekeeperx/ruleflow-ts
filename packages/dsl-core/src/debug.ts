import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { RuleFlowLanguageLexer } from './generated/src/grammar/RuleFlowLanguageLexer';
import { RuleFlowLanguageParser } from './generated/src/grammar/RuleFlowLanguageParser';

export function lex(input: string) {
  const cs = CharStreams.fromString(input);
  const lexer = new RuleFlowLanguageLexer(cs as any);
  const tokens = new CommonTokenStream(lexer as any);
  tokens.fill();
  const vocab = (RuleFlowLanguageParser as any).VOCABULARY as import('antlr4ts').Vocabulary;
  return tokens.getTokens().map((t) => ({
    type: t.type,
    name: vocab.getSymbolicName(t.type),
    lit: vocab.getLiteralName(t.type),
    text: t.text,
  }));
}

export function parse(input: string) {
  const cs = CharStreams.fromString(input);
  const lexer = new RuleFlowLanguageLexer(cs as any);
  const tokens = new CommonTokenStream(lexer as any);
  const parser = new RuleFlowLanguageParser(tokens as any);
  (parser as any).buildParseTree = true;
  const tree = (parser as any).parse();
  return { treeType: tree?.constructor?.name, ctxRuleIndex: tree?.ruleIndex };
}
