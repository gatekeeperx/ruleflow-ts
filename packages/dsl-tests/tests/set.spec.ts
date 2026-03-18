import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const TEMPLATE = (rule: string) => `workflow 'test'
  ruleset 'check'
    ${rule}
  default allow
end`;

function run(dsl: string, data: any = {}, lists: any = {}, fns: any = {}) {
  return new Workflow(dsl).evaluate(data, lists, fns);
}

describe('SET statement', () => {
  it('basic set is exposed in result variables', () => {
    const res = run(TEMPLATE("'rule1' amount > 500 set $riskScore = amount * 2 return flagged"), { amount: 600 });
    expect(res.result).toBe('flagged');
    expect(res.variables?.riskScore).toBeCloseTo(1200);
  });

  it('multiple set clauses execute top-to-bottom, referencing earlier vars', () => {
    const res = run(TEMPLATE("'rule1' amount > 0 set $base = amount * 2 set $doubled = $base return ok"), { amount: 10 });
    expect(res.result).toBe('ok');
    expect(res.variables?.base).toBeCloseTo(20);
    expect(res.variables?.doubled).toBeCloseTo(20);
  });

  it('set variable used in subsequent rule condition (single match returns on first)', () => {
    const dsl = `workflow 'test'
  ruleset 'check'
    'first' amount > 100 set $flag = 1 return first_matched
    'second' $flag == 1 return second_matched
  default allow
end`;
    const res = run(dsl, { amount: 200 });
    expect(res.result).toBe('first_matched');
    expect(res.variables?.flag).toBe(1);
  });

  it('set variable propagates across rulesets (single match returns on first hit)', () => {
    const dsl = `workflow 'test'
  ruleset 'scoring'
    'score_rule' amount > 0 set $score = amount * 3 return scored
  ruleset 'decision'
    'high' $score > 100 return block
  default allow
end`;
    const res = run(dsl, { amount: 50 });
    expect(res.result).toBe('scored');
    expect(res.variables?.score).toBeCloseTo(150);
  });

  it('set variable does not shadow request field', () => {
    const dsl = `workflow 'test'
  ruleset 'check'
    'setter' amount > 0 set $amount = 9999 return set_done
    'verify' amount > 9000 return shadowed
  default allow
end`;
    const res = run(dsl, { amount: 100 });
    expect(res.result).toBe('set_done');
    expect(res.variables?.amount).toBe(9999);
  });

  it('set with a custom function', () => {
    const res = run(
      TEMPLATE("'rule1' userId <> '' set $score = riskFn(userId) return done"),
      { userId: 'abc' },
      {},
      { riskFn: () => 42 }
    );
    expect(res.result).toBe('done');
    expect(res.variables?.score).toBe(42);
  });

  it('no set clauses — backward compatible, empty variables', () => {
    const res = run(TEMPLATE("'rule1' amount > 10 return approved"), { amount: 50 });
    expect(res.result).toBe('approved');
    expect(res.variables).toEqual({});
  });

  it('set clause with string literal', () => {
    const res = run(TEMPLATE("'rule1' amount > 0 set $category = 'high' return ok"), { amount: 1 });
    expect(res.result).toBe('ok');
    expect(res.variables?.category).toBe('high');
  });

  it('default result has empty variables when no rule matches', () => {
    const res = run(TEMPLATE("'rule1' amount > 1000 set $x = 1 return flagged"), { amount: 1 });
    expect(res.result).toBe('allow');
    expect(res.variables).toEqual({});
  });

  it('set variables accumulate across matched rules in multi_match', () => {
    const dsl = `workflow 'test' evaluation_mode multi_match
  ruleset 'check'
    'rule_a' amount > 0 set $tagA = 'yes' return matched_a
    'rule_b' amount > 0 set $tagB = 'yes' return matched_b
  default allow
end`;
    const res = run(dsl, { amount: 5 });
    expect(res.result).toBe('matched_a');
    expect(res.matchedRules?.length).toBe(2);
    expect(res.variables?.tagA).toBe('yes');
    expect(res.variables?.tagB).toBe('yes');
  });
});