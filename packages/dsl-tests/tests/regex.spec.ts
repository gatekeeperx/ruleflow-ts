import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('Regex-like operations', () => {
  it('regex_strip removes digits from property', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' regex_strip(user.name, '[0-9]') = 'john' return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { user: { name: 'john123' } });
    expect(res.result).toBe('ok');
  });
});
