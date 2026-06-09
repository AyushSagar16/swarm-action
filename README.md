# Swarm UX Test — GitHub Action

Runs a Swarm AI UX test on each pull request and posts ranked findings back to the PR,
with a deep link to the saved run in your Swarm dashboard.

## Setup
1. Create a `cli:run` API key in the Swarm dashboard and add it as the repo secret `SWARM_API_KEY`.
2. Commit `swarm.config.yml` (see `examples/`) describing the goal, personas, build/serve commands, and gating.
3. Add the workflow in `examples/swarm.yml` to `.github/workflows/`.

## Auth options
- **API key (Phase 1):** create a `cli:run` key in the Swarm dashboard, store it as `SWARM_API_KEY`, pass `apiKey: ${{ secrets.SWARM_API_KEY }}`. With this path you pin personas/goal in `swarm.config.yml` (a `generatePersonas` or `swarmId` block).
- **GitHub App (Phase 2, no secret):** install the Swarm GitHub App and link it to your org (Settings → Integrations → Connect GitHub). Then omit `apiKey` and grant the job `id-token: write`; the Action exchanges a GitHub OIDC token for a short-lived key automatically. With this path **personas and the task are configured conversationally** — see below.

## Conversational setup (GitHub App path)
When the App opens the setup PR, `swarm.config.yml` ships **without** personas, so the Action does **not** auto-run on the first PR. Instead the Swarm bot @-mentions you in a PR comment and asks for:
- the **persona type** (audience), the **number of personas**, and the **task** (goal).

Reply with the filled-in `/swarm` template the bot posts; Swarm generates the personas, saves them as the repo's default, and reuses the task on future runs. Re-configure anytime with `/swarm reconfigure`.

### When does it run?
Each connected repo has a **run-mode** you control in **Swarm → Integrations**:
- **Manual** (default): only runs when someone comments `/swarm run` on a PR.
- **Automatic:** runs on every PR open once personas are configured.

Changing the toggle takes effect immediately — no workflow edit needed.

```yaml
permissions:
  contents: read
  pull-requests: write
  checks: write
  id-token: write   # required for the App (OIDC) auth path
steps:
  - uses: actions/checkout@v4
  - uses: AyushSagar16/swarm-action@v1   # no `apiKey` needed when the App is installed
```

## Rendering
If the PR has a preview URL (Vercel/Netlify/etc. or `preview.url`), the Action tests it.
Otherwise it builds + starts your app in the runner and exposes it via a Cloudflare tunnel.

## Config
See `examples/swarm.config.yml` for the full schema.

Under `gate.failOn`, `judgeVerdict` is a list of tokens matched case-insensitively as
substrings of the judge's plain-English verdict (which is prose, e.g. `"No — checkout is
broken."`). List failure-signalling words such as `"no"` or `"broken"`; any match fails the check.
