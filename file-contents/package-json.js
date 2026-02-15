export function packageJson(projectName, description, author) {
  const content = {
    name: projectName,
    version: "1.0.0",
    description: description,
    type: "module",
    author: author,
    license: "MIT",
    bin: {
      [projectName]: "dist/index.js",
    },
    scripts: {
      build: "tsup",
      start: "node dist/index.js",
      dev: "tsx src/index.ts",
      lint: "eslint .",
      test: "vitest run",
      test_watch: "vitest",
    },
  };

  return JSON.stringify(content, null, 2);
}
