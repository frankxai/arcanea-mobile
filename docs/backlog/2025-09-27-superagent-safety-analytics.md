# SuperAgent Safety & Analytics Workstream
Date: 2025-09-27
Owner: Platform & Compliance Squad

## Objective
Instrument the new SuperAgent API with moderation guardrails, audit logging, and analytics lines mandated by Arcanea governance so we can safely expand multi-modal tooling.

## Work Items
1. **Moderation Pipeline (SAF-050)**
   - Integrate OpenAI/Anthropic moderation APIs at the edge.
   - Define per-luminor red/yellow rule sets and user escalation flows.
   - Emit moderation events to Supabase `moderation_events` table for review rituals.

2. **Audit Trail (SAF-051)**
   - Persist structured chat transcripts (message id, luminor, tool invocations, moderation flags) to Supabase using a background worker.
   - Anonymize PII via reversible hashing before storage to respect privacy commitments.

3. **Observability Dashboards (ANA-071)**
   - Ship OpenTelemetry spans from edge functions to Vercel Observability and forward to Grafana Cloud.
   - Build Mixpanel dashboards tracking session length, luminor switching, tool usage, and failure rates.

4. **Rate & Spend Governance (SAF-052)**
   - Enforce tier-based rate limits via Upstash Redis.
   - Implement spend counters per realm to monitor OpenRouter/OpenAI usage.

5. **Incident Playbook (SAF-053)**
   - Document runbooks for moderation escalations, outage response, and key incident SLAs.
   - Schedule monthly tabletop exercises with the Guardian Council.

## Deliverables
- Terraform/CLI scripts for provisioning Redis + logging sinks.
- Supabase schema migration (`supabase/migrations/20250927001_add_moderation_tables.sql`).
- Mixpanel dashboard links embedded in `docs/ops/observability.md`.
- Confluence-style incident template adapted to Arcanea rituals.

## Dependencies
- Supabase Auth rolled out to mobile client.
- Vercel Edge Functions deployment pipeline.
- Upstash account credentials stored in 1Password + Vercel secrets.

## Timeline
- Week 1: Moderation pipeline + rate limiting.
- Week 2: Audit trail ingestion + observability wiring.
- Week 3: Dashboards + incident playbook handoff.
