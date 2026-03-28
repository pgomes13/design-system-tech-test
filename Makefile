.PHONY: install dev build build-storybook lint format typecheck test test-watch test-coverage test-e2e test-e2e-ci check help

# ─── Setup ────────────────────────────────────────────────────────────────────

install: ## Install all dependencies
	npm install --legacy-peer-deps

# ─── Development ──────────────────────────────────────────────────────────────

dev: ## Start Storybook dev server at localhost:3000
	npm run dev

# ─── Build ────────────────────────────────────────────────────────────────────

build: ## Compile library to dist/ (ESM + .d.ts typings)
	npm run build

build-storybook: ## Build static Storybook site to storybook-static/
	npm run build-storybook

# ─── Code Quality ─────────────────────────────────────────────────────────────

lint: ## Run ESLint across the project
	npm run lint

format: ## Format all files with Prettier
	npm run format

typecheck: ## Type-check the library build (no emit)
	npm run typecheck

# ─── Testing ──────────────────────────────────────────────────────────────────

test: ## Run Vitest unit tests
	npm test

test-watch: ## Run Vitest in watch mode
	npm run test:watch

test-coverage: ## Run unit tests with coverage report
	npm run test:coverage

test-e2e: ## Run Playwright e2e tests (requires Storybook running on :3000)
	npm run test:e2e

test-e2e-ci: ## Run Playwright e2e tests with GitHub Actions reporter
	npm run test:e2e:ci

# ─── Combined ─────────────────────────────────────────────────────────────────

check: lint typecheck test build ## Run lint + typecheck + unit tests + build (mirrors CI)

# ─── Help ─────────────────────────────────────────────────────────────────────

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
