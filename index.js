#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { prompt } from "./prompt.js";
import { packageJson } from "./file-contents/package-json.js";
import { readme } from "./file-contents/readme.js";
import { installPackages } from "./install-packages.js";
import { copyFileTemplates } from "./copy-file-templates.js";

// Define your dependencies
const dependencies = [];

// Define your dev dependencies
const devDependencies = [
  "@types/node",
  "ts-node",
  "typescript",
  "eslint@^9",
  "@eslint/js@^9",
  "typescript-eslint",
  "prettier",
  "eslint-config-prettier",
  "vitest",
];

// Function to create a new Node.js project
async function createNodeProject() {
  console.log("Creating a new Node.js project...");
  const projectName = await prompt("Enter the project name: ");
  const description = await prompt("Enter the project description: ");
  const author = await prompt("Enter the author name: ");

  const packageJsonContent = packageJson(projectName, description, author);

  writeFileSync("package.json", packageJsonContent);
  console.log("✅ package.json created successfully");

  const readmeContent = readme(projectName, description, author);

  writeFileSync("README.md", readmeContent);
  console.log("✅ README.md created successfully");

  installPackages(dependencies, false);
  installPackages(devDependencies, true);

  const projectPath = process.cwd();
  copyFileTemplates(projectPath);
}

createNodeProject();
