# Design System Tech Test

Welcome!

This exercise is designed to give us insight into how you approach **frontend development within the context of a design system**.
We're looking at how you think about:

- **Reusability** – can your component scale and be used consistently?
- **Theming** – does it adapt to light/dark modes and tokens via MUI theming?
- **Accessibility** – is it usable by keyboard, screen readers, etc.?
- **Developer Experience** – is the API clean, intuitive, and documented?
- **NPM packages** - can you package your newly created components into a NPM library so it can be consumed by other applications?

This starter repository contains a working **Storybook configuration** so you can easily develop your component in isolation and document its usage.

## Getting Started

```bash
# Install dependencies using your preferred package manager
npm install
pnpm install
yarn install
bun install

# Run the dev server
npm run dev
```

Then open your browser to [localhost:3000](http://localhost:3000).

## Expected Time

Around 2 - 3 hours

## AI Coding Assistants

Feel free to leverage any AI tools for this assessment, all we ask is for you to list the tools and how you used them in the section below to help us understand your process.

**AI Tools Used**:

- Tool A: How it was used

## What are we looking for?

- Correct MUI theming
- Component API Design (props thoughtful, extensible and well-typed with TypeScript)
- Component reusability
- Documentation quality

## Background

You’ve recently joined a team working on a shared design system used across multiple applications.
A central requirement of this system is that all components must:

- Leverage the MUI API that developers are already familiar with
- Have a descriptive docstring using the [tsdoc format](https://tsdoc.org/) that contains relevant information for developers using the component
- Have a associated Storybook story demonstrating the different states of the component, see [`Button.stories.ts`](./src/stories/Button.stories.ts) for an example.
- Respond to light and dark mode changes automatically
- Handle various interactive states (hover, focus, pressed, disabled, loading) consistently
- Follow accessibility best practices (keyboard navigation, ARIA attributes, visible focus rings)
- Be theme-driven (no hardcoded colors, spacing, or radii), by leveraging the MUI themes configured in [`theme.ts`](./src/theme.ts).
- Leverage the MUI theme in [`theme.ts`](./src/theme.ts) to store reusable tokens, like colors or border radius
- Use the font Inter, by leveraging the [`@fontsource/inter` NPM Package](https://www.npmjs.com/package/@fontsource/inter)

### Task 1: Button

See [the "Buttons" Figma page](https://www.figma.com/design/wtMCijFeCt780z0fbtvBEP/Design-System-Tech-Test---Figma?node-id=0-1&p=f&t=qQKSXsPss7kiBGXZ-0) for mockups.

#### Requirements

- Must implement the following variants:
  - Contained
  - Outlined
- Must support the following states:
  - Default
  - Hover
  - Focus (keyboard‑visible, with accessible focus ring)
  - Disabled
- Must use theme tokens from [`theme.ts`](./src/theme.ts)
- Must support light and dark mode
- Must include a TSDoc comment block (with description, props, usage notes).
- Add a Storybook story showing each state.

#### Evaluation

- Correct MUI theming usage
- Clean and extensible API design
- Accessibility (focus ring, screen reader support)
- Documentation (TSDoc + Storybook)

### Task 2: Text Field

See [the "Text Field" Figma page](https://www.figma.com/design/wtMCijFeCt780z0fbtvBEP/Design-System-Tech-Test---Figma?node-id=1-181&p=f&t=qQKSXsPss7kiBGXZ-0) for mockups.

#### Requirements

- Must support the following variants:
  - Empty
  - Placeholder
  - Filled
- Must support the following states:
  - Default
  - Hover
  - Focused
  - Error
  - Disabled
- Must use tokens from [`theme.ts`](./src/theme.ts).
- Must include TSDoc documentation for props and usage.
- Add a Storybook story showing states.

#### Evaluation

- Correct component composition
- Theme integration
- Clear, typed props API
- Accessibility (label → input associations, error handling)
- Documentation (TSDoc + Storybook)

### Task 3: Deploy the Storybook documentation

Publishing Storybook ensures the design system is shareable across teams as **living documentation**.
This makes it easy for designers, engineers, and stakeholders to browse components without running code locally.

This project is already setup with a `build-storybook` command for building it as a static site.

```bash
npm run build-storybook
```

Once built, the static content is available in the `storybook-static` directory.

Next we want deploy the static content so its publicly available. You may use your preferred hosting service, some easy to use ones include:

- GitHub Pages
- Vercel
- Netlify

The Storybook docs has an example for [deploying to GitHub Pages](https://storybook.js.org/docs/sharing/publish-storybook#github-pages).

#### Evaluation

- Storybook successfully deployed and accessible online
- Link provided in README

### Task 4: Export the components as a reusable NPM package

Next we want to make our Design System consumable in other projects, for this we are going to create a reusable NPM package.

The [NPM documentation](https://docs.npmjs.com/about-packages-and-modules) contains some useful background for how these packages work.

#### Requirements

- Setup a build step (`npm run build`) that outputs compiled code into a `dist` directory.
  - We only need to support ESM
  - TypeScript typings should also be generated
- Export components via an `index.ts` barrel file:
  ```ts
  import { PrimaryButton, TextFieldWithLabel } from "design-system-tech-test";
  ```
- Test locally using:

  ```bash
  cd ~/Projects/design-system-tech-test   # Go to where you keep this repo
  npm link                                # Create a global link

  cd ~/Projects/test-app                  # Go to another React app
  npm link design-system-tech-test        # Link the design system package
  ```

- Add Installation instructions to the `README.md`:
  - This should contain some brief instructions so a developer can setup the design system in their own project.
  - Assume that the infrastructure is already in place to publish the package to a NPM registry and the user just needs to `npm install design-system-tech-test`

#### Evaluation

- Package builds successfully into the `dist` directory
- Components work when linked locally, for testing we will use the `react-ts` Vite template [mentioned here](https://vite.dev/guide/#scaffolding-your-first-vite-project).
- Clear, developer-friendly documentation
