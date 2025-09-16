import type { Visitor } from '../visitors/Visitor';
import { ValidValueContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class ValueEvaluator {
  evaluate(ctx: any, _visitor: Visitor): unknown {
    // ctx is ValueContext -> has validValue()
    const valid = ctx.validValue?.() as ValidValueContext | undefined;
    if (!valid) return undefined;
    return this.evaluateValidValue(valid);
  }

  evaluateValidValue(valid: ValidValueContext): unknown {
    const str = valid.string_literal?.();
    if (str) {
      const txt = str.text ?? '';
      return this.stripQuotes(txt);
    }
    const num = valid.NUMERIC_LITERAL?.();
    if (num) {
      return Number(num.text);
    }
    const boolTok = valid.BOOLEAN_LITERAL?.();
    if (boolTok) {
      const t = (boolTok.text || '').toLowerCase();
      return t === 'true';
    }
    const isNull = valid.K_NULL?.();
    if (isNull) return null;
    const cur = valid.CURRENT_DATE?.();
    if (cur) return new Date();
    throw new Error(`Value not supported: ${valid.text}`);
  }

  private stripQuotes(s: string): string {
    if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
      return s.substring(1, s.length - 1);
    }
    return s;
  }
}
