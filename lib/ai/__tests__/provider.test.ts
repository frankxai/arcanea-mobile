import { SuperAgentProvider, superAgentProvider } from '../provider';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getLuminor, getFallbackLuminor } from '..';
import type { ArcaneaMessage } from '../types';

jest.mock('ai', () => ({
  generateText: jest.fn(),
}));

jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn((modelName: string) => `mock-openai-model-${modelName}`),
}));

jest.mock('..', () => {
  const originalModule = jest.requireActual('..');
  return {
    ...originalModule,
    getLuminor: jest.fn(originalModule.getLuminor),
    getFallbackLuminor: jest.fn(originalModule.getFallbackLuminor),
  };
});

describe('SuperAgentProvider', () => {
  let provider: SuperAgentProvider;

  beforeEach(() => {
    jest.clearAllMocks();
    (generateText as jest.Mock).mockResolvedValue({
      text: 'Mocked response from AI',
    });
  });

  describe('constructor and exported instance', () => {
    it('instantiates correctly with custom model overrides', () => {
      const customProvider = new SuperAgentProvider({ scripta: 'gpt-4o' });
      expect(customProvider).toBeInstanceOf(SuperAgentProvider);
    });

    it('exports default superAgentProvider instance', () => {
      expect(superAgentProvider).toBeInstanceOf(SuperAgentProvider);
    });
  });

  describe('routeMessage success path', () => {
    it('routes message successfully with explicit sessionId and valid luminorId', async () => {
      provider = new SuperAgentProvider();
      const history: ArcaneaMessage[] = [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          createdAt: '2025-01-01T00:00:00.000Z',
          luminorId: 'lumina',
        },
      ];

      const result = await provider.routeMessage({
        sessionId: 'session-123',
        luminorId: 'lumina',
        history,
        userMessage: 'What is the vision?',
      });

      expect(getLuminor).toHaveBeenCalledWith('lumina');
      expect(generateText).toHaveBeenCalledTimes(1);
      
      const callArgs = (generateText as jest.Mock).mock.calls[0][0];
      expect(callArgs.system).toBeDefined();
      expect(callArgs.messages).toEqual([
        { role: 'user', content: 'Hello' },
        { role: 'user', content: 'What is the vision?' },
      ]);

      expect(result.sessionId).toBe('session-123');
      expect(result.activeLuminor).toBe('lumina');
      expect(result.messages).toHaveLength(3); // 1 history + 1 user + 1 assistant reply
      expect(result.messages[1].role).toBe('user');
      expect(result.messages[1].content).toBe('What is the vision?');
      expect(result.messages[2].role).toBe('assistant');
      expect(result.messages[2].content).toBe('Mocked response from AI');
    });

    it('applies model overrides when defined', async () => {
      const customProvider = new SuperAgentProvider({ scripta: 'custom-gpt-4' });
      await customProvider.routeMessage({
        luminorId: 'scripta',
        history: [],
        userMessage: 'Test prompt',
      });

      expect(openai).toHaveBeenCalledWith('custom-gpt-4');
    });
  });

  describe('boundary values and fallback logic', () => {
    it('generates random sessionId if options.sessionId is not provided', async () => {
      provider = new SuperAgentProvider();
      const result = await provider.routeMessage({
        history: [],
        userMessage: 'Test without sessionId',
      });

      expect(result.sessionId).toBeDefined();
      expect(typeof result.sessionId).toBe('string');
      expect(result.sessionId.length).toBeGreaterThan(0);
    });

    it('uses fallback luminor when options.luminorId is omitted', async () => {
      provider = new SuperAgentProvider();
      const result = await provider.routeMessage({
        history: [],
        userMessage: 'Test fallback',
      });

      expect(getFallbackLuminor).toHaveBeenCalled();
      expect(result.activeLuminor).toBe('scripta'); // default fallback is scripta
    });

    it('falls back to getFallbackLuminor if getLuminor throws error for unknown luminorId', async () => {
      provider = new SuperAgentProvider();
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await provider.routeMessage({
        luminorId: 'invalid-luminor' as any,
        history: [],
        userMessage: 'Test unknown luminor',
      });

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[superagent] Unknown luminor',
        'invalid-luminor',
        expect.any(Error)
      );
      expect(getFallbackLuminor).toHaveBeenCalled();
      expect(result.activeLuminor).toBe('scripta');

      consoleWarnSpy.mockRestore();
    });

    it('handles randomId generation fallback when globalThis.crypto is undefined', async () => {
      const originalCrypto = (globalThis as any).crypto;
      delete (globalThis as any).crypto;

      provider = new SuperAgentProvider();
      const result = await provider.routeMessage({
        history: [],
        userMessage: 'Test crypto fallback',
      });

      expect(result.sessionId).toBeDefined();
      expect(typeof result.sessionId).toBe('string');

      (globalThis as any).crypto = originalCrypto;
    });

    it('handles empty history array correctly', async () => {
      provider = new SuperAgentProvider();
      const result = await provider.routeMessage({
        history: [],
        userMessage: 'First message',
      });

      expect(result.messages).toHaveLength(2); // user + assistant
      expect(result.messages[0].content).toBe('First message');
    });
  });

  describe('error paths', () => {
    it('propagates error when generateText fails', async () => {
      provider = new SuperAgentProvider();
      (generateText as jest.Mock).mockRejectedValueOnce(new Error('AI generation API error'));

      await expect(
        provider.routeMessage({
          history: [],
          userMessage: 'Fail test',
        })
      ).rejects.toThrow('AI generation API error');
    });
  });
});
