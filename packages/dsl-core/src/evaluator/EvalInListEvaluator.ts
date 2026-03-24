import type { Visitor } from '../visitors/Visitor';
import type { EvalInListContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class EvalInListEvaluator {
  evaluate(ctx: EvalInListContext, visitor: Visitor): boolean {
    const raw = (ctx as any)._listName?.text as string ?? '';
    const listName = raw.startsWith("'") && raw.endsWith("'") ? raw.slice(1, -1) : raw;

    const list = visitor.getLists()[listName];
    if (!list) {
      console.warn(`EvalInList: list '${listName}' not found`);
      return false;
    }

    const pred = (ctx as any)._predicate;

    return list.some((item) => {
      try {
        const data = item && typeof item === 'object' ? item as Record<string, unknown> : { value: item };
        const scopedData = { ...visitor.getData(), ...data, elem: item, it: item };
        const scopedVisitor = new (visitor.constructor as any)(scopedData, visitor.getLists(), visitor.getRoot());
        const result = scopedVisitor.visit(pred);
        return Boolean(result);
      } catch {
        return false;
      }
    });
  }
}