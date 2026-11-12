import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

// rule_body aligned with ruleflow-java:
//   expr? set_clause* ((THEN actions CONTINUE?) | (RETURN return_result? actions?) | (actions CONTINUE) | CONTINUE)
function run(dsl: string, data: any = {}) {
  return new Workflow(dsl).evaluate(data);
}

describe('rule_body parity with ruleflow-java', () => {
  it('a rule without a condition always matches (init variables)', () => {
    const dsl = `WORKFLOW 'create-transaction'
  RULESET 'init'
    'init' SET $base = 0 SET $fuerte = 0 CONTINUE
  RULESET 'scoring'
    'p1' amount > 10 SET $base += 1 CONTINUE
  RULESET 'decision'
    'alto' $base >= 1 RETURN review
  DEFAULT allow
END`;
    const res = run(dsl, { amount: 20 });
    expect(res.result).toBe('review');
    expect(res.variables).toMatchObject({ base: 1, fuerte: 0 });
  });

  it('a rule without a condition can return directly', () => {
    const dsl = `workflow 'test'
  ruleset 'r'
    'always' return block
  default allow
end`;
    expect(run(dsl).result).toBe('block');
  });

  it('THEN ... CONTINUE accumulates the actions and keeps evaluating', () => {
    const dsl = `workflow 'test'
  ruleset 'tagging'
    'tag' amount > 0 then action('tag_it') continue
  ruleset 'decision'
    'high' amount > 100 return block action('notify')
  default allow
end`;
    const res = run(dsl, { amount: 200 });
    expect(res.result).toBe('block');
    expect(res.actions.map((a) => a.name)).toEqual(['tag_it', 'notify']);
  });

  it('THEN without CONTINUE returns the rule name as result', () => {
    const dsl = `workflow 'test'
  ruleset 'r'
    'flagged' amount > 0 then action('notify')
  default allow
end`;
    const res = run(dsl, { amount: 5 });
    expect(res.result).toBe('flagged');
    expect(res.actions.map((a) => a.name)).toEqual(['notify']);
  });

  it('RETURN without a result returns the rule name', () => {
    const dsl = `workflow 'test'
  ruleset 'r'
    'needs_review' amount > 0 return action('notify')
  default allow
end`;
    const res = run(dsl, { amount: 5 });
    expect(res.result).toBe('needs_review');
    expect(res.actions.map((a) => a.name)).toEqual(['notify']);
  });

  it('AST: a rule without a condition has an empty predicate', () => {
    const ast = new Workflow(`workflow 'test'
  ruleset 'init'
    'init' set $base = 0 continue
  default allow
end`).toJSON();
    const rule = ast.rulesets[0].rules[0];
    expect(rule.predicate.text).toBe('');
    expect(rule.continue).toBe(true);
    expect(rule.setClauses).toEqual([{ variable: 'base', operator: '=', expression: '0' }]);
  });

  it('AST: THEN ... CONTINUE is serialized as inline actions', () => {
    const ast = new Workflow(`workflow 'test'
  ruleset 'tagging'
    'tag' amount > 0 then action('tag_it') continue
  default allow
end`).toJSON();
    const rule = ast.rulesets[0].rules[0];
    expect(rule.continue).toBe(true);
    expect(rule.inlineActions?.map((a: any) => a.name)).toEqual(['tag_it']);
  });
});
