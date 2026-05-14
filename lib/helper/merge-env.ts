export function mergeEnv(existing: string, addition: string) {
  const existingLines = new Set(existing.split("\n").map((l) => l.trim()));

  const newLines = addition
    .split("\n")
    .filter((l) => l.trim() && !existingLines.has(l.trim()));

  return existing + "\n" + newLines.join("\n");
}
