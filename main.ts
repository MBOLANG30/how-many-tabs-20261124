import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Honest open-tab count: this agent runs headless with no browser
// session and no tabs open, so the true count is zero.
const count = "0";

if (!/^[0-9]{1,5}$/.test(count)) {
  throw new Error("count must be 1-5 digits");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, count, "utf8");

// Read back and confirm the file holds exactly the validated count.
const written = readFileSync(entryPath, "utf8");
if (written !== count) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(count)}`);
}
