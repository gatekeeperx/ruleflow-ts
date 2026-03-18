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

describe('custom functions', () => {
  it('primitive string return', () => {
    const res = run(
      TEMPLATE("'match' screening(userId) = 'pass' return approved"),
      { userId: 'abc123' },
      {},
      { screening: () => 'pass' }
    );
    expect(res.result).toBe('approved');
  });

  it('multiple args', () => {
    const res = run(
      TEMPLATE("'high score' score(age, income) >= 700 return approved"),
      { age: 300, income: 500 },
      {},
      { score: ([age, income]: any[]) => (age as number) + (income as number) }
    );
    expect(res.result).toBe('approved');
  });

  it('no args', () => {
    const res = run(
      TEMPLATE("'active' getStatus() = 'active' return ok"),
      {},
      {},
      { getStatus: () => 'active' }
    );
    expect(res.result).toBe('ok');
  });

  it('boolean return', () => {
    const res = run(
      TEMPLATE("'blocked' isBlocked(userId) return block"),
      { userId: 'u1' },
      {},
      { isBlocked: () => true }
    );
    expect(res.result).toBe('block');
  });

  it('arithmetic on return value', () => {
    const res = run(
      TEMPLATE("'high' multiplier(x) * 10 > 50 return reject"),
      { x: 2 },
      {},
      { multiplier: () => 6 }
    );
    expect(res.result).toBe('reject');
  });

  it('structured return — field access via memberAccess', () => {
    const res = run(
      TEMPLATE("'high risk' screening(userId).risk_score > 500 return block"),
      { userId: 'abc' },
      {},
      { screening: () => ({ risk_score: 750, label: 'high' }) }
    );
    expect(res.result).toBe('block');
  });

  it('structured return — field access no match', () => {
    const res = run(
      TEMPLATE("'high risk' screening(userId).risk_score > 500 return block"),
      { userId: 'abc' },
      {},
      { screening: () => ({ risk_score: 300 }) }
    );
    expect(res.result).toBe('allow');
  });

  it('nested field access via chained memberAccess', () => {
    const res = run(
      TEMPLATE("'critical' screening(userId).details.level = 'critical' return prevent"),
      { userId: 'abc' },
      {},
      { screening: () => ({ details: { level: 'critical', reason: 'velocity' } }) }
    );
    expect(res.result).toBe('prevent');
  });

  it('field access returning list — contains', () => {
    const res = run(
      TEMPLATE("'fraud tag' screening(userId).tags contains 'fraud' return prevent"),
      { userId: 'abc' },
      {},
      { screening: () => ({ tags: ['fraud', 'high_risk'] }) }
    );
    expect(res.result).toBe('prevent');
  });

  it('field access returning list — aggregation', () => {
    const res = run(
      TEMPLATE("'restricted' screening(userId).items.any { type = 'restricted' } return review"),
      { userId: 'abc' },
      {},
      { screening: () => ({ items: [{ type: 'normal' }, { type: 'restricted' }] }) }
    );
    expect(res.result).toBe('review');
  });

  it('multiple functions — first rule matches fnA', () => {
    const dsl = `workflow 'multi'
  ruleset 'check'
    'first rule'  fnA(x) = 'yes' return matched_a
    'second rule' fnB(y) > 10   return matched_b
  default allow
end`;
    const res = run(dsl, { x: 'input', y: 5 }, {}, {
      fnA: () => 'yes',
      fnB: () => 20,
    });
    expect(res.result).toBe('matched_a');
  });

  it('undefined function falls to default with a warning', () => {
    const res = run(
      TEMPLATE("'match' undefinedFn(x) = 'ok' return approved"),
      { x: 'val' }
    );
    expect(res.result).toBe('allow');
    expect(res.warnings?.length).toBeGreaterThan(0);
  });

  it('function result is memoized — called only once', () => {
    let callCount = 0;
    const dsl = `workflow 'test'
  ruleset 'check'
    'r1' fn(x) = 'a' return first
    'r2' fn(x) = 'a' return second
  default allow
end`;
    const fn = (args: unknown[]) => { callCount++; return 'a'; };
    const res = new Workflow(dsl).evaluate({ x: 1 }, {}, { fn });
    expect(res.result).toBe('first');
    expect(callCount).toBe(1);
  });

  it('function used inside SET clause', () => {
    const res = run(
      TEMPLATE("'r1' userId <> '' set $risk = assess(userId) return done"),
      { userId: 'abc' },
      {},
      { assess: () => 99 }
    );
    expect(res.result).toBe('done');
    expect(res.variables?.risk).toBe(99);
  });
});

describe('member access on plain properties', () => {
  it('nested property a.b still works via memberAccess', () => {
    const res = run(
      TEMPLATE("'r1' user.age > 18 return adult"),
      { user: { age: 25 } }
    );
    expect(res.result).toBe('adult');
  });

  it('triple-nested a.b.c works via chained memberAccess', () => {
    const res = run(
      TEMPLATE("'r1' a.b.c > 5 return deep"),
      { a: { b: { c: 10 } } }
    );
    expect(res.result).toBe('deep');
  });
});