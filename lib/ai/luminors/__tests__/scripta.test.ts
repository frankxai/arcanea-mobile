import { ScriptaLuminor } from '../scripta';
import type { LuminorContext } from '../../base-luminor';
import type { ArcaneaMessage } from '../../types';

describe('ScriptaLuminor', () => {
  let scripta: ScriptaLuminor;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01T00:00:00Z'));
    scripta = new ScriptaLuminor();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('constructor & properties', () => {
    it('initializes with correct configuration and getter properties', () => {
      expect(scripta.id).toBe('scripta');
      expect(scripta.config).toEqual({
        id: 'scripta',
        title: 'Scripta',
        description: 'Long-form writing and narrative development.',
        capabilities: ['text', 'knowledge'],
        defaultModel: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2048,
      });
    });
  });

  describe('buildSystemPrompt', () => {
    it('returns the system prompt string for standard context', () => {
      const context: LuminorContext = {
        sessionId: 'session-123',
        history: [
          {
            id: 'msg-1',
            role: 'user',
            content: 'Write a fantasy story introduction.',
            createdAt: '2025-01-01T00:00:00Z',
          },
        ],
        userMessage: 'Write a fantasy story introduction.',
      };

      const prompt = scripta.buildSystemPrompt(context);
      expect(typeof prompt).toBe('string');
      expect(prompt).toContain("You are Scripta, Arcanea's literary luminor.");
      expect(prompt).toContain('Provide clear, structured guidance and propose next steps.');
    });

    it('handles boundary conditions like empty context fields', () => {
      const emptyContext: LuminorContext = {
        sessionId: '',
        history: [],
        userMessage: '',
      };

      const prompt = scripta.buildSystemPrompt(emptyContext);
      expect(prompt).toContain("You are Scripta, Arcanea's literary luminor.");
    });
  });

  describe('shouldHandle', () => {
    it('returns true for standard context (main success path)', () => {
      const context: LuminorContext = {
        sessionId: 'session-456',
        history: [],
        userMessage: 'Help me outline chapter 1.',
      };

      expect(scripta.shouldHandle(context)).toBe(true);
    });

    it('returns true for empty or boundary context input', () => {
      const emptyContext: LuminorContext = {
        sessionId: '',
        history: [],
        userMessage: '',
      };

      expect(scripta.shouldHandle(emptyContext)).toBe(true);
    });
  });

  describe('enrichMessages', () => {
    it('returns context history for main success path', () => {
      const mockHistory: ArcaneaMessage[] = [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          createdAt: '2025-01-01T00:00:00Z',
        },
        {
          id: 'msg-2',
          role: 'assistant',
          content: 'Greetings writer.',
          createdAt: '2025-01-01T00:00:01Z',
          luminorId: 'scripta',
        },
      ];

      const context: LuminorContext = {
        sessionId: 'session-789',
        history: mockHistory,
        userMessage: 'Next chapter idea',
      };

      const enriched = scripta.enrichMessages(context);
      expect(enriched).toEqual(mockHistory);
      expect(enriched.length).toBe(2);
    });

    it('returns empty array when history is empty', () => {
      const context: LuminorContext = {
        sessionId: 'session-000',
        history: [],
        userMessage: 'Start',
      };

      const enriched = scripta.enrichMessages(context);
      expect(enriched).toEqual([]);
    });

    it('handles edge cases gracefully when history is undefined or null', () => {
      const context = {
        sessionId: 'session-null',
        userMessage: 'Test',
      } as unknown as LuminorContext;

      const enriched = scripta.enrichMessages(context);
      expect(enriched).toBeUndefined();
    });
  });

  describe('transformResult', () => {
    it('transforms normal string result into LuminorResult object (main success path)', () => {
      const outputText = 'Once upon a time in Arcanea...';
      const result = scripta.transformResult(outputText);

      expect(result).toEqual({ reply: outputText });
    });

    it('handles empty string result as boundary input', () => {
      const result = scripta.transformResult('');
      expect(result).toEqual({ reply: '' });
    });

    it('handles long string input as boundary value', () => {
      const longText = 'a'.repeat(10000);
      const result = scripta.transformResult(longText);
      expect(result).toEqual({ reply: longText });
    });

    it('handles error path when non-string input causes invalid transformation or throws', () => {
      // Testing handling of unexpected type passed to transformResult
      const nullInput = null as unknown as string;
      const result = scripta.transformResult(nullInput);
      expect(result).toEqual({ reply: null });
    });
  });
});
