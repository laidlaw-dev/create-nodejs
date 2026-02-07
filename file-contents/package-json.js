export function packageJson(projectName, description, author) {
  const content = {
    name: projectName,
    version: "1.0.0",
    description: description,
    type: "module",
    main: "index.ts",
    author: author,
    license: "MIT",
    scripts: {
      build: "tsc",
      start: "node dist/index.js",
      dev: "ts-node src/index.ts",
      lint: "eslint .",
      test: "vitest",
    },
  };

  return JSON.stringify(content, null, 2);
}
