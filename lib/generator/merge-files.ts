export function mergeFiles(
  baseFiles: Record<string, string>,
  moduleFiles: Record<string, string>,
): Record<string, string> {
  return {
    ...baseFiles,
    ...moduleFiles,
  };
}
