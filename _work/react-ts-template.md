---
title: react-ts-template
org: crithits
role: author
period: 2026
status: active
category: tooling
featured: true
order: 2
image:
image_alt: ""
image_label: "$ gh repo create --template"
image_note: "use this template → agent-ready on the first commit"
summary: "A GitHub template that starts every new React + TypeScript repo with agent-standards already wired in."
problem: "The first commit sets the patterns every agent copies after it. Repos started from scratch begin with loose lint, loose types and no agent rules, and retrofitting agent-standards later means fixing everything the agents wrote in the meantime."
approach: "A template repository on the current stack: Vite, React 19 with the React Compiler, the shared ESLint config and strict tsconfig, and Vitest with Testing Library. CI runs typecheck, lint with zero warnings allowed, and tests. Dependabot keeps the shared packages current, and an Actions job regenerates the lockfile if it drifts."
outcome: "Click Use this template and the new repo is opted into agent-standards from day one: it ships with AGENTS.local.md, so it gets every rules update by PR with no setup. The only thing left to write is what the repo is for."
stack: [Vite, React 19, React Compiler, Vitest, pnpm]
---
[github.com/crithits/react-ts-template →](https://github.com/crithits/react-ts-template)
