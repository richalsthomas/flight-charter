import { Flight } from "@/data/flights";
import Image from "next/image";
import Footer from "./components/Footer";
import TravelCard from "./components/TravelCard";
import Footer2 from "./components/Footer2";
import { useState } from "react";
import FlightDetails from "./components/FlightDetails";
import { convertArrayToPairs } from "@/utility/convertArrayToPairs";

export default function FlightData({ flight }: { flight: Flight }) {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }}
      className="w-full px-4 py-5 bg-white flex flex-col gap-6"
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-3 items-center font-semibold">
          <Image
            src={flight.airlineLogo}
            alt=""
            width={50}
            height={50}
            className="h-8 w-8"
          />
          {flight.airline}
        </div>
        <div className="font-normal">
          Travel Class:
          <span className="font-semibold"> {flight.class}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <div className="flex-grow flex flex-col gap-3">
          {convertArrayToPairs(flight.stops).map((pair, index) => (
            <TravelCard key={index} pair={pair} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-[24px] font-bold">
            $
            {(
              flight.pricePerStop * convertArrayToPairs(flight.stops).length
            ).toLocaleString("en-US")}
          </div>
          <button className="focus:outline-none font-semibold bg-[#5D36AF] text-sm text-white hover:opacity-80 rounded px-3 py-2 w-full duration-300">
            Book Now
          </button>
        </div>
      </div>
      <Footer2
        flight={flight}
        openDetails={openDetails}
        setFlightDetails={(val) => setOpenDetails(val)}
      />
      <div
        className={
          "-mb-2 duration-300 overflow-auto " +
          (openDetails ? "max-h-0" : "max-h-screen")
        }
      >
        <Footer flight={flight} />
      </div>
      <div
        className={
          "-mt-5 duration-300 overflow-auto " +
          (openDetails ? "max-h-sceen" : "max-h-0")
        }
      >
        <FlightDetails flight={flight} />
      </div>
    </div>
  );
}
