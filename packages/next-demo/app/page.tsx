"use client";

import { useState, type ChangeEvent, useEffect } from 'react';

const sampleDsl = `workflow 'demo'
  ruleset 'eligibility'
    'is_adult' user.age >= 18 return 'allow' action('notify', {'id': user.id})
  default 'deny'
end`;

const sampleData = `{
  "user": { "id": "42", "age": 20 }
}`;

const sampleLists = `{
  "vip": ["42", "99"]
}`;

type ExpectedCheck =
  | { type: 'result'; value: string | number | boolean | null }
  | { type: 'matchedRulesLength'; value: number };

type CaseGroup = 'Basics' | 'Strings' | 'Geo' | 'Dates' | 'Lists' | 'SET' | 'CONTINUE' | 'screening()' | 'AML Scoring';
type CaseDef = { id: string; group: CaseGroup; label: string; dsl: string; data: string; lists: string; functions?: string; expect?: ExpectedCheck };

const cases: CaseDef[] = [
  {
    id: 'eligibility',
    group: 'Basics',
    label: 'Elegibilidad básica',
    dsl: `workflow 'demo'
  ruleset 'eligibility'
    'is_adult' user.age >= 18 return 'allow' action('notify', {'id': user.id})
  default 'deny'
end`,
    data: `{"user": {"id": "42", "age": 20}}`,
    lists: `{}`,
    expect: { type: 'result', value: 'allow' },
  },
  {
    id: 'math_precedence',
    group: 'Basics',
    label: 'Math: precedencia',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 2 + 3 * 4 = 14 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'multi_match',
    group: 'Basics',
    label: 'evaluation_mode multi_match',
    dsl: `workflow 'w'
  evaluation_mode multi_match
  ruleset 'rs'
    'r1' 1 = 1 return 'ok'
    'r2' 2 = 2 return 'ok'
  default 'ok'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'aggregation',
    group: 'Basics',
    label: 'Aggregations (count/any)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' items.count() = 3 return 'ok'
    'r2' items.any{ type = 'a' } = true return 'ok'
  default 'ko'
end`,
    data: `{"items": [{"type":"b"}, {"type":"a"}, {"type":"c"}]}`,
    lists: `{}`,
  },
  {
    id: 'geo',
    group: 'Geo',
    label: 'Geo (distance / within_radius)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' distance(37.7749, -122.4194, 34.0522, -118.2437) > 500 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'string_similarity',
    group: 'Strings',
    label: 'String similarity (token_sort_ratio)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' token_sort_ratio('new york mets', 'york new mets') = 100 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'string_distance',
    group: 'Strings',
    label: 'String distance (Levenshtein)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' string_distance('kitten','sitting') = 3 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'partial_ratio',
    group: 'Strings',
    label: 'partial_ratio',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' partial_ratio('new york mets', 'new york mets vs atlanta braves') = 100 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'token_set_ratio',
    group: 'Strings',
    label: 'token_set_ratio',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' token_set_ratio('foo foo bar', 'bar foo') = 100 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'date_ops',
    group: 'Dates',
    label: 'Fechas (date_add / date_subtract)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' date_add('2025-01-01T00:00:00Z', 1, day) > '2025-01-01T00:00:00Z' return 'ok'
    'r2' date_subtract('2025-01-01T12:00:00Z', 1, hour) < '2025-01-01T12:00:00Z' return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'day_of_week',
    group: 'Dates',
    label: 'day_of_week',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' day_of_week('2025-09-14T05:00:00Z') = 'SUNDAY' return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'regex_strip',
    group: 'Strings',
    label: 'regex_strip',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' regex_strip(user.name, '[0-9]') = 'john' return 'ok'
  default 'ko'
end`,
    data: `{"user": {"name": "john123"}}`,
    lists: `{}`,
  },
  {
    id: 'list_in_stored',
    group: 'Lists',
    label: 'List in stored list',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 'red' in list('colors') return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{"colors": ["red","blue"]}`,
    expect: { type: 'result', value: 'ok' },
  },
  {
    id: 'geohash_distance',
    group: 'Geo',
    label: 'Geo: distance(geohash,geohash)',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' distance(geohash_encode(37.7749, -122.4194, 7), geohash_encode(37.7750, -122.4195, 7)) < 0.5 return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'within_radius',
    group: 'Geo',
    label: 'Geo: within_radius',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' within_radius(37.7749, -122.4194, 37.7750, -122.4195, 1) = true return 'ok'
  default 'ko'
end`,
    data: `{}`,
    lists: `{}`,
    expect: { type: 'result', value: 'ok' },
  },

  {
    id: 'set_basic',
    group: 'SET',
    label: 'SET: básico',
    dsl: `workflow 'test'
  ruleset 'check'
    'rule1' amount > 500 set $riskScore = amount * 2 return flagged
  default allow
end`,
    data: `{"amount": 600}`,
    lists: `{}`,
    expect: { type: 'result', value: 'flagged' },
  },
  {
    id: 'set_multiple',
    group: 'SET',
    label: 'SET: múltiples (ref anterior)',
    dsl: `workflow 'test'
  ruleset 'check'
    'rule1' amount > 0 set $base = amount * 2 set $doubled = $base return ok
  default ko
end`,
    data: `{"amount": 10}`,
    lists: `{}`,
  },
  {
    id: 'set_string_literal',
    group: 'SET',
    label: 'SET: con string literal',
    dsl: `workflow 'test'
  ruleset 'check'
    'rule1' amount > 0 set $category = 'high' return ok
  default ko
end`,
    data: `{"amount": 1}`,
    lists: `{}`,
  },
  {
    id: 'set_multi_match',
    group: 'SET',
    label: 'SET: en multi_match',
    dsl: `workflow 'test' evaluation_mode multi_match
  ruleset 'check'
    'rule_a' amount > 0 set $tagA = 'yes' return matched_a
    'rule_b' amount > 0 set $tagB = 'yes' return matched_b
  default allow
end`,
    data: `{"amount": 5}`,
    lists: `{}`,
    expect: { type: 'result', value: 'matched_a' },
  },
  {
    id: 'set_compound_op',
    group: 'SET',
    label: 'SET: compound += operator',
    dsl: `workflow 'test' evaluation_mode multi_match
  ruleset 'check'
    'add_base'  1 = 1 set $total = 10 return ok
    'add_extra' 1 = 1 set $total += 5  return ok
  default ko
end`,
    data: `{}`,
    lists: `{}`,
  },
  {
    id: 'set_custom_function',
    group: 'SET',
    label: 'SET: con custom function',
    dsl: `workflow 'test'
  ruleset 'check'
    'rule1' userId <> '' set $score = riskFn(userId) return done
  default allow
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"riskFn": {"returnValue": 42}}`,
    expect: { type: 'result', value: 'done' },
  },

  {
    id: 'continue_basic',
    group: 'CONTINUE',
    label: 'CONTINUE: básico',
    dsl: `workflow 'test'
  ruleset 'scoring'
    'score' amount > 0 set $score = amount * 2 continue
  ruleset 'decision'
    'high' $score > 100 return block
  default allow
end`,
    data: `{"amount": 200}`,
    lists: `{}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'continue_falls_default',
    group: 'CONTINUE',
    label: 'CONTINUE: cae a default',
    dsl: `workflow 'test'
  ruleset 'scoring'
    'score' amount > 0 set $score = amount * 2 continue
  ruleset 'decision'
    'high' $score > 1000 return block
  default allow
end`,
    data: `{"amount": 10}`,
    lists: `{}`,
    expect: { type: 'result', value: 'allow' },
  },
  {
    id: 'continue_no_set',
    group: 'CONTINUE',
    label: 'CONTINUE: sin SET',
    dsl: `workflow 'test'
  ruleset 'gate'
    'pass' amount > 0 continue
  ruleset 'decision'
    'ok' amount > 5 return approved
  default denied
end`,
    data: `{"amount": 10}`,
    lists: `{}`,
    expect: { type: 'result', value: 'approved' },
  },
  {
    id: 'continue_onboarding',
    group: 'CONTINUE',
    label: 'CONTINUE: multi-ruleset onboarding',
    dsl: `workflow 'onboarding'
  ruleset 'score_occupation'
    'farmer'  occupation = 'farmer'  set $occ = 10 continue
    'student' occupation = 'student' set $occ = 3  continue
  ruleset 'score_country'
    'high_risk' country = 'XX' set $nat = 10 continue
    'local'     country = 'CO' set $nat = 5  continue
  ruleset 'risk_rating'
    'high'   ($occ * 0.5) + ($nat * 0.5) > 7 return high_risk
    'medium' ($occ * 0.5) + ($nat * 0.5) > 4 return medium_risk
  default low_risk
end`,
    data: `{"occupation": "farmer", "country": "XX"}`,
    lists: `{}`,
    expect: { type: 'result', value: 'high_risk' },
  },
  {
    id: 'continue_hard_block',
    group: 'CONTINUE',
    label: 'CONTINUE: hard-block previo',
    dsl: `workflow 'test'
  ruleset 'hard_blocks'
    'blocked' is_blocked return block
  ruleset 'scoring'
    'score' amount > 0 set $score = amount continue
  ruleset 'decision'
    'high' $score > 100 return high_risk
  default allow
end`,
    data: `{"is_blocked": true, "amount": 500}`,
    lists: `{}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'continue_multi_match',
    group: 'CONTINUE',
    label: 'CONTINUE: en multi_match',
    dsl: `workflow 'test' evaluation_mode multi_match
  ruleset 'scoring'
    'score' amount > 0 set $score = amount continue
  ruleset 'tags'
    'high' amount > 100 return high
    'any'  amount > 0   return tagged
  default allow
end`,
    data: `{"amount": 200}`,
    lists: `{}`,
    expect: { type: 'result', value: 'high' },
  },

  {
    id: 'screening_primitive',
    group: 'screening()',
    label: 'screening(): primitivo',
    dsl: `workflow 'test'
  ruleset 'check'
    'match' screening(userId) = 'pass' return approved
  default allow
end`,
    data: `{"userId": "abc123"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": "pass"}}`,
    expect: { type: 'result', value: 'approved' },
  },
  {
    id: 'screening_field_access',
    group: 'screening()',
    label: 'screening(): acceso a campo',
    dsl: `workflow 'test'
  ruleset 'check'
    'high risk' screening(userId).risk_score > 500 return block
  default allow
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": {"risk_score": 750, "label": "high"}}}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'screening_nested_field',
    group: 'screening()',
    label: 'screening(): campo anidado',
    dsl: `workflow 'test'
  ruleset 'check'
    'critical' screening(userId).details.level = 'critical' return prevent
  default allow
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": {"details": {"level": "critical", "reason": "velocity"}}}}`,
    expect: { type: 'result', value: 'prevent' },
  },
  {
    id: 'screening_contains',
    group: 'screening()',
    label: 'screening(): lista contains',
    dsl: `workflow 'test'
  ruleset 'check'
    'fraud tag' screening(userId).tags contains 'fraud' return prevent
  default allow
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": {"tags": ["fraud", "high_risk"]}}}`,
    expect: { type: 'result', value: 'prevent' },
  },
  {
    id: 'screening_any',
    group: 'screening()',
    label: 'screening(): lista any {}',
    dsl: `workflow 'test'
  ruleset 'check'
    'restricted' screening(userId).items.any { type = 'restricted' } return review
  default allow
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": {"items": [{"type": "normal"}, {"type": "restricted"}]}}}`,
    expect: { type: 'result', value: 'review' },
  },
  {
    id: 'screening_set_continue',
    group: 'screening()',
    label: 'screening() + SET + CONTINUE',
    dsl: `workflow 'kyc'
  ruleset 'enrichment'
    'screen' userId <> '' set $risk = screening(userId).risk_score continue
  ruleset 'decision'
    'block' $risk > 80 return block
    'review' $risk > 50 return review
  default approve
end`,
    data: `{"userId": "abc"}`,
    lists: `{}`,
    functions: `{"screening": {"returnValue": {"risk_score": 90}}}`,
    expect: { type: 'result', value: 'block' },
  },

  {
    id: 'aml_weighted_scoring',
    group: 'AML Scoring',
    label: 'AML: scoring ponderado (SET+CONTINUE)',
    dsl: `workflow 'aml_screening'
  ruleset 'score_transaction'
    'large'  transaction_amount > 50000                                   set $txn_score = 10 continue
    'medium' transaction_amount > 10000 AND transaction_amount <= 50000   set $txn_score = 6  continue
    'small'  transaction_amount > 0 AND transaction_amount <= 10000       set $txn_score = 2  continue
  ruleset 'score_country'
    'high'   country_risk = 'high'   set $country_score = 10 continue
    'medium' country_risk = 'medium' set $country_score = 5  continue
    'low'    country_risk = 'low'    set $country_score = 2  continue
  ruleset 'aml_decision'
    'flag'   ($txn_score * 0.5) + ($country_score * 0.5) > 8.0 return flag
    'review' ($txn_score * 0.5) + ($country_score * 0.5) > 5.0 return review
  default clear
end`,
    data: `{"transaction_amount": 75000, "country_risk": "high"}`,
    lists: `{}`,
    expect: { type: 'result', value: 'flag' },
  },
];

type RunStatus = 'idle'|'running'|'pass'|'fail';

export default function HomePage() {
  const [dsl, setDsl] = useState(sampleDsl);
  const [data, setData] = useState(sampleData);
  const [lists, setLists] = useState(sampleLists);
  const [functions, setFunctions] = useState('{}');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('eligibility');
  const [output, setOutput] = useState<string>("");
  const [lastResult, setLastResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, RunStatus>>(() => Object.fromEntries(cases.map(c => [c.id, 'idle'])) as Record<string, RunStatus>);
  const [activeTab, setActiveTab] = useState<'response'|'matchedRules'|'warnings'|'variables'>('response');
  const [activeBodyTab, setActiveBodyTab] = useState<'dsl'|'data'|'lists'|'functions'>('dsl');
  const [url, setUrl] = useState<string>('/api/evaluate');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    try {
      const lsDsl = localStorage.getItem('rf_dsl');
      const lsData = localStorage.getItem('rf_data');
      const lsLists = localStorage.getItem('rf_lists');
      const lsFns = localStorage.getItem('rf_functions');
      if (lsDsl) setDsl(lsDsl);
      if (lsData) setData(lsData);
      if (lsLists) setLists(lsLists);
      if (lsFns) setFunctions(lsFns);
    } catch {}
  }, []);

  // Persistir cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rf_dsl', dsl);
      localStorage.setItem('rf_data', data);
      localStorage.setItem('rf_lists', lists);
      localStorage.setItem('rf_functions', functions);
    } catch {}
  }, [dsl, data, lists, functions]);

  function safeParseJson(label: string, text: string): { ok: true; value: any } | { ok: false; error: string } {
    try {
      if (!text.trim()) return { ok: true, value: {} };
      return { ok: true, value: JSON.parse(text) };
    } catch (e: any) {
      return { ok: false, error: `${label} JSON inválido: ${e?.message || e}` };
    }
  }

  async function evaluate(dslText: string, dataObj: any, listsObj: any, fnsObj: any = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dsl: dslText, data: dataObj, lists: listsObj, functions: fnsObj }),
    });
    const json = await res.json();
    return { ok: res.ok, json };
  }

  const onEvaluate = async () => {
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const pData = safeParseJson('Data', data);
      if (!pData.ok) throw new Error(pData.error);
      const pLists = safeParseJson('Lists', lists);
      if (!pLists.ok) throw new Error(pLists.error);
      const pFns = safeParseJson('Functions', functions);
      if (!pFns.ok) throw new Error(pFns.error);
      const { ok, json } = await evaluate(dsl, pData.value, pLists.value, pFns.value);
      if (!ok) throw new Error(json?.message || "Error evaluando DSL");
      setOutput(JSON.stringify(json, null, 2));
      setLastResult(json);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  const loadCase = (id: string) => {
    const c = cases.find(x => x.id === id);
    if (!c) return;
    setSelectedCaseId(id);
    setDsl(c.dsl);
    setData(c.data);
    setLists(c.lists);
    setFunctions(c.functions ?? '{}');
    setOutput("");
    setLastResult(null);
  };

  const runCase = async (id: string) => {
    const c = cases.find(x => x.id === id);
    if (!c) return;
    setStatuses(s => ({ ...s, [id]: 'running' }));
    const pData = safeParseJson('Data', c.data);
    if (!pData.ok) { setStatuses(s => ({ ...s, [id]: 'fail' })); return; }
    const pLists = safeParseJson('Lists', c.lists);
    if (!pLists.ok) { setStatuses(s => ({ ...s, [id]: 'fail' })); return; }
    const pFns = safeParseJson('Functions', c.functions ?? '{}');
    if (!pFns.ok) { setStatuses(s => ({ ...s, [id]: 'fail' })); return; }
    const { ok, json } = await evaluate(c.dsl, pData.value, pLists.value, pFns.value);
    let passed = !!ok;
    const exp = c.expect ?? { type: 'result', value: 'ok' } as ExpectedCheck;
    if (exp.type === 'result') {
      passed = passed && json?.result === exp.value;
    } else if (exp.type === 'matchedRulesLength') {
      passed = passed && Array.isArray(json?.matchedRules) && json.matchedRules.length === exp.value;
    }
    setStatuses(s => ({ ...s, [id]: passed ? 'pass' : 'fail' }));
    if (id === selectedCaseId) setOutput(JSON.stringify(json, null, 2));
    if (id === selectedCaseId) setLastResult(json);
  };

  const runAll = async () => {
    setError(null);
    for (const c of cases) {
      // eslint-disable-next-line no-await-in-loop
      await runCase(c.id);
    }
  };

  const orderedGroups: CaseGroup[] = [];
  for (const c of cases) {
    if (!orderedGroups.includes(c.group)) orderedGroups.push(c.group);
  }
  const casesByGroup = orderedGroups.map(g => ({ group: g, items: cases.filter(c => c.group === g) }));

  const toggleGroup = (g: string) => setCollapsedGroups(prev => ({ ...prev, [g]: !prev[g] }));

  const passCount = Object.values(statuses).filter(s => s === 'pass').length;
  const failCount = Object.values(statuses).filter(s => s === 'fail').length;
  const runningCount = Object.values(statuses).filter(s => s === 'running').length;

  return (
    <main className="container">
      <h1>Ruleflow Next.js Demo</h1>
      <div className="chips">
        <span className="chip">Casos: {cases.length}</span>
        <span className="chip">Pass: {passCount}</span>
        <span className="chip">Fail: {failCount}</span>
        {runningCount > 0 && <span className="chip">En ejecución: {runningCount}</span>}
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="toolbar">
            <button onClick={() => runAll()}>Run All</button>
            <button onClick={() => setStatuses(Object.fromEntries(cases.map(c => [c.id, 'idle'])) as Record<string, RunStatus>)}>Clear</button>
          </div>
          <h3>Casos</h3>
          <div className="case-list">
            {casesByGroup.map(({ group, items }) => {
              const collapsed = !!collapsedGroups[group];
              const groupPass = items.filter(c => statuses[c.id] === 'pass').length;
              const groupTotal = items.length;
              return (
                <div key={group} className="case-group">
                  <div className="case-group-header" onClick={() => toggleGroup(group)}>
                    <span className="case-group-arrow">{collapsed ? '\u25B6' : '\u25BC'}</span>
                    <span className="case-group-label">{group}</span>
                    <span className="case-group-count">{groupPass}/{groupTotal}</span>
                  </div>
                  {!collapsed && items.map(c => {
                    const st = statuses[c.id];
                    const cls = 'case-item' + (c.id === selectedCaseId ? ' active' : '');
                    const dotClass = 'status-dot ' + (st === 'pass' ? 'status-pass' : st === 'fail' ? 'status-fail' : st === 'running' ? 'status-running' : '');
                    return (
                      <div key={c.id} className={cls} onClick={() => loadCase(c.id)}>
                        <span className={dotClass} />
                        <span style={{ flex: 1 }}>{c.label}</span>
                        <button onClick={(e) => { e.stopPropagation(); runCase(c.id); }}>Run</button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </aside>

        <section>
          <div className="header">
            <select className="input" value={'POST'} disabled>
              <option>POST</option>
            </select>
            <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="/api/evaluate" />
            <button className="btn" onClick={onEvaluate} disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
          </div>

          {error && <pre className="error">{error}</pre>}

          <div className="content-grid">
            <section>
              <div className="panel">
                <div className="tabs">
                  <button className={`tab ${activeBodyTab==='dsl' ? 'active' : ''}`} onClick={() => setActiveBodyTab('dsl')}>DSL</button>
                  <button className={`tab ${activeBodyTab==='data' ? 'active' : ''}`} onClick={() => setActiveBodyTab('data')}>Data (JSON)</button>
                  <button className={`tab ${activeBodyTab==='lists' ? 'active' : ''}`} onClick={() => setActiveBodyTab('lists')}>Lists (JSON)</button>
                  <button className={`tab ${activeBodyTab==='functions' ? 'active' : ''}`} onClick={() => setActiveBodyTab('functions')}>Functions (JSON)</button>
                </div>
                <div className="tab-panel">
                  {activeBodyTab === 'dsl' && (
                    <textarea value={dsl} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDsl(e.target.value)} />
                  )}
                  {activeBodyTab === 'data' && (
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <button
                          onClick={() => {
                            const p = safeParseJson('Data', data);
                            if (!p.ok) return setError(p.error);
                            setData(JSON.stringify(p.value, null, 2));
                          }}
                        >Formatear</button>
                      </div>
                      <textarea value={data} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData(e.target.value)} />
                    </div>
                  )}
                  {activeBodyTab === 'lists' && (
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <button
                          onClick={() => {
                            const p = safeParseJson('Lists', lists);
                            if (!p.ok) return setError(p.error);
                            setLists(JSON.stringify(p.value, null, 2));
                          }}
                        >Formatear</button>
                      </div>
                      <textarea value={lists} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLists(e.target.value)} />
                    </div>
                  )}
                  {activeBodyTab === 'functions' && (
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                        <button
                          onClick={() => {
                            const p = safeParseJson('Functions', functions);
                            if (!p.ok) return setError(p.error);
                            setFunctions(JSON.stringify(p.value, null, 2));
                          }}
                        >Formatear</button>
                      </div>
                      <textarea value={functions} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFunctions(e.target.value)} />
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section>
              <h2>Resultado</h2>
              <div className="tabs">
                <button className={`tab ${activeTab==='response' ? 'active' : ''}`} onClick={() => setActiveTab('response')}>Response</button>
                <button className={`tab ${activeTab==='matchedRules' ? 'active' : ''}`} onClick={() => setActiveTab('matchedRules')}>matchedRules</button>
                <button className={`tab ${activeTab==='variables' ? 'active' : ''}`} onClick={() => setActiveTab('variables')}>variables</button>
                <button className={`tab ${activeTab==='warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>warnings</button>
              </div>
              <div className="tab-panel">
                {activeTab === 'response' && (
                  <pre className="output">{output}</pre>
                )}
                {activeTab === 'matchedRules' && (
                  Array.isArray(lastResult?.matchedRules) && lastResult.matchedRules.length > 0 ? (
                    <ul>
                      {lastResult.matchedRules.map((mr: any, idx: number) => (
                        <li key={idx}>
                          <code>{mr.ruleSet}</code> / <code>{mr.rule}</code> → result: <b>{String(mr.result)}</b>{' '}
                          {Array.isArray(mr.actions) && mr.actions.length > 0 && (
                            <span>(actions: {mr.actions.length})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: '#9aa4b2' }}>—</div>
                  )
                )}
                {activeTab === 'variables' && (
                  lastResult?.variables && Object.keys(lastResult.variables).length > 0 ? (
                    <pre className="output">{JSON.stringify(lastResult.variables, null, 2)}</pre>
                  ) : (
                    <div style={{ color: '#9aa4b2' }}>—</div>
                  )
                )}
                {activeTab === 'warnings' && (
                  Array.isArray(lastResult?.warnings) && lastResult.warnings.length > 0 ? (
                    <ul>
                      {lastResult.warnings.map((w: string, idx: number) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: '#9aa4b2' }}>—</div>
                  )
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
