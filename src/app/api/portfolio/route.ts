import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/lib/portfolio-data.ts");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // This is a bit hacky because it's a .ts file, not .json
    // But for a simple demo it works if we parse the export
    const dataMatch = content.match(/export const heroData = (\{[\s\S]*?\});/);
    if (dataMatch) {
      // Use eval-like parsing or just return a static object if it fails
      // For safety, let's just return the data we know is there
      return NextResponse.json({ success: true, data: JSON.parse(dataMatch[1].replace(/(\w+):/g, '"$1":')) });
    }
    return NextResponse.json({ success: false, error: "Data not found" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

export async function POST(request: Request) {
  const newData = await request.json();
  const filePath = path.join(process.cwd(), "src/lib/portfolio-data.ts");
  
  const newContent = `export const heroData = ${JSON.stringify(newData, null, 2)};`;
  
  try {
    await fs.writeFile(filePath, newContent, "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
