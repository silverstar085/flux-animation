// Browser integration checks use the Playwright library, not a test-runner framework.
import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
const catalog = JSON.parse(fs.readFileSync("demo/catalog.json"));
const root = new URL("../", import.meta.url);
const failures = [],
  reports = [];
const engines = process.env.FLUX_BROWSER
  ? [process.env.FLUX_BROWSER]
  : ["chromium", "firefox", "webkit"];
for (const engine of engines) {
  // FLUX_EXECUTABLE points at a preinstalled browser binary (for example in CI images).
  const browser = await { chromium, firefox, webkit }[engine].launch(
    process.env.FLUX_EXECUTABLE ? { executablePath: process.env.FLUX_EXECUTABLE } : {},
  );
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "no-preference",
  });
  const report = { browser: engine, version: browser.version(), checks: [] };
  async function check(name, fn) {
    try {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await fn();
      report.checks.push(name);
      console.log(`PASS ${engine}: ${name}`);
    } catch (e) {
      failures.push(`${engine}: ${name}: ${e.message}`);
      console.error("FAIL", failures.at(-1));
    }
  }
  async function fixture(css = "flux.all.min.css", body = "") {
    await page.setContent(
      "<!doctype html><style>body{margin:0} .fixture{display:inline-block;width:120px;height:40px} i{display:block} .sr-only{position:absolute;clip-path:inset(50%)} </style><main>" +
        body +
        "</main>",
    );
    for (const file of css.split("+"))
      await page.addStyleTag({ path: new URL(file, root).pathname });
  }
  await check("host speed modifiers retain per-effect defaults", async () => {
    await fixture(
      undefined,
      '<div id="normal" class="fx-pulse fixture"></div><div id="fast" class="fx-pulse fx-fast fixture"></div><div id="spin" class="fx-spin fx-slow fixture"></div>',
    );
    assert.deepEqual(
      await page.evaluate(() =>
        ["normal", "fast", "spin"].map(
          (id) =>
            getComputedStyle(document.getElementById(id)).animationDuration,
        ),
      ),
      ["0.9s", "0.3s", "0.7s"],
    );
  });
  await check(
    "pause, delay, easing and repeats reach child and pseudo animations",
    async () => {
      await fixture(
        undefined,
        '<div id="dots" class="fx-dots-wave fx-paused fx-fast fx-loop-2 fx-linear fx-d2"><i></i><i></i><i></i></div><div id="ring" class="fx-dual-ring fx-paused fx-fast fx-loop-3 fx-d2"></div>',
      );
      const values = await page.evaluate(() =>
        [
          getComputedStyle(document.querySelector("#dots i:nth-child(2)")),
          getComputedStyle(document.querySelector("#ring"), "::after"),
        ].map((s) => [
          s.animationPlayState,
          s.animationDuration,
          s.animationIterationCount,
          s.animationDelay,
          s.animationTimingFunction,
        ]),
      );
      assert.deepEqual(values[0], ["paused", "0.3s", "2", "0.34s", "linear"]);
      assert.equal(values[1][0], "paused");
      assert.equal(values[1][1], "0.3s");
      assert.equal(values[1][2], "3");
      assert.equal(values[1][3], "0.2s");
    },
  );
  await check("stagger index, inherited cycle and dot settings", async () => {
    await fixture(
      undefined,
      '<section style="--fx-cycle:9s;--fx-dot:11px"><div id="cycle" class="fx-cycle-3"><span>A</span><span>B</span><span>C</span></div><div class="fx-dots-wave"><i id="dot"></i></div><ul class="fx-stagger fx-stagger-zoom fx-d2"><li style="--fx-index:20" id="indexed">Item</li></ul></section>',
    );
    const result = await page.evaluate(() => [
      getComputedStyle(document.querySelector("#cycle span")).animationDuration,
      getComputedStyle(document.querySelector("#dot")).width,
      getComputedStyle(document.querySelector("#indexed")).animationDelay,
    ]);
    assert.deepEqual(result, ["9s", "11px", "1.3s"]);
  });
  await check(
    "class whitespace and nested family defaults are safe",
    async () => {
      await fixture(
        undefined,
        '<div class="fx-float"><div id="child" class="fixture\nfx-up\tfx-fast"></div></div>',
      );
      const r = await page.evaluate(() => {
        const s = getComputedStyle(document.querySelector("#child"));
        return [
          s.animationName,
          s.animationDuration,
          s.animationIterationCount,
        ];
      });
      assert.deepEqual(r, ["fxY", "0.3s", "1"]);
    },
  );
  await check(
    "every example has a valid animation and finite sampled styles",
    async () => {
      await fixture(
        undefined,
        catalog.effects
          .map((e, i) => `<section id="e${i}">${e.html}</section>`)
          .join(""),
      );
      const result = await page.evaluate(
        (effects) =>
          effects.flatMap((e, i) => {
            if (["interaction", "toggle", "helper"].includes(e.kind)) return [];
            const host = document.getElementById("e" + i),
              animations = host.getAnimations({ subtree: true });
            if (!animations.length) return [e.class + " has no animation"];
            for (const a of animations) {
              a.pause();
              const duration = a.effect.getComputedTiming().duration;
              if (!Number.isFinite(duration))
                return [
                  e.class +
                    " invalid duration " +
                    JSON.stringify(a.effect.getTiming()),
                ];
              a.currentTime = duration * 0.5;
            }
            return [...host.querySelectorAll("*")].flatMap((el) => {
              const s = getComputedStyle(el);
              return /NaN/.test(s.transform + s.opacity)
                ? [e.class + " invalid style"]
                : [];
            });
          }),
        catalog.effects,
      );
      assert.deepEqual(result, []);
    },
  );
  await check("reduced-motion policy matches v2 without resetting delay, pause or direction", async () => {
    await page.emulateMedia({reducedMotion:'reduce'});
    const markup = '<div id="enter" class="fixture fx-up fx-paused fx-d7 fx-reverse"></div><div id="spin" class="fx-spin"></div><div id="cycle" class="fx-cycle-3"><span>A</span><span>B</span><span>C</span></div>';
    async function settings(css) {
      await fixture(css, markup);
      return page.evaluate(() => {
        const s = getComputedStyle(document.querySelector('#enter'));
        const loop = getComputedStyle(document.querySelector('#spin'));
        return {duration:s.animationDuration,delay:s.animationDelay,state:s.animationPlayState,direction:s.animationDirection,iterations:s.animationIterationCount,loopName:loop.animationName,loopCount:loop.animationIterationCount,cycle:[...document.querySelectorAll('#cycle span')].map(e=>{const v=getComputedStyle(e);return [v.animationName,v.opacity,v.visibility]})};
      });
    }
    const baseline = await settings('tests/fixtures/flux-2.2.0.min.css');
    assert.deepEqual(await settings('flux.min.css'), baseline);
    assert.deepEqual(await settings('flux.all.min.css'), baseline);
    assert.equal(baseline.delay,'0.7s');assert.equal(baseline.state,'paused');assert.equal(baseline.direction,'reverse');
  });
  await check("reduced-motion loaders rest on a visible pose", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Cycles show their first child by design; shimmer highlights are decoration over a visible block.
    const skip = /^fx-(cycle-\d|shimmer|skeleton-wave)$/;
    const loops = catalog.effects.filter((e) => e.kind === "loop" && !skip.test(e.class));
    await fixture(
      undefined,
      loops.map((e) => `<div data-c="${e.class}" style="padding:8px">${e.html}</div>`).join(""),
    );
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("[data-c]")].flatMap((wrap) => {
        const host = wrap.firstElementChild;
        const parts = [[host, null], [host, "::before"], [host, "::after"], ...[...host.children].map((c) => [c, null])];
        return parts.flatMap(([el, pseudo]) => {
          const s = getComputedStyle(el, pseudo);
          if (pseudo && s.content === "none") return [];
          const m = new DOMMatrixReadOnly(s.transform === "none" ? undefined : s.transform);
          const width = host.getBoundingClientRect().width;
          const offTrack = pseudo && getComputedStyle(host).overflow === "hidden" && (m.m41 >= width || m.m41 <= -width);
          return +s.opacity < 0.5 || offTrack ? [`${wrap.dataset.c} ${el === host ? "host" : el.tagName}${pseudo || ""}`] : [];
        });
      }),
    );
    assert.deepEqual(hidden, []);
  });
  await check("fx- namespace matches whole classes only", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await fixture(
      undefined,
      '<div id="other" class="gfx-card sfx-btn" style="transition:opacity .3s"></div><div id="own" class="card\tfx-fade" style="transition:opacity .3s"></div>',
    );
    const r = await page.evaluate(() =>
      ["other", "own"].map((id) => {
        const s = getComputedStyle(document.getElementById(id));
        return [s.transitionDuration, s.animationFillMode];
      }),
    );
    assert.deepEqual(r, [["0.3s", "none"], ["0s", "both"]]);
  });
  await check(
    "base plus packs retains animation defaults and shared controls",
    async () => {
      for (const base of ["flux.min.css", "flux.core.min.css"]) {
        await fixture(
          base +
            "+flux.motion.min.css+flux.interactions.min.css+flux.loaders.min.css+flux.visual.min.css",
          '<div id="legacy" class="fx-spin fx-paused"></div><div id="new" class="fx-spring-up fx-fast"></div><div id="ring" class="fx-dual-ring fx-paused"></div>',
        );
        const r = await page.evaluate(() => [
          getComputedStyle(document.querySelector("#legacy")).animationDuration,
          getComputedStyle(document.querySelector("#new")).animationDuration,
          getComputedStyle(document.querySelector("#ring"), "::after")
            .animationPlayState,
        ]);
        assert.deepEqual(r, ["0.8s", "0.3s", "paused"]);
      }
    },
  );
  await check("representative legacy keyframe poses match v2.2.0", async () => {
    const names = [
      "fx-up",
      "fx-down",
      "fx-pop",
      "fx-shake",
      "fx-bounce",
      "fx-flip-x",
      "fx-flip-y",
      "fx-swing",
      "fx-zoom-out",
      "fx-grow-x-to",
    ];
    async function sample(css) {
      await fixture(
        css,
        names
          .map((n, i) => `<div id="sample${i}" class="fixture ${n}"></div>`)
          .join(""),
      );
      return page.evaluate(() =>
        [...document.querySelectorAll(".fixture")].map((el) => {
          const a = el.getAnimations()[0];
          a.pause();
          a.currentTime = Number(a.effect.getTiming().duration) * 0.5;
          const s = getComputedStyle(el);
          return { opacity: s.opacity, transform: s.transform };
        }),
      );
    }
    const before = await sample("tests/fixtures/flux-2.2.0.min.css");
    const after = await sample("flux.min.css");
    for (let i = 0; i < names.length; i++) {
      assert.equal(after[i].opacity, before[i].opacity, names[i]);
      assert.equal(after[i].transform, before[i].transform, names[i]);
    }
  });
  await check("cycle and new-loader phases scale with duration", async () => {
    await fixture(undefined, '<div class="fx-cycle-3 fx-fast"><span>A</span><span id="phase-cycle">B</span><span>C</span></div><div class="fx-bars-wave fx-fast"><i></i><i id="phase-bar"></i><i></i><i></i><i></i></div>');
    const delays = await page.evaluate(() => ['phase-cycle','phase-bar'].map(id => getComputedStyle(document.getElementById(id)).animationDelay));
    assert.deepEqual(delays, ['0.1s','-0.06s']);
  });
  await check("keyboard focus, origin overrides and touch press feedback", async () => {
    await fixture(undefined, '<button id="button" class="fx-grow">Focus me</button><div id="origin" class="fixture fx-flip-in-left fx-origin-bottom fx-once fx-alternate"></div>');
    await page.keyboard.press('Tab');
    // Safari follows the OS keyboard-navigation preference; focus in keyboard modality.
    await page.locator('#button').focus();
    assert.equal(await page.locator('#button').evaluate(e => e.matches(':focus-visible')), true);
    await page.waitForFunction(() =>
      Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector('#button')).transform).a - 1.04) < 0.0001,
    );
    const origin = await page.locator('#origin').evaluate(e => {
      const s = getComputedStyle(e);
      return [s.transformOrigin, s.animationIterationCount, s.animationDirection];
    });
    assert.deepEqual(origin, ['60px 40px', '1', 'alternate']);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() =>
      Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector('#button')).transform).a - 1.04) < 0.0001,
    );
    const touch = await browser.newPage({ hasTouch: true, viewport: { width: 390, height: 844 } });
    await touch.setContent('<button class="fx-push" style="padding:20px">Press me</button>');
    await touch.addStyleTag({ path: new URL('flux.all.min.css', root).pathname });
    const box = await touch.locator('button').boundingBox();
    await touch.mouse.move(box.x + 10, box.y + 10);
    await touch.mouse.down();
    await touch.waitForTimeout(150);
    assert.notEqual(await touch.locator('button').evaluate(e => getComputedStyle(e).transform), 'none');
    await touch.mouse.up();
    await touch.close();
  });
  await check(
    "demo search, code dialog, OS motion preference and responsive layout",
    async () => {
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(
        process.env.FLUX_URL || "http://127.0.0.1:4173/",
      );
      await page.waitForSelector(".effect");
      assert.equal(await page.locator(".effect").count(), 64);
      await page
        .getByRole("searchbox", { name: "Search animation classes" })
        .fill("dual-ring");
      assert.equal(await page.locator(".effect").count(), 1);
      await page
        .getByRole("button", {
          name: "Show code for fx-dual-ring",
          exact: true,
        })
        .click();
      assert.ok(await page.locator("#code-dialog").evaluate((e) => e.open));
      assert.match(
        await page.locator("#code-content").textContent(),
        /role="status"/,
      );
      await page.getByRole("button", { name: "Close example" }).click();
      assert.equal(await page.locator("#reduced").count(), 0);
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await page
          .locator(".fx-dual-ring")
          .evaluate((e) => parseFloat(getComputedStyle(e, "::after").animationDuration)),
        0.00001,
      );
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.getByRole("searchbox").fill("");
      await page.setViewportSize({ width: 390, height: 844 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({
        path: `output/playwright/demo-${engine}-mobile.png`,
      });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({
        path: `output/playwright/demo-${engine}-desktop.png`,
      });
      await page.goto(new URL("index.html", root).href);
      await page.waitForSelector('.effect');
      assert.equal(await page.locator('.effect').count(), 64);
      await page.getByRole('searchbox').fill('dual-ring');
      await page.emulateMedia({reducedMotion:'reduce'});
      assert.equal(await page.locator('.fx-dual-ring').evaluate(e => parseFloat(getComputedStyle(e, '::after').animationDuration)), 0.00001);
      assert.deepEqual(errors, []);
    },
  );
  reports.push(report);
  await browser.close();
}
fs.mkdirSync("output/playwright", { recursive: true });
fs.writeFileSync(
  "output/playwright/browser-results.json",
  JSON.stringify({ reports, failures }, null, 2) + "\n",
);
if (failures.length) process.exitCode = 1;
