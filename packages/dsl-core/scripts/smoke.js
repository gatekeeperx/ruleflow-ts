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
    name: 'workflow create_transaction kushki',
    dsl: `WORKFLOW 'create_kushki_rodolfo' EVALUATION_MODE SINGLE_MATCH RULESET 'GLOBAL' 'GL_HB_CANCEL_PROHIBITED_COUNTRIES' paymentMethod.country IN list('GL_PROHIBITED_COUNTRIES') RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K351'}) 'GL_HB_CANCEL_DECLINATIONS_CONTROL' features.QTY_TRANSACTIONS_PER_KUSHKI_ID_MID_DECLINED_24h > 10 OR features.QTY_TRANSACTIONS_PER_KUSHKI_ID_MID_DECLINED_7D > 30 OR features.QTY_TRANSACTIONS_PER_KUSHKI_ID_MID_DECLINED_5m > 15 RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K351'}) 'GL_F_ACCEPT_3DS_AUTHENTICATED' customFields.response3DS.validated = 'true' AND features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h <= 45 RETURN allow 'GL_B_CANCEL_3DS_NON_AUTHENTICATED' customFields.response3DS.validated = 'false' RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K325'}) 'GL_B_CANCEL_CARDID_EMAIL_BIN_CORRELATIONS' ((features.QTY_CARDID_PER_EMAIL_BIN_1h > 3) OR (features.QTY_CARDID_PER_EMAIL_BIN_24h > 3) OR (features.QTY_CARDID_PER_EMAIL_BIN_7D > 4) OR (features.QTY_CARDID_PER_EMAIL_BIN_30D > 6)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_CARDID_EMAIL_CORRELATIONS' ((features.QTY_CARDID_PER_EMAIL_1h > 4) OR (features.QTY_CARDID_PER_EMAIL_24h > 5) OR (features.QTY_CARDID_PER_EMAIL_7D > 6) OR (features.QTY_CARDID_PER_EMAIL_30D > 10)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_CARDID_IP_CORRELATIONS' ((features.QTY_CARDID_PER_IP_1h > 12) OR (features.QTY_CARDID_PER_IP_24h > 18) OR (features.QTY_CARDID_PER_IP_7D > 24) OR (features.QTY_CARDID_PER_IP_30D > 36)) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_CARDID_IP_CORRELATIONS_HIGH_RISK_MIDS' merchant.merchantId IN list('GL_CORRELATIONS_HIGH_RISK_MIDS') AND ((features.QTY_CARDID_PER_IP_1h > 4) OR (features.QTY_CARDID_PER_IP_24h > 6) OR (features.QTY_CARDID_PER_IP_7D > 8) OR (features.QTY_CARDID_PER_IP_30D > 12)) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_CARDID_PHONE_CORRELATIONS' ((features.QTY_CARDID_PER_PHONE_1h > 4) OR (features.QTY_CARDID_PER_PHONE_24h > 5) OR (features.QTY_CARDID_PER_PHONE_7D > 6) OR (features.QTY_CARDID_PER_PHONE_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_EMAIL_CARDID_CORRELATIONS' ((features.QTY_EMAIL_PER_CARDID_1h > 4) OR (features.QTY_EMAIL_PER_CARDID_24h > 5) OR (features.QTY_EMAIL_PER_CARDID_7D > 6) OR (features.QTY_EMAIL_PER_CARDID_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_EMAIL_IP_CORRELATIONS' ((features.QTY_EMAIL_PER_IP_1h > 12) OR (features.QTY_EMAIL_PER_IP_24h > 18) OR (features.QTY_EMAIL_PER_IP_7D > 24) OR (features.QTY_EMAIL_PER_IP_30D > 36)) AND transaction.ip NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_EMAIL_PHONE_CORRELATIONS' ((features.QTY_EMAIL_PER_PHONE_1h > 4) OR (features.QTY_EMAIL_PER_PHONE_24h > 5) OR (features.QTY_EMAIL_PER_PHONE_7D > 6) OR (features.QTY_EMAIL_PER_PHONE_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_IP_CARDID_CORRELATIONS' ((features.QTY_IP_PER_CARDID_1h > 4) OR (features.QTY_IP_PER_CARDID_24h > 5) OR (features.QTY_IP_PER_CARDID_7D > 10) OR (features.QTY_IP_PER_CARDID_30D > 12)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_IP_EMAIL_CORRELATIONS' ((features.QTY_IP_PER_EMAIL_1h > 4) OR (features.QTY_IP_PER_EMAIL_24h > 5) OR (features.QTY_IP_PER_EMAIL_7D > 10) OR (features.QTY_IP_PER_EMAIL_30D > 12)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_IP_PHONE_CORRELATIONS' ((features.QTY_IP_PER_PHONE_1h > 4) OR (features.QTY_IP_PER_PHONE_24h > 5) OR (features.QTY_IP_PER_PHONE_7D > 10) OR (features.QTY_IP_PER_PHONE_30D > 12)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_PHONE_CARDID_CORRELATIONS' ((features.QTY_PHONE_PER_CARDID_1h > 4) OR (features.QTY_PHONE_PER_CARDID_24h > 5) OR (features.QTY_PHONE_PER_CARDID_7D > 6) OR (features.QTY_PHONE_PER_CARDID_30D > 10)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_PHONE_EMAIL_CORRELATIONS' ((features.QTY_PHONE_PER_EMAIL_1h > 4) OR (features.QTY_PHONE_PER_EMAIL_24h > 5) OR (features.QTY_PHONE_PER_EMAIL_7D > 6) OR (features.QTY_PHONE_PER_EMAIL_30D > 10)) AND customer.email NOT IN list('GL_CENTRALIZED_EMAILS') AND ((features.QTY_TRANSACTIONS_PER_MID_EMAIL_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'GL_B_CANCEL_PHONE_IP_CORRELATIONS' ((features.QTY_PHONE_PER_IP_1h > 12) OR (features.QTY_PHONE_PER_IP_24h > 18) OR (features.QTY_PHONE_PER_IP_7D > 24) OR (features.QTY_PHONE_PER_IP_30D > 36)) AND customer.email NOT IN list('GL_CENTRALIZED_IPS') AND ((features.QTY_TRANSACTIONS_PER_MID_IP_APPROVAL_30D/features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D) <= 0.40 OR features.QTY_TRANSACTIONS_PER_MID_APPROVAL_30D <= 90) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) RULESET 'MEXICO' merchant.countryIsoCode = 'MX' THEN 'MX_B_CANCEL_INTERNATIONAL_BIN' paymentMethod.country NOT IN 'MX' AND ((merchant.merchantId NOT IN list('GL_ALL_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_SOUTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_SOUTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_NORTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_NORTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_CENTRAL_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_CENTRAL_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_EUROPE_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_EUROPE_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_ASIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_ASIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_OCEANIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_OCEANIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_AFRICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_AFRICA_BIN_ALLOWED_MIDS'))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'MX_B_CANCEL_MAX_AMOUNT' transaction.amount.amount > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D)*5) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'MX_B_CANCEL_LIMITS_AMOUNT' (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*120))*5)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*4))*5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'MX_B_CANCEL_LIMITS_QTY' (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*120))*2.5)) OR (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*4))*2.5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'MX_CANCEL_GIFTCORNERVIP_HIGH_AMOUNT_QTY_VELOCITY' paymentMethod.vendor in 'VISA','MASTERCARD' AND merchant.merchantId = '20000000105852756000' AND transaction.amount.amount > 7500 AND (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > 1 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_7D > 2) AND paymentMethod.cardBin NOT IN list('MX_LOW_RISK_BBVA_DIGITAL_BINS') RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'MX_CANCEL_STRENDUS_LOW_AMOUNT_QTY_VELOCITY' merchant.merchantId = '20000000108697600000' AND transaction.amount.amount < 200 AND features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > 30 RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'MX_CANCEL_STRENDUS_MEDIUM_AMOUNT_QTY_VELOCITY' merchant.merchantId = '20000000108697600000' AND transaction.amount.amount >= 200 AND transaction.amount.amount <= 500 AND features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > 20 RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) RULESET 'CHILE' merchant.countryIsoCode = 'CL' THEN 'CL_B_CANCEL_INTERNATIONAL_BIN' paymentMethod.country NOT IN 'CL' AND ((merchant.merchantId NOT IN list('GL_ALL_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_SOUTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_SOUTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_NORTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_NORTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_CENTRAL_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_CENTRAL_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_EUROPE_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_EUROPE_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_ASIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_ASIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_OCEANIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_OCEANIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_AFRICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_AFRICA_BIN_ALLOWED_MIDS'))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CL_B_CANCEL_MAX_AMOUNT' transaction.amount.amount > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D)*5) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CL_B_CANCEL_LIMITS_AMOUNT' (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*120))*5)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*4))*5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CL_B_CANCEL_LIMITS_QTY' (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*120))*2.5)) OR (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*4))*2.5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) RULESET 'ECUADOR' merchant.countryIsoCode = 'EC' THEN 'EC_B_CANCEL_INTERNATIONAL_BIN' paymentMethod.country NOT IN 'EC' AND ((merchant.merchantId NOT IN list('GL_ALL_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_SOUTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_SOUTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_NORTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_NORTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_CENTRAL_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_CENTRAL_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_EUROPE_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_EUROPE_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_ASIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_ASIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_OCEANIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_OCEANIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_AFRICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_AFRICA_BIN_ALLOWED_MIDS'))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'EC_B_CANCEL_MAX_AMOUNT' transaction.amount.amount > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D)*5) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'EC_B_CANCEL_LIMITS_AMOUNT' (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*120))*5)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*4))*5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'EC_B_CANCEL_LIMITS_QTY' (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*120))*2.5)) OR (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*4))*2.5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'EC_CANCEL_CLARO_BLACKLIST' merchant.merchantId = '10123114697881639736151759761218' AND (paymentMethod.paymentMethodId IN list('EC_CLARO_CARDID_BLACKLIST') OR customer.phoneNumber IN list('EC_CLARO_PHONE_BLACKLIST')) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_MAX_AMOUNT' merchant.merchantId = '10123114697881639736151759761218' AND transaction.amount.amount > 31 RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_MIN_AMOUNT' merchant.merchantId = '10123114697881639736151759761218' AND transaction.amount.amount = 0 RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_LIMITS_AMOUNT' merchant.merchantId = '10123114697881639736151759761218' AND (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > 20 OR features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > 45 OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > 30 AND paymentMethods.cardBin IN list('EC_CLARO_HIGH_RISK_BINS')) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > 45 AND paymentMethod.cardBin = '514440') OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_14D > 30 AND paymentMethod.cardBin = '416683') OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_14D > 60 AND paymentMethods.cardBin IN list('EC_CLARO_HIGH_RISK_BINS')) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_7D > 65 AND paymentMethod.cardBin <> '514440')) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) AND action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_LIMITS_QTY' merchant.merchantId = '10123114697881639736151759761218' AND ((transaction.amount.amount > 6.01 AND ( features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1m > 2 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1h > 3 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > 10 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_7D > 10 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_14D > 15)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL <= 6.01 AND (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1m > 3 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1h > 5 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > 5 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_7D > 10)) OR (paymentMethod.cardBin IN list('EC_CLARO_HIGH_RISK_BINS') AND (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > 1 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_14D > 5))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_BIN_LIMITS_QTY' merchant.merchantId = '10123114697881639736151759761218' AND paymentMethod.cardBin <> '514440' AND (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1m > 2 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1h > 3 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_1D > 5 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_7D > 10 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_14D > 15 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_DECLINED_24h > 8 ) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_HIGH_RISK_BIN' merchant.merchantId = '10123114697881639736151759761218' AND paymentMethod.cardBin IN list('EC_CLARO_HIGH_RISK_BIN') RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) 'EC_CANCEL_CLARO_PAYMENT_BRAND_ALIA' merchant.merchantId = '10123114697881639736151759761218' AND paymentMethod.cardBin IN list('EC_PAYMENT_BRAND_ALIA_BIN') AND (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > 1 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_7D > 3 OR features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_14D > 5 OR features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > 10) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K322'}) RULESET 'COLOMBIA' merchant.countryIsoCode = 'CO' THEN 'CO_B_CANCEL_INTERNATIONAL_BIN' paymentMethod.country NOT IN 'CO' AND ((merchant.merchantId NOT IN list('GL_ALL_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_SOUTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_SOUTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_NORTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_NORTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_CENTRAL_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_CENTRAL_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_EUROPE_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_EUROPE_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_ASIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_ASIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_OCEANIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_OCEANIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_AFRICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_AFRICA_BIN_ALLOWED_MIDS'))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CO_B_CANCEL_MAX_AMOUNT' transaction.amount.amount > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D)*5) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CO_B_CANCEL_LIMITS_AMOUNT' (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*120))*5)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*4))*5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'CO_B_CANCEL_LIMITS_QTY' (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*120))*2.5)) OR (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*4))*2.5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) RULESET 'PERU' merchant.countryIsoCode = 'PE' THEN 'PE_B_CANCEL_INTERNATIONAL_BIN' paymentMethod.country NOT IN 'PE' AND ((merchant.merchantId NOT IN list('GL_ALL_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_SOUTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_SOUTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_NORTH_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_NORTH_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_CENTRAL_AMERICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_CENTRAL_AMERICA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_EUROPE_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_EUROPE_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_ASIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_ASIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_OCEANIA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_OCEANIA_BIN_ALLOWED_MIDS')) OR (paymentMethod.country IN list('GL_AFRICA_BIN_ISO_CODE') AND merchant.merchantId NOT IN list('GL_AFRICA_BIN_ALLOWED_MIDS'))) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'PE_B_CANCEL_MAX_AMOUNT' transaction.amount.amount > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D)*5) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'PE_B_CANCEL_LIMITS_AMOUNT' (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_24h > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*120))*5)) OR (features.SUM_AMOUNT_PER_CARDID_MID_APPROVAL_30D > ((features.SUM_AMOUNT_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D*4))*5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) 'PE_B_CANCEL_LIMITS_QTY' (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_24h > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*120))*2.5)) OR (features.QTY_TRANSACTIONS_PER_CARDID_MID_APPROVAL_30D > ((features.QTY_TRANSACTIONS_PER_COUNTRY_MCC_APPROVAL_120D/(features.QTY_CARDID_PER_COUNTRY_MCC_APPROVAL_120D*4))*2.5)) RETURN block WITH action('add_tag', {'entity':'transaction','entityId':transaction.transactionId,'tag':'K350'}) DEFAULT allow END`,
    data: {},
    lists: {},
    expect: 'allow',
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
