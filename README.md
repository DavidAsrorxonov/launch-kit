# LaunchKit

LaunchKit is a web-based starter generator for solo developers who want to create a ready-to-run Next.js project without rebuilding the same setup from scratch.

Live site: [https://launchkit.dovudkhon.com](https://launchkit.dovudkhon.com)

Repository: [github.com/DavidAsrorxonov/launch-kit](https://github.com/DavidAsrorxonov/launch-kit)

## What It Does

LaunchKit lets a user configure a project in the browser, generate a starter from local EJS templates, and download the result as a ZIP file.

The current generator supports:

- A base Next.js starter.
- Optional MongoDB support with Mongoose.
- Optional Better Auth setup with Google OAuth.
- Automatic ZIP creation in the browser flow.
- A live output tree preview before download.
- A feedback form that stores user feedback in MongoDB.

The product scope is intentionally narrow: one framework, one database option, one auth option, and one-click ZIP generation.

## Tech Stack

- [Next.js 16.2.4](https://nextjs.org/docs) with the App Router.
- [React 19.2.4](https://react.dev/) and TypeScript.
- [Tailwind CSS 4](https://tailwindcss.com/) with shadcn UI primitives.
- [Radix UI](https://www.radix-ui.com/) and [lucide-react](https://lucide.dev/) for UI building blocks and icons.
- [EJS](https://ejs.co/) for rendering starter templates.
- [JSZip](https://stuk.github.io/jszip/) for ZIP generation.
- [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) for feedback storage.
- [Better Auth](https://www.better-auth.com/) in generated auth-enabled starters.
- [Vercel Analytics](https://vercel.com/docs/analytics) for site analytics.

## Main User Flow

1. The user opens the marketing page at `/`.
2. The user clicks **Generate Starter** and moves to `/wizard`.
3. The user enters a project name.
4. The user chooses:
   - no database or MongoDB;
   - no auth or Better Auth + Google.
5. If Better Auth is selected, MongoDB is automatically selected because the auth module requires a database.
6. The wizard shows a merged output tree for the selected modules.
7. The user clicks **Generate Starter**.
8. The browser posts the configuration to `/api/generate`.
9. The server renders the selected EJS templates, merges module files and package dependencies, creates a ZIP, and returns it.
10. The browser downloads `<projectName>.zip`.

## Application Routes

| Route           | Type          | Purpose                                                             |
| --------------- | ------------- | ------------------------------------------------------------------- |
| `/`             | Page          | Landing page with hero, project preview, feedback form, and footer. |
| `/wizard`       | Page          | Interactive starter generator.                                      |
| `/api/generate` | Route Handler | Accepts project options and returns a generated ZIP file.           |
| `/api/feedback` | Route Handler | Validates and stores feedback messages in MongoDB.                  |

## Project Structure

```text
app/
  api/
    feedback/route.ts       Feedback API endpoint
    generate/route.ts       ZIP generation endpoint
  wizard/page.tsx           Starter configuration wizard
  globals.css               Tailwind and theme styles
  layout.tsx                Root layout, metadata, analytics, toaster
  page.tsx                  Landing page

components/
  effect/                   Background visual effects
  icon/                     Custom icons
  ui/                       shadcn/Radix-style UI primitives
  feedback-section.tsx      Feedback form
  footer.tsx                Footer and GitHub link
  hero.tsx                  Landing page hero
  logo.tsx                  Brand mark
  navbar.tsx                Top navigation
  render-output-tree.tsx    Renders the wizard file tree preview

constants/
  files.ts                  Static preview tree used in the landing hero
  nav-links.ts              Navbar links
  output-files.ts           Generated file trees for each selectable module
  tech.ts                   Tech badges shown in the hero

interface/
  files.ts                  Global file preview type
  nav-links.ts              Global nav link type
  output-files.ts           Global output tree type

lib/
  db.ts                     MongoDB/Mongoose connection cache
  generator/                Template rendering, merging, and ZIP helpers
  helper/                   Output tree merge helper
  utils.ts                  Shared className utility

models/
  feedback.ts               Mongoose feedback schema

public/
  favicon/                  App icons and manifest assets
  images/logo.png           Open Graph/logo image

templates/
  base/                     Base generated Next.js starter
  modules/db/mongodb/       MongoDB module templates
  modules/auth/better-auth/ Better Auth module templates
```

## Generator Architecture

The generator is centered around `lib/generator/index.ts`.

`generateProject(config)` receives:

```ts
{
  projectName?: string;
  db?: "mongodb";
  auth?: "better-auth";
}
```

It then:

1. Normalizes the project name, defaulting to `launchkit-app`.
2. Decides whether MongoDB is required.
3. Renders every non-partial `.ejs` file in `templates/base`.
4. If MongoDB is selected, renders `templates/modules/db/mongodb`.
5. If Better Auth is selected, renders `templates/modules/auth/better-auth`.
6. Merges module files over the base file map.
7. Reads `package.json.partial.ejs` files for selected modules and merges their dependencies into the generated `package.json`.
8. Reads `.env.example.partial.ejs` files for selected modules and appends them to the generated `.env.example`.
9. Returns an in-memory file map.

`lib/generator/zip.ts` converts that file map into a ZIP with JSZip. The `/api/generate` route returns the ZIP with `Content-Type: application/zip`.

## Generated Starter Contents

Every generated project includes:

- `app/layout.tsx`
- `app/page.tsx`
- `README.md`
- `package.json`
- `.env.example`
- `next-env.d.ts`
- `next.config.js`
- `tsconfig.json`

When MongoDB is enabled, LaunchKit also adds:

- `lib/db.ts`
- `models/User.ts`
- `app/api/test-db/route.ts`
- `MONGODB_URI` in `.env.example`

The base generated `package.json` currently includes `mongoose`; the MongoDB module adds the database files and environment variable that make that dependency useful.

When Better Auth is enabled, LaunchKit also adds:

- `lib/auth/auth.ts`
- `lib/auth/auth-client.ts`
- `app/api/auth/[...all]/route.ts`
- `app/login/page.tsx`
- `app/dashboard/page.tsx`
- `better-auth` and `mongodb` dependencies
- `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in `.env.example`

The Better Auth option currently provides the auth wiring and placeholder login/dashboard pages. It is a starter foundation, not a complete production auth UI or finished access-control layer.

## Feedback System

The landing page includes a feedback form in `components/feedback-section.tsx`.

The form posts to `/api/feedback` with:

```json
{
  "email": "optional@example.com",
  "message": "Feedback message"
}
```

Validation rules:

- `message` is required.
- `message` must be at least 10 characters.
- `message` must be under 1000 characters.
- `email` is optional.

Accepted feedback is saved through the `Feedback` Mongoose model with timestamps.

## Environment Variables

Create a local `.env` file before running features that touch MongoDB:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/launch-kit
```

`MONGODB_URI` is required by:

- `/api/feedback`
- `lib/db.ts`

Generated projects may also include environment variables in their own `.env.example`, depending on the selected modules.

## Local Development

Requirements:

- Node.js 20.9 or newer.
- npm.
- A MongoDB connection string if you want feedback submission to work locally.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Development Notes

- This project uses the Next.js App Router. Routes are defined by files under `app/`.
- API endpoints are App Router Route Handlers named `route.ts`.
- The repository includes an `AGENTS.md` note warning that this Next.js version may differ from older conventions. Check `node_modules/next/dist/docs/` before making Next-specific code changes.
- Templates are generated from `.ejs` files. Files ending in `.partial.ejs` are not emitted directly; they are used for dependency and environment-variable merging.
- The wizard's visual file tree comes from `constants/output-files.ts`, so add new generator modules there when you want them to appear in the UI.
- `templates/base` is always included. Module templates are layered on top of it.

## Adding A New Generator Module

1. Create a module directory under `templates/modules`.
2. Add `.ejs` files that should be emitted into the generated starter.
3. Add `package.json.partial.ejs` if the module needs extra dependencies.
4. Add `.env.example.partial.ejs` if the module needs extra environment variables.
5. Update `GenerateProjectConfig` in `lib/generator/index.ts`.
6. Render and merge the module in `generateProject`.
7. Update `constants/output-files.ts` so the wizard preview matches the generated files.
8. Add UI controls in `app/wizard/page.tsx`.
9. Test by generating a ZIP, installing the generated project, and running it.

## Deployment

The app is designed for deployment on Vercel or any platform that supports Next.js 16.

Production deployment needs:

- `MONGODB_URI` configured if feedback collection should work.
- Public URL metadata aligned with `https://launchkit.dovudkhon.com`.
- Static assets from `public/` included in the build.

## Current Scope

Included:

- Web app.
- Next.js starter generation.
- MongoDB module.
- Better Auth + Google module foundation.
- ZIP download.
- Generated `.env.example`.
- Generated README.
- Dashboard placeholder in generated auth starters.
- Feedback collection.

Not included yet:

- GitHub repository creation.
- Stripe.
- Email.
- Role-based access control.
- Multi-tenancy.
- Multiple frontend frameworks.
- CLI.
- A complete generated auth UI.

## Useful Links

- Live app: [https://launchkit.dovudkhon.com](https://launchkit.dovudkhon.com)
- GitHub repository: [github.com/DavidAsrorxonov/launch-kit](https://github.com/DavidAsrorxonov/launch-kit)
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Tailwind CSS documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- shadcn documentation: [ui.shadcn.com](https://ui.shadcn.com)
- MongoDB documentation: [mongodb.com/docs](https://www.mongodb.com/docs/)
- Mongoose documentation: [mongoosejs.com/docs](https://mongoosejs.com/docs/)
- Better Auth documentation: [better-auth.com/docs](https://www.better-auth.com/docs)
