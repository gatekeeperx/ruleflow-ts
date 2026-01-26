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

type CaseDef = { id: string; label: string; dsl: string; data: string; lists: string; expect?: ExpectedCheck };

const cases: CaseDef[] = [
  {
    id: 'eligibility',
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
    id: 'evalInList_basic',
    label: 'evalInList: match básico',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": [{"field1": "other"}, {"field1": "test"}, {"field1": "another"}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_no_match',
    label: 'evalInList: sin match',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": [{"field1": "other"}, {"field1": "another"}]}`,
    expect: { type: 'result', value: 'allow' },
  },
  {
    id: 'evalInList_nested',
    label: 'evalInList: propiedad anidada',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1.field2 = 'value') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": [{"field1": {"field2": "other"}}, {"field1": {"field2": "value"}}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_comparison',
    label: 'evalInList: comparación numérica',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'high_value' evalInList('items', elem.price > 100) return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"items": [{"price": 50}, {"price": 150}, {"price": 75}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_and',
    label: 'evalInList: condición AND',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' AND elem.field2 = 'value') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": [{"field1": "test", "field2": "other"}, {"field1": "test", "field2": "value"}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_or',
    label: 'evalInList: condición OR',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test' OR elem.field1 = 'other') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": [{"field1": "different"}, {"field1": "test"}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_parent_context',
    label: 'evalInList: acceso a contexto padre',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = user.id) return 'block'
  default 'allow'
end`,
    data: `{"user": {"id": "test123"}}`,
    lists: `{"blacklist": [{"field1": "other"}, {"field1": "test123"}]}`,
    expect: { type: 'result', value: 'block' },
  },
  {
    id: 'evalInList_empty',
    label: 'evalInList: lista vacía',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('blacklist', elem.field1 = 'test') return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"blacklist": []}`,
    expect: { type: 'result', value: 'allow' },
  },
  {
    id: 'evalInList_math',
    label: 'evalInList: operación matemática',
    dsl: `workflow 'test'
  ruleset 'dummy'
    'blocked' evalInList('items', elem.quantity * elem.price > 1000) return 'block'
  default 'allow'
end`,
    data: `{}`,
    lists: `{"items": [{"quantity": 5, "price": 100}, {"quantity": 10, "price": 150}]}`,
    expect: { type: 'result', value: 'block' },
  },
];

type RunStatus = 'idle' | 'running' | 'pass' | 'fail';

export default function HomePage() {
  const [dsl, setDsl] = useState(sampleDsl);
  const [data, setData] = useState(sampleData);
  const [lists, setLists] = useState(sampleLists);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('eligibility');
  const [output, setOutput] = useState<string>("");
  const [lastResult, setLastResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, RunStatus>>(() => Object.fromEntries(cases.map(c => [c.id, 'idle'])) as Record<string, RunStatus>);
  const [activeTab, setActiveTab] = useState<'response' | 'matchedRules' | 'warnings'>('response');
  const [activeBodyTab, setActiveBodyTab] = useState<'dsl' | 'data' | 'lists'>('dsl');
  const [url, setUrl] = useState<string>('/api/evaluate');

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    try {
      const lsDsl = localStorage.getItem('rf_dsl');
      const lsData = localStorage.getItem('rf_data');
      const lsLists = localStorage.getItem('rf_lists');
      if (lsDsl) setDsl(lsDsl);
      if (lsData) setData(lsData);
      if (lsLists) setLists(lsLists);
    } catch { }
  }, []);

  // Persistir cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rf_dsl', dsl);
      localStorage.setItem('rf_data', data);
      localStorage.setItem('rf_lists', lists);
    } catch { }
  }, [dsl, data, lists]);

  function safeParseJson(label: string, text: string): { ok: true; value: any } | { ok: false; error: string } {
    try {
      if (!text.trim()) return { ok: true, value: {} };
      return { ok: true, value: JSON.parse(text) };
    } catch (e: any) {
      return { ok: false, error: `${label} JSON inválido: ${e?.message || e}` };
    }
  }

  async function evaluate(dslText: string, dataObj: any, listsObj: any) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dsl: dslText, data: dataObj, lists: listsObj }),
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
      const { ok, json } = await evaluate(dsl, pData.value, pLists.value);
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
    const { ok, json } = await evaluate(c.dsl, pData.value, pLists.value);
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
            {cases.map(c => {
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
                  <button className={`tab ${activeBodyTab === 'dsl' ? 'active' : ''}`} onClick={() => setActiveBodyTab('dsl')}>DSL</button>
                  <button className={`tab ${activeBodyTab === 'data' ? 'active' : ''}`} onClick={() => setActiveBodyTab('data')}>Data (JSON)</button>
                  <button className={`tab ${activeBodyTab === 'lists' ? 'active' : ''}`} onClick={() => setActiveBodyTab('lists')}>Lists (JSON)</button>
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
                </div>
              </div>
            </section>
            <section>
              <h2>Resultado</h2>
              <div className="tabs">
                <button className={`tab ${activeTab === 'response' ? 'active' : ''}`} onClick={() => setActiveTab('response')}>Response</button>
                <button className={`tab ${activeTab === 'matchedRules' ? 'active' : ''}`} onClick={() => setActiveTab('matchedRules')}>matchedRules</button>
                <button className={`tab ${activeTab === 'warnings' ? 'active' : ''}`} onClick={() => setActiveTab('warnings')}>warnings</button>
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
