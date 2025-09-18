import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('Math and Comparator', () => {
  it('precedence * before +', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' x + y * z = 15 return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { x: 3, y: 6, z: 2 });
    expect(res.result).toBe('ok');
  });

  it('parenthesis overrides precedence', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' (x + y) * z = 18 return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { x: 3, y: 6, z: 2 });
    expect(res.result).toBe('ok');
  });

  it('numeric comparators LT, GT, EQ', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' (x < y and y > x and x + 2 == y) = true return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { x: 3, y: 5 });
    expect(res.result).toBe('ok');
  });

  it('string equality case sensitive and insensitive', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' ('Abc' == 'Abc' and 'aBc' = 'ABC') = true return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });
});
