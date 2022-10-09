import { db } from "../endpoints";

export default function getPbImagePath(
  sub: string,
  recordId: string,
  filename: string,
  x?: number,
  y?: number
): string {
  return `${db}/api/files/${sub}/${recordId}/${filename}${x & y ? `?thumb=${x}x${y}` : ""}`;
}
