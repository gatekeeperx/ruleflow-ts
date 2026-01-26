import type { Visitor, DataMap } from '../visitors/Visitor';
import type { EvalInListContext } from '../generated/src/grammar/RuleFlowLanguageParser';

function stripQuotes(s: string): string {
  if (!s) return s;
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    return s.substring(1, s.length - 1);
  }
  return s;
}

export class EvalInListEvaluator {
  evaluate(ctx: EvalInListContext, visitor: Visitor): boolean {
    const listNameCtx = (ctx as any)._listName ?? ctx.string_literal();
    const listName = stripQuotes(listNameCtx?.text ?? '');

    const list = visitor.getLists()[listName];
    if (!Array.isArray(list) || list.length === 0) {
      return false;
    }

    const predicateCtx = (ctx as any)._predicate ?? ctx.expr();

    for (const item of list) {
      const itemData: DataMap = (item && typeof item === 'object') ? item as DataMap : { value: item };
      const combinedData: DataMap = {
        ...visitor.getRoot(),
        elem: itemData,
      };
      const itemVisitor = new (visitor.constructor as new (data: DataMap, lists: Record<string, unknown[]>, root: DataMap) => Visitor)(
        combinedData,
        visitor.getLists(),
        visitor.getRoot()
      );
      const result = itemVisitor.visit(predicateCtx);
      if (Boolean(result)) {
        return true;
      }
    }

    return false;
  }
}
