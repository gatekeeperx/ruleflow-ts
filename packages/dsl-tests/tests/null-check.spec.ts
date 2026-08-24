import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

function run(dsl: string, data: any = {}, lists: any = {}) {
  const wf = new Workflow(dsl);
  return wf.evaluate(data, lists);
}

function buildDsl(condition: string) {
  return `workflow 'test'
  ruleset 'dummy'
    'rule_a' ${condition} return 'block'
  default 'allow'
end`;
}

describe('IS NULL', () => {
  it('missing field returns true', () => {
    const res = run(buildDsl('x IS NULL'), {});
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('null value returns true', () => {
    const res = run(buildDsl('x IS NULL'), { x: null });
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('undefined value returns true', () => {
    const res = run(buildDsl('x IS NULL'), { x: undefined });
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('present field returns false', () => {
    const res = run(buildDsl('x IS NULL'), { x: 'hello' });
    expect(res.result).toBe('allow');
  });
});

describe('IS NOT NULL', () => {
  it('present field returns true', () => {
    const res = run(buildDsl('x IS NOT NULL'), { x: 'hello' });
    expect(res.result).toBe('block');
  });

  it('missing field returns false', () => {
    const res = run(buildDsl('x IS NOT NULL'), {});
    expect(res.result).toBe('allow');
    expect(res.warnings).toHaveLength(0);
  });

  it('null value returns false', () => {
    const res = run(buildDsl('x IS NOT NULL'), { x: null });
    expect(res.result).toBe('allow');
    expect(res.warnings).toHaveLength(0);
  });
});

describe('IS EMPTY', () => {
  it('empty string returns true', () => {
    const res = run(buildDsl('x IS EMPTY'), { x: '' });
    expect(res.result).toBe('block');
  });

  it('missing field returns true', () => {
    const res = run(buildDsl('x IS EMPTY'), {});
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('null value returns true', () => {
    const res = run(buildDsl('x IS EMPTY'), { x: null });
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('non-empty string returns false', () => {
    const res = run(buildDsl('x IS EMPTY'), { x: 'hello' });
    expect(res.result).toBe('allow');
  });

  it('non-string value returns false', () => {
    const res = run(buildDsl('x IS EMPTY'), { x: 42 });
    expect(res.result).toBe('allow');
  });
});

describe('IS NOT EMPTY', () => {
  it('non-empty string returns true', () => {
    const res = run(buildDsl('x IS NOT EMPTY'), { x: 'hello' });
    expect(res.result).toBe('block');
  });

  it('empty string returns false', () => {
    const res = run(buildDsl('x IS NOT EMPTY'), { x: '' });
    expect(res.result).toBe('allow');
  });
});

describe('IS BLANK', () => {
  it('whitespace-only returns true', () => {
    const res = run(buildDsl('x IS BLANK'), { x: '   ' });
    expect(res.result).toBe('block');
  });

  it('empty string returns true', () => {
    const res = run(buildDsl('x IS BLANK'), { x: '' });
    expect(res.result).toBe('block');
  });

  it('missing field returns true', () => {
    const res = run(buildDsl('x IS BLANK'), {});
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('non-blank string returns false', () => {
    const res = run(buildDsl('x IS BLANK'), { x: 'hello' });
    expect(res.result).toBe('allow');
  });
});

describe('IS NOT BLANK', () => {
  it('non-blank string returns true', () => {
    const res = run(buildDsl('x IS NOT BLANK'), { x: 'hello' });
    expect(res.result).toBe('block');
  });

  it('whitespace-only returns false', () => {
    const res = run(buildDsl('x IS NOT BLANK'), { x: '   ' });
    expect(res.result).toBe('allow');
  });
});

describe('combinations', () => {
  it('IS NOT NULL AND other condition', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'rule_a' x IS NOT NULL AND x <> 'test' return 'block'
  default 'allow'
end`;
    const res = run(dsl, { x: 'hello' });
    expect(res.result).toBe('block');
  });

  it('IS NOT NULL AND other condition with missing field', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'rule_a' x IS NOT NULL AND x <> 'test' return 'block'
  default 'allow'
end`;
    const res = run(dsl, {});
    expect(res.result).toBe('allow');
  });
});

describe('nested properties', () => {
  it('nested null value', () => {
    const res = run(buildDsl('device.fingerprint IS NULL'), { device: { fingerprint: null } });
    expect(res.result).toBe('block');
    expect(res.warnings).toHaveLength(0);
  });

  it('nested present value', () => {
    const res = run(buildDsl('device.fingerprint IS NULL'), { device: { fingerprint: 'fp-123' } });
    expect(res.result).toBe('allow');
  });

  it('nested IS NOT NULL present', () => {
    const res = run(buildDsl('device.fingerprint IS NOT NULL'), { device: { fingerprint: 'fp-123' } });
    expect(res.result).toBe('block');
  });
});

describe('case insensitivity', () => {
  it('lowercase is null', () => {
    const res = run(buildDsl('x is null'), {});
    expect(res.result).toBe('block');
  });

  it('mixed case Is Not Empty', () => {
    const res = run(buildDsl('x Is Not Empty'), { x: 'hello' });
    expect(res.result).toBe('block');
  });
});
