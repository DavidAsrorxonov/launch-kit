import JSZip from "jszip";

export async function createZip(files: Record<string, string>) {
  const zip = new JSZip();

  for (const [filePath, content] of Object.entries(files)) {
    zip.file(filePath, content);
  }

  return await zip.generateAsync({ type: "blob" });
}
