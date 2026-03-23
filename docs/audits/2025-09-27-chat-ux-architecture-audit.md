# Arcanea Mobile Chat Architecture & UX Audit
Date: 2025-09-27
Reviewer: Codex (GPT-5)
Scope: `app/(tabs)/index.tsx`, `app/api/chat/+api.ts`, Expo Router shell, related `tailwind.config.js`, strategic specs in `docs/strategy`.

---

## 1. Current Implementation Snapshot
- **Chat UI hook** - `app/(tabs)/index.tsx:32-52` uses `useChat` from `ai/react` with a hard-coded relative API path, no session persistence or luminor routing.
- **Streaming API** - `app/api/chat/+api.ts:1-45` proxies to OpenAI `gpt-4-turbo-preview` with a multi-luminor system prompt but no guardrails, auth, or routing metadata.
- **UI presentation** - Layout is a single-column chat with TTS playback (`expo-speech`) and placeholder voice capture. No composer for mode switching or tool invocation inline.
- **State + storage** - No cache or context store; all conversation state lives in hook memory. App restart wipes history.
- **Multi-modal tabs** - Scripta, Lumina, Kinetix screens are placeholders with local state; they do not integrate with SuperAgent or share history/context.

## 2. Alignment with Strategic Specs
- Technical architecture spec (`docs/strategy/needs-review/ARCANEA_MOBILE_TECHNICAL_ARCHITECTURE.md`) calls for a SuperAgent orchestrator, Luminor registry, memory, and tool routing. Current build only has a thin chat wrapper.
- UX design system (`docs/strategy/needs-review/ARCANEA_MOBILE_UX_DESIGN_SYSTEM.md`) expects multi-modal orchestration, animating affordances, and accent palettes; present UI uses minimal Tailwind tokens and lacks luminor-mode differentiation.
- Strategy assessment (`docs/strategy/archive/ARCANEA_STRATEGY_ASSESSMENT.md`) stresses staged proof points and governance; nothing enforces guardrails, attribution, or analytics in the chat flow today.

## 3. Key Issues & Risks
1. **API topology mismatch** - Expo mobile cannot call `/api/chat` locally in production. Needs environment-aware base URL + auth guard (`app/(tabs)/index.tsx:32-37`).
2. **Missing SuperAgent orchestration** - No luminor registry, memory, or tool protocol despite spec. Chat cannot route to image/video pipelines.
3. **Bundle bloat / runtime risk** - Heavy node-centric SDKs (`openai`, `anthropic`) in `package.json` risk metro failures on native builds; unused imports should move server-side.
4. **No session persistence** - Lack of storage or conversation history undermines UX parity with ChatGPT; cannot resume or branch chats.
5. **Accessibility & performance gaps** - `expo-speech` fire-and-forget (no cancellation), repeated `setTimeout` scrolling, no virtualization for long threads.
6. **Compliance & observability blind spot** - No logging/analytics, rate limiting, or guardrails around LLM outputs contrary to governance guidance.

## 4. Prioritized Recommendation Backlog
| Priority | Track | Recommendation | Type | Owners |
|----------|-------|----------------|------|--------|
| P0 | Backend | Stand up edge API (`/v1/chat`, `/v1/image`, `/v1/video`) on Vercel with OpenRouter + auth token; Expo client hits env-configured base URL. | Feature | Platform |
| P0 | Orchestration | Implement `lib/ai/provider.ts` with SuperAgent orchestrator pattern (registry, memory, tool contracts) per technical spec; expose typed client hooks. | Feature | AI Eng |
| P1 | UX | Replace current chat screen with modular composer: message thread, tool palette, luminor switcher, attachment tray, status toasts. Align styling with design tokens. | Refactor | Mobile UX |
| P1 | State | Introduce persistent chat stores (e.g., Zustand + SQLite/AsyncStorage) with session metadata, transcript export, and resume. | Feature | Mobile Core |
| P1 | Tooling | Add streaming parsers for multi-modal directives (e.g., `/image`, `/video`) and route to dedicated generation services. | Feature | AI Eng |
| P2 | Safety | Add content filters, rate limiting, and per-luminor logging per governance charter. | Feature | Compliance |
| P2 | Perf | Tree-shake server-only SDKs from client bundle, split API schema package. | Chore | Mobile Core |
| P2 | Voice | Integrate actual voice capture (`react-native-voice`) with user consent UI, fallback transcription (OpenAI Whisper or Deepgram). | Feature | Mobile UX |

## 5. Proposed Unified Chat Architecture

### 5.1 Client Layer
- `hooks/useArcaneaChat.ts` orchestrates chat sessions, bridging UI and SuperAgent APIs. Accepts sessionId, luminor preference, and tool invocations.
- `providers/ChatProvider.tsx` offers context (active session, queue status, network state) to views.
- Modular UI components:
  - `MessageThread` (virtualized list, markdown + block rendering)
  - `Composer` (text, command palette, attachment chips)
  - `LuminorSwitcher` (Scripta/Lumina/Kinetix + custom)
  - `ActionRail` (image/video generation shortcuts)

### 5.2 API Layer
- REST endpoints hosted on Vercel Edge / Fastly: `/v1/sessions`, `/v1/messages`, `/v1/tools/image`, `/v1/tools/video`.
- Uses Vercel AI SDK server utilities only (no client bundling) with OpenRouter provider for model fan-out (GPT-4o, Claude, Gemini, Luma).
- JWT auth middleware pulling realm/user claims; observability via Vercel Analytics + OpenTelemetry traces.

### 5.3 SuperAgent Orchestrator
- `lib/ai/base-luminor.ts` defines interface (id, capabilities, execute, toolSchema).
- `lib/ai/luminors/{scripta|lumina|kinetix}.ts` encapsulate prompt templates, tool usage, safety guards.
- `lib/ai/provider.ts` exposes `routeMessage({ session, input })` returning primary response + tool tasks (image/video payloads or instructions).
- Memory stack: short-term (Redis), long-term (Supabase/Postgres) with embeddings in Pinecone (per Phase 2).

### 5.4 Multimodal Flow
1. UI sends message with metadata (desired outputs).
2. Orchestrator selects luminor(s); if image/video required, dispatch tool jobs (e.g., Firefly, Runway) via async queue.
3. Streaming text delivered immediately; job status updates push via Supabase Realtime.
4. UI renders tool cards inline (image/video preview, download, share).

## 6. Suggested Initial Tickets
1. `MOB-201` - Replace `useChat` with `useArcaneaChat` hooking to new `/v1/messages` endpoint; add env-configurable base URL + auth headers.
2. `MOB-202` - Build `MessageThread`, `Composer`, `LuminorSwitcher` components with design tokens and theming.
3. `AI-110` - Implement SuperAgent orchestrator + luminor registry, returning structured payloads for tools.
4. `PLAT-082` - Deploy Vercel Edge API with streaming + SSE push for tool updates; integrate OpenRouter multi-model routing.
5. `SAF-041` - Ship moderation pipeline (OpenAI/Anthropic filters + custom guardrails) and audit logging.
6. `UX-155` - Add persistent conversation history with resume + export; connect to AsyncStorage and Supabase sync.
7. `VOICE-014` - Integrate voice capture + playback controls, with state management and user consent flows.

## 7. Follow-Up Questions / Dependencies
- Confirm hosting strategy for mobile APIs (Vercel Edge vs. Supabase Functions) and auth provider (Supabase Auth vs. custom JWT).
- Determine preferred multimodal providers (Runway, Pika, Stability) and licensing budgets.
- Align on analytics stack (Mixpanel, PostHog, or custom) for conversation insights.
- Clarify Phase 1 scope: text-first with image stubs, or full multimodal at launch?

---
Prepared for leadership review and ticketization.
