# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase
v1.2.0 generated project polish

## Current Goal
Fix generated `README.md` formatting and environment setup instructions.

## Completed

- Added `context/ui-context.md` documenting the current LaunchKit UI system, including theme, typography, layout patterns, surfaces, components, responsive behavior, and current UI debt.
- Added `context/architecture-context.md` documenting the current LaunchKit runtime architecture, generator flow, template rules, storage model, invariants, and architecture debt.
- Fixed Better Auth generation by loading the `.env.example.partial.ejs` module partial with the correct leading dot.
- Updated the generated project README template so it renders as structured Markdown with requirements, environment setup, install, local development, MongoDB, and Better Auth sections.
- Verified the generated README template renders clean Markdown for base-only, MongoDB, and Better Auth project configurations.

## In Progress

## Next Up

- Resolve the existing `react-hooks/set-state-in-effect` lint error in `app/wizard/page.tsx` before treating `npm run lint` as clean.

## Open Questions

## Architecture Decisions

## Session Notes

- `npm run lint` currently fails on an existing `app/wizard/page.tsx` React hooks lint error and reports unrelated unused-symbol warnings in `interface/*` and `models/feedback.ts`.
