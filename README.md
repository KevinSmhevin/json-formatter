# JSON Formatter

A modern, responsive JSON formatter built with React and TypeScript.

It validates JSON input, pretty-prints output, supports sorting keys, provides interactive expand/collapse controls, and can compact + copy output for sending.

## Features

- Validate and format JSON input
- Adjustable output indentation (`2`, `3`, or `4` spaces)
- Sort object keys alphabetically (recursive)
- Interactive JSON tree output with per-node expand/collapse
- Tree controls:
  - Expand all
  - Collapse all
  - Expand to depth `N`
  - Collapse through depth `N`
- Compact JSON output mode (single-line, send-ready)
- Copy output to clipboard
- Responsive desktop/mobile layout with a minimal green/white/charcoal theme

## Tech Stack

- React
- TypeScript
- Vite
- ESLint

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage

1. Paste JSON into **Input JSON**.
2. Click **Validate JSON**.
3. Use the **Edit Menu** to:
   - change indentation,
   - sort keys,
   - expand/collapse tree nodes globally or by depth,
   - compact output,
   - copy output.
4. Use tree toggle buttons (`+` / `-`) in output to expand/collapse specific objects/arrays.

## Project Structure

```text
src/
  components/
    EditMenu.tsx
    ExpandCollapseMenu.tsx
    JsonOutputTree.tsx
    JsonTextArea.tsx
    Navbar.tsx
  utils/
    jsonFormatter.ts
    jsonSorting.ts
    jsonTreeControls.ts
  App.tsx
  App.css
  index.css
```

## Notes

- The output panel keeps a fixed default height to match the input panel.
- Both panels are still manually vertically resizable by the user.
- Compact mode and pretty/tree mode are both available in the same output area.
