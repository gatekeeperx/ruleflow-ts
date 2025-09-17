# @ruleflow/dsl-core

Intérprete del lenguaje de reglas Ruleflow escrito en TypeScript. Funciona en entornos isomórficos (Node, SSR y Edge) y expone una API sencilla para parsear y evaluar flujos de reglas definidos en DSL.

- Node >= 18
- Basado en ANTLR4TS para la gramática
- Salida CommonJS + tipos (`.d.ts`)

## Características

- Expresiones aritméticas y de comparación: `+ - * / %`, `< <= > >= == <> =` (case-insensitive)
- Lógicos: `and`, `or`, `not`
- Listas: `contains`, `in`, `starts_with` con listas literales, listas almacenadas `list('key')` o propiedades
- Agregaciones: `count()`, `average()`, `any{...}`, `all{...}`, `none{...}`, `distinct()`
- Fechas: `dateDiff`, `day_of_week`, `now()`, `date_add`, `date_subtract`, `date(...)`, `datetime(...)`
- Regex utilitario: `regex_strip(prop, 're')`
- Unarios: `abs(expr)`
- Geo: `geohash_encode`, `geohash_decode`, `distance`, `within_radius`
- Acciones: `action('nombre', { 'k': 'v' })` y parámetros usando propiedades (`{'id': user.id}`)
- Modo de evaluación: `evaluation_mode multi_match` (o por defecto `single_match`)

## Instalación y build

Este paquete forma parte del workspace `ts-ruleflow`.

```bash
# desde ts-ruleflow/
npm install
npm run typecheck
npm run build
```

Scripts disponibles en `packages/dsl-core/package.json`:

- `generate`: genera el parser con antlr4ts a partir de `src/grammar/RuleFlowLanguage.g4`
- `typecheck`: comprobación de tipos con TypeScript sin emitir archivos
- `build`: compila a `dist/`
- `clean`: limpia `dist/` y `src/generated/`

> Nota: el código generado por ANTLR se incluye en el repo para facilitar el build. Si modificas la gramática, ejecuta `npm run generate` antes del build.

## Uso básico

```ts
import { Workflow } from '@ruleflow/dsl-core';

const dsl = `workflow 'w'
  ruleset 'eligibility'
    'adult_us' user.age > 17 and country = 'US' return 'allow' action('notify', {'id': user.id})
  default 'deny'
end`;

const data = { user: { id: '42', age: 20 }, country: 'US' };
const lists = {}; // opcional

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

### Api principal

- `new Workflow(dsl: string)`
- `evaluate(request: InputMap, lists?: ListsMap): WorkflowResult`
- `validateAndGetWorkflowName(): string`

Tipos relevantes (ver `src/types.ts`):

- `InputMap = Record<string, unknown>`
- `ListsMap = Record<string, unknown[]>`
- `WorkflowResult` contiene `workflow`, `ruleSet`, `rule`, `result`, `actions`, `warnings`, `matchedRules?`, `error?`

## Ejemplos del DSL

- Agregaciones:

```sql
items.count() = 3
items.any{ type = 'a' } = true
items.none{ 'blocked' } = true
items.distinct()
```

- Fechas:

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
# con geohash
distance(geohash_encode(37.7749, -122.4194, 7), geohash_encode(37.7750, -122.4195, 7)) < 0.5
```

- Modo multi-match:

```sql
workflow 'w'
  evaluation_mode multi_match
  ruleset 'rs'
    'r1' 1 = 1 return 'A'
    'r2' 2 = 2 return 'B'
  default 'ko'
end
```

En este caso `evaluate()` devuelve `matchedRules` con todas las reglas que aplicaron, y el `result` de la primera coincidencia.

## Integración con Next.js (App Router) y Serverless

A continuación se muestran patrones recomendados para usar `@ruleflow/dsl-core` directamente desde páginas Next.js, sin necesidad de un API Route, así como consideraciones para entornos Serverless y Edge.

> Requisitos: Next.js 14+ (App Router) y Node.js 18+. Si tu despliegue exige Edge Runtime, revisa la sección "Edge Runtime" más abajo.

### 1) Server Actions (recomendado)

Usa una Server Action para evaluar el DSL en el servidor, invocándola desde tu componente cliente. Es simple, evita exponer el DSL por red a un endpoint y mantiene el bundle del cliente ligero.

`app/actions/evaluate.ts`:

```ts
'use server';

import { Workflow } from '@ruleflow/dsl-core';

export async function evaluateDsl(input: { dsl: string; data?: any; lists?: any }) {
  const { dsl, data = {}, lists = {} } = input || {};
  const wf = new Workflow(dsl);
  return wf.evaluate(data, lists);
}
```

`app/page.tsx` (cliente):

```tsx
'use client';
import { useState } from 'react';
import { evaluateDsl } from './actions/evaluate';

export const runtime = 'nodejs'; // asegura Node.js runtime si tu paquete es CJS

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
      {/* textareas para dsl/data/lists */}
      <button onClick={onSend}>Send</button>
      <pre>{out}</pre>
    </div>
  );
}
```

Notas:
- Si usas CommonJS en el core, fija `export const runtime = 'nodejs'` en el segmento actual para evitar el Edge runtime.
- Para inputs variables del usuario, evita caching con `export const dynamic = 'force-dynamic'` o `unstable_noStore()`.

### 2) Server Component (SSR en render)

Evalúa durante el render del servidor sin Server Action. Útil si la entrada viene de `searchParams` o datos del servidor.

```tsx
import { Workflow } from '@ruleflow/dsl-core';
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

### 3) Client Component (evaluación en el navegador)

Importa el core en el cliente y evalúa localmente. Recomendado para demos offline; considera el peso del bundle.

```tsx
'use client';
import { useState } from 'react';

export default function Page() {
  const [dsl, setDsl] = useState("workflow 'w'\n  ruleset 'rs'\n    'r1' 1 = 1 return 'ok'\n  default 'ko'\nend");
  const [out, setOut] = useState('');

  async function onSend() {
    // Carga diferida para reducir TTI
    const { Workflow } = await import('@ruleflow/dsl-core');
    const wf = new Workflow(dsl);
    const res = wf.evaluate({}, {});
    setOut(JSON.stringify(res, null, 2));
  }

  return <button onClick={onSend}>Send</button>;
}
```

Consideraciones:
- El bundle incluirá el parser; si el tamaño es crítico, prefiere Server Actions.

### 4) Alternativa con API Route (si prefieres endpoint)

Puedes exponer un endpoint `POST /api/evaluate` y consumirlo desde la UI:

```ts
// app/api/evaluate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Workflow } from '@ruleflow/dsl-core';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { dsl, data = {}, lists = {} } = await req.json();
  if (typeof dsl !== 'string' || !dsl.trim()) {
    return NextResponse.json({ message: 'Campo dsl es requerido' }, { status: 400 });
  }
  const wf = new Workflow(dsl);
  const result = wf.evaluate(data, lists);
  return NextResponse.json(result, { status: 200 });
}
```

### Serverless y Edge Runtime

- Node.js Serverless (Vercel/Netlify): funciona out-of-the-box con `runtime = 'nodejs'`.
- Edge Runtime: requiere que las dependencias sean ESM puras. Si tu build actual es CommonJS, usa `runtime = 'nodejs'` o publica un paquete dual (ESM + CJS). Ejemplo Edge (si el core es ESM-compatible):

```ts
export const runtime = 'edge';
import { Workflow } from '@ruleflow/dsl-core';
```

Recomendaciones:
- **Seguridad**: valida el DSL y limita tamaño/tiempo (timeouts) si la entrada es de usuarios externos.
- **Caching**: para entradas dinámicas usa `noStore()`/`dynamic = 'force-dynamic'`.
- **Tamaños**: en cliente usa `import()` dinámico para reducir el coste inicial.

### Tipos y resultado

- `new Workflow(dsl)`
- `evaluate(data?: InputMap, lists?: ListsMap): WorkflowResult`
- `WorkflowResult` puede incluir `result`, `warnings`, `actions` y `matchedRules` (en `evaluation_mode multi_match`).

## Desarrollo

- Cambiaste la gramática: `npm run generate`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Prueba rápida (smoke):

```bash
node scripts/smoke.js
```

## Buenas prácticas y notas

- En evaluaciones de listas y agregaciones, el predicado se evalúa en el contexto de cada elemento de la colección.
- Para evitar errores de properties faltantes, maneja `warnings` en el resultado.
- Si publicas a NPM, considera añadir un `prepack` que ejecute `npm run build`.

## Licencia

Apache-2.0
