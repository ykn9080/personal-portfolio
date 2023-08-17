//https://localhost/api/revalidate?secret=<token>
//https://www.yknam.online/api/revalidate?path=/&secret=GITHUB_TOKEN
//`Bearer ${process.env.GITHUB_TOKEN}`,

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.GITHUB_TOKEN) {
    return new NextResponse(JSON.stringify({ message: "Invalid Token" }), {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const path = request.nextUrl.searchParams.get("path") || "/";

  revalidatePath(path);

  return NextResponse.json({ revalidated: true });
}
