import type { Visitor } from '../visitors/Visitor';
import type { VariableRefContext } from '../generated/src/grammar/RuleFlowLanguageParser';
import { PropertyNotFoundError } from '../errors/PropertyNotFoundError';

export class VariableRefEvaluator {
  evaluate(ctx: VariableRefContext, visitor: Visitor): unknown {
    const rawName = (ctx as any).VARIABLE().text as string;
    const name = rawName.substring(1); // strip leading '$'
    const variables = visitor.getVariables();
    if (!(name in variables)) {
      throw new PropertyNotFoundError(`Variable $${name} is not defined`);
    }
    return variables[name];
  }
}