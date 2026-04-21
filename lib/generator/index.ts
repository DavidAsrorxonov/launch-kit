import path from "path";
import { loadTemplate } from "./load-template";
import { mergeFiles } from "./merge-files";

export type GenerateProjectConfig = {
  projectName?: string;
  db?: string;
};

export function generateProject(config?: GenerateProjectConfig) {
  const projectName = config?.projectName?.trim() || "launchkit-app";
  const variables = {
    projectName,
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
  }

  return files;
}
