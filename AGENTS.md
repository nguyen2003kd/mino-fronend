<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

## Project Architecture

This project is a Next.js + TypeScript application.

All application source code MUST be placed inside `src/`.

Do NOT create application source files outside `src/` unless explicitly requested.

---

## Source Structure

```text
src/
├── app/                  # Next.js routes, layouts and pages
│   ├── _providers/        # Root-level provider composition for the App Router
│   └── <route>/components/ # Route-private UI components
├── api/                  # Orval-generated API endpoints, models and mutators
├── auth/                 # Shared authentication and authorization guards
├── components/           # Shared reusable components
│   ├── ui/               # UI primitives
│   └── common/           # Project-wide shared components
├── features/             # Feature/business modules
├── hooks/                # Custom React hooks
├── services/             # Shared handwritten service functions
├── configs/              # Application, environment and ACL configuration
├── lib/                  # Libraries and application configuration
├── types/                # Global TypeScript types
├── constants/            # Application constants
├── stores/               # Global state management
├── styles/               # Global stylesheets and CSS layers
└── utils/                # Reusable utility/helper functions
```

---

## Mandatory Rules

### 1. Do not create random folders

Before creating a new folder, check whether an existing folder can contain the code.

Do NOT create folders such as:

```text
src/helpers/
src/common2/
src/misc/
src/temp/
src/data/
src/api2/
src/components2/
```

unless explicitly requested.

---

### 2. Feature-specific code

If code belongs to a specific business feature, put it inside:

```text
src/features/<feature-name>/
```

Example:

```text
src/features/news/
├── components/
├── hooks/
├── services/
├── types/
└── index.ts
```

Do not put feature-specific code directly inside global folders.

When a feature is owned by a bounded area such as the admin application, make
that ownership explicit in its path:

```text
src/features/admin/homepage/
├── components/
└── services/
```

For example, an editor used only at `/admin/homepage` belongs in
`src/features/admin/homepage/`; code used only by the public homepage belongs
in `src/features/main/homepage/`.

---

### 3. Components

A component reusable across multiple domains should be placed in:

```text
src/components/
```

Components shared within one established domain, but not requiring a full
feature module, may be grouped at `src/components/<domain>/`. For example,
admin UI shared across the administration area belongs in `src/components/admin/`.

When a domain has its own business logic, hooks, services, or types, it MUST
live inside a feature module:

```text
src/features/<feature>/components/
```

Do not duplicate a component between `src/components/` and `src/features/`.

---

### 4. Page-specific components

A UI component used only by one route SHOULD be colocated with that route:

```text
src/app/<route>/
├── page.tsx
└── components/
    └── <component-name>.tsx
```

Keep `page.tsx` focused on route metadata and composition. Components in the
route's `components/` directory are private to that route and MUST NOT be
imported by another route.

If the component contains feature business logic or is used by more than one
route in the same domain, place it in `src/features/<feature>/components/`
instead. Promote a component to `src/components/` only when it is shared across
multiple domains.

---

### 5. API code

Orval-generated API code belongs in:

```text
src/api/
```

This directory is generated from the OpenAPI specification. Do not manually
edit endpoint/model files; update `orval.config.ts` and regenerate instead.

Handwritten API transformations and feature workflows belong in:

```text
src/services/
src/features/<feature>/services/
```

Generated TanStack Query hooks may be used directly in a Client Component when
the component only needs to submit or fetch data. If the request needs response
normalization, orchestration, or reuse across a feature, add a service or hook
inside that feature instead.

Example:

```text
src/features/news/services/news.service.ts
```

Next.js route handlers are an exception and MUST remain at:

```text
src/app/api/**/route.ts
```

Keep route handlers thin: validate input, call a service, and return the
response. Do not put reusable business logic in route handlers.

---

### 6. Hooks

Reusable handwritten custom hooks belong in:

```text
src/hooks/
```

Feature-specific hooks belong in:

```text
src/features/<feature>/hooks/
```

---

### 7. Types

Global/shared handwritten types belong in:

```text
src/types/
```

Feature-specific types belong in:

```text
src/features/<feature>/types/
```

Do NOT create duplicate type definitions.

Before creating a new type, search the project for an existing equivalent.

Types generated by Orval remain in `src/api/models/`; do not move or edit them
manually.

---

### 8. Utilities

Reusable helper functions belong in:

```text
src/utils/
```

Keep business workflows in features/services. Integrations with browser APIs or
third-party libraries should normally live in `src/lib/`; existing shared
storage, crypto, and formatting utilities may remain in `src/utils/`.

---

### 8.1 Styles

Place all application stylesheets (`.css`, `.scss`, `.sass`, and `.less`) in:

```text
src/styles/
```

Import global styles from the root layout. Do not create route-local or
component-local stylesheet files outside `src/styles/`.

---

### 9. Imports

Prefer the existing project aliases.

Example:

```ts
import { Button } from "@/components/ui/button";
import { getNews } from "@/features/news/services/news.service";
```

Avoid unnecessary relative imports such as:

```ts
../../../components/...
```

### 10. Naming conventions

Use lowercase `kebab-case` for all new handwritten file and directory names:

```text
product-card.tsx
use-cart.ts
checkout.service.ts
```

Use these suffixes where applicable:

* React component files: `<component-name>.tsx`; exported component: `PascalCase`.
* Hook files: `use-<hook-name>.ts` or `use-<hook-name>.tsx`; exported hook: `useCamelCase`.
* Service files: `<domain>.service.ts`.
* Feature type files: `<domain>.types.ts`.
* Constant files: `<domain>.constants.ts`.
* Test files: `<source-file>.test.ts` or `<source-file>.test.tsx` beside the source file, unless the existing test setup requires another location.

Next.js reserved route files are exceptions and MUST retain their required names:
`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`,
`template.tsx`, and `route.ts`.

Generated Orval files and existing PascalCase guard/context files are naming
exceptions. Do not rename them solely for convention cleanup.

Do not rename existing files solely to enforce this convention unless the task
explicitly includes that cleanup or the rename is needed for the current change.

### 11. Configuration and environment variables

Application configuration belongs in `src/configs/`. Do not access
`process.env` throughout components, hooks, or services; centralize validation
and typed access in a configuration module. A direct `process.env.NODE_ENV`
check is acceptable for development-only tooling.

Never commit secrets, API keys, tokens, or real credentials. Keep local values
in ignored `.env*.local` files and document required variable names in
`.env.example` when one is added.

### 12. Generated and static files

Do not manually edit generated files, lockfiles, or files produced by tooling
unless the requested change requires it. Place static assets such as images and
icons in `public/`; reference them using absolute paths such as `/LogoMain.svg`.

---

## Before Creating Files

The agent MUST:

1. Inspect the existing `src/` structure.
2. Search for an existing component/function/hook/service that can be reused.
3. Determine which feature owns the code.
4. Follow the existing naming convention.
5. Only then create a new file.

---

## Modification Rules

When fixing or adding functionality:

* Prefer modifying existing files over creating duplicate files.
* Do not refactor unrelated code.
* Do not move files unless required.
* Do not introduce a new architecture without explicit approval.
* Do not install a new dependency if the existing dependencies can solve the problem.
* Do not expose server-only values or secrets in client components.

---

## Engineering Working Principles

### 1. Think before coding

Before implementing, identify the request's assumptions, constraints, and
success criteria. Surface material trade-offs rather than silently choosing an
approach. If ambiguity would meaningfully change the implementation or risk
data, security, or scope, stop and ask for clarification.

### 2. Keep solutions simple

Implement the smallest change that fully satisfies the request.

* Do not add unrequested features, configurability, or speculative abstractions.
* Avoid abstractions for one-time use.
* Do not add handling for scenarios that cannot occur in the current context.
* If a solution is more complex than necessary, simplify it before finishing.

### 3. Make surgical changes

Every changed line must trace directly to the user's request.

* Do not alter adjacent formatting, comments, or behavior without need.
* Match the established local code style.
* Remove imports, variables, and functions made unused by your own changes.
* Report pre-existing dead code or unrelated issues; do not remove them unless asked.

### 4. Write readable, maintainable code

Code MUST be clear enough for another engineer to safely modify without first
decoding it.

* Use descriptive names for variables, functions, components, types, and props;
  avoid unclear abbreviations and single-letter names except for conventional
  short scopes such as array indexes.
* Keep functions and components focused on one responsibility. Extract a named
  helper or subcomponent when a block becomes difficult to scan or test.
* Prefer clear control flow, early returns, and named intermediate values over
  deeply nested conditions or dense one-line expressions.
* Format JSX with one meaningful element or prop group per line when doing so
  improves readability; do not compress large JSX trees into a single line.
* Use explicit TypeScript types at module boundaries and for non-obvious data
  structures. Do not use `any` unless there is a documented, unavoidable reason.
* Write comments only for intent, trade-offs, or non-obvious constraints; do not
  restate what the code already says.
* Keep related code together, remove code made obsolete by the change, and avoid
  duplicating logic that has a clear existing owner.

### 5. Execute toward verification

For multi-step work, state a short plan with a verification check for each step.
When practical, turn the requested behavior into an automated test; otherwise,
use the most relevant existing validation such as linting, type-checking, a
build, or a focused manual check. Do not declare a task complete until its
success criteria are verified.

---

## Completion Checklist

Before finishing a task, verify:

* [ ] Code is inside the correct `src/` directory.
* [ ] No unnecessary folders were created.
* [ ] Existing code was searched before creating new code.
* [ ] No duplicate components/hooks/services/types were created.
* [ ] Existing architecture was preserved.
* [ ] Imports follow project conventions.
* [ ] No unrelated files were modified.
* [ ] `pnpm lint` passes for code changes.
* [ ] `pnpm build` passes when the change may affect production behavior.



<!-- END:nextjs-agent-rules -->
