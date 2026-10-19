import { BaseLuminor } from '../base-luminor';
import type { LuminorConfig, LuminorContext, LuminorResult } from '../base-luminor';
import type { ArcaneaMessage } from '../types';

class MinimalLuminor extends BaseLuminor {
  public buildSystemPromptCalls: LuminorContext[] = [];
  public shouldHandleCalls: LuminorContext[] = [];
  public enrichMessagesCalls: LuminorContext[] = [];
  public transformResultCalls: string[] = [];

  buildSystemPrompt(context: LuminorContext): string {
    this.buildSystemPromptCalls.push(context);
    if (!context) {
      throw new Error('Context required');
    }
    return `System prompt for ${this.id}`;
  }

  shouldHandle(context: LuminorContext): boolean {
    this.shouldHandleCalls.push(context);
    return Boolean(context?.userMessage);
  }

  enrichMessages(context: LuminorContext): ArcaneaMessage[] {
    this.enrichMessagesCalls.push(context);
    return context?.history ?? [];
  }

  transformResult(result: string): LuminorResult {
    this.transformResultCalls.push(result);
    if (result === 'INVALID') {
      throw new Error('Invalid result payload');
    }
    return { reply: result };
  }
}

describe('BaseLuminor', () => {
  const defaultConfig: LuminorConfig = {
    id: 'scripta',
    title: 'Scripta',
    description: 'Narrative development and prose',
    capabilities: ['text', 'knowledge'],
    defaultModel: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 2048,
  };

  describe('Constructor & Getters', () => {
    it('sets config property and id getter accurately (main success path)', () => {
      const luminor = new MinimalLuminor(defaultConfig);
      expect(luminor.config).toEqual(defaultConfig);
      expect(luminor.id).toBe('scripta');
    });

    it('handles minimal/boundary configuration values (boundary values)', () => {
      const minimalConfig: LuminorConfig = {
        id: 'lumina',
        title: '',
        description: '',
        capabilities: [],
        defaultModel: 'gpt-4o',
      };
      const luminor = new MinimalLuminor(minimalConfig);
      expect(luminor.config).toEqual(minimalConfig);
      expect(luminor.id).toBe('lumina');
      expect(luminor.config.temperature).toBeUndefined();
      expect(luminor.config.maxTokens).toBeUndefined();
    });
  });

  describe('Abstract Method Implementations & Contracts', () => {
    let luminor: MinimalLuminor;

    beforeEach(() => {
      luminor = new MinimalLuminor(defaultConfig);
    });

    describe('buildSystemPrompt', () => {
      it('generates system prompt string given a context (main success path)', () => {
        const context: LuminorContext = {
          sessionId: 'session-1',
          history: [],
          userMessage: 'Hello',
        };
        const prompt = luminor.buildSystemPrompt(context);
        expect(prompt).toBe('System prompt for scripta');
        expect(luminor.buildSystemPromptCalls).toHaveLength(1);
      });

      it('handles null/falsy context error path (error path)', () => {
        expect(() => luminor.buildSystemPrompt(null as unknown as LuminorContext)).toThrow(
          'Context required'
        );
      });
    });

    describe('shouldHandle', () => {
      it('returns true when userMessage is present (main success path)', () => {
        const context: LuminorContext = {
          sessionId: 'session-1',
          history: [],
          userMessage: 'Write a story',
        };
        expect(luminor.shouldHandle(context)).toBe(true);
      });

      it('returns false for empty or null userMessage input (empty/null input)', () => {
        const context: LuminorContext = {
          sessionId: 'session-1',
          history: [],
          userMessage: '',
        };
        expect(luminor.shouldHandle(context)).toBe(false);
      });
    });

    describe('enrichMessages', () => {
      it('returns context history messages (main success path)', () => {
        const messages: ArcaneaMessage[] = [
          { id: 'm1', role: 'user', content: 'Hi', createdAt: '2025-01-01' },
        ];
        const context: LuminorContext = {
          sessionId: 'session-1',
          history: messages,
          userMessage: 'Hi',
        };
        expect(luminor.enrichMessages(context)).toEqual(messages);
      });

      it('returns empty array when context history is empty (empty input)', () => {
        const context: LuminorContext = {
          sessionId: 'session-1',
          history: [],
          userMessage: '',
        };
        expect(luminor.enrichMessages(context)).toEqual([]);
      });
    });

    describe('transformResult', () => {
      it('transforms string into LuminorResult object (main success path)', () => {
        const result = luminor.transformResult('Transformed text');
        expect(result).toEqual({ reply: 'Transformed text' });
      });

      it('handles empty string result input (boundary/empty input)', () => {
        const result = luminor.transformResult('');
        expect(result).toEqual({ reply: '' });
      });

      it('throws error when transforming invalid result payload (error path)', () => {
        expect(() => luminor.transformResult('INVALID')).toThrow('Invalid result payload');
      });
    });
  });
});
