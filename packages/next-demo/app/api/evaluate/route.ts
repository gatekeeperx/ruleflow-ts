import { NextRequest, NextResponse } from 'next/server';
import { Workflow, type FunctionsMap } from '@ruleflow-ts/dsl-core';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { dsl, data = {}, lists = {}, functions = {} } = await req.json();
    if (typeof dsl !== 'string' || !dsl.trim()) {
      return NextResponse.json({ message: 'Campo dsl es requerido' }, { status: 400 });
    }

    const fns: FunctionsMap = {};
    if (functions && typeof functions === 'object') {
      for (const [name, def] of Object.entries(functions)) {
        const rv = (def as { returnValue: unknown }).returnValue;
        fns[name] = () => rv;
      }
    }

    const wf = new Workflow(dsl);
    const result = wf.evaluate(data, lists, fns);

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message || 'Error al evaluar DSL', stack: e?.stack },
      { status: 500 }
    );
  }
}
