export type InputMap = Record<string, unknown>;
export type ListsMap = Record<string, unknown[]>;

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
}
