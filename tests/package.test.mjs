import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { build } from "esbuild";
const pkg = JSON.parse(fs.readFileSync("package.json"));
test("each public CSS export resolves and survives bundling", async () => {
  for (const [entry, file] of Object.entries(pkg.exports)) {
    if (!file.endsWith(".css")) continue;
    const specifier = pkg.name + (entry === "." ? "" : entry.slice(1));
    const result = await build({
      stdin: {
        contents: `import ${JSON.stringify(specifier)};`,
        resolveDir: process.cwd(),
      },
      bundle: true,
      write: false,
      outdir: "output/bundler",
      metafile: true,
      logLevel: "silent",
    });
    const css = result.outputFiles.find((f) => f.path.endsWith(".css"));
    assert.ok(css && css.contents.length > 100, specifier + " was dropped");
  }
});
test("core and all packs bundle together without external imports", async () => {
  const result = await build({
    stdin: {
      contents: ["core", "motion", "interactions", "loaders", "visual"]
        .map((n) => `import 'flux-animation/${n}';`)
        .join("\n"),
      resolveDir: process.cwd(),
    },
    bundle: true,
    write: false,
    outdir: "output/bundler",
    metafile: true,
    logLevel: "silent",
  });
  const css = result.outputFiles.find((f) => f.path.endsWith(".css")).text;
  for (const key of ["fxSpringTravel", "fxExtraRing", "fxIrisIn"])
    assert.ok(css.includes(key), key);
  assert.ok(!css.includes("@import"));
});
