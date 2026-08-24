import type { Visitor } from '../visitors/Visitor';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';
import { ValidPropertyContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import { getIgnoreCase, hasKeyIgnoreCase } from '../utils/mapUtils';

export class ValidPropertyEvaluator {
  evaluate(ctx: ValidPropertyContext, visitor: Visitor): unknown {
    const fullText = (ctx.text || '').trim();
    const ids = ctx.ID();
    const isNested = ids.length > 1;
    const useRoot = fullText.startsWith('.');

    if (!isNested) {
      const key = ids[0]?.text || '';
      const data = visitor.getData() as Record<string, unknown>;
      const value = getIgnoreCase(data, key);
      if (value === undefined && !hasKeyIgnoreCase(data, key)) {
        throw new PropertyNotFoundError(key);
      }
      return value;
    }

    // nested path
    const path = ids.map((t) => t.text).join('.');
    let current: any = useRoot ? visitor.getRoot() : visitor.getData();
    for (const part of path.split('.')) {
      if (current == null || typeof current !== 'object' || !hasKeyIgnoreCase(current, part)) {
        throw new PropertyNotFoundError(part);
      }
      current = getIgnoreCase(current, part);
    }
    return current;
  }
}
