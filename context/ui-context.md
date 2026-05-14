# UI Context

## Theme

LaunchKit currently uses a dark-only product interface. The main screens use a near-black page background, white text with opacity-based hierarchy, translucent panels, blur effects, and a vivid purple brand accent.

The global token system is defined in `app/globals.css` with CSS custom properties and exposed through Tailwind v4 `@theme inline`. The shadcn/ui primitives use these semantic tokens by default. App-level feature components currently also use hardcoded dark and purple values such as `#080808`, `#5e49ba`, `#6e58cc`, and `#9d8fe0`; future UI work should prefer moving repeated values into tokens instead of adding more raw hex classes.

| Role                  | Current Value / Token                                                   | Usage                                        |
| --------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| Page background       | `#080808` in app pages                                                  | Landing and wizard background                |
| Base background token | `--background` / `bg-background`                                        | shadcn default background                    |
| Foreground token      | `--foreground` / `text-foreground`                                      | shadcn default text                          |
| Card token            | `--card` / `bg-card`                                                    | Default card surface                         |
| Popover token         | `--popover` / `bg-popover`                                              | Toast and popover surfaces                   |
| Border token          | `--border` / `border-border`                                            | Default borders and focus outlines           |
| Input token           | `--input` / `border-input`                                              | Form controls                                |
| Ring token            | `--ring` / `ring-ring`                                                  | Focus states                                 |
| Primary token         | `--primary` / `bg-primary`                                              | Default shadcn primary button                |
| Brand purple          | `#5e49ba`                                                               | Primary CTAs, badges, selected states, glows |
| Brand hover           | `#6e58cc`                                                               | CTA hover state                              |
| Brand text            | `#9d8fe0`                                                               | Icons, labels, badge text                    |
| Brand soft text       | `#d7cff7`                                                               | Purple-tinted informational card text        |
| White hierarchy       | `text-white`, `text-white/90`, `/80`, `/60`, `/45`, `/40`, `/35`, `/30` | Main text scale                              |
| Panel background      | `bg-white/3`, `bg-black/30`, `bg-[#0e0e0e]`                             | Glass cards, inputs, preview panels          |
| Panel border          | `border-white/10`, `border-white/8`, `border-white/6`                   | Low-contrast surface separation              |

## Typography

Fonts are loaded in `app/layout.tsx` with `next/font/google` and attached as CSS variables on the `<html>` element.

| Role          | Font                       | CSS Variable                        | Current Usage                                  |
| ------------- | -------------------------- | ----------------------------------- | ---------------------------------------------- |
| Body / UI     | Syne                       | `--font-syne`                       | Applied directly to `body` in `globals.css`    |
| Sans token    | Geist                      | `--font-geist-sans` / `--font-sans` | Available through Tailwind and shadcn defaults |
| Mono          | Geist Mono                 | `--font-geist-mono` / `--font-mono` | Code preview, file tree labels, version text   |
| Heading token | Geist via `--font-heading` | `--font-heading`                    | shadcn card titles                             |

Hero and major section headings use `font-serif` classes in the current components, while the global body font is Syne. The hero headline is large, tight, and editorial: `text-[clamp(3rem,8vw,7rem)]`, `font-bold`, `leading-[0.9]`, and `tracking-tight`.

## Border Radius

The global radius base is `--radius: 0.625rem`, with Tailwind radius tokens derived in `globals.css`.

| Context                              | Current Class           |
| ------------------------------------ | ----------------------- |
| Logo mark / default buttons / inputs | `rounded-lg`            |
| Cards and shadcn card primitives     | `rounded-xl`            |
| Option tiles and icon containers     | `rounded-2xl`           |
| Pills / badges                       | `rounded-4xl`           |
| Small status labels                  | `rounded`, `rounded-md` |

The current UI favors medium radii, with larger radius used for selectable wizard tiles and icon containers.

## Layout Patterns

### Page Shell

Landing and wizard pages share the same dark shell:

- `relative min-h-screen overflow-hidden bg-[#080808] text-white`
- Fixed decorative background layer on desktop only: `hidden md:block`
- Content sits above effects with `relative z-10`
- Main content width is `max-w-7xl` with `px-6 md:px-10`

### Navbar

The navbar is fixed to the top with `z-50`, a 64px height, and transparent background until the user scrolls. After scrolling, it uses `bg-[#080808]/90` with `backdrop-blur-xl`.

Navigation links are hidden on small screens and visible from `md`. The right CTA always links to `/wizard`.

### Landing Hero

The hero is a full-height, first-viewport section with a two-column desktop layout:

- Left column: badge, large headline, supporting copy, CTAs, tech badges
- Right column: desktop-only generated-project preview card
- Subtle mouse-based parallax moves the purple glow behind the preview card on desktop

The hero uses animation classes from `tw-animate-css` such as `animate-fade-in-up` and staggered arbitrary animation delays.

### Wizard

The wizard page uses a two-column desktop grid: a primary configuration card and a right summary rail.

- Desktop grid: `lg:grid-cols-[1fr_380px]`
- Main setup card contains project name, database choices, auth choices, generate action, success next-steps panel, and optional MongoDB footer notes
- Right rail contains live summary, generated output tree, and a purple scope note
- On smaller screens, the grid collapses into a single column

### Feedback Section

The feedback section is a glass card split into two columns on desktop:

- Left side: email and feedback form
- Right side: icon, heading, and explanatory copy
- Mobile layout stacks the form and copy with a horizontal divider

### Footer

The footer uses a simple top border, dark background, responsive row/column layout, copyright text, and a GitHub outline button.

## Surfaces

The product UI uses layered translucent surfaces rather than flat solid panels.

| Surface           | Current Classes                                                    |
| ----------------- | ------------------------------------------------------------------ |
| Glass card        | `border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl`           |
| Preview card      | `border-white/8 bg-[#0e0e0e]`                                      |
| Input field       | `border-white/10 bg-black/30 text-white placeholder:text-white/25` |
| Summary block     | `rounded-xl border border-white/10 bg-black/30 p-4`                |
| Selected option   | `border-[#5e49ba]/70 bg-[#5e49ba]/10`                              |
| Unselected option | `border-white/10 bg-white/2 hover:border-white/20`                 |
| Disabled option   | `cursor-not-allowed border-dashed opacity-50`                      |
| Purple info card  | `border-[#5e49ba]/30 bg-[#5e49ba]/10`                              |

Cards should remain visually quiet. Use borders, opacity, and backdrop blur for separation instead of heavy shadows, except for major glass panels where `shadow-2xl` is already used.

## Color Effects

The landing and wizard pages share decorative effects in `components/effect/`.

- `Glow`: large blurred purple and white radial blobs positioned off-canvas.
- `Grid`: a low-opacity white grid using inline `backgroundImage` and `backgroundSize: 60px 60px`.
- `Vignette`: radial gradient that fades the edges back into `#080808`.
- `Divider`: centered diamond marker, white glow, and horizontal gradient rules.

These effects are hidden on mobile for performance and visual simplicity.

## Components

The project uses shadcn/ui with the `radix-nova` style on Tailwind v4. UI primitives live in `components/ui/` and should remain reusable foundation components.

Current primitives:

- `Button`
- `Badge`
- `Card`
- `Input`
- `Textarea`
- `Label`
- `Select`
- `Sonner` toaster
- `Divider` custom decorative component

Feature components live outside `components/ui/`:

- `Navbar`
- `Logo`
- `Hero`
- `FeedbackSection`
- `Footer`
- `renderOutputTree`
- visual effects under `components/effect/`

Do not put product-specific layout or branding logic into `components/ui/*`. Keep foundation primitives generic and apply product styling in feature components or page-level composition.

## Buttons And Controls

Primary product CTAs use purple backgrounds:

- Normal: `bg-[#5e49ba] text-white`
- Hover: `hover:bg-[#6e58cc]`
- Icons usually animate slightly on hover with `group-hover:translate-x-0.5`

Secondary buttons are transparent outline buttons with white borders and muted white text:

- `border-white/10 bg-transparent text-white/50`
- Hover moves toward `border-white/20` and `text-white/80`

Wizard option choices are custom button tiles, not native radio controls. They use `rounded-2xl`, text-left layout, and selected/unselected border and background states.

## Forms

Forms use dark translucent inputs and muted placeholders.

- Inputs are generally `rounded-lg`
- Wizard project input uses `h-12`
- Feedback text area disables resize with `resize-none`
- Focus rings use the global ring by default in primitives, with the wizard project name field overriding the focus ring to the brand purple

Validation feedback is delivered through Sonner toasts rather than inline error blocks in the current UI.

## Icons

Lucide React is the default icon library, matching `components.json`.

Common sizes:

- `h-3.5 w-3.5` for compact badges and small preview labels
- `h-4 w-4` for buttons and wizard option icons
- `h-5 w-5` for section icon containers

Icons are stroke-based and usually use the purple accent color (`#5e49ba` or `#9d8fe0`). The GitHub footer icon is a custom SVG in `components/icon/github.tsx`.

## Toasts

Sonner is mounted globally in `app/layout.tsx` with `richColors` and `position="top-center"`.

The local toaster wrapper maps toast surface tokens to:

- `--normal-bg: var(--popover)`
- `--normal-text: var(--popover-foreground)`
- `--normal-border: var(--border)`
- `--border-radius: var(--radius)`

Toast icons use Lucide icons for success, info, warning, error, and loading states.

## Generated Project UI

Generated starter templates currently have intentionally minimal UI:

- Base generated page renders a plain welcome heading and setup hints.
- Better Auth login template renders a centered black "Sign in with Google" button.
- Better Auth dashboard template renders plain text after session validation.

Do not treat generated-project template UI as part of the polished LaunchKit marketing UI unless a task explicitly asks to improve generated starter styling.

## Responsive Behavior

- Main pages use `px-6 md:px-10`.
- Navbar links hide below `md`; the Generate Starter CTA remains visible.
- Decorative effects hide below `md`.
- Hero preview card hides below `lg`.
- Hero and wizard layouts collapse from desktop grids to single-column mobile layouts.
- Feedback section switches from two columns to stacked layout below `md`.

## Current UI Debt

- `app/globals.css` defines semantic shadcn tokens, but product components often bypass them with raw hex classes.
- The app has both light and dark token definitions, but the actual product screens are hardcoded dark and the root layout does not apply a `.dark` class.
- `Toaster` reads `next-themes`, but no `ThemeProvider` is currently configured in the root layout.
- Several visual effects use inline styles for gradients and background images.

Future UI work should preserve the current dark purple visual identity while consolidating repeated colors and surface styles into named tokens.
