import { db } from "../endpoints";

export default function getUserPfpPath(recordId: string, filename: string, x?: number, y?: number): string {
  return `${db}/api/files/systemprofiles0/${recordId}/${filename}${x & y ? `?thumb=${x}x${y}` : ""}`;
}
