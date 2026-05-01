import fs from "fs";
import ejs from "ejs";

export function loadPartialTemplate(
  filePath: string,
  variables: Record<string, unknown> = {},
) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return ejs.render(rawContent, variables);
}
