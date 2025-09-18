import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('Date operations', () => {
  it('dateDiff minute/hour/day', () => {
    const minute = `workflow 'w'
  ruleset 'rs'
    'r1' dateDiff('2025-01-01T00:00:00Z', '2025-01-01T00:05:00Z', minute) = 5 return 'ok'
  default 'ko'
end`;
    expect(run(minute).result).toBe('ok');

    const hour = `workflow 'w'
  ruleset 'rs'
    'r1' dateDiff('2025-01-01T00:00:00Z', '2025-01-01T03:00:00Z', hour) = 3 return 'ok'
  default 'ko'
end`;
    expect(run(hour).result).toBe('ok');

    const day = `workflow 'w'
  ruleset 'rs'
    'r1' dateDiff('2025-01-01T00:00:00Z', '2025-01-02T00:00:00Z', day) = 1 return 'ok'
  default 'ko'
end`;
    expect(run(day).result).toBe('ok');
  });

  it('day_of_week uses UTC', () => {
    const dsl = `workflow 'w'
  ruleset 'rs'
    'r1' day_of_week('2025-09-14T05:00:00Z') = 'SUNDAY' return 'ok'
  default 'ko'
end`;
    expect(run(dsl).result).toBe('ok');
  });

  it('date_add and date_subtract', () => {
    const add = `workflow 'w'
  ruleset 'rs'
    'r1' date_add('2025-01-01T00:00:00Z', 1, day) > '2025-01-01T00:00:00Z' return 'ok'
  default 'ko'
end`;
    expect(run(add).result).toBe('ok');

    const sub = `workflow 'w'
  ruleset 'rs'
    'r1' date_subtract('2025-01-01T12:00:00Z', 1, hour) < '2025-01-01T12:00:00Z' return 'ok'
  default 'ko'
end`;
    expect(run(sub).result).toBe('ok');
  });

  it('dateParse date/datetime with now()', () => {
    const dateNow = `workflow 'w'
  ruleset 'rs'
    'r1' datetime(now()) > '2000-01-01T00:00:00Z' return 'ok'
  default 'ko'
end`;
    expect(run(dateNow).result).toBe('ok');
  });
});
