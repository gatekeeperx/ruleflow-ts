import type { Visitor } from '../../visitors/Visitor';
import type { NowContext } from '../../generated/src/grammar/RuleFlowLanguageParser';

export class NowEvaluator {
  evaluate(_ctx: NowContext, _visitor: Visitor): Date {
    return new Date();
  }
}
