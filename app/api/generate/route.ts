import { generateProject } from "@/lib/generator";
import { createZip } from "@/lib/generator/zip";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const files = generateProject({
      projectName: body?.projectName,
    });

    const zipBlob = await createZip(files);

    return new NextResponse(zipBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="launchkit.zip"',
      },
    });
  } catch (error) {
    console.error("Generate route error:", error);

    return NextResponse.json(
      { error: "Failed to generate project." },
      { status: 500 },
    );
  }
}
