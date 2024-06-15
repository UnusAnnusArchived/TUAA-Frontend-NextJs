import { NextRequest, NextResponse } from "next/server";
import endpoints from "@/endpoints.json";

export const GET = async (req: NextRequest) => {
  const path = req.nextUrl.searchParams.get("path");

  const image = await fetch(`${endpoints.cdn}${path}`).then((res) => res.blob());

  return new NextResponse(image);
};
