import type { Visitor } from '../visitors/Visitor';
import type { RegexlikeContext } from '../generated/src/grammar/RuleFlowLanguageParser';

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

export class RegexlikeEvaluator {
  evaluate(ctx: RegexlikeContext, visitor: Visitor): string {
    const value = visitor.visit(ctx.validProperty());
    const regexPattern = stripQuotes(ctx._regex?.text || '');
    const input = String(value ?? '');
    const re = new RegExp(regexPattern, 'g');
    const s = input.replace(re, '');
    return s;
  }
}
