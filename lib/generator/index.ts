import path from "path";
import { loadTemplate } from "./load-template";

export type GenerateProjectConfig = {
  projectName: string;
};

export function generateProject(config?: GenerateProjectConfig) {
  const projectName = config?.projectName.trim() || "launchkit-app";

  const baseTemplatePath = path.join(process.cwd(), "templates", "base");

  const files = loadTemplate(baseTemplatePath, {
    projectName,
  });

  return files;
}
