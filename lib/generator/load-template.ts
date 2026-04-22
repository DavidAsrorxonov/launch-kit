import fs from "fs";
import path from "path";
import ejs from "ejs";

export function loadTemplate(
  templateDir: string,
  variables: Record<string, any> = {},
): Record<string, string> {
  const files: Record<string, string> = {};

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(templateDir, fullPath);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        const rawContent = fs.readFileSync(fullPath, "utf-8");
        const renderedContent = ejs.render(rawContent, variables);

        if (relativePath.endsWith(".partial.ejs")) {
          return;
        }

        const outputPath = relativePath.replace(/\.ejs$/, "");

        files[outputPath] = renderedContent;
      }
    }
  }

  walk(templateDir);

  return files;
}
