import path from "path";
import { loadTemplate } from "./load-template";
import { mergeFiles } from "./merge-files";
import { loadPartialTemplate } from "./load-partial";
import { mergeEnv } from "../helper/merge-env";

export type GenerateProjectConfig = {
  projectName?: string;
  db?: "mongodb";
  auth?: "better-auth";
};

export function generateProject(config?: GenerateProjectConfig) {
  console.log("Generate project config:", config);

  const projectName = config?.projectName?.trim() || "launchkit-app";
  const hasAuth = config?.auth === "better-auth";
  const hasMongoDB = config?.db === "mongodb" || hasAuth;
  const variables = {
    projectName,
    hasMongoDB,
    hasAuth,
  };

  console.log("HAS MONGODB:", hasMongoDB);

  console.log("HAS AUTH:", hasAuth);

  const baseTemplatePath = path.join(process.cwd(), "templates", "base");

  let files = loadTemplate(baseTemplatePath, variables);

  if (hasMongoDB) {
    console.log("HAS MONGODB STARTING...");
    const mongodbTemplatePath = path.join(
      process.cwd(),
      "templates",
      "modules",
      "db",
      "mongodb",
    );

    const mongodbFiles = loadTemplate(mongodbTemplatePath, variables);
    files = mergeFiles(files, mongodbFiles);

    const partial = loadPartialTemplate(
      path.join(mongodbTemplatePath, "package.json.partial.ejs"),
      variables,
    );

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
    console.log("HAS AUTH STARTING...");
    const authTemplatePath = path.join(
      process.cwd(),
      "templates",
      "modules",
      "auth",
      "better-auth",
    );
    const authFiles = loadTemplate(authTemplatePath, variables);
    files = mergeFiles(files, authFiles);

    console.log("AUTH TEMPLATE PATH:", authTemplatePath);
    console.log("AUTH FILES:", Object.keys(authFiles));

    const envPartial = loadPartialTemplate(
      path.join(authTemplatePath, "env.example.partial.ejs"),
      variables,
    );

    if (envPartial) {
      files[".env.example"] = mergeEnv(files[".env.example"] || "", envPartial);
    }

    const partial = loadPartialTemplate(
      path.join(authTemplatePath, "package.json.partial.ejs"),
      variables,
    );

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
