import fs from "fs";
import path from "path";

/**
 * Recursively copy a folder from source to destination (force overwrite)
 * Logs relative paths like "src/i18n/i18n.ts" or "public/locales/en/translation.json"
 */
export function copyFolderRecursive(source, destination, root = destination) {
  if (!fs.existsSync(source)) {
    console.error(`❌ Source folder not found: ${source}`);
    return;
  }

  // Ensure destination exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath, root);
    } else {
      fs.copyFileSync(srcPath, destPath); // always overwrite

      // Compute a relative path for pretty logs
      const relativePath = path.relative(root, destPath);
      console.log(`🗎 ${relativePath}`);
    }
  }
}

/**
 * Copy all template files into the target project
 */
export function copyFileTemplates(projectPath) {
  // This resolves to the "templates" folder next to your fileSetup.js
  const sourceDir = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "file-templates",
  );
  const destDir = projectPath;

  console.log(`\n📂 Copying template files:\n`);
  copyFolderRecursive(sourceDir, destDir);
  console.log("\n✅ Templates copied successfully!");
}
