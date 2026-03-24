import type { Visitor } from '../visitors/Visitor';
import type { StoredListExprContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class StoredListExprEvaluator {
  evaluate(ctx: StoredListExprContext, visitor: Visitor): unknown[] {
    const raw = (ctx as any)._listName?.text as string ?? '';
    const listName = raw.startsWith("'") && raw.endsWith("'") ? raw.slice(1, -1) : raw;
    return visitor.getLists()[listName] ?? [];
  }
}
