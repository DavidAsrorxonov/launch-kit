# LaunchKit

## Overview

LaunchKit is an interactive project scaffolding web application for solo developers and indie hackers who want to start new projects faster.

Users configure a starter project through a visual wizard, choose optional modules such as MongoDB and Better Auth with Google OAuth, and download a production-ready Next.js starter as a ZIP file.

The generated project includes:

- Next.js App Router setup
- TypeScript configuration
- Optional MongoDB integration
- Optional Better Auth with Google OAuth
- Environment variable templates
- README with setup instructions

LaunchKit itself is also a production application with a polished landing page, wizard UI, feedback system, and modular code generation engine.

---

## Product Goal

Reduce repetitive setup work required to start modern web applications.

Instead of manually wiring databases, authentication, environment variables, and starter pages, developers can generate a clean, working foundation and immediately begin building their product.

---

## Target Users

- Solo developers
- Indie hackers
- Students learning full-stack development
- Developers who repeatedly build Next.js applications
- Builders who want an editable alternative to paid boilerplates

---

## Current Versions

### v1.0.0

- Initial LaunchKit release
- Landing page
- Wizard UI
- Base Next.js starter generation
- MongoDB module
- ZIP download

### v1.1.0

- Feedback system with MongoDB persistence
- Toast notifications
- Post-generation success UX
- Next steps card with countdown
- Mobile performance optimizations

### v1.2.0 (Current Development)

- Better Auth + Google OAuth module
- Automatic MongoDB inclusion when auth is selected
- Protected dashboard
- Working Google sign-in flow

---

# Core User Flow

1. User visits LaunchKit.
2. User clicks "Generate Starter."
3. User enters project name.
4. User selects optional modules.
5. User reviews live output tree.
6. User clicks Generate.
7. LaunchKit renders templates.
8. LaunchKit merges module files and configuration.
9. LaunchKit packages files into a ZIP.
10. User downloads and extracts the project.
11. User copies `.env.example` to `.env`.
12. User fills required environment variables.
13. User runs `npm install` and `npm run dev`.

---

# Main Features

## Landing Page

- Premium dark design
- Hero section
- Navigation bar
- Feedback section
- GitHub link and star request
- Custom favicon
- Responsive design

## Wizard UI

### Project Name

User provides the generated project name.

### Database Options

- No database
- MongoDB

### Authentication Options

- No auth
- Better Auth + Google

### Smart Dependency Rules

If Better Auth is selected:

- MongoDB is automatically enabled.
- "No database" becomes disabled.

### Live Summary

Displays:

- Selected options
- Output file tree
- Notes and warnings

### Generation UX

- Loading state
- Toast notifications
- Automatic ZIP download
- Temporary next steps card

---

# Code Generation Engine

The generator is the core of LaunchKit.

Responsibilities:

1. Load base templates.
2. Load selected module templates.
3. Render EJS variables.
4. Merge generated files.
5. Merge `package.json` partials.
6. Merge `.env.example` partials.
7. Create ZIP archive.
8. Return downloadable file.

---

# Template Structure

```txt
templates/
  base/
  modules/
    db/
      mongodb/
    auth/
      better-auth/
```

---

# Base Template Output

```txt
app/
  layout.tsx
  page.tsx
README.md
package.json
.env.example
next-env.d.ts
next.config.js
tsconfig.json
```

---

# MongoDB Module

## Generated Files

```txt
lib/db.ts
models/User.ts
app/api/test-db/route.ts
```

## Dependencies

- mongoose

## Environment Variables

```env
MONGODB_URI=
```

## Test Route

```txt
/api/test-db
```

Returns database connection status.

---

# Better Auth Module

## Generated Files

```txt
app/login/page.tsx
app/dashboard/page.tsx
app/api/auth/[...all]/route.ts
lib/auth/auth.ts
lib/auth/auth-client.ts
```

## Dependencies

- better-auth
- mongodb

## Environment Variables

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Authentication Flow

1. Visit `/login`
2. Click "Sign in with Google"
3. Complete OAuth
4. Redirect to `/dashboard`
5. Dashboard checks session
6. Unauthenticated users are redirected to `/login`

---

# Feedback System

## Frontend

Users submit feedback directly from the landing page.

## Backend

API route:

```txt
/api/feedback
```

## Database Schema

- email (optional)
- message
- createdAt
- updatedAt

## Validation Rules

- Minimum 10 characters
- Maximum 1000 characters

---

# Output Tree System

The wizard displays a structured tree rather than a flat list.

Example:

```txt
app/
  layout.tsx
  page.tsx
  login/
    page.tsx
  dashboard/
    page.tsx
  api/
    auth/
      [...all]/
        route.ts
    test-db/
      route.ts
lib/
  db.ts
  auth/
    auth.ts
    auth-client.ts
models/
  User.ts
README.md
package.json
.env.example
```

Tree nodes are merged using `mergeOutputTrees()`.

---

# Generator Architecture

## GenerateProjectConfig

```ts
export type GenerateProjectConfig = {
  projectName?: string;
  db?: "mongodb";
  auth?: "better-auth";
};
```

## Derived Flags

```ts
const hasAuth = config?.auth === "better-auth";
const hasMongoDB = config?.db === "mongodb" || hasAuth;
```

---

# Template Loading Rules

## `loadTemplate()`

- Recursively reads template files
- Renders EJS
- Removes `.ejs`
- Skips `.partial.ejs`

## `loadPartialTemplate()`

Loads internal partials such as:

- `package.json.partial.ejs`
- `.env.example.partial.ejs`

---

# Configuration Merging

## Package Dependencies

Each module contributes dependencies through:

```txt
package.json.partial.ejs
```

## Environment Variables

Each module contributes variables through:

```txt
.env.example.partial.ejs
```

These are merged into the final output.

---

# Generated Project Setup

```bash
cp .env.example .env
npm install
npm run dev
```

---

# LaunchKit Technology Stack

## Main Application

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- sonner
- MongoDB
- Mongoose
- EJS
- JSZip
- Vercel

## Generated Projects

- Next.js
- TypeScript
- MongoDB (optional)
- Better Auth (optional)

---

# Deployment

- Hosting: Vercel
- Domain: https://launchkit.dovudkhon.com
- DNS Provider: Namecheap

---

# Branding

- Product Name: LaunchKit
- Accent Color: Purple
- Premium dark theme
- Custom favicon and metadata

---

# Scope

## In Scope

- Visual wizard
- ZIP generation
- Base starter
- MongoDB module
- Better Auth module
- Feedback system
- Output tree preview
- Deployment

## Out of Scope

- CLI tool
- GitHub repo creation
- Billing
- Email module
- RBAC
- Multi-tenancy
- Admin panel
- Multiple frameworks

---

# Success Criteria

## Base Starter

- Generates successfully
- Installs and runs

## MongoDB

- Connects successfully
- `/api/test-db` works

## Better Auth

- Google sign-in works
- `/dashboard` is protected

## Feedback

- Messages are stored in MongoDB

---

# Testing Checklist

## Generator

- Base only
- MongoDB only
- MongoDB + Better Auth

## Generated Projects

- `npm install`
- `npm run dev`

## MongoDB

- Test database connection

## Better Auth

- Sign in with Google
- Access protected dashboard

## LaunchKit App

- Landing page
- Wizard
- Feedback form
- Toast notifications
- Mobile responsiveness

---

# Development Rules for AI Agents

1. Keep changes small and incremental.
2. Do not expand scope without approval.
3. Never generate `.env`.
4. Always generate `.env.example`.
5. Never include secrets in templates.
6. Keep templates modular.
7. Store dependencies in `package.json.partial.ejs`.
8. Store env additions in `.env.example.partial.ejs`.
9. Do not expose `.partial.ejs` files in generated output.
10. Preserve the existing design system.
11. Test all generator combinations before release.
12. Remove debug logs before publishing.

---

# Roadmap

## Potential v1.3.0 Options

- Improve generated README
- Add PostgreSQL
- Add Resend email module
- Add GitHub repository generation
- Add Vercel deploy button
- Save configurations
- Analytics

Future priorities should be based on user feedback and usage data.
