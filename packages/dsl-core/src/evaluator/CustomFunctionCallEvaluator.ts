import type { Visitor } from '../visitors/Visitor';
import type { CustomFunctionCallContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class CustomFunctionCallEvaluator {
  evaluate(ctx: CustomFunctionCallContext, visitor: Visitor): unknown {
    const functionName = (ctx as any).ID().text as string;
    const fn = visitor.getFunctions()[functionName];
    if (!fn) {
      throw new Error(`Custom function '${functionName}' is not defined`);
    }

    const args: unknown[] = (ctx.expr() as any[]).map((e: any) => visitor.visit(e));

    const cacheKey = JSON.stringify([functionName, ...args]);
    const cache = visitor.getFunctionCallCache();
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = fn(args);
    cache.set(cacheKey, result);
    return result;
  }
}