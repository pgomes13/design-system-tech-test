---
name: check-a11y
description: Audit a component for accessibility issues — ARIA attributes, keyboard navigation, focus rings, colour contrast, and label associations.
argument-hint: [ComponentName]
allowed-tools: Read, Grep, Glob
context: fork
agent: Explore
---

Audit the $ARGUMENTS component for accessibility compliance.

Read `src/components/$ARGUMENTS/$ARGUMENTS.tsx` and check:

1. **Focus ring** — is `.Mui-focusVisible` / `:focus-visible` used (not `:focus`)? Keyboard-only focus rings are required.

2. **Label association** — for form inputs, is there a `<label>` with `htmlFor` linked to the input `id`? Native HTML labels are preferred over ARIA labels where possible.

3. **Error state** — does the error state set `aria-invalid="true"` on the input? Is there `aria-describedby` pointing to the helper text element?

4. **Disabled state** — is the `disabled` prop forwarded to the underlying element, not just visually applied?

5. **Colour tokens** — are all colours coming from MUI theme tokens? Flag any hardcoded hex values.

6. **Interactive element role** — buttons should be `<button>`, links `<a>`. Check MUI component renders the correct semantic element.

7. **Text alternatives** — are icon-only buttons using `aria-label`? Are images decorative (`alt=""`) or meaningful (`alt="description"`)?

Report findings as a checklist with PASS / FAIL / N/A for each item, including file and line references for any failures.
