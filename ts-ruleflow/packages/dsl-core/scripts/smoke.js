/* Smoke tests for @ruleflow/dsl-core */
const { Workflow } = require('../dist/index.js');

const cases = [
    {
        name: 'math precedence and return string',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' x + y * z = 15 return 'ok'
  default 'ko'
end`,
        data: { x: 15, y: 22, z: 0 },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'list contains literal',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 'hello world' contains 'hello','bye' return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'list in stored list (K_LIST)',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 'red' in list('colors') return 'ok'
  default 'ko'
end`,
        data: {},
        lists: { colors: ['red', 'blue'] },
        expect: 'ok',
    },
    {
        name: 'boolean and/or',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 'a' = 'a' and (1 = 0 or 2 = 2) return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'unary abs',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' abs( -5 + 3 ) = 2 return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'regex_strip',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' regex_strip(user.name, '[0-9]') = 'john' return 'ok'
  default 'ko'
end`,
        data: { user: { name: 'john123' } },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'then actions only (result allow)',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 1 = 1 then action('flag', {'level': 'high', 'id': '123'})
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'allow',
    },
    {
        name: 'return with actions and property param',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' user.id = '42' return 'ok' action('notify', {'id': user.id})
  default 'ko'
end`,
        data: { user: { id: '42' } },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'return expr(...) value',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 1 = 1 return expr(1 + 1)
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: '2',
    },
    {
        name: 'dateDiff day',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' dateDiff('2025-01-01T00:00:00Z', '2025-01-02T00:00:00Z', day) = 1 return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'day_of_week',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' day_of_week('2025-09-14T05:00:00Z') = 'SUNDAY' return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'date_add day',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' date_add('2025-01-01T00:00:00Z', 1, day) > '2025-01-01T00:00:00Z' return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'date_subtract hour',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' date_subtract('2025-01-01T12:00:00Z', 1, hour) < '2025-01-01T12:00:00Z' return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'dateParse date(now()) is today (>= start of today)',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' datetime(now()) > '2000-01-01T00:00:00Z' return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'evaluation_mode multi_match aggregates matchedRules',
        dsl: `workflow 'w'
  evaluation_mode multi_match
  ruleset 'rs'
    'r1' 1 = 1 return 'A'
    'r2' 2 = 2 return 'B'
  default 'ko'
end`,
        data: {},
        lists: {},
        check: (res) => res.matchedRules && res.matchedRules.length === 2 && res.result === 'A',
    },
    {
        name: 'aggregation COUNT with empty predicate',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' items.count() = 3 return 'ok'
  default 'ko'
end`,
        data: { items: [1, 2, 3] },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'aggregation ANY with predicate on property',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' items.any{ type = 'a' } = true return 'ok'
  default 'ko'
end`,
        data: { items: [{ type: 'b' }, { type: 'a' }] },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'aggregation NONE with literal value predicate',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' items.none{ 'blocked' } = true return 'ok'
  default 'ko'
end`,
        data: { items: ['open', 'done'] },
        lists: {},
        expect: 'ok',
    },
    {
        name: 'geo distance between geohashes (encode) small delta',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' distance(geohash_encode(37.7749, -122.4194, 7), geohash_encode(37.7750, -122.4195, 7)) < 0.5 return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'geo distance numeric comparator (SF to LA)',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' distance(37.7749, -122.4194, 34.0522, -118.2437) > 500 return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
    {
        name: 'geo within_radius true (very close points)',
        dsl: `workflow 'w'
  ruleset 'rs'
    'r1' within_radius(37.7749, -122.4194, 37.7750, -122.4195, 1) = true return 'ok'
  default 'ko'
end`,
        data: {},
        lists: {},
        expect: 'ok',
    },
];

let pass = 0;
for (const c of cases) {
    try {
        const wf = new Workflow(c.dsl);
        const res = wf.evaluate(c.data, c.lists);
        let ok;
        if (typeof c.check === 'function') {
            ok = !!c.check(res);
            console.log(`${ok ? 'PASS' : 'FAIL'} - ${c.name}: custom check`);
        } else {
            ok = res.result === c.expect;
            console.log(`${ok ? 'PASS' : 'FAIL'} - ${c.name}: got=${res.result} expect=${c.expect}`);
        }
        if (ok) pass++;
    } catch (e) {
        console.error(`ERROR - ${c.name}:`, e && (e.stack || e));
    }
}

console.log(`\n${pass}/${cases.length} passed`);
