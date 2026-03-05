# Blackbox Programming

[![CI](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/deploy-pages.yml)
[![CodeQL](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/blackboxprogramming/blackboxprogramming.github.io/actions/workflows/codeql.yml)

> **Proprietary software — BlackRoad OS, Inc. All Rights Reserved.**
> This is NOT open source. See [LICENSE](LICENSE) for full terms.

Personal engineering hub for SDKs, tools, experiments, and the BlackRoad OS ecosystem.

**Live:** [blackboxprogramming.github.io](https://blackboxprogramming.github.io)

---

## Architecture

```
blackboxprogramming.github.io/
├── index.html                    # Main site (static HTML)
├── LICENSE                       # BlackRoad OS, Inc. Proprietary License
├── package.json                  # Node.js project config
├── scripts/
│   └── build.js                  # Build script → copies to dist/
├── workers/
│   └── redirect-worker.js        # Cloudflare Worker (edge security + redirects)
├── wrangler.toml                 # Cloudflare Workers config
├── vercel.json                   # Vercel deployment config
├── railway.toml                  # Railway deployment config
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # CI: lint, validate, audit
│   │   ├── deploy-pages.yml      # GitHub Pages deployment
│   │   ├── automerge.yml         # Auto-merge Dependabot PRs
│   │   ├── codeql.yml            # CodeQL security analysis
│   │   └── stale.yml             # Close stale issues/PRs
│   ├── dependabot.yml            # Automated dependency updates
│   ├── CODEOWNERS                # Required reviewers
│   └── ISSUE_TEMPLATE/
│       └── bug_report.yml        # Bug report template
├── SECURITY.md                   # Security policy
└── .gitignore                    # Git ignore rules
```

## Quick Start

```bash
# Install dependencies
npm ci

# Build to dist/
npm run build

# Serve locally
npm run serve
# → http://localhost:3000
```

## Workflows

All GitHub Actions are **pinned to specific commit hashes** for supply-chain security.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | Push/PR to main | HTML validation, dependency audit |
| **Deploy Pages** | Push to main | Build and deploy to GitHub Pages |
| **Automerge** | Dependabot PRs | Auto-approve and merge patch/minor updates |
| **CodeQL** | Push/PR + weekly | Static analysis security scanning |
| **Stale** | Daily cron | Close inactive issues/PRs after 30 days |

## Deployment Targets

| Platform | Config | Purpose |
|----------|--------|---------|
| **GitHub Pages** | `deploy-pages.yml` | Primary hosting |
| **Cloudflare Workers** | `wrangler.toml` | Edge security headers, redirects, caching |
| **Vercel** | `vercel.json` | Preview deployments, CDN |
| **Railway** | `railway.toml` | Staging environment |

## Cloudflare Worker

The edge worker (`workers/redirect-worker.js`) provides:
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- URL redirects (`/github`, `/os`, `/stripe`)
- Edge caching (1 year for static assets, 10 min for HTML)

```bash
# Deploy worker (requires wrangler auth)
npx wrangler deploy
```

## Security

- All Actions pinned to commit SHAs (no mutable tags)
- Dependabot auto-updates for GitHub Actions and npm
- CodeQL analysis on every push and weekly schedule
- CSP and security headers enforced at edge
- See [SECURITY.md](SECURITY.md) for vulnerability reporting

## Included Products & Assets

- **Stripe** — Products, billing, and payment infrastructure
- **Cloudflare Workers** — Edge compute and security
- **Railway** — Container hosting and staging
- **Vercel** — Preview deployments and CDN

## License

**Proprietary — BlackRoad OS, Inc.**

This software is NOT open source. All rights reserved. Unauthorized copying, modification,
distribution, or use is strictly prohibited. See [LICENSE](LICENSE) for the complete
BlackRoad OS, Inc. Proprietary Software License.

© 2024–2026 BlackRoad OS, Inc.
