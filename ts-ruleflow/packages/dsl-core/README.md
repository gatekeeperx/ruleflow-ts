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
