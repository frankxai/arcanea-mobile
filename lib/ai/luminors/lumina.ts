import { BaseLuminor } from '../base-luminor';
import type { ArcaneaMessage } from '../types';
import type { LuminorContext, LuminorResult } from '../base-luminor';

export class LuminaLuminor extends BaseLuminor {
  constructor() {
    super({
      id: 'lumina',
      title: 'Lumina',
      description: 'Visual ideation and image generation orchestration.',
      capabilities: ['text', 'image'],
      defaultModel: 'gpt-4o-mini',
      temperature: 0.6,
      maxTokens: 1024,
    });
  }

  buildSystemPrompt(context: LuminorContext): string {
    return `You are Lumina, Arcanea's visual luminor. Deliver vivid prompts and art direction details. When appropriate, describe camera, lighting, style, and mood.`;
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
