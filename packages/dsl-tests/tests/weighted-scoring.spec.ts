import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const AML_WORKFLOW = `workflow 'aml_screening'
  ruleset 'score_transaction'
    'large'  transaction_amount > 50000                                   set $txn_score = 10 continue
    'medium' transaction_amount > 10000 AND transaction_amount <= 50000   set $txn_score = 6  continue
    'small'  transaction_amount > 0 AND transaction_amount <= 10000       set $txn_score = 2  continue

  ruleset 'score_country'
    'high'   country_risk = 'high'   set $country_score = 10 continue
    'medium' country_risk = 'medium' set $country_score = 5  continue
    'low'    country_risk = 'low'    set $country_score = 2  continue

  ruleset 'aml_decision'
    'flag'   ($txn_score * 0.5) + ($country_score * 0.5) > 8.0 return flag
    'review' ($txn_score * 0.5) + ($country_score * 0.5) > 5.0 return review

  default clear
end`;

function run(data: any) {
  return new Workflow(AML_WORKFLOW).evaluate(data);
}

function num(vars: Record<string, unknown> | undefined, key: string) {
  return Number(vars?.[key]);
}

describe('AML weighted scoring (SET + CONTINUE)', () => {
  it('large amount + high risk → flag', () => {
    const r = run({ transaction_amount: 75000, country_risk: 'high' });
    expect(r.result).toBe('flag');
    expect(num(r.variables, 'txn_score')).toBeCloseTo(10);
    expect(num(r.variables, 'country_score')).toBeCloseTo(10);
  });

  it('large amount + medium risk → review', () => {
    // (10*0.5) + (5*0.5) = 7.5 — not > 8 → review
    const r = run({ transaction_amount: 75000, country_risk: 'medium' });
    expect(r.result).toBe('review');
    expect(num(r.variables, 'txn_score')).toBeCloseTo(10);
    expect(num(r.variables, 'country_score')).toBeCloseTo(5);
  });

  it('medium amount + high risk → review', () => {
    // (6*0.5) + (10*0.5) = 8.0 — not > 8 → review
    const r = run({ transaction_amount: 20000, country_risk: 'high' });
    expect(r.result).toBe('review');
    expect(num(r.variables, 'txn_score')).toBeCloseTo(6);
    expect(num(r.variables, 'country_score')).toBeCloseTo(10);
  });

  it('medium amount + medium risk → review', () => {
    // (6*0.5) + (5*0.5) = 5.5 > 5.0 → review
    const r = run({ transaction_amount: 20000, country_risk: 'medium' });
    expect(r.result).toBe('review');
  });

  it('small amount + low risk → clear (default)', () => {
    // (2*0.5) + (2*0.5) = 2.0 — not > 5 → clear
    const r = run({ transaction_amount: 5000, country_risk: 'low' });
    expect(r.result).toBe('clear');
    expect(num(r.variables, 'txn_score')).toBeCloseTo(2);
    expect(num(r.variables, 'country_score')).toBeCloseTo(2);
  });

  it('variables are exposed on the result', () => {
    const r = run({ transaction_amount: 20000, country_risk: 'medium' });
    expect(r.variables).toHaveProperty('txn_score');
    expect(r.variables).toHaveProperty('country_score');
  });

  it('matched ruleset is reported as the decision ruleset', () => {
    const r = run({ transaction_amount: 75000, country_risk: 'high' });
    expect(r.ruleSet).toBe('aml_decision');
  });
});