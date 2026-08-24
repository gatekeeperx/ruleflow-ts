import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

function run(dsl: string, data: any = {}, lists: any = {}) {
  const wf = new Workflow(dsl);
  return wf.evaluate(data, lists);
}

describe('case-insensitive property resolution', () => {
  it('rule lowercase matches payload uppercase key', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' user_id = 15 return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { User_Id: 15 });
    expect(res.result).toBe('ok');
  });

  it('rule uppercase matches payload lowercase key', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' User_Id = 15 return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { user_id: 15 });
    expect(res.result).toBe('ok');
  });

  it('nested property with different casing resolves', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' customer.name = 'John' return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { Customer: { Name: 'John' } });
    expect(res.result).toBe('ok');
  });

  it('member access via expression with different casing resolves', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' customer.address.city = 'NYC' return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { Customer: { Address: { City: 'NYC' } } });
    expect(res.result).toBe('ok');
  });

  it('aggregation predicate with different casing resolves', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' items.any { Status = 'active' } return 'ok'
  default 'ko'
end`;
    const res = run(dsl, {
      Items: [{ status: 'active' }],
    });
    expect(res.result).toBe('ok');
  });

  it('exact case match is preferred', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' name = 'exact' return 'ok'
  default 'ko'
end`;
    const res = run(dsl, { name: 'exact', Name: 'wrong' });
    expect(res.result).toBe('ok');
  });
});
