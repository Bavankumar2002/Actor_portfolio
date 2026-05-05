import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src/lib/movies.json");

export async function GET() {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return NextResponse.json({ success: true, data: JSON.parse(content) });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}

export async function POST(request: Request) {
  try {
    const newMovies = await request.json();
    await fs.writeFile(filePath, JSON.stringify(newMovies, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
