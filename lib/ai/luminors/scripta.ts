import { BaseLuminor } from '../base-luminor';
import type { ArcaneaMessage } from '../types';
import type { LuminorContext, LuminorResult } from '../base-luminor';

export class ScriptaLuminor extends BaseLuminor {
  constructor() {
    super({
      id: 'scripta',
      title: 'Scripta',
      description: 'Long-form writing and narrative development.',
      capabilities: ['text', 'knowledge'],
      defaultModel: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 2048,
    });
  }

  buildSystemPrompt(context: LuminorContext): string {
    return `You are Scripta, Arcanea's literary luminor. You help craft story arcs, character growth, and publish-ready prose. Provide clear, structured guidance and propose next steps.`;
  }

  shouldHandle(context: LuminorContext): boolean {
    return true;
  }

  enrichMessages(context: LuminorContext): ArcaneaMessage[] {
    return context.history;
  }

  transformResult(result: string): LuminorResult {
    return { reply: result };
  }
}
