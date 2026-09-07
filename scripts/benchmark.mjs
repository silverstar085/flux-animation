import fs from "node:fs";
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "no-preference",
});
const cdp = await page.context().newCDPSession(page);
const scenarios = [
  {
    name: "legacy entrances",
    css: "tests/fixtures/flux-2.2.0.min.css",
    className: "fx-up fx-loop",
    count: 100,
  },
  {
    name: "current entrances",
    css: "flux.min.css",
    className: "fx-up fx-loop",
    count: 100,
  },
  {
    name: "legacy shadow halos",
    css: "tests/fixtures/flux-2.2.0.min.css",
    className: "fx-ripple",
    count: 20,
  },
  {
    name: "new transform rings",
    css: "flux.all.min.css",
    className: "fx-ring-pulse",
    count: 20,
  },
];
const results = [];
for (let run = 0; run < 3; run++)
  for (const scenario of scenarios) {
    await page.setContent(
      "<style>body{display:flex;flex-wrap:wrap;gap:35px;padding:30px} .sample{display:block;width:28px;height:28px;background:#b4ed65;border-radius:50%;color:#456921}</style>" +
        Array.from(
          { length: scenario.count },
          () => `<span class="sample ${scenario.className}"></span>`,
        ).join(""),
    );
    await page.addStyleTag({ path: scenario.css });
    await page.waitForTimeout(250);
    await cdp.send("Tracing.start", {
      categories: "devtools.timeline",
      transferMode: "ReturnAsStream",
    });
    const frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const gaps = [];
          let start, last;
          function frame(t) {
            if (start === undefined) start = t;
            if (last !== undefined) gaps.push(t - last);
            last = t;
            if (t - start < 1500) requestAnimationFrame(frame);
            else resolve(gaps);
          }
          requestAnimationFrame(frame);
        }),
    );
    const completion = new Promise((resolve) =>
      cdp.once("Tracing.tracingComplete", resolve),
    );
    await cdp.send("Tracing.end");
    const { stream } = await completion;
    let content = "";
    for (;;) {
      const part = await cdp.send("IO.read", { handle: stream });
      content += part.data;
      if (part.eof) break;
    }
    await cdp.send("IO.close", { handle: stream });
    const events = JSON.parse(content).traceEvents;
    const measure = (name) => ({
      count: events.filter((e) => e.name === name && e.ph === "X").length,
      ms: events
        .filter((e) => e.name === name && e.ph === "X")
        .reduce((n, e) => n + (e.dur || 0) / 1000, 0),
    });
    frames.sort((a, b) => a - b);
    results.push({
      name: scenario.name,
      run,
      layout: measure("Layout"),
      paint: measure("Paint"),
      p95FrameMs: frames[Math.floor(frames.length * 0.95)],
    });
    console.log(scenario.name, results.at(-1));
  }
await browser.close();
fs.mkdirSync("output/playwright", { recursive: true });
fs.writeFileSync(
  "output/playwright/benchmark.json",
  JSON.stringify(
    {
      browser: "Chromium",
      note: "Local headless traces, 3 runs of 1.5 seconds after warmup. Rings and shadow halos are different visual designs, not a drop-in equivalence benchmark.",
      results,
    },
    null,
    2,
  ) + "\n",
);
