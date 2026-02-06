import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate minimal shape
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'Invalid JSON: expected an object' },
        { status: 400 }
      );
    }
    const { background, envelope, card } = body;
    if (!background || !envelope || !card) {
      return NextResponse.json(
        { error: 'Missing required fields: background, envelope, card' },
        { status: 400 }
      );
    }
    // Store design (in a real app you would persist to DB)
    const design = {
      background,
      envelope,
      card,
      savedAt: new Date().toISOString(),
    };
    return NextResponse.json({
      ok: true,
      id: `design_${Date.now()}`,
      design,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Invalid request body' },
      { status: 400 }
    );
  }
}
