import path from "path";
import { loadTemplate } from "./load-template";
import { mergeFiles } from "./merge-files";

export type GenerateProjectConfig = {
  projectName?: string;
  db?: "mongodb";
};

export function generateProject(config?: GenerateProjectConfig) {
  const projectName = config?.projectName?.trim() || "launchkit-app";
  const variables = {
    projectName,
    hasMongoDB: config?.db === "mongodb",
  };

  const baseTemplatePath = path.join(process.cwd(), "templates", "base");

  let files = loadTemplate(baseTemplatePath, variables);

  if (config?.db === "mongodb") {
    const mongodbTemplatePath = path.join(
      process.cwd(),
      "templates",
      "modules",
      "db",
      "mongodb",
    );

    const mongodbFiles = loadTemplate(mongodbTemplatePath, variables);
    files = mergeFiles(files, mongodbFiles);

    const partialPath = path.join(
      mongodbTemplatePath,
      "package.json.partial.ejs",
    );

    const partial = loadTemplate(path.dirname(partialPath), variables)[
      "package.json.partial.ejs"
    ];

    if (partial) {
      const basePackage = JSON.parse(files["package.json"]);
      const modulePackage = JSON.parse(partial);

      files["package.json"] = JSON.stringify(
        {
          ...basePackage,
          dependencies: {
            ...basePackage.dependencies,
            ...modulePackage.dependencies,
          },
        },
        null,
        2,
      );
    }
  }

  return files;
}
