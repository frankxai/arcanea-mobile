import type { ArcaneaMessage, LuminorId, ToolInvocation } from './types';

export interface LuminorContext {
  sessionId: string;
  history: ArcaneaMessage[];
  userMessage: string;
}

export interface LuminorConfig {
  id: LuminorId;
  title: string;
  description: string;
  capabilities: Array<'text' | 'image' | 'video' | 'audio' | 'knowledge'>;
  defaultModel: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LuminorResult {
  reply: string;
  toolInvocations?: ToolInvocation[];
  metadata?: Record<string, unknown>;
}

export abstract class BaseLuminor {
  public readonly config: LuminorConfig;

  constructor(config: LuminorConfig) {
    this.config = config;
  }

  get id(): LuminorId {
    return this.config.id;
  }

  abstract buildSystemPrompt(context: LuminorContext): string;

  abstract shouldHandle(context: LuminorContext): boolean;

  abstract enrichMessages(context: LuminorContext): ArcaneaMessage[];

  abstract transformResult(result: string): LuminorResult;
}
