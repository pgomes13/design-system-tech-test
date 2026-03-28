# Tech Test Brief

## What we're looking for

- **Reusability** — can the component scale and be used consistently?
- **Theming** — does it adapt to light/dark modes and tokens via MUI theming?
- **Accessibility** — is it usable by keyboard, screen readers, etc.?
- **Developer Experience** — is the API clean, intuitive, and documented?
- **NPM packages** — can the components be packaged as a consumable NPM library?

## Background

You've recently joined a team working on a shared design system used across multiple applications. A central requirement of this system is that all components must:

- Leverage the MUI API that developers are already familiar with
- Have a descriptive docstring using the [TSDoc format](https://tsdoc.org/) that contains relevant information for developers using the component
- Have an associated Storybook story demonstrating the different states of the component
- Respond to light and dark mode changes automatically
- Handle various interactive states (hover, focus, pressed, disabled, loading) consistently
- Follow accessibility best practices (keyboard navigation, ARIA attributes, visible focus rings)
- Be theme-driven (no hardcoded colors, spacing, or radii), by leveraging the MUI themes configured in [`theme.ts`](../src/theme.ts)
- Use the font Inter via [`@fontsource/inter`](https://www.npmjs.com/package/@fontsource/inter)

## Tasks

### Task 1: Button

See [the "Buttons" Figma page](https://www.figma.com/design/wtMCijFeCt780z0fbtvBEP/Design-System-Tech-Test---Figma?node-id=0-1&p=f&t=qQKSXsPss7kiBGXZ-0) for mockups.

**Requirements:**
- Variants: Contained, Outlined
- States: Default, Hover, Focus (keyboard-visible with accessible focus ring), Disabled
- Theme tokens from [`theme.ts`](../src/theme.ts)
- Light and dark mode support
- TSDoc comment block
- Storybook story showing each state

**Evaluation:** MUI theming, API design, accessibility, documentation

---

### Task 2: Text Field

See [the "Text Field" Figma page](https://www.figma.com/design/wtMCijFeCt780z0fbtvBEP/Design-System-Tech-Test---Figma?node-id=1-181&p=f&t=qQKSXsPss7kiBGXZ-0) for mockups.

**Requirements:**
- Variants: Empty, Placeholder, Filled
- States: Default, Hover, Focused, Error, Disabled
- Theme tokens from [`theme.ts`](../src/theme.ts)
- TSDoc documentation
- Storybook story showing all states

**Evaluation:** Component composition, theme integration, typed props API, accessibility, documentation

---

### Task 3: Deploy Storybook

Publishing Storybook ensures the design system is shareable as **living documentation**.

```bash
make build-storybook   # outputs to storybook-static/
```

Deploy to a public host (GitHub Pages, Vercel, or Netlify) and add the link to the README.

**Evaluation:** Successfully deployed and accessible online, link in README

---

### Task 4: NPM Package

**Requirements:**
- `npm run build` outputs ESM to `dist/` with TypeScript typings
- Barrel export:
  ```ts
  import { PrimaryButton, TextFieldWithLabel } from "design-system-tech-test";
  ```
- Test locally with `npm link`
- Installation instructions in README

**Evaluation:** Package builds, components work when linked, developer-friendly docs

## AI Coding Assistants

**AI Tools Used:**

- **Claude Code (Anthropic)**: Used throughout the entire implementation:
  - Initial codebase analysis and planning (plan mode)
  - Scaffolding components, stories, and build config
  - Configuring the Vite library build pipeline and TypeScript declarations
  - Writing GitHub Actions CI and Storybook deploy workflows
  - Setting up Playwright e2e tests for accessibility assertions
  - Creating custom slash commands (`/add-component`, `/update-tokens`, `/check-a11y`) for future development automation
  - Writing `CLAUDE.md` project context so future AI sessions have full awareness of conventions
