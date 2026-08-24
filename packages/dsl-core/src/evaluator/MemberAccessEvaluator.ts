import type { Visitor } from '../visitors/Visitor';
import type { MemberAccessContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';
import { getIgnoreCase, hasKeyIgnoreCase } from '../utils/mapUtils';

export class MemberAccessEvaluator {
  evaluate(ctx: MemberAccessContext, visitor: Visitor): unknown {
    const base = visitor.visit((ctx as any)._base);
    const field = (ctx as any)._field.text as string;

    if (base !== null && typeof base === 'object' && !Array.isArray(base)) {
      const obj = base as Record<string, unknown>;
      if (!hasKeyIgnoreCase(obj, field)) {
        throw new PropertyNotFoundError(`${field} field cannot be found`);
      }
      return getIgnoreCase(obj, field);
    }
    throw new PropertyNotFoundError(`Cannot access field '${field}' on ${base}`);
  }
}