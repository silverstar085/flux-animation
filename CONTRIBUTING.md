# Contributing

Thanks for helping! Bug reports and animation requests go in [Issues](https://github.com/silverstar085/flux-animation/issues).

## Setup

```sh
npm ci
npm run build       # src/ → generated CSS, demo catalog, docs/ANIMATIONS.md, docs/SIZES.json
npm run check       # fails if generated files are stale or a bundle exceeds its size budget
npm test            # CSS contracts, package exports and bundler smoke tests
npm run preview     # demo at http://127.0.0.1:4173/ (keep it running for browser tests)
npm run test:browser
npm pack --dry-run  # inspect exactly what will ship
```

Browser tests need Playwright browsers (`npx playwright install chromium firefox webkit`). To use a browser that is already installed, run one engine with its binary: `FLUX_BROWSER=chromium FLUX_EXECUTABLE=/path/to/chromium npm run test:browser`.

## Where things live

| Path | What |
|---|---|
| `src/*.css` | Effect source. The build normalizes animation shorthands so control classes work on every effect. |
| `src/effects.json` | The single source of effect metadata: group, behavior, rendering cost, which presets include it (`core`, `chat`), description and example markup. The build fails if a class is missing here or listed here but not in the CSS. |
| `src/reduced.css` | Static poses for loaders whose last frame would be invisible under reduced motion. |
| `scripts/build.mjs` | Builds every bundle and the generated docs. |
| `scripts/budgets.json` | Gzip budgets per bundle, enforced by `npm run check` and the tests. |
| `index.html`, `demo/` | The demo site (GitHub Pages serves the repository root). |

Do not edit generated files by hand: `flux*.css`, `demo/catalog.*`, `demo/preview.css`, `docs/ANIMATIONS.md`, `docs/SIZES.json`.

## Adding an animation

1. Write the class and its keyframes in the right `src/*-extra.css` file. Use `animation: name duration easing [infinite]`; the build turns it into controllable properties.
2. Add an entry to `src/effects.json` with a description and example markup that uses the class.
3. If its last frame is invisible, add a visible pose to `src/reduced.css`.
4. Run `npm run build`, check it in the demo, and run the tests.
