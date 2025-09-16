import type { Visitor } from '../visitors/Visitor';
import { RuleFlowLanguageParser, AggregationContext, ValueContext } from '../generated/src/grammar/RuleFlowLanguageParser';

export class AggregationEvaluator {
    evaluate(ctx: AggregationContext, visitor: Visitor): any {
        const valueExpr = (ctx as any)._value ?? ctx.expr(0);
        const listVal = visitor.visit(valueExpr);
        if (!Array.isArray(listVal)) {
            throw new Error(`${(ctx as any)._value?.text ?? (valueExpr as any)?.text ?? 'value'} is not a Collection`);
        }

        const op = (ctx as any)._op?.type;
        const pred = (ctx as any)._predicate ?? (ctx.expr().length > 1 ? ctx.expr(1) : undefined);

        switch (op) {
            case RuleFlowLanguageParser.K_ALL:
                return listVal.every((item) => Boolean(this.evalPredicate(item, visitor, pred)));
            case RuleFlowLanguageParser.K_ANY:
                return listVal.some((item) => Boolean(this.evalPredicate(item, visitor, pred)));
            case RuleFlowLanguageParser.K_NONE:
                return !listVal.some((item) => Boolean(this.evalPredicate(item, visitor, pred)));
            case RuleFlowLanguageParser.K_COUNT: {
                if (!pred) return listVal.length;
                const count = listVal.filter((item) => Boolean(this.evalPredicate(item, visitor, pred))).length;
                return count;
            }
            case RuleFlowLanguageParser.K_AVERAGE: {
                const total = listVal.length || 1;
                const count = pred ? listVal.filter((item) => Boolean(this.evalPredicate(item, visitor, pred))).length : total;
                const ratio = count / total;
                return Math.floor(ratio * 1000) / 1000;
            }
            case RuleFlowLanguageParser.K_DISTINCT: {
                if (!pred) return Array.from(new Set(listVal.map((x) => this.identity(x))));
                if (pred instanceof ValueContext) {
                    return Array.from(new Set(listVal.map((x) => this.identity(x))));
                }
                const mapped = listVal.map((item) => this.evalPredicate(item, visitor, pred));
                return Array.from(new Set(mapped.map((x) => this.identity(x))));
            }
            default:
                throw new Error(`Operation not supported: ${(ctx as any)._op?.text}`);
        }
    }

    private evalPredicate(item: any, visitor: Visitor, pred?: any): any {
        if (!pred) return true;

        if (pred instanceof ValueContext) {
            const predicateValue = new (visitor.constructor as any)(visitor.getRoot(), visitor.getLists(), visitor.getRoot()).visit(pred);
            return this.compareValues(item, predicateValue);
        }

        const data = (item && typeof item === 'object') ? item : { value: item };
        return new (visitor.constructor as any)(data, visitor.getLists(), visitor.getRoot()).visit(pred);
    }

    private compareValues(a: any, b: any): boolean {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        if (typeof a === 'number' && typeof b === 'number') return a === b;
        return String(a) === String(b);
    }

    private identity(x: any): any {
        if (x == null) return x;
        if (typeof x === 'object') return JSON.stringify(x);
        return x;
    }
}