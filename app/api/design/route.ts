import { NextRequest, NextResponse } from 'next/server';

// Mock "DB" in memory for the duration of the dev server session
let latestDesign: any = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    latestDesign = body;
    return NextResponse.json({
      ok: true,
      id: `design_${Date.now()}`,
      design: latestDesign,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  if (!latestDesign) {
    return NextResponse.json({ error: 'No design found' }, { status: 404 });
  }
  return NextResponse.json(latestDesign);
}
