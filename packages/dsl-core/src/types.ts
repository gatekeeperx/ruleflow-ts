export type InputMap = Record<string, unknown>;
export type ListsMap = Record<string, unknown[]>;
export type RuleflowFunction = (args: unknown[]) => unknown;
export type FunctionsMap = Record<string, RuleflowFunction>;

export interface Action {
  name: string;
  params: Record<string, string>;
}

export interface MatchedRule {
  ruleSet: string;
  rule: string;
  result: string;
  actions: Action[];
}

export interface WorkflowResult {
  workflow: string;
  ruleSet?: string;
  rule?: string;
  result: string;
  actions?: Action[];
  warnings?: string[];
  error?: boolean;
  matchedRules?: MatchedRule[];
  variables?: Record<string, unknown>;
}
