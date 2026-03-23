import { superAgentProvider } from '@/lib/ai/provider';
import { getFallbackLuminor, listLuminors } from '@/lib/ai';
import type { ArcaneaMessage, LuminorId, SendMessageResponse } from '@/lib/ai/types';

export const runtime = 'edge';
export const maxDuration = 30;

interface PostPayload {
  sessionId?: string;
  luminorId?: LuminorId;
  message: string;
  history?: ArcaneaMessage[];
  metadata?: Record<string, unknown>;
}

export async function GET() {
  const luminors = listLuminors().map((luminor) => ({
    id: luminor.id,
    title: luminor.config.title,
    description: luminor.config.description,
    capabilities: luminor.config.capabilities,
  }));

  return Response.json({
    defaultLuminor: getFallbackLuminor().id,
    luminors,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as PostPayload;

  if (!body?.message?.trim()) {
    return new Response(
      JSON.stringify({ error: 'Message is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const history = Array.isArray(body.history) ? body.history : [];

  try {
    const result = await superAgentProvider.routeMessage({
      sessionId: body.sessionId,
      luminorId: body.luminorId,
      history,
      userMessage: body.message,
      metadata: body.metadata,
    });

    return Response.json(result satisfies SendMessageResponse);
  } catch (error) {
    console.error('[superagent] Failed to route message', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
