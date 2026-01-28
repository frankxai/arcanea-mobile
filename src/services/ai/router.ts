import { AIProvider, AIStreamCallback, AIResponse, AIMessage } from '../types';

// Claude Integration
export class ClaudeAI {
  private apiKey: string;
  private baseURL = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMessage(
    messages: AIMessage[],
    onStream?: AIStreamCallback
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 4096,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          stream: !!onStream
        })
      });

      if (onStream && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === 'content_block_delta') {
                  onStream({
                    content: data.delta.text,
                    provider: 'claude',
                    model: 'claude-3-sonnet-20240229',
                    finished: false
                  });
                } else if (data.type === 'message_stop') {
                  onStream({
                    content: '',
                    provider: 'claude',
                    model: 'claude-3-sonnet-20240229',
                    finished: true
                  });
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }

      const data = await response.json();
      return {
        content: data.content?.[0]?.text || '',
        provider: 'claude',
        model: 'claude-3-sonnet-20240229',
        tokens: data.usage?.input_tokens + data.usage?.output_tokens,
        finished: true
      };
    } catch (error) {
      return {
        content: '',
        provider: 'claude',
        model: 'claude-3-sonnet-20240229',
        finished: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// OpenAI Integration
export class OpenAIAI {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMessage(
    messages: AIMessage[],
    onStream?: AIStreamCallback
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          max_tokens: 4096,
          stream: !!onStream
        })
      });

      if (onStream && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                onStream({
                  content: '',
                  provider: 'openai',
                  model: 'gpt-4-turbo-preview',
                  finished: true
                });
                break;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || '';
                if (content) {
                  onStream({
                    content,
                    provider: 'openai',
                    model: 'gpt-4-turbo-preview',
                    finished: false
                  });
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }

      const data = await response.json();
      return {
        content: data.choices?.[0]?.message?.content || '',
        provider: 'openai',
        model: 'gpt-4-turbo-preview',
        tokens: data.usage?.total_tokens,
        finished: true
      };
    } catch (error) {
      return {
        content: '',
        provider: 'openai',
        model: 'gpt-4-turbo-preview',
        finished: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Gemini Integration
export class GeminiAI {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateMessage(
    messages: AIMessage[],
    onStream?: AIStreamCallback
  ): Promise<AIResponse> {
    try {
      // Convert messages to Gemini format
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const currentMessage = messages[messages.length - 1]?.content || '';

      const response = await fetch(
        `${this.baseURL}/models/gemini-1.5-pro-latest:streamGenerateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              ...history,
              { role: 'user', parts: [{ text: currentMessage }] }
            ],
            generationConfig: {
              maxOutputTokens: 4096,
              temperature: 0.7
            }
          })
        }
      );

      if (onStream && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.trim()) {
              try {
                const data = JSON.parse(line);
                const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                if (content) {
                  onStream({
                    content,
                    provider: 'gemini',
                    model: 'gemini-1.5-pro-latest',
                    finished: false
                  });
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }

        onStream({
          content: '',
          provider: 'gemini',
          model: 'gemini-1.5-pro-latest',
          finished: true
        });
      }

      // For non-streaming, we need to make a separate request
      const nonStreamResponse = await fetch(
        `${this.baseURL}/models/gemini-1.5-pro-latest:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              ...history,
              { role: 'user', parts: [{ text: currentMessage }] }
            ],
            generationConfig: {
              maxOutputTokens: 4096,
              temperature: 0.7
            }
          })
        }
      );

      const data = await nonStreamResponse.json();
      return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        provider: 'gemini',
        model: 'gemini-1.5-pro-latest',
        finished: true
      };
    } catch (error) {
      return {
        content: '',
        provider: 'gemini',
        model: 'gemini-1.5-pro-latest',
        finished: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Unified AI Router
export class AIRouter {
  private providers: Map<string, ClaudeAI | OpenAIAI | GeminiAI> = new Map();

  constructor() {
    // Initialize providers with API keys from secure storage
    this.initializeProviders();
  }

  private async initializeProviders() {
    // In a real app, these would come from secure storage
    const claude = new ClaudeAI('your-claude-api-key');
    const openai = new OpenAIAI('your-openai-api-key');
    const gemini = new GeminiAI('your-gemini-api-key');

    this.providers.set('claude', claude);
    this.providers.set('openai', openai);
    this.providers.set('gemini', gemini);
  }

  async generateResponse(
    providerId: string,
    messages: AIMessage[],
    onStream?: AIStreamCallback
  ): Promise<AIResponse> {
    const provider = this.providers.get(providerId);
    if (!provider) {
      return {
        content: '',
        provider: providerId,
        model: 'unknown',
        finished: true,
        error: `Provider ${providerId} not found`
      };
    }

    return await provider.generateMessage(messages, onStream);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  // Smart provider selection based on message content and context
  selectBestProvider(
    messages: AIMessage[],
    elementType?: string,
    capabilities?: string[]
  ): string {
    // Enhanced selection logic considering elemental alignment
    if (elementType) {
      switch (elementType) {
        case 'fire':
          return 'claude'; // Best for creative, passionate content
        case 'water':
          return 'gemini'; // Best for emotional, intuitive responses
        case 'earth':
          return 'openai'; // Best for structured, practical content
        case 'wind':
          return 'claude'; // Best for communication, ideas
        case 'void':
          return 'gemini'; // Best for mysterious, deep insights
      }
    }

    // Default fallback to Claude
    return 'claude';
  }
}