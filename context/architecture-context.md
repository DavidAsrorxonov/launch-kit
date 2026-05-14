# Architecture Context

## System Overview

LaunchKit is a Next.js App Router application that serves two responsibilities:

1. A public product interface for explaining the tool, collecting feedback, and guiding users through starter configuration.
2. A server-side project generator that renders EJS templates, merges selected module outputs, packages them into a ZIP, and returns the ZIP as a download.

The app is intentionally small and modular. Most product behavior lives in page-level components, generator behavior lives under `lib/generator/`, reusable UI primitives live under `components/ui/`, and generated-project source files live under `templates/`.

## Runtime Architecture

```txt
User browser
  |
  | renders landing page and wizard
  v
Next.js App Router
  |
  |-- app/page.tsx
  |     landing page composition
  |
  |-- app/wizard/page.tsx
  |     client-side wizard state, live output tree, ZIP download trigger
  |
  |-- app/api/generate/route.ts
  |     calls generator and returns application/zip
  |
  |-- app/api/feedback/route.ts
        validates feedback and persists it to MongoDB
```

LaunchKit does not currently have user accounts, project persistence, billing, or saved configurations. The wizard state exists only in the browser until the user clicks Generate.

## Major Boundaries

### App Routes

`app/` contains Next.js route segments and route handlers.

- `app/page.tsx` composes the public landing page.
- `app/wizard/page.tsx` owns wizard UI state and calls `/api/generate`.
- `app/api/generate/route.ts` owns project generation requests.
- `app/api/feedback/route.ts` owns feedback submission.
- `app/layout.tsx` loads fonts, metadata, analytics, and global toaster.

Route handlers should stay thin. Validation, generation, persistence, and packaging details belong in shared modules.

### UI Components

`components/` contains product-level UI composition.

- `components/ui/*` are shadcn/ui foundation primitives and should stay generic.
- `components/effect/*` are shared decorative background effects.
- `components/hero.tsx`, `navbar.tsx`, `feedback-section.tsx`, and `footer.tsx` are product-specific sections.
- `components/render-output-tree.tsx` renders the wizard output tree from structured data.

Product-specific styling should be applied in feature components or pages, not baked into `components/ui/*`.

### Generator

`lib/generator/` is the core generation boundary.

- `index.ts` derives generation flags, loads templates, merges modules, merges partials, and returns an in-memory file map.
- `load-template.ts` recursively reads a template directory, renders EJS variables, removes `.ejs`, and skips `.partial.ejs`.
- `load-partial.ts` renders a single partial template file.
- `merge-files.ts` overlays module files onto base files.
- `zip.ts` converts the file map into a ZIP blob with JSZip.

The generator returns `Record<string, string>`, where each key is the generated output path and each value is file content.

### Persistence

LaunchKit persistence is currently limited to feedback.

- `lib/db.ts` manages a cached Mongoose connection using `globalThis`.
- `models/feedback.ts` defines the Feedback schema.
- `app/api/feedback/route.ts` validates and writes feedback documents.

There is no database persistence for wizard configurations, generated output, or user sessions in the LaunchKit app itself.

### Templates

`templates/` is the source of generated project files.

```txt
templates/
  base/
  modules/
    db/
      mongodb/
    auth/
      better-auth/
```

Base templates define the minimum Next.js starter. Module templates add files, dependencies, and environment variables.

## Generation Flow

1. User configures the starter in `app/wizard/page.tsx`.
2. Wizard posts JSON to `/api/generate`.
3. `app/api/generate/route.ts` passes `projectName`, `db`, and `auth` into `generateProject()`.
4. `generateProject()` trims and defaults the project name.
5. `generateProject()` derives feature flags:

```ts
const hasAuth = config?.auth === "better-auth";
const hasMongoDB = config?.db === "mongodb" || hasAuth;
```

6. Base templates are loaded first.
7. MongoDB templates are merged when `hasMongoDB` is true.
8. Better Auth templates are merged when `hasAuth` is true.
9. Module `package.json.partial.ejs` files are merged into the generated `package.json`.
10. Module environment partials are merged into `.env.example`.
11. `createZip()` adds every generated file to a JSZip archive.
12. `/api/generate` returns the ZIP response.
13. The browser creates an object URL and triggers the download.

## Generator Configuration

```ts
export type GenerateProjectConfig = {
  projectName?: string;
  db?: "mongodb";
  auth?: "better-auth";
};
```

Current options:

- Base starter only.
- MongoDB module.
- Better Auth + Google OAuth module.

Better Auth implies MongoDB. The UI enforces this by selecting MongoDB when auth is selected and disabling the "No database" option.

## Template Rules

Generated files are EJS templates ending in `.ejs`. The output path is the same relative path without `.ejs`.

Partial templates are internal generator inputs and must not appear in the generated ZIP.

Current partial types:

- `package.json.partial.ejs` for module dependencies.
- `.env.example.partial.ejs` for module environment variables.

Invariants:

- Never generate `.env`.
- Always generate or update `.env.example`.
- Never include real secrets in templates.
- Keep module dependencies in `package.json.partial.ejs`.
- Keep module environment additions in `.env.example.partial.ejs`.
- Keep module files under the relevant `templates/modules/*` directory.
- Do not expose `.partial.ejs` files in generated output.

## File Merging Model

Generated files are represented as a flat object:

```ts
Record<string, string>;
```

`mergeFiles()` performs a shallow object spread:

```ts
{
  ...baseFiles,
  ...moduleFiles,
}
```

This means module files can overwrite base files with the same output path. That should be treated as an intentional extension point, not an accidental side effect. If a module needs to alter a shared file, prefer a documented partial merge strategy over replacing whole files silently.

## Package Merge Model

Module package partials are parsed as JSON and currently merged only at the `dependencies` level.

```ts
{
  ...basePackage,
  dependencies: {
    ...basePackage.dependencies,
    ...modulePackage.dependencies,
  },
}
```

If future modules need scripts, dev dependencies, package metadata, or framework config, the package merge logic must be extended deliberately.

## Environment Merge Model

Environment additions are merged line-by-line with `mergeEnv()`.

- Existing lines are trimmed and placed in a set.
- New non-empty lines are appended only if the trimmed line does not already exist.
- Comments and blank-line formatting are not semantically parsed.

This is sufficient for small `.env.example` additions. If modules begin contributing many grouped variables, use a more structured merge strategy.

## Output Tree Preview

The wizard output tree is not generated by reading templates. It is defined separately in `constants/output-files.ts`.

- `baseOutputFiles`
- `mongoOutputFiles`
- `authOutputFiles`

`mergeOutputTrees()` recursively merges folder nodes by name and type. The UI renders the merged tree with `renderOutputTree()`.

When template files change, the matching output tree constants must be updated so the wizard preview stays accurate.

## Feedback Flow

1. User submits feedback from `FeedbackSection`.
2. Client validates only the minimum message length before calling the API.
3. `app/api/feedback/route.ts` parses JSON.
4. Server trims `email` and `message`.
5. Server validates:
   - message is required
   - minimum length is 10
   - maximum length is 1000
6. Server opens a cached Mongoose connection.
7. Server creates a Feedback document.
8. Server returns `{ success: true, message: string }`.

Feedback documents include:

- `email`, optional string with default `""`
- `message`, required string
- `createdAt`
- `updatedAt`

## Data And Storage

LaunchKit currently uses MongoDB through Mongoose.

Required environment variable for LaunchKit feedback persistence:

```env
MONGODB_URI=
```

`lib/db.ts` reads `MONGODB_URI` at module load time and throws if it is missing. Any route importing `connectToDatabase` depends on that variable being present.

There is no Prisma schema, PostgreSQL database, Vercel Blob storage, or relational task-run model in the current codebase.

## Client/Server Split

Client components:

- `app/page.tsx`
- `app/wizard/page.tsx`
- `components/navbar.tsx`
- `components/hero.tsx`
- `components/feedback-section.tsx`
- `components/ui/select.tsx`
- `components/ui/label.tsx`
- `components/ui/sonner.tsx`

Server or shared modules:

- Route handlers in `app/api/*`
- Generator modules in `lib/generator/*`
- Database helper in `lib/db.ts`
- Mongoose models in `models/*`
- Constants and interface files

Use client components only when browser state, events, effects, or client-only libraries are required.

## External Dependencies

Main runtime dependencies by responsibility:

- Next.js App Router: application shell, pages, route handlers.
- React: UI rendering.
- Tailwind CSS v4: styling.
- shadcn/ui and Radix primitives: reusable UI foundation.
- lucide-react: icons.
- sonner: toast notifications.
- EJS: template rendering.
- JSZip: ZIP archive creation.
- Mongoose: LaunchKit feedback persistence and generated MongoDB module.
- MongoDB driver: generated Better Auth adapter integration.
- Better Auth: generated auth module.
- Vercel Analytics: app analytics.

## Deployment Model

The documented target hosting platform is Vercel.

Deployment assumptions:

- The app can read templates from the deployed filesystem using `process.cwd()`.
- `/api/generate` can synchronously read template files during a request.
- ZIP generation completes within route handler execution limits.
- Feedback persistence requires a valid `MONGODB_URI`.

If template volume, module count, or ZIP size grows meaningfully, generation may need to move away from synchronous filesystem reads inside the request path.

## Invariants

- LaunchKit itself does not store generated projects.
- Wizard state is local browser state until generation.
- `/api/generate` returns a ZIP, not JSON, on success.
- Better Auth selection always implies MongoDB.
- `.env` must never be generated.
- `.env.example` is the only generated environment file.
- Module templates must remain modular and scoped to their feature.
- Output tree constants must match the generated template structure.
- Foundation UI components in `components/ui/*` should stay generic.
- Feedback messages must be validated on the server before persistence.

## Current Architecture Debt

- `app/api/generate/route.ts` and `lib/generator/index.ts` contain debug `console.log` statements that should be removed before publishing.
- `/api/generate` does not currently validate `projectName`, `db`, or `auth` against a schema before calling the generator.
- `loadPartialTemplate()` assumes the partial exists and will throw if it does not.
- The base generated `package.json` currently includes `mongoose` even when MongoDB is not selected.
- Package merging only handles `dependencies`.
- Environment merging is line-based and does not understand grouped sections.
- LaunchKit feedback storage uses MongoDB/Mongoose, while `context/core-standards.md` currently references PostgreSQL/Prisma and Vercel Blob conventions that are not present in this app.
