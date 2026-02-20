import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, "..");

const publicDir = path.resolve(__dirname, "../public");
const sourcePdf = path.join(repoRoot, "simVLA.pdf");
const destPdf = path.join(publicDir, "simVLA.pdf");

const sourcePaperDir = path.join(repoRoot, "paper");
const destPaperDir = path.join(publicDir, "paper");

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
]);

async function statOrNull(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

async function* walkDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

async function copyIfChanged({ source, dest }) {
  const srcStat = await statOrNull(source);
  if (!srcStat) {
    throw new Error(`[sync-assets] Missing source asset at ${source}`);
  }

  const dstStat = await statOrNull(dest);
  const alreadyUpToDate =
    dstStat &&
    dstStat.size === srcStat.size &&
    dstStat.mtimeMs >= srcStat.mtimeMs;

  if (alreadyUpToDate) {
    return false;
  }

  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(source, dest);
  // Keep timestamps stable to avoid noisy rebuilds.
  await fs.utimes(dest, srcStat.atime, srcStat.mtime);
  return true;
}

async function main() {
  const pdfSourceStat = await statOrNull(sourcePdf);
  if (!pdfSourceStat) {
    console.warn(
      `[sync-assets] Source PDF not found at ${sourcePdf}. Skipping PDF sync (public/simVLA.pdf will be used as-is).`,
    );
  }

  await fs.mkdir(publicDir, { recursive: true });

  const changed = [];

  if (pdfSourceStat) {
    if (
      await copyIfChanged({
        source: sourcePdf,
        dest: destPdf,
      })
    ) {
      changed.push("public/simVLA.pdf");
    }
  }

  const paperDirStat = await statOrNull(sourcePaperDir);
  if (paperDirStat?.isDirectory()) {
    for await (const filePath of walkDir(sourcePaperDir)) {
      const ext = path.extname(filePath).toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) continue;

      const rel = path.relative(sourcePaperDir, filePath);
      const dest = path.join(destPaperDir, rel);
      if (await copyIfChanged({ source: filePath, dest })) {
        changed.push(`public/paper/${rel}`);
      }
    }
  }

  if (changed.length > 0) {
    console.log(`[sync-assets] Synced ${changed.length} file(s):`);
    for (const p of changed) console.log(`- ${p}`);
  }
}

main().catch((err) => {
  console.error(String(err?.stack ?? err));
  process.exitCode = 1;
});

