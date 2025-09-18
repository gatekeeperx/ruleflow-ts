import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('String similarity operations', () => {
  it('string_distance (Levenshtein) exact', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' string_distance('kitten','sitting') = 3 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('partial_ratio detects contained substring', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' partial_ratio('new york mets', 'new york mets vs atlanta braves') = 100 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('token_sort_ratio is order-insensitive', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' token_sort_ratio('new york mets', 'york new mets') = 100 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('token_set_ratio collapses duplicates', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' token_set_ratio('foo foo bar', 'bar foo') = 100 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('string_similarity_score returns normalized ratio (3 decimals)', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' string_similarity_score('foo','foobar') = 0.5 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });
});
