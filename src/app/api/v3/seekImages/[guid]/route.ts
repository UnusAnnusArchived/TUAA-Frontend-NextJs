import fetchSeekImageUrls from "@/tools/fetchSeekImages";
import { NextApiHandler } from "next";
import moment from "moment";
import probe from "probe-image-size";
import { NextRequest, NextResponse } from "next/server";

const NUMBER_X = 6;
const NUMBER_Y = 6;
const THUMBNAIL_INTERVAL_MS = 2000;
const TIME_FORMAT = "HH[:]mm[:]ss[.]SSS";

export const GET = async (req: NextRequest, { params }: any) => {
  const guid = params.guid;

  if (!guid) {
    return new NextResponse("WEBVTT", { status: 404 });
  }

  const seekImageUrls = await fetchSeekImageUrls(guid);

  const initialImage = await probe(seekImageUrls[0]);

  const thumbnailWidth = initialImage.width / NUMBER_X;
  const thumbnailHeight = initialImage.height / NUMBER_Y;

  let vtt = `WEBVTT\n`;

  let t = 0;

  for (let i = 0; i < seekImageUrls.length; i++) {
    const image = seekImageUrls[i];

    for (let h = 0; h < NUMBER_Y; h++) {
      for (let w = 0; w < NUMBER_X; w++) {
        const beginDate = moment(THUMBNAIL_INTERVAL_MS * t).utc();
        t++;
        const endDate = moment(THUMBNAIL_INTERVAL_MS * t).utc();

        vtt += `\n${beginDate.format(TIME_FORMAT)} --> ${endDate.format(TIME_FORMAT)}\n${image}#xywh=${
          thumbnailWidth * w
        },${thumbnailHeight * h},${thumbnailWidth},${thumbnailHeight}\n`;
      }
    }
  }
  return new Response(vtt);
};
