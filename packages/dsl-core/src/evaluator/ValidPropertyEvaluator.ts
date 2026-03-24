import type { Visitor } from '../visitors/Visitor';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';
import { ValidPropertyContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class ValidPropertyEvaluator {
  evaluate(ctx: ValidPropertyContext, visitor: Visitor): unknown {
    const fullText = (ctx.text || '').trim();
    const useRoot = fullText.startsWith('.');
    // Build ordered path segments from context text (handles K_ELEM tokens like 'elem')
    const stripped = useRoot ? fullText.slice(1) : fullText;
    const parts = stripped.split('.');

    if (parts.length === 1) {
      const key = parts[0];
      const value = (visitor.getData() as any)[key];
      if (value === undefined) {
        throw new PropertyNotFoundError(key);
      }
      return value;
    }

    // nested path
    let current: any = useRoot ? visitor.getRoot() : visitor.getData();
    for (const part of parts) {
      if (current == null || typeof current !== 'object' || !(part in current)) {
        throw new PropertyNotFoundError(part);
      }
      current = current[part];
    }
    return current;
  }
}
