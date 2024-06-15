import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import config from "@/config.json";
import path from "path";
import { IMetadata } from "@/zodTypes";

export const GET = async (req: NextRequest) => {
  const season = req.nextUrl.searchParams.get("season");

  if (season) {
    const dir = await fs.readdir(path.join(config.metadataPath, season.padStart(2, "0")));

    let highest = 0;
    for (let i = 0; i < dir.length; i++) {
      const file: IMetadata = JSON.parse(
        await fs.readFile(path.join(config.metadataPath, season.padStart(2, "0"), dir[i]), "utf-8")
      );

      if (file.episode > highest) {
        highest = file.episode;
      }
    }

    if (highest === 0) {
      return NextResponse.error();
    }

    return new NextResponse(highest.toString().padStart(3, "0"));
  }

  return NextResponse.error();
};
