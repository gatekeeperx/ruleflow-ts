import type { Visitor } from '../visitors/Visitor';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';
import { ValidPropertyContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class ValidPropertyEvaluator {
  evaluate(ctx: ValidPropertyContext, visitor: Visitor): unknown {
    const fullText = (ctx.text || '').trim();
    const ids = ctx.ID();
    const isNested = ids.length > 1;
    const useRoot = fullText.startsWith('.');

    if (!isNested) {
      const key = ids[0]?.text || '';
      const value = (visitor.getData() as any)[key];
      if (value === undefined) {
        throw new PropertyNotFoundError(key);
      }
      return value;
    }

    // nested path
    const path = ids.map((t) => t.text).join('.');
    let current: any = useRoot ? visitor.getRoot() : visitor.getData();
    for (const part of path.split('.')) {
      if (current == null || typeof current !== 'object' || !(part in current)) {
        throw new PropertyNotFoundError(part);
      }
      current = current[part];
    }
    return current;
  }
}
