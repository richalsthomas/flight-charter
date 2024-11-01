import { Flight } from "@/data/flights";
import Image from "next/image";
import { useMemo } from "react";

export default function Footer({ flight }: { flight: Flight }) {
  const footerEntries = useMemo(() => {
    return [
      {
        label: "Separate tickets booked together for cheaper price",
        icon: "/icons/ticket.png",
        show: flight.stops.length > 2,
      },
      {
        label: "Change of Terminal",
        icon: "/icons/terminal.png",
        show: flight.stops.length > 2,
      },
      {
        label: "Self Transfer",
        icon: "/icons/self-transfer.png",
        show: flight.selfTransfer,
      },
      {
        label: flight.weight,
        icon: "/icons/bag.png",
        show: true,
      },
    ];
  }, [flight]);

  return (
    <div className="border-t border-[#C8C8C8] pt-3 flex flex-row gap-3">
      {footerEntries.map(
        (entry, index) =>
          entry.show && (
            <div key={index} className="flex gap-2 items-center text-sm">
              <Image
                src={entry.icon}
                alt=""
                className="w-3 h-3"
                height={10}
                width={10}
              />
              <span>{entry.label}</span>
            </div>
          )
      )}
    </div>
  );
}
