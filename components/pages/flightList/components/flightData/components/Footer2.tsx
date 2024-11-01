import { Flight } from "@/data/flights";

const refundableText = {
  PARTIAL: {
    text: "Partially Refundable",
    color: "text-yellow-500",
  },
  FULL: {
    text: "Fully Refundable",
    color: "text-green-500",
  },
  NO: {
    text: "Non Refundable",
    color: "text-red-500",
  },
};
export default function Footer2({
  flight,
  openDetails,
  setFlightDetails,
}: {
  flight: Flight;
  openDetails: boolean;
  setFlightDetails: (val: boolean) => void;
}) {
  return (
    <div className="-my-1 flex items-center gap-4">
      <span className="text-sm font-normal">
        {Math.min(...flight.stops.map((stop) => stop.seatsBooked))} seats
        remaining
      </span>
      <span
        className={
          "flex-grow text-center " +
          refundableText[flight.refundable as "PARTIAL"]?.color
        }
      >
        {refundableText[flight.refundable as "PARTIAL"]?.text}
      </span>
      <button
        onClick={() => setFlightDetails(!openDetails)}
        className="focus:outline-none font-semibold text-[#482A89] text-sm hover:opacity-50 p-2 duration-300"
      >
        {openDetails ? "Hide" : "View"} flight details
      </button>
    </div>
  );
}
