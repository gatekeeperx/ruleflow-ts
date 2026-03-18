import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

function run(dsl: string, data: any = {}) {
  return new Workflow(dsl).evaluate(data);
}

describe('CONTINUE statement', () => {
  it('continue sets variable and passes control to next ruleset', () => {
    const dsl = `workflow 'test'
  ruleset 'scoring'
    'score' amount > 0 set $score = amount * 2 continue
  ruleset 'decision'
    'high' $score > 100 return block
  default allow
end`;
    const res = run(dsl, { amount: 200 });
    expect(res.result).toBe('block');
    expect(res.variables?.score).toBeCloseTo(400);
  });

  it('continue does not return its own result — decision ruleset resolves', () => {
    const dsl = `workflow 'test'
  ruleset 'scoring'
    'score' amount > 0 set $score = amount * 2 continue
  ruleset 'decision'
    'low' $score <= 10 return low
  default allow
end`;
    const res = run(dsl, { amount: 3 });
    expect(res.result).toBe('low');
    expect(res.ruleSet).toBe('decision');
  });

  it('continue falls to default when no subsequent rule matches', () => {
    const dsl = `workflow 'test'
  ruleset 'scoring'
    'score' amount > 0 set $score = amount * 2 continue
  ruleset 'decision'
    'high' $score > 1000 return block
  default allow
end`;
    const res = run(dsl, { amount: 10 });
    expect(res.result).toBe('allow');
    expect(res.variables?.score).toBeCloseTo(20);
  });

  it('multi-ruleset scoring with continue — onboarding example', () => {
    const dsl = `workflow 'onboarding'
  ruleset 'score_occupation'
    'farmer'  occupation = 'farmer'  set $occ = 10 continue
    'student' occupation = 'student' set $occ = 3  continue
  ruleset 'score_country'
    'high_risk' country = 'XX' set $nat = 10 continue
    'local'     country = 'CO' set $nat = 5  continue
  ruleset 'risk_rating'
    'high'   ($occ * 0.5) + ($nat * 0.5) > 7 return high_risk
    'medium' ($occ * 0.5) + ($nat * 0.5) > 4 return medium_risk
  default low_risk
end`;

    // farmer(10) + high_risk(10) → 10 > 7 → high_risk
    expect(run(dsl, { occupation: 'farmer', country: 'XX' }).result).toBe('high_risk');

    // student(3) + local(5) → 4, not > 4 → low_risk
    expect(run(dsl, { occupation: 'student', country: 'CO' }).result).toBe('low_risk');

    // farmer(10) + local(5) → 7.5 > 7 → high_risk
    expect(run(dsl, { occupation: 'farmer', country: 'CO' }).result).toBe('high_risk');
  });

  it('hard block in earlier ruleset fires before continue rules', () => {
    const dsl = `workflow 'test'
  ruleset 'hard_blocks'
    'blocked' is_blocked return block
  ruleset 'scoring'
    'score' amount > 0 set $score = amount continue
  ruleset 'decision'
    'high' $score > 100 return high_risk
  default allow
end`;

    const blocked = run(dsl, { is_blocked: true, amount: 500 });
    expect(blocked.result).toBe('block');
    expect(blocked.variables?.score).toBeUndefined();

    const scored = run(dsl, { is_blocked: false, amount: 500 });
    expect(scored.result).toBe('high_risk');
    expect(scored.variables?.score).toBeCloseTo(500);
  });

  it('continue with no set clauses passes control cleanly', () => {
    const dsl = `workflow 'test'
  ruleset 'gate'
    'pass' amount > 0 continue
  ruleset 'decision'
    'ok' amount > 5 return approved
  default denied
end`;
    const res = run(dsl, { amount: 10 });
    expect(res.result).toBe('approved');
  });

  it('continue in multi_match does not add to matchedRules', () => {
    const dsl = `workflow 'test' evaluation_mode multi_match
  ruleset 'scoring'
    'score' amount > 0 set $score = amount continue
  ruleset 'tags'
    'high' amount > 100 return high
    'any'  amount > 0   return tagged
  default allow
end`;
    const res = run(dsl, { amount: 200 });
    expect(res.result).toBe('high');
    expect(res.matchedRules?.length).toBe(2);
    expect(res.matchedRules?.every((r) => r.rule !== 'score')).toBe(true);
    expect(res.variables?.score).toBeCloseTo(200);
  });
});