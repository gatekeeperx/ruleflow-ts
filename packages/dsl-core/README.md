# @ruleflow-ts/dsl-core

TypeScript interpreter for the Ruleflow DSL. It runs in isomorphic environments (Node, SSR, and potentially Edge) and exposes a simple API to parse and evaluate rule workflows defined in a DSL.

- Node >= 18
- Based on ANTLR4TS for the grammar
- CommonJS output + type definitions (`.d.ts`)

## Features

- Arithmetic and comparison expressions: `+ - * / %`, `< <= > >= == <> =` (case-insensitive)
- Logical operators: `and`, `or`, `not`
- Lists: `contains`, `in`, `starts_with` with literal lists, stored lists `list('key')`, or properties
- Aggregations: `count()`, `average()`, `any{...}`, `all{...}`, `none{...}`, `distinct()`
- Dates: `dateDiff`, `day_of_week`, `now()`, `date_add`, `date_subtract`, `date(...)`, `datetime(...)`
- Regex utility: `regex_strip(prop, 're')`
- Unary: `abs(expr)`
- Geo: `geohash_encode`, `geohash_decode`, `distance`, `within_radius`
- Actions: `action('name', { 'k': 'v' })` with params using properties (`{'id': user.id}`)
- Evaluation mode: `evaluation_mode multi_match` (or default `single_match`)

## Install & Build

This package is part of the `ts-ruleflow` workspace.

```bash
# from ts-ruleflow/
npm install
npm run typecheck
npm run build
```

Available scripts in `packages/dsl-core/package.json`:

- `generate`: generates the parser with antlr4ts from `src/grammar/RuleFlowLanguage.g4`
- `typecheck`: TypeScript type-check without emitting files
- `build`: compiles into `dist/`
- `clean`: removes `dist/` and `src/generated/`

> Note: the ANTLR generated code is included in the repo for easier builds. If you change the grammar, run `npm run generate` before building.

## Basic Usage

```ts
import { Workflow } from '@ruleflow-ts/dsl-core';

const dsl = `workflow 'w'
  ruleset 'eligibility'
    'adult_us' user.age > 17 and country = 'US' return 'allow' action('notify', {'id': user.id})
  default 'deny'
end`;

const data = { user: { id: '42', age: 20 }, country: 'US' };
const lists = {}; // optional

const wf = new Workflow(dsl);
const result = wf.evaluate(data, lists);

console.log(result);
// {
//   workflow: 'w',
//   ruleSet: 'eligibility',
//   rule: 'adult_us',
//   result: 'allow',
//   actions: [{ name: 'notify', params: { id: '42' } }],
//   warnings: [],
//   error: false
// }
```

### Main API

- `new Workflow(dsl: string)`
- `evaluate(request: InputMap, lists?: ListsMap): WorkflowResult`
- `validateAndGetWorkflowName(): string`

Relevant types (see `src/types.ts`):

- `InputMap = Record<string, unknown>`
- `ListsMap = Record<string, unknown[]>`
- `WorkflowResult` includes `workflow`, `ruleSet`, `rule`, `result`, `actions`, `warnings`, `matchedRules?`, `error?`

## DSL Examples

- Aggregations:

```sql
items.count() = 3
items.any{ type = 'a' } = true
items.none{ 'blocked' } = true
items.distinct()
```

- Dates:

```sql
dateDiff('2025-01-01T00:00:00Z', '2025-01-02T00:00:00Z', day) = 1
day_of_week('2025-09-14T05:00:00Z') = 'SUNDAY'
date_add('2025-01-01T00:00:00Z', 1, day) > '2025-01-01T00:00:00Z'
date_subtract('2025-01-01T12:00:00Z', 1, hour) < '2025-01-01T12:00:00Z'
datetime(now()) > '2000-01-01T00:00:00Z'
```

- Geo:

```sql
distance(37.7749, -122.4194, 34.0522, -118.2437) > 500
within_radius(37.7749, -122.4194, 37.7750, -122.4195, 1) = true
# with geohash
distance(geohash_encode(37.7749, -122.4194, 7), geohash_encode(37.7750, -122.4195, 7)) < 0.5
```

- Multi-match mode:

```sql
workflow 'w'
  evaluation_mode multi_match
  ruleset 'rs'
    'r1' 1 = 1 return 'A'
    'r2' 2 = 2 return 'B'
  default 'ko'
end
```

In this case `evaluate()` returns `matchedRules` with all matching rules, and `result` is the value of the first match.

## Next.js Integration (App Router) and Serverless

Recommended patterns for using `@ruleflow-ts/dsl-core` directly from Next.js pages, without an API Route, plus considerations for Serverless and Edge environments.

> Requirements: Next.js 14+ (App Router) and Node.js 18+. If your deployment requires Edge Runtime, review the "Edge Runtime" section below.

### 1) Server Actions (recommended)

Use a Server Action to evaluate the DSL on the server, invoked from a client component. It avoids exposing the DSL over the network and keeps the client bundle light.

`app/actions/evaluate.ts`:

```ts
'use server';

import { Workflow } from '@ruleflow-ts/dsl-core';

export async function evaluateDsl(input: { dsl: string; data?: any; lists?: any }) {
  const { dsl, data = {}, lists = {} } = input || {};
  const wf = new Workflow(dsl);
  return wf.evaluate(data, lists);
}
```

`app/page.tsx` (client):

```tsx
'use client';
import { useState } from 'react';
import { evaluateDsl } from './actions/evaluate';

export const runtime = 'nodejs'; // ensure Node.js runtime if your package is CJS

export default function Page() {
  const [dsl, setDsl] = useState("workflow 'w'\n  ruleset 'rs'\n    'r1' 1 = 1 return 'ok'\n  default 'ko'\nend");
  const [dataStr, setDataStr] = useState('{}');
  const [listsStr, setListsStr] = useState('{}');
  const [out, setOut] = useState('');

  async function onSend() {
    const data = dataStr ? JSON.parse(dataStr) : {};
    const lists = listsStr ? JSON.parse(listsStr) : {};
    const res = await evaluateDsl({ dsl, data, lists });
    setOut(JSON.stringify(res, null, 2));
  }

  return (
    <div>
      {/* textareas for dsl/data/lists */}
      <button onClick={onSend}>Send</button>
      <pre>{out}</pre>
    </div>
  );
}
```

Notes:
- If you use CommonJS in the core, set `export const runtime = 'nodejs'` in the current segment to avoid Edge runtime.
- For user-provided inputs, avoid caching with `export const dynamic = 'force-dynamic'` or `unstable_noStore()`.

### 2) Server Component (SSR during render)

Evaluate during server render without a Server Action. Useful if input comes from `searchParams` or server data.

```tsx
import { Workflow } from '@ruleflow-ts/dsl-core';
import { unstable_noStore as noStore } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: { dsl?: string } }) {
  noStore();
  const dsl = searchParams.dsl ?? "workflow 'w'\n  ruleset 'rs'\n    'r1' 1 = 1 return 'ok'\n  default 'ko'\nend";
  const wf = new Workflow(dsl);
  const result = wf.evaluate({}, {});
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
```

### 3) Client Component (evaluate in the browser)

Import the core in the client and evaluate locally. Good for offline demos; consider bundle size.

```tsx
'use client';
import { useState } from 'react';

export default function Page() {
  const [dsl, setDsl] = useState("workflow 'w'\n  ruleset 'rs'\n    'r1' 1 = 1 return 'ok'\n  default 'ko'\nend");
  const [out, setOut] = useState('');

  async function onSend() {
    // Deferred loading to reduce TTI
    const { Workflow } = await import('@ruleflow-ts/dsl-core');
    const wf = new Workflow(dsl);
    const res = wf.evaluate({}, {});
    setOut(JSON.stringify(res, null, 2));
  }

  return <button onClick={onSend}>Send</button>;
}
```

Considerations:
- The bundle will include the parser; if size matters, prefer Server Actions.

### 4) Alternative with API Route (if you prefer an endpoint)

Expose a `POST /api/evaluate` endpoint and consume it from the UI:

```ts
// app/api/evaluate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Workflow } from '@ruleflow-ts/dsl-core';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { dsl, data = {}, lists = {} } = await req.json();
  if (typeof dsl !== 'string' || !dsl.trim()) {
    return NextResponse.json({ message: 'Field dsl is required' }, { status: 400 });
  }
  const wf = new Workflow(dsl);
  const result = wf.evaluate(data, lists);
  return NextResponse.json(result, { status: 200 });
}
```

## Serverless and Edge Runtime

- Node.js Serverless (Vercel/Netlify): works out-of-the-box with `runtime = 'nodejs'`.
- Edge Runtime: requires ESM-only dependencies. If your build is CommonJS, use `runtime = 'nodejs'` or publish a dual package (ESM + CJS). Edge example (if the core is ESM-compatible):

```ts
export const runtime = 'edge';
import { Workflow } from '@ruleflow-ts/dsl-core';
```

Recommendations:
- Security: validate DSL and limit input size/time if accepting user-provided DSL.
- Caching: for dynamic inputs use `noStore()`/`dynamic = 'force-dynamic'`.
- Sizes: in the client use dynamic `import()` to reduce initial cost.

## Types and Result

- `new Workflow(dsl)`
- `evaluate(data?: InputMap, lists?: ListsMap): WorkflowResult`
- `WorkflowResult` may include `result`, `warnings`, `actions`, and `matchedRules` (in `evaluation_mode multi_match`).

## Development

- Grammar changed: `npm run generate`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Quick smoke test:

```bash
node scripts/smoke.js
```

## License

MIT
