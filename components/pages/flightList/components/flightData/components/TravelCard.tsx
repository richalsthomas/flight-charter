import { Stop } from "@/data/flights";
import { getTimeDifference } from "@/utility/getTimeDifference";
import Image from "next/image";

export default function TravelCard({ pair }: { pair: Stop[] }) {
  return (
    <div className="text-sm flex-grow flex flex-row gap-4 p-3 rounded bg-[#FFF1E4]">
      <div className="flex flex-col gap-1 max-w-[150px]">
        <div>
          {new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date(pair[0].arrivalTime))}
        </div>
        <div className="mt-2 font-semibold text-lg">
          {new Date(pair[0].arrivalTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="font-normal">{pair[0].stopName}</div>
      </div>

      <div className="flex-grow">
        <div className="mt-10 text-center flex flex-col items-center gap-3 font-semibold">
          {getTimeDifference(
            new Date(pair[0].arrivalTime),
            new Date(pair[1].arrivalTime)
          )}
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-[#C8C8C8]" />
            <Image src="/icons/plane.png" alt="" width={20} height={20} />
            <div className="h-px w-12 bg-[#C8C8C8]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-w-[150px]">
        <div
          className={
            new Date(pair[0].arrivalTime).toDateString() ===
            new Date(pair[1].arrivalTime).toDateString()
              ? "invisible"
              : ""
          }
        >
          {new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date(pair[1].arrivalTime))}
        </div>
        <div className="mt-2 font-semibold text-lg">
          {new Date(pair[1].arrivalTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="font-normal">{pair[1].stopName}</div>
      </div>
    </div>
  );
}
