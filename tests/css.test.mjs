import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import postcss from "postcss";
import { gzipSync } from "node:zlib";
const sizes = JSON.parse(fs.readFileSync("docs/SIZES.json"));
const catalog = JSON.parse(fs.readFileSync("demo/catalog.json"));
const pkg = JSON.parse(fs.readFileSync("package.json"));
const original = fs.readFileSync("tests/fixtures/flux-2.2.0.min.css", "utf8");
test("all legacy classes and entry points remain available", () => {
  const legacy = [
    ...new Set([...original.matchAll(/\.(fx-[\w-]+)/g)].map((m) => m[1])),
  ];
  assert.equal(legacy.length, 128);
  for (const cls of legacy) assert.ok(sizes.default.classes.includes(cls), cls);
  for (const key of [
    ".",
    "./flux.css",
    "./flux.min.css",
    "./min",
    "./package.json",
  ])
    assert.ok(fs.existsSync(pkg.exports[key]), key);
});
test("approved compressed size caps and zero runtime dependencies", () => {
  assert.ok(!pkg.dependencies || !Object.keys(pkg.dependencies).length);
  for (const [name, cap] of Object.entries({
    default: 4800,
    core: 2500,
    all: 7500,
  }))
    assert.ok(
      gzipSync(fs.readFileSync(sizes[name].file), { level: 9 }).length <= cap,
      `${name} exceeds ${cap}`,
    );
});
test("all animation names resolve in every supported base and pack combination", () => {
  const combinations = [
    ["default"],
    ["core"],
    ["all"],
    ...["motion", "interactions", "loaders", "visual"].flatMap((pack) => [
      ["default", pack],
      ["core", pack],
    ]),
    ["core", "motion", "interactions", "loaders", "visual"],
    ["default", "motion", "interactions", "loaders", "visual"],
  ];
  for (const names of combinations) {
    const root = postcss.parse(
      names.map((n) => fs.readFileSync(sizes[n].file, "utf8")).join("\n"),
    );
    const keys = new Set(),
      references = new Set();
    root.walkAtRules("keyframes", (r) => keys.add(r.params));
    root.walkDecls("animation-name", (d) => references.add(d.value));
    for (const name of references)
      assert.ok(keys.has(name), `${names.join("+")}: missing ${name}`);
    root.walkDecls((d) =>
      assert.ok(
        !d.prop.startsWith("animation") || !/undefined|NaN/.test(d.value),
        d.toString(),
      ),
    );
  }
});
test("catalog has complete examples and accurately counted additions", () => {
  assert.equal(catalog.effects.filter((e) => e.isNew).length, 64);
  assert.equal(
    new Set(catalog.effects.map((e) => e.class)).size,
    catalog.effects.length,
  );
  for (const effect of catalog.effects) {
    assert.ok(effect.html.includes(effect.class), effect.class);
    assert.ok(effect.description);
    assert.ok(effect.reduced);
    assert.ok(effect.pack);
  }
  assert.equal(sizes.all.classes.length, 201);
});
test("intrinsic sizing stays scoped and no blanket promotion hints are shipped", () => {
  for (const name of ["default", "all"]) {
    const root = postcss.parse(fs.readFileSync(sizes[name].file, "utf8"));
    root.walkRules(":root", (r) =>
      r.walkDecls("interpolate-size", () =>
        assert.fail("Global sizing opt-in"),
      ),
    );
    root.walkDecls("will-change", () =>
      assert.fail("Blanket will-change not allowed"),
    );
    root.walkDecls("backface-visibility", () =>
      assert.fail("Blanket backface hiding not allowed"),
    );
  }
});

test('reduced-motion rules retain the v2 policy without the proposed overrides', () => {
  for (const artifact of Object.values(sizes)) {
    const root = postcss.parse(fs.readFileSync(artifact.file, 'utf8'));
    root.walkAtRules('media', media => {
      if (!media.params.includes('prefers-reduced-motion')) return;
      media.walkDecls(decl => {
        assert.ok(['animation-duration', 'animation-iteration-count', 'transition', 'animation', 'opacity'].includes(decl.prop), `${artifact.file}: unexpected reduced-motion override ${decl.prop}`);
        if (decl.prop === 'animation-duration') assert.equal(decl.value, '.01ms');
        if (decl.prop === 'animation-iteration-count') assert.equal(decl.value, '1');
      });
    });
  }
});
