import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow/dsl-core';

function run(dsl: string, data: any = {}, lists: any = {}) {
  const wf = new Workflow(dsl);
  return wf.evaluate(data, lists);
}

describe('@ruleflow/dsl-core golden tests', () => {
  it('math precedence and return string', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' x + y * z = 15 return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { x: 15, y: 22, z: 0 });
    expect(res.result).toBe('ok');
  });

  it('evaluation_mode multi_match aggregates matchedRules', () => {
    const dsl = `workflow 'w'
  evaluation_mode multi_match
  ruleset 'rs'
    'r1' 1 = 1 return 'A'
    'r2' 2 = 2 return 'B'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('A');
    expect(res.matchedRules?.length).toBe(2);
  });

  it('actions with property param', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' user.id = '42' return 'ok' action('notify', {'id': user.id})
  default 'ko'
end`;
    const res = run(dsl, { user: { id: '42' } });
    expect(res.result).toBe('ok');
    expect(res.actions?.[0]).toEqual({ name: 'notify', params: { id: '42' } });
  });

  it('dateDiff day', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' dateDiff('2025-01-01T00:00:00Z', '2025-01-02T00:00:00Z', day) = 1 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });
});
