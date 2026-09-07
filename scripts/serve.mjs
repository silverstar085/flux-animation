import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve(new URL("../", import.meta.url).pathname);
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".md": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
const port = Number(process.env.FLUX_PORT || 4173);
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const file = path.resolve(
        root,
        "." + (pathname === "/" ? "/flux-showcase.html" : pathname),
      );
      if (!file.startsWith(root + path.sep)) throw new Error("Outside root");
      const data = await fs.readFile(file);
      res.writeHead(200, {
        "Content-Type":
          (types[path.extname(file)] || "application/octet-stream") +
          "; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Flux preview: http://127.0.0.1:${port}/flux-showcase.html`),
  );
