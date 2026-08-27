#!/usr/bin/env node
/**
 * Post-build: emit build/404.md so agents that fetch the Markdown 404 route
 * receive a short recovery document. GitHub Pages still serves 404.html by
 * default for HTML clients.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const outPath = path.join(buildDir, "404.md");

const BODY = `# Page not found

This path does not exist on Flare Developer Hub (HTTP 404).

## Where to look next

- [llms.txt](https://dev.flare.network/llms.txt) — machine-readable documentation index
- [Developer Portal](https://dev.flare.network/developers.md) — quickstarts, DA OpenAPI, auth, sandbox
- [DA Layer OpenAPI](https://dev.flare.network/openapi/data-availability-api.yaml) — Data Availability Client API
- [Sitemap](https://dev.flare.network/sitemap.xml) — all published HTML routes
- [MCP discovery](https://dev.flare.network/.well-known/mcp) — Model Context Protocol server
- [Agent instructions](https://dev.flare.network/agent-instructions.md) — when to use this site
- [Home](https://dev.flare.network/index.md)

Tip: documentation pages are also available as Markdown — append \`.md\` to a docs URL (for example \`/ftso/overview.md\`).
`;

function main() {
  if (!fs.existsSync(buildDir)) {
    console.warn("[generate-404-md] build/ not found, skipping.");
    return;
  }
  fs.writeFileSync(outPath, BODY, "utf8");
  console.log("[generate-404-md] Wrote", path.relative(rootDir, outPath));
}

main();
