import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('List and TupleList', () => {
  it('list contains literal', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' 'hello world' contains 'hello','bye' return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('list in stored list', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' 'red' in list('colors') return 'ok'
  default 'ko'
end`;
    const res = run(dsl, {}, { colors: ['red', 'blue'] });
    expect(res.result).toBe('ok');
  });

  it('list starts_with', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' 'foobar' starts_with 'foo','bar' return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('tupleList contains (property tuple against literal tuple list)', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' (user.name, user.role) in (( 'john', 'admin' ), ( 'jane', 'user' )) return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { user: { name: 'john', role: 'admin' } });
    expect(res.result).toBe('ok');
  });

  it('storedListExpr with any — item matches predicate', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' list('users').any { it.role = 'admin' } return 'ok'
  default 'ko'
end`;
    const lists = { users: [{ role: 'user' }, { role: 'admin' }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });

  it('storedListExpr with none — no item matches predicate', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' list('users').none { it.role = 'superadmin' } return 'ok'
  default 'ko'
end`;
    const lists = { users: [{ role: 'user' }, { role: 'admin' }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });

  it('storedListExpr with count predicate', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' list('txns').count { it.amount > 100 } > 2 return 'ok'
  default 'ko'
end`;
    const lists = { txns: [{ amount: 50 }, { amount: 200 }, { amount: 150 }, { amount: 300 }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });

  it('storedListExpr with count() — count all items', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' list('items').count() = 3 return 'ok'
  default 'ko'
end`;
    const lists = { items: ['a', 'b', 'c'] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });
});
