import { Stop } from "@/data/flights";

export function convertArrayToPairs(arr: Stop[]): Stop[][] {
  const result: Stop[][] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    result.push([arr[i], arr[i + 1]]);
  }

  return result;
}
