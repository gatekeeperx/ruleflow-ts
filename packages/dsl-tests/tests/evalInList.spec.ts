import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('evalInList', () => {
  it('basic match using elem.field', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' evalInList('accounts', elem.status = 'active') return 'ok'
  default 'ko'
end`;
    const lists = { accounts: [{ status: 'pending' }, { status: 'active' }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });

  it('match using it alias', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' evalInList('accounts', it.status = 'active') return 'ok'
  default 'ko'
end`;
    const lists = { accounts: [{ status: 'pending' }, { status: 'active' }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ok');
  });

  it('returns false when no item matches', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' evalInList('accounts', elem.status = 'active') return 'ok'
  default 'ko'
end`;
    const lists = { accounts: [{ status: 'pending' }, { status: 'suspended' }] };
    const res = run(dsl, {}, lists);
    expect(res.result).toBe('ko');
  });

  it('parent context accessible alongside elem.*', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' evalInList('flags', elem.code = suspectCode) return 'ok'
  default 'ko'
end`;
    const data = { suspectCode: 'HIGH' };
    const lists = { flags: [{ code: 'LOW' }, { code: 'HIGH' }] };
    const res = run(dsl, data, lists);
    expect(res.result).toBe('ok');
  });

  it('missing list returns false', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' evalInList('missing', elem.x = 1) return 'ok'
  default 'ko'
end`;
    const res = run(dsl, {}, {});
    expect(res.result).toBe('ko');
  });
});