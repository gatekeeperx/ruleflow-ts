import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('Geo operations', () => {
  it('distance between coordinates (SF to LA) > 500 km', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' distance(37.7749, -122.4194, 34.0522, -118.2437) > 500 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('distance between geohashes (encoded) small delta', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' distance(geohash_encode(37.7749, -122.4194, 7), geohash_encode(37.7750, -122.4195, 7)) < 0.5 return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });

  it('within_radius true for very close points', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' within_radius(37.7749, -122.4194, 37.7750, -122.4195, 1) = true return 'ok'
  default 'ko'
end`;
    const res = run(dsl);
    expect(res.result).toBe('ok');
  });
});
