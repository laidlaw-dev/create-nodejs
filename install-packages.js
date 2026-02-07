#!/usr/bin/env node

// install-all.js
import { execSync } from "child_process";

// Helper function to install packages
export function installPackages(packages, isDev = false) {
  if (packages.length === 0) return;

  const flag = isDev ? "-D" : "";
  const label = isDev ? "devDependencies" : "dependencies";

  console.log(`\n📦 Installing ${label}...`);
  try {
    execSync(`npm install ${flag} ${packages.join(" ")}`, { stdio: "inherit" });
    console.log(`✅ Installed ${label} successfully!`);
  } catch (error) {
    console.error(`❌ Failed to install ${label}:`, error.message);
    process.exit(1);
  }
}
