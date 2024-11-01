import { Flight } from "@/data/flights";
import { convertArrayToPairs } from "@/utility/convertArrayToPairs";
import { useState } from "react";
import TravelCard from "./TravelCard";
import Image from "next/image";
import { facilityIcons } from "@/data/facilityIcons";

const tabs = [
  "Flight Information",
  "Fare Detail",
  "Baggage Rules",
  "Cancellation Rules",
];

export default function FlightDetails({ flight }: { flight: Flight }) {
  const [selectedTab, setSelectedTab] = useState("Flight Information");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={
              "text-center cursor-pointer border-b-2 p-2 " +
              (selectedTab === tab ? "border-[#5D36AF]" : "border-transparent")
            }
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="w-full bg-white flex flex-col gap-4">
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
          <div className="font-normal text-sm">
            {flight.stops?.[0].stopName.split(", ")?.slice(-1).join()} {"-> "}
            {flight.stops?.[flight.stops.length - 1].stopName
              .split(", ")
              .slice(-1)
              .join()}
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex-grow flex flex-col gap-3">
            {convertArrayToPairs(flight.stops).map((pair, index, arr) => (
              <div key={index} className="flex flex-col">
                <div className="w-full flex gap-4">
                  <TravelCard pair={pair} />
                  <div className="flex row items-center gap-1">
                    {pair[0].facility?.map((facility, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-center text-sm"
                      >
                        <Image
                          src={
                            facilityIcons.find((val) => val.value === facility)
                              ?.icon ?? ""
                          }
                          alt=""
                          className="w-4 h-4"
                          height={40}
                          width={40}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {arr.length - 1 !== index && (
                  <div className="py-2 flex items-center gap-1 font-normal text-[10px]">
                    <div className="h-px w-full bg-[#D9D9D9]" />
                    <span className="shrink-0">
                      Change of Terminal・Change of planes・3 h 45 m Layover in
                      Dubai
                    </span>
                    <div className="h-px w-full bg-[#D9D9D9]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
