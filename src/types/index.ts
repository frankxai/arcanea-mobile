// AI Provider Types and Interfaces
export interface AIProvider {
  id: string;
  name: string;
  model?: string;
  apiKey?: string;
  enabled: boolean;
  capabilities: AICapabilities;
}

export interface AICapabilities {
  text: boolean;
  image: boolean;
  video: boolean;
  audio: boolean;
  streaming: boolean;
  code: boolean;
  analysis: boolean;
  translation: boolean;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  provider: string;
  metadata?: {
    tokens?: number;
    model?: string;
    temperature?: number;
    elementType?: string;
  };
}

export interface AIResponse {
  content: string;
  provider: string;
  model: string;
  tokens?: number;
  finished: boolean;
  error?: string;
}

export interface AIStreamCallback {
  (chunk: AIResponse): void;
}

// Guardian AI Types
export interface GuardianAI {
  id: string;
  name: string;
  title: string;
  element: ElementalElement;
  personality: GuardianPersonality;
  expertise: string[];
  powerLevel: number;
  description: string;
  avatar: string;
  command: string;
  color: string;
  accent: string;
}

export interface GuardianPersonality {
  traits: string[];
  communicationStyle: string;
  mood: 'energetic' | 'calm' | 'intense' | 'mysterious' | 'wise' | 'playful';
  tone: string;
}

export type ElementalElement = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'integration';

// Multi-modal Generation Types
export interface GenerationRequest {
  type: 'text' | 'image' | 'video' | 'audio';
  prompt: string;
  provider: string;
  options?: {
    width?: number;
    height?: number;
    quality?: 'low' | 'medium' | 'high' | 'ultra';
    duration?: number;
    style?: string;
    temperature?: number;
    maxTokens?: number;
  };
}

export interface GenerationResponse {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio';
  url?: string;
  content?: string;
  metadata?: {
    size?: number;
    duration?: number;
    format?: string;
    provider?: string;
    model?: string;
  };
  status: 'pending' | 'generating' | 'completed' | 'error';
  error?: string;
}

// Chat and Conversation Types
export interface ChatConversation {
  id: string;
  title: string;
  guardianId: string;
  messages: AIMessage[];
  createdAt: number;
  updatedAt: number;
  settings: ChatSettings;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  streaming: boolean;
  memoryEnabled: boolean;
  contextLength: number;
}

// Project and User Types
export interface ArcaneaProject {
  id: string;
  name: string;
  description: string;
  type: 'world' | 'character' | 'story' | 'scene' | 'general';
  createdAt: number;
  updatedAt: number;
  content: {
    text?: string;
    images?: string[];
    videos?: string[];
    audio?: string[];
    threeD?: any;
  };
  tags: string[];
  isPublic: boolean;
  collaborators?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  elementalAffinity?: ElementalElement;
  preferredGuardian?: string;
  subscription: 'free' | 'premium' | 'unlimited';
  credits: number;
  settings: UserSettings;
  createdAt: number;
}

export interface UserSettings {
  theme: 'auto' | 'light' | 'dark';
  language: string;
  notifications: boolean;
  autoSave: boolean;
  experimental: boolean;
  aiProviders: AIProvider[];
}

// 3D Studio Types
export interface Scene3D {
  id: string;
  name: string;
  objects: SceneObject[];
  lighting: SceneLighting;
  camera: SceneCamera;
  environment: EnvironmentSettings;
}

export interface SceneObject {
  id: string;
  type: 'mesh' | 'light' | 'camera' | 'group';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  geometry?: any;
  material?: any;
  children?: SceneObject[];
}

export interface SceneLighting {
  ambient: {
    color: string;
    intensity: number;
  };
  directional: {
    color: string;
    intensity: number;
    position: [number, number, number];
  };
  point?: Array<{
    color: string;
    intensity: number;
    position: [number, number, number];
  }>;
}

export interface SceneCamera {
  type: 'perspective' | 'orthographic';
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export interface EnvironmentSettings {
  skybox?: string;
  fog?: {
    color: string;
    near: number;
    far: number;
  };
  ground?: {
    color: string;
    size: number;
  };
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}