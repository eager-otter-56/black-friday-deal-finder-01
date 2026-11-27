// main.ts — hands the TruePrice Friday site in to make.fun.
// Copies app/ and screenshots/ from this repository into the output
// directory and writes dossier.json with the kit's buildDossier.
// Node 22, standard library only; two runs write identical bytes.

import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });
for (const part of ["app", "screenshots"]) {
  const dest = join(outDir, part);
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(root, part), dest, { recursive: true });
}

const dossier = buildDossier(outDir, {
  text_max_bytes: 160 * 1024,
  screenshots: { max: 4, max_bytes: 256 * 1024 },
});
writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`Wrote ${dossier.length} dossier bytes to ${outDir}`);
