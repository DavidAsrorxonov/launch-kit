import path from "path";
import { loadTemplate } from "./load-template";
import { mergeFiles } from "./merge-files";

export type GenerateProjectConfig = {
  projectName?: string;
  db?: "mongodb";
  auth?: "better-auth";
};

export function generateProject(config?: GenerateProjectConfig) {
  const projectName = config?.projectName?.trim() || "launchkit-app";
  const hasAuth = config?.auth === "better-auth";
  const hasMongoDB = config?.db === "mongodb" || hasAuth;
  const variables = {
    projectName,
    hasMongoDB,
    hasAuth,
  };

  const baseTemplatePath = path.join(process.cwd(), "templates", "base");

  let files = loadTemplate(baseTemplatePath, variables);

  if (hasMongoDB) {
    const mongodbTemplatePath = path.join(
      process.cwd(),
      "templates",
      "modules",
      "db",
      "mongodb",
    );

    const mongodbFiles = loadTemplate(mongodbTemplatePath, variables);
    files = mergeFiles(files, mongodbFiles);

    const partial = loadTemplate(mongodbTemplatePath, variables)[
      "package.json.partial"
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

  if (hasAuth) {
    const authTemplatePath = path.join(
      process.cwd(),
      "templates",
      "modules",
      "auth",
      "better-auth",
    );
    const authFiles = loadTemplate(authTemplatePath, variables);
    files = mergeFiles(files, authFiles);

    const partial = loadTemplate(authTemplatePath, variables)[
      "package.json.partial"
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
