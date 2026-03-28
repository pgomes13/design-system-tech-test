# Design System Tech Test

A reusable React component library built on MUI 7, exported as an ESM NPM package.

**Live Storybook:** https://pgomes13.github.io/design-system-tech-test/

## Quick Start

```bash
make install   # Install dependencies
make dev       # Start Storybook at localhost:3000
```

## Components

| Component | Description |
|-----------|-------------|
| `PrimaryButton` | Call-to-action button — contained and outlined variants |
| `TextFieldWithLabel` | Accessible labelled text input with error and disabled states |

## Documentation

| Doc | Description |
|-----|-------------|
| [Installation & Usage](docs/INSTALLATION.md) | How to install and use the package in your app |
| [Contributing](docs/CONTRIBUTING.md) | Local setup, commands, component conventions, CI |
| [Tech Test Brief](docs/TECH-TEST.md) | Original requirements, tasks, and evaluation criteria |

## Tech Stack

- React 19, MUI 7, TypeScript (strict)
- Vite 7 — library build to ESM + `.d.ts`
- Storybook 9 — component documentation
- Playwright — e2e accessibility tests
- GitHub Actions — CI + Pages deploy
