import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ArcaneaMessage, ChatSession, LuminorId, SendMessageResponse } from '@/lib/ai/types';

const STORAGE_KEY = 'arcanea:chat:active-session';
const SUPERAGENT_ENDPOINT =
  process.env.EXPO_PUBLIC_SUPERAGENT_URL ?? '/api/superagent/messages';

interface UseArcaneaChatOptions {
  initialLuminor?: LuminorId;
  authToken?: string;
}

interface UseArcaneaChatResult {
  sessionId?: string;
  messages: ArcaneaMessage[];
  activeLuminor: LuminorId;
  isLoading: boolean;
  error?: string;
  sendMessage: (message: string) => Promise<void>;
  switchLuminor: (luminorId: LuminorId) => void;
  resetSession: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

async function loadPersistedSession(): Promise<ChatSession | undefined> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as ChatSession;
  } catch (error) {
    console.warn('[chat] Failed to load persisted session', error);
    return undefined;
  }
}

async function persistSession(session: ChatSession | undefined) {
  try {
    if (!session) {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.warn('[chat] Failed to persist session', error);
  }
}

export function useArcaneaChat(options?: UseArcaneaChatOptions): UseArcaneaChatResult {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ArcaneaMessage[]>([]);
  const [activeLuminor, setActiveLuminor] = useState<LuminorId>(
    options?.initialLuminor ?? 'scripta',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const authToken = options?.authToken;

  useEffect(() => {
    let mounted = true;

    (async () => {
      const persisted = await loadPersistedSession();
      if (!mounted || !persisted) return;

      setSessionId(persisted.id);
      setMessages(persisted.messages ?? []);
      setActiveLuminor(persisted.luminorId ?? options?.initialLuminor ?? 'scripta');
    })();

    return () => {
      mounted = false;
    };
  }, [options?.initialLuminor]);

  useEffect(() => {
    const session: ChatSession | undefined = sessionId
      ? {
          id: sessionId,
          luminorId: activeLuminor,
          createdAt: messages[0]?.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages,
        }
      : undefined;

    void persistSession(session);
  }, [sessionId, activeLuminor, messages]);

  const switchLuminor = useCallback((luminorId: LuminorId) => {
    setActiveLuminor(luminorId);
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        return;
      }

      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(SUPERAGENT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          body: JSON.stringify({
            sessionId,
            luminorId: activeLuminor,
            message,
            history: messages,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => undefined);
          throw new Error(payload?.error ?? 'Failed to reach Arcanea SuperAgent');
        }

        const data = (await response.json()) as SendMessageResponse;
        setSessionId(data.sessionId);
        setMessages(data.messages);
        setActiveLuminor(data.activeLuminor);
      } catch (err) {
        console.error('[chat] Unable to send message', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [activeLuminor, authToken, messages, sessionId],
  );

  const resetSession = useCallback(async () => {
    setSessionId(undefined);
    setMessages([]);
    await persistSession(undefined);
  }, []);

  const refreshSession = useCallback(async () => {
    if (!sessionId) return;
    const persisted = await loadPersistedSession();
    if (!persisted) return;

    setMessages(persisted.messages ?? []);
    setActiveLuminor(persisted.luminorId ?? activeLuminor);
  }, [activeLuminor, sessionId]);

  return {
    sessionId,
    messages,
    activeLuminor,
    isLoading,
    error,
    sendMessage,
    switchLuminor,
    resetSession,
    refreshSession,
  };
}
