import { pocketbase } from "../endpoints.json";

export default function getPbImagePath(
  sub: string,
  recordId: string,
  filename: string,
  x?: number,
  y?: number
): string {
  return `${pocketbase}/api/files/${sub}/${recordId}/${filename}${x & y ? `?thumb=${x}x${y}` : ""}`;
}
