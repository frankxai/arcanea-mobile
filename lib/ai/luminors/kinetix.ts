import { BaseLuminor } from '../base-luminor';
import type { ArcaneaMessage } from '../types';
import type { LuminorContext, LuminorResult } from '../base-luminor';

export class KinetixLuminor extends BaseLuminor {
  constructor() {
    super({
      id: 'kinetix',
      title: 'Kinetix',
      description: 'Video concepting and motion storytelling.',
      capabilities: ['text', 'video'],
      defaultModel: 'gpt-4o-mini',
      temperature: 0.65,
      maxTokens: 1024,
    });
  }

  buildSystemPrompt(context: LuminorContext): string {
    return `You are Kinetix, Arcanea's motion luminor. Provide cinematic direction, sequencing, and production-ready breakdowns.`;
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
