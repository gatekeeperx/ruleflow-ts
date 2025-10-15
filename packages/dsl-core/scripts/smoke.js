/* Smoke tests for @ruleflow/dsl-core */
const { Workflow } = require('../dist/index.js');

const rawArg = (process.argv[2] || '').toLowerCase();
const arg = rawArg === 'ats' ? 'ast' : rawArg; // alias 'ats' -> 'ast'
const mode = arg === 'all' ? 'all' : arg === 'ast' ? 'ast' : 'result';
const showAST = mode === 'ast' || mode === 'all';
const showResultJSON = mode === 'all'; // only print full result JSON in 'all'

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
  {
    name: 'workflow rodolfo',
    dsl: `WORKFLOW 'new_workflow_kushki'
  RULESET 'Main'
    'GL_F_ACCEPT_3DS_AUTHENTICATED' customFields.response3DS.validated = 'true' AND features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h <= 45 RETURN allow
    'GL_B_CANCEL_3DS_NON_AUTHENTICATED' customFields.response3DS.validated = 'false' RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K325'}) 
    'GL_B_CANCEL_CARDID_EMAIL_BIN_CORRELATIONS' ((features.QTY_CARDID_PER_EMAIL_BIN_1h > 3) OR (features.QTY_CARDID_PER_EMAIL_BIN_24h > 3) OR (features.QTY_CARDID_PER_EMAIL_BIN_7D > 4) OR (features.QTY_CARDID_PER_EMAIL_BIN_30D > 6)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_CARDID_EMAIL_CORRELATIONS' ((features.QTY_CARDID_PER_EMAIL_1h > 4) OR (features.QTY_CARDID_PER_EMAIL_24h > 5) OR (features.QTY_CARDID_PER_EMAIL_7D > 6) OR (features.QTY_CARDID_PER_EMAIL_30D > 10)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_CARDID_IP_CORRELATIONS' ((features.QTY_CARDID_PER_IP_1h > 12) OR (features.QTY_CARDID_PER_IP_24h > 18) OR (features.QTY_CARDID_PER_IP_7D > 24) OR (features.QTY_CARDID_PER_IP_30D > 36)) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_CARDID_IP_CORRELATIONS_HIGH_RISK_MIDS' merchant.merchantId IN list('GL_CORRELATIONS_HIGH_RISK_MIDS') AND ((features.QTY_CARDID_PER_IP_1h > 4) OR (features.QTY_CARDID_PER_IP_24h > 6) OR (features.QTY_CARDID_PER_IP_7D > 8) OR (features.QTY_CARDID_PER_IP_30D > 12)) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_CARDID_PHONE_CORRELATIONS' ((features.QTY_CARDID_PER_PHONE_1h > 4) OR (features.QTY_CARDID_PER_PHONE_24h > 5) OR (features.QTY_CARDID_PER_PHONE_7D > 6) OR (features.QTY_CARDID_PER_PHONE_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_EMAIL_CARDID_CORRELATIONS' ((features.QTY_EMAIL_PER_CARDID_1h > 4) OR (features.QTY_EMAIL_PER_CARDID_24h > 5) OR (features.QTY_EMAIL_PER_CARDID_7D > 6) OR (features.QTY_EMAIL_PER_CARDID_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_EMAIL_IP_CORRELATIONS' (features.QTY_EMAIL_PER_IP_1h > 12) OR (features.QTY_EMAIL_PER_IP_24h > 18) OR (features.QTY_EMAIL_PER_IP_7D > 24) OR (features.QTY_EMAIL_PER_IP_30D > 36) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_EMAIL_PHONE_CORRELATIONS' ((features.QTY_EMAIL_PER_PHONE_1h > 4) OR (features.QTY_EMAIL_PER_PHONE_24h > 5) OR (features.QTY_EMAIL_PER_PHONE_7D > 6) OR (features.QTY_EMAIL_PER_PHONE_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_IP_CARDID_CORRELATIONS' (features.QTY_IP_PER_CARDID_1h > 4) OR (features.QTY_IP_PER_CARDID_24h > 5) OR (features.QTY_IP_PER_CARDID_7D > 10) OR (features.QTY_IP_PER_CARDID_30D > 12) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_IP_EMAIL_CORRELATIONS' (features.QTY_IP_PER_EMAIL_1h > 4) OR (features.QTY_IP_PER_EMAIL_24h > 5) OR (features.QTY_IP_PER_EMAIL_7D > 10) OR (features.QTY_IP_PER_EMAIL_30D > 12) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_IP_PHONE_CORRELATIONS' (features.QTY_IP_PER_PHONE_1h > 4) OR (features.QTY_IP_PER_PHONE_24h > 5) OR (features.QTY_IP_PER_PHONE_7D > 10) OR (features.QTY_IP_PER_PHONE_30D > 12) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_PHONE_CARDID_CORRELATIONS' ((features.QTY_PHONE_PER_CARDID_1h > 4) OR (features.QTY_PHONE_PER_CARDID_24h > 5) OR (features.QTY_PHONE_PER_CARDID_7D > 6) OR (features.QTY_PHONE_PER_CARDID_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_PHONE_EMAIL_CORRELATIONS' ((features.QTY_PHONE_PER_EMAIL_1h > 4) OR (features.QTY_PHONE_PER_EMAIL_24h > 5) OR (features.QTY_PHONE_PER_EMAIL_7D > 6) OR (features.QTY_PHONE_PER_EMAIL_30D > 10)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
    'GL_B_CANCEL_PHONE_IP_CORRELATIONS' ((features.QTY_PHONE_PER_IP_1h > 12) OR (features.QTY_PHONE_PER_IP_24h > 18) OR (features.QTY_PHONE_PER_IP_7D > 24) OR (features.QTY_PHONE_PER_IP_30D > 36)) AND customer.email NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'})
 DEFAULT ok   
END`,
    data: {},
    lists: {},
    expect: 'ok',
  },
  {
    name: 'workflow rodolfo',
    dsl: `WORKFLOW 'geo'
  RULESET 'dummy2'
    'geohash_rule' geohash_encode(lat, lon, 8) ='9q8yyk8y' AND 1 = 3 RETURN block
    'dist_rule' distance(lat1, lon1, lat2, lon2) < 600 RETURN block
    'near_rule' within_radius(lat1, lon1, lat2, lon2, 600) RETURN block
  RULESET 'boolean'
    'item_a' x AND y OR z RETURN block
    'item_c' (x OR y) AND z RETURN block
    'item_d' x OR y OR false AND z RETURN block
    'test' order.custom.user_is_prime = true and features.is_card_bin_in_anomaly_detector <> true and features.fake_users_user_email_score <= 1 and user.email_verification_status in 'VERIFIED' and (features.mk_payer_distinct_cc_fingerprint_90d + features.mk_payer_distinct_device_id_90d) <= 8 and features.crosses_login_device_qty_users_7d <= 3 and features.crosses_registration_device_qty_users_7d < 1 and (features.user_compensations_amount_90d/features.mk_payer_approved_amount_90d) < 0.05 and features.mk_payer_approved_qty_7d >= 1 and features.mk_payer_approved_qty_30d >= 6 and (features.mk_payer_approved_qty_60d >= features.mk_payer_approved_qty_30d + 6) and (features.mk_payer_approved_qty_90d >= features.mk_payer_approved_qty_60d + 6) and features.mk_payer_approved_amount_30d >= 50 and (features.mk_payer_approved_amount_90d >= features.mk_payer_approved_amount_30d + 100) RETURN block
  RULESET 'date'
    'dt_match' datetime(x) = datetime('2024-06-01T12:30Z') RETURN block
    'dt_match2' x = '2024-06-01T12:30+02:00' RETURN block
    'dt_match3' date(x) = date('2024/06/01 12:30') RETURN block
    'date_add_cast' date_add('2024-06-01', 5, day) = datetime('2024-06-06') RETURN block
    'date_subtract_lit' date_subtract('2024-06-01T12:30Z', 30, minute) = datetime('2024-06-01T12:00Z') RETURN block
    'now_match' date(now()) = date(now()) RETURN block
    'dow_lit' day_of_week('2024-06-01') = 'SATURDAY' RETURN block
  RULESET 'boolean'
    'item_a' x AND y OR z RETURN block
    'item_c' (x OR y) AND z RETURN block
    'item_d' x OR y OR false AND z RETURN block
    'test' order.custom.user_is_prime = true and features.is_card_bin_in_anomaly_detector <> true and features.fake_users_user_email_score <= 1 and user.email_verification_status in 'VERIFIED' and (features.mk_payer_distinct_cc_fingerprint_90d + features.mk_payer_distinct_device_id_90d) <= 8 and features.crosses_login_device_qty_users_7d <= 3 and features.crosses_registration_device_qty_users_7d < 1 and (features.user_compensations_amount_90d/features.mk_payer_approved_amount_90d) < 0.05 and features.mk_payer_approved_qty_7d >= 1 and features.mk_payer_approved_qty_30d >= 6 and (features.mk_payer_approved_qty_60d >= features.mk_payer_approved_qty_30d + 6) and (features.mk_payer_approved_qty_90d >= features.mk_payer_approved_qty_60d + 6) and features.mk_payer_approved_amount_30d >= 50 and (features.mk_payer_approved_amount_90d >= features.mk_payer_approved_amount_30d + 100) RETURN block
  RULESET 'date'
    'dt_match' datetime(x) = datetime('2024-06-01T12:30Z') RETURN block
    'dt_match2' x = '2024-06-01T12:30+02:00' RETURN block
    'dt_match3' date(x) = date('2024/06/01 12:30') RETURN block
    'date_add_cast' date_add('2024-06-01', 5, day) = datetime('2024-06-06') RETURN block
    'date_subtract_lit' date_subtract('2024-06-01T12:30Z', 30, minute) = datetime('2024-06-01T12:00Z') RETURN block
    'now_match' date(now()) = date(now()) RETURN block
    'dow_lit' day_of_week('2024-06-01') = 'SATURDAY' RETURN block
  DEFAULT ok  
END`,
    data: {},
    lists: {},
    expect: 'ok',
  },
  {
    name: 'toJSON returns AST shape',
    dsl: `workflow 'w'
  ruleset 'rs'
    'r1' 1 = 1 return 'ok' action('tag', {'id': '42'})
  default 'ko'
end`,
    data: {},
    lists: {},
    check: (_res, wf) => {
      try {
        const ast = wf.toJSON();
        return (
          ast &&
          ast.type === 'Workflow' &&
          ast.name === 'w' &&
          ast.evaluationMode === 'single_match' &&
          Array.isArray(ast.rulesets) && ast.rulesets.length === 1 &&
          ast.rulesets[0].name === 'rs' &&
          Array.isArray(ast.rulesets[0].rules) && ast.rulesets[0].rules.length === 1 &&
          ast.rulesets[0].rules[0].name === 'r1' &&
          ast.rulesets[0].rules[0].result.kind === 'value' &&
          ast.rulesets[0].rules[0].result.value === 'ok' &&
          Array.isArray(ast.rulesets[0].rules[0].actions) && ast.rulesets[0].rules[0].actions[0].name === 'tag' &&
          ast.rulesets[0].rules[0].actions[0].params.id &&
          ast.rulesets[0].rules[0].actions[0].params.id.kind === 'value' &&
          ast.rulesets[0].rules[0].actions[0].params.id.value === '42' &&
          ast.default && ast.default.result && ast.default.result.kind === 'value' &&
          ast.default.result.value === 'ko'
        );
      } catch (e) {
        return false;
      }
    },
  },
];

let pass = 0;
for (const c of cases) {
  try {
    const wf = new Workflow(c.dsl);
    const res = wf.evaluate(c.data, c.lists);
    if (showAST) {
      try {
        console.log(`AST for '${c.name}':`);
        console.log(JSON.stringify(wf.toJSON(), null, 2));
      } catch (e) {
        console.log(`AST error for '${c.name}':`, e && (e.message || e));
      }
    }
    if (showResultJSON) {
      try {
        console.log(`Result for '${c.name}':`);
        console.log(JSON.stringify(res, null, 2));
      } catch (e) {
        console.log(`Result error for '${c.name}':`, e && (e.message || e));
      }
    }
    let ok;
    if (typeof c.check === 'function') {
      ok = !!c.check(res, wf);
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
