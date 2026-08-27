#!/usr/bin/env node
/**
 * Copy repo-root AGENTS.md into static/ so Docusaurus publishes it at /AGENTS.md.
 * Root AGENTS.md is the source of truth for in-repo agents; the static copy is
 * for agents fetching https://dev.flare.network/AGENTS.md.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const src = path.join(rootDir, "AGENTS.md");
const dest = path.join(rootDir, "static", "AGENTS.md");

function copyAgentsMd() {
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source ${path.relative(rootDir, src)}`);
  }
  fs.copyFileSync(src, dest);
  console.log(
    `[copy-agents-md] Copied ${path.relative(rootDir, src)} -> ${path.relative(rootDir, dest)}`,
  );
}

copyAgentsMd();
