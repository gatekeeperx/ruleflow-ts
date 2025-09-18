import { RuleFlowLanguageParser } from '../generated/src/grammar/RuleFlowLanguageParser';
import type { Visitor } from '../visitors/Visitor';

export class ComparatorEvaluator {
  evaluate(ctx: any, visitor: Visitor): boolean {
    const left = visitor.visit(ctx.expr(0));
    const right = visitor.visit(ctx.expr(1));
    const opType = ctx._op?.type as number | undefined;

    // Handle nulls
    if (left == null || right == null) {
      return this.compareNull(opType, left, right);
    }

    // Handle Date comparisons
    if (left instanceof Date || right instanceof Date) {
      const lDate = this.coerceToDate(left);
      const rDate = this.coerceToDate(right);
      if (!lDate || !rDate) {
        return false;
      }
      return this.compareNumber(opType, lDate.getTime(), rDate.getTime());
    }

    if (typeof left === 'number' && typeof right === 'number') {
      return this.compareNumber(opType, left, right);
    }
    if (typeof left === 'boolean' && typeof right === 'boolean') {
      return this.compareNumber(opType, Number(left), Number(right));
    }

    // Fallback to string compare
    return this.compareString(opType, String(left), String(right));
  }

  private compareNull(opType: number | undefined, left: unknown, right: unknown): boolean {
    switch (opType) {
      case RuleFlowLanguageParser.EQ:
        return left === right;
      case RuleFlowLanguageParser.EQ_IC:
        return String(left ?? '').toLowerCase() === String(right ?? '').toLowerCase();
      case RuleFlowLanguageParser.NOT_EQ:
        return left !== right;
      default:
        return false;
    }
  }

  private compareNumber(opType: number | undefined, left: number, right: number): boolean {
    switch (opType) {
      case RuleFlowLanguageParser.EQ:
        return left === right;
      case RuleFlowLanguageParser.EQ_IC:
        return left === right;
      case RuleFlowLanguageParser.NOT_EQ:
        return left !== right;
      case RuleFlowLanguageParser.LT:
        return left < right;
      case RuleFlowLanguageParser.LT_EQ:
        return left <= right;
      case RuleFlowLanguageParser.GT:
        return left > right;
      case RuleFlowLanguageParser.GT_EQ:
        return left >= right;
      default:
        throw new Error(`Invalid condition`);
    }
  }

  private compareString(opType: number | undefined, left: string, right: string): boolean {
    switch (opType) {
      case RuleFlowLanguageParser.EQ:
        return left === right;
      case RuleFlowLanguageParser.EQ_IC:
        return left.localeCompare(right, undefined, { sensitivity: 'accent' }) === 0 || left.toLowerCase() === right.toLowerCase();
      case RuleFlowLanguageParser.NOT_EQ:
        return left !== right;
      case RuleFlowLanguageParser.LT:
        return left < right;
      case RuleFlowLanguageParser.LT_EQ:
        return left <= right;
      case RuleFlowLanguageParser.GT:
        return left > right;
      case RuleFlowLanguageParser.GT_EQ:
        return left >= right;
      default:
        throw new Error(`Invalid condition`);
    }
  }

  private coerceToDate(v: unknown): Date | null {
    if (v instanceof Date) return v;
    if (typeof v === 'string') {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
}
