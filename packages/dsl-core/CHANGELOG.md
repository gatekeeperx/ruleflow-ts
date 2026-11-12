# Changelog — @ruleflow-ts/dsl-core

## 0.10.0

`rule_body` now matches ruleflow-java. Version 0.9.0 was skipped: 0.10.0 is the
first release with these changes and is already published on npm.

### ⚠️ Breaking change

- A matched rule **without a `return_result`** (`'r' cond THEN action('x')` or a bare
  `'r' cond RETURN`) now returns **the rule name** as its result, as ruleflow-java does.
  Before, it returned `allow`. Any consumer that relied on `allow` for these rules must
  add an explicit `RETURN allow`.

### Added

- `expr` is optional: a rule without a condition always matches
  (`'init' SET $base = 0 CONTINUE`).
- `THEN actions CONTINUE`: the actions accumulate and evaluation continues with the
  next rule, the same as `actions CONTINUE`. The AST serializes it as `inlineActions`,
  so code generation round-trips it.
- `RETURN` without a result is accepted (see the breaking change above).

### Known issue

- In the serialized AST, a rule without a `return_result` (`THEN actions` or a bare
  `RETURN`) still shows `result.value = "allow"`, while the evaluator returns the rule name. Read the evaluation result, not the AST, to know what
  the rule returns.
