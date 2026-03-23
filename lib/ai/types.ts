export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export type LuminorId = 'superagent' | 'scripta' | 'lumina' | 'kinetix';

export interface ArcaneaMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  luminorId?: LuminorId;
  toolInvocations?: ToolInvocation[];
}

export interface ToolInvocation {
  id: string;
  type: 'image' | 'video' | 'audio' | 'knowledge';
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  payload?: Record<string, unknown>;
  resultUrl?: string;
  errorMessage?: string;
}

export interface ChatSession {
  id: string;
  luminorId: LuminorId;
  createdAt: string;
  updatedAt: string;
  messages: ArcaneaMessage[];
}

export interface SendMessageRequest {
  sessionId?: string;
  luminorId: LuminorId;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface SendMessageResponse {
  sessionId: string;
  messages: ArcaneaMessage[];
  activeLuminor: LuminorId;
  toolInvocations?: ToolInvocation[];
}
