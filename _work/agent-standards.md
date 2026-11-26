---
title: agent-standards
org: crithits
role: author
period: 2026
status: active
category: tooling
featured: true
order: 1
image:
image_alt: ""
image_label: "$ cat AGENTS.md"
image_note: "lint · tsconfig · agent rules — one source, every repo"
summary: "One repo that teaches coding agents to write React + TypeScript the way we want, and makes lint catch it when they don't."
problem: "Claude Code, Codex, Cursor and Copilot all write plausible React that quietly drifts: effects for derived state, loose types and unchecked casts, an eslint-disable comment to make the error go away. Every repo kept its own rules file, and those drifted too."
approach: "Three layers from one source. A shared ESLint config and strict tsconfig, published as packages, enforce the rules: React Compiler checks, strict type-checked TypeScript, accessibility, no escape hatches. A shared AGENTS.md tells agents what to do instead, and a GitHub App syncs it to every repo by pull request. Vercel's React skills cover the deep reference on demand."
outcome: "Opting in is one file: drop an AGENTS.local.md into a repo, or a single folder of a monorepo, and the next sync delivers the rules there. There's no repo list to maintain. Change a rule once and every opted-in repo gets a PR, so agents read the same rules lint enforces and review time goes to design instead of catching misused effects."
stack: [ESLint, TypeScript, React 19, AGENTS.md, GitHub Actions]
---
[github.com/crithits/agent-standards →](https://github.com/crithits/agent-standards)
