import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getFallbackLuminor, getLuminor } from '.';
import type { BaseLuminor, LuminorContext } from './base-luminor';
import type {
  ArcaneaMessage,
  LuminorId,
  SendMessageResponse
} from './types';

export interface RouteMessageOptions {
  sessionId?: string;
  luminorId?: LuminorId;
  history: ArcaneaMessage[];
  userMessage: string;
  metadata?: Record<string, unknown>;
}

interface ModelOverrides {
  [key: string]: string;
}

function randomId(): string {
  const cryptoObj = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

export class SuperAgentProvider {
  private readonly modelOverrides: ModelOverrides;

  constructor(overrides?: ModelOverrides) {
    this.modelOverrides = overrides ?? {};
  }

  async routeMessage(options: RouteMessageOptions): Promise<SendMessageResponse> {
    const sessionId = options.sessionId ?? randomId();
    const luminor = this.resolveLuminor(options.luminorId);

    const context: LuminorContext = {
      sessionId,
      history: options.history,
      userMessage: options.userMessage,
    };

    const systemPrompt = luminor.buildSystemPrompt(context);
    const enrichedHistory = luminor.enrichMessages(context);

    const { text } = await generateText({
      model: openai(this.resolveModel(luminor)),
      system: systemPrompt,
      maxOutputTokens: luminor.config.maxTokens,
      temperature: luminor.config.temperature,
      messages: this.mapMessages(enrichedHistory, options.userMessage),
    });

    const transformed = luminor.transformResult(text);

    const replyMessage: ArcaneaMessage = {
      id: randomId(),
      role: 'assistant',
      content: transformed.reply,
      createdAt: new Date().toISOString(),
      luminorId: luminor.id,
      toolInvocations: transformed.toolInvocations,
    };

    const userMessage: ArcaneaMessage = {
      id: randomId(),
      role: 'user',
      content: options.userMessage,
      createdAt: new Date().toISOString(),
      luminorId: luminor.id,
    };

    return {
      sessionId,
      messages: [...options.history, userMessage, replyMessage],
      activeLuminor: luminor.id,
      toolInvocations: transformed.toolInvocations,
    };
  }

  private resolveLuminor(preferred?: LuminorId): BaseLuminor {
    if (!preferred) {
      return getFallbackLuminor();
    }

    try {
      return getLuminor(preferred);
    } catch (error) {
      console.warn('[superagent] Unknown luminor', preferred, error);
      return getFallbackLuminor();
    }
  }

  private resolveModel(luminor: BaseLuminor): string {
    return this.modelOverrides[luminor.id] ?? luminor.config.defaultModel;
  }

  private mapMessages(history: ArcaneaMessage[], userInput: string) {
    return history
      .map((message) => ({
        role: message.role,
        content: message.content,
      }))
      .concat({ role: 'user', content: userInput });
  }
}

export const superAgentProvider = new SuperAgentProvider({
  scripta: process.env.SUPERAGENT_SCRIPTA_MODEL ?? process.env.SUPERAGENT_DEFAULT_MODEL ?? 'gpt-4o-mini',
  lumina: process.env.SUPERAGENT_LUMINA_MODEL ?? process.env.SUPERAGENT_DEFAULT_MODEL ?? 'gpt-4o-mini',
  kinetix: process.env.SUPERAGENT_KINETIX_MODEL ?? process.env.SUPERAGENT_DEFAULT_MODEL ?? 'gpt-4o-mini',
});
