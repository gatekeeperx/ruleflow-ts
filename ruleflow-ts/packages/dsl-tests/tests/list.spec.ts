import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow/dsl-core';

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
});
