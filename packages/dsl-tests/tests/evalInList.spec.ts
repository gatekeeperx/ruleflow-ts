import { describe, it, expect } from 'vitest';
import { Workflow } from '@ruleflow-ts/dsl-core';

const run = (dsl: string, data: any = {}, lists: any = {}) => new Workflow(dsl).evaluate(data, lists);

describe('evalInList', () => {
  it('basic match', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'other' },
        { field1: 'test' },
        { field1: 'another' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('no match returns default', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'other' },
        { field1: 'another' },
        { field1: 'different' },
      ],
    });
    expect(res.result).toBe('allow');
  });

  it('nested property', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1.field2 = 'value') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: { field2: 'other' } },
        { field1: { field2: 'value' } },
        { field1: { field2: 'another' } },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with comparison (greater than)', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'high_value' evalInList('items', elem.price > 100) return block
  default allow
end`;
    const res = run(dsl, {}, {
      items: [
        { price: 50 },
        { price: 150 },
        { price: 75 },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with AND condition', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' AND elem.field2 = 'value') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'test', field2: 'other' },
        { field1: 'test', field2: 'value' },
        { field1: 'other', field2: 'value' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with OR condition', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' OR elem.field1 = 'other') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'different' },
        { field1: 'test' },
        { field1: 'another' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with not equals', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 <> 'test') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'test' },
        { field1: 'test' },
        { field1: 'other' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with less than', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'low_value' evalInList('items', elem.price < 50) return block
  default allow
end`;
    const res = run(dsl, {}, {
      items: [
        { price: 100 },
        { price: 30 },
        { price: 75 },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with greater than or equal', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'high_value' evalInList('items', elem.price >= 100) return block
  default allow
end`;
    const res = run(dsl, {}, {
      items: [
        { price: 50 },
        { price: 100 },
        { price: 75 },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with parent context access', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = user.id) return block
  default allow
end`;
    const res = run(dsl, { user: { id: 'test123' } }, {
      blacklist: [
        { field1: 'other' },
        { field1: 'test123' },
        { field1: 'another' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('missing list returns default', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('nonexistent', elem.field1 = 'test') return block
  default allow
end`;
    const res = run(dsl, {}, {});
    expect(res.result).toBe('allow');
  });

  it('empty list returns default', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return block
  default allow
end`;
    const res = run(dsl, {}, { blacklist: [] });
    expect(res.result).toBe('allow');
  });

  it('complex predicate with AND and OR', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' AND (elem.field2 > 100 OR elem.field3 = 'active')) return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'test', field2: 50, field3: 'inactive' },
        { field1: 'test', field2: 150, field3: 'inactive' },
        { field1: 'other', field2: 200, field3: 'active' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with string contains', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 contains 'test') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'other' },
        { field1: 'testvalue' },
        { field1: 'another' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with multiple fields AND', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' AND elem.field2 = 'value' AND elem.field3 = 'active') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'test', field2: 'value', field3: 'inactive' },
        { field1: 'test', field2: 'value', field3: 'active' },
        { field1: 'other', field2: 'value', field3: 'active' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('case sensitive match', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'TEST') return block
  default allow
end`;
    const res = run(dsl, {}, {
      blacklist: [
        { field1: 'other' },
        { field1: 'TEST' },
        { field1: 'another' },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with numeric comparison (multiplication)', () => {
    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('items', elem.quantity * elem.price > 1000) return block
  default allow
end`;
    const res = run(dsl, {}, {
      items: [
        { quantity: 5, price: 100 },
        { quantity: 10, price: 150 },
        { quantity: 2, price: 50 },
      ],
    });
    expect(res.result).toBe('block');
  });

  it('with transaction email and date comparison', () => {
    const now = new Date();
    const pastDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate()).toISOString().split('T')[0];
    const futureDate = new Date(now.getFullYear() + 3, now.getMonth(), now.getDate()).toISOString().split('T')[0];
    const currentDate = now.toISOString().split('T')[0];

    const dsl = `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('aList', elem.fieldName1 = transaction.email AND date(elem.endDate) >= date(now())) return block
  default allow
end`;
    const res = run(dsl, { transaction: { email: 'elem1' } }, {
      aList: [
        { fieldName1: 'other', endDate: currentDate },
        { fieldName1: 'elem1', endDate: pastDate },
        { fieldName1: 'elem1', endDate: futureDate },
      ],
    });
    expect(res.result).toBe('block');
  });
});
