# ADR: SuperAgent API Hosting & Authentication
Date: 2025-09-27
Status: Proposed
Deciders: Codex, Arcanea Mobile Leadership

## Context
Arcanea mobile currently relies on an Expo Router `+api` route (`/api/chat`) that proxies directly to OpenAI. This approach fails outside the Expo dev tunnel, has no authentication, and cannot scale to multi-modal workloads. The strategy docs require a SuperAgent gateway with luminor orchestration, auditability, and future tool dispatch.

## Decision
1. **Hosting**: Deploy the SuperAgent API to Vercel Edge Functions under `/v1/superagent`. Rationale: zero-cold-start runtime, native integration with the Vercel AI SDK, and shared observability (Edge Config, Analytics). Supabase Edge Functions remain reserved for data services.
2. **Authentication**: Use Supabase Auth JWTs issued by the Arcanea platform. Mobile clients attach `Authorization: Bearer <token>`. Edge middleware verifies the token, enriches with user + realm claims, and enforces rate policies via Upstash Redis.
3. **Client Integration**: Expo mobile reads `EXPO_PUBLIC_SUPERAGENT_URL` and falls back to the in-app edge route for local development. All chat traffic moves to `/v1/superagent/messages`, retiring the `/api/chat` stub once the edge deployment is live.
4. **Observability & Safety**: Edge functions emit OpenTelemetry traces to Vercel Observability and structured JSON logs to Supabase Logflare for policy enforcement.

## Consequences
- Requires provisioning a Supabase service role secret in Vercel for JWT verification.
- Introduces an infrastructure dependency on Vercel's Edge runtime; contingency plans should document migration steps to Cloudflare or Fastly if needed.
- Enables consistent auth across chat, image, and video tools, unlocking Guardrail + analytics workstreams outlined in the audit.

## Follow-up Tasks
- [ ] Create `/v1/superagent/messages` edge function repo scaffolding with JWT middleware.
- [ ] Configure Supabase JWT verification key in Vercel environment variables.
- [ ] Implement rate limiting middleware using Upstash Redis per user + luminor.
- [ ] Document local dev instructions for hitting the edge endpoint via `vercel dev` in `README.md`.
