"use client";
import { flights } from "@/data/flights";
import { useEffect, useRef, useState } from "react";
import FilterFields from "./components/FilterFields";
import FilterSidebar from "./components/FilterSidebar";
import Advertisements from "./components/Advertisements";
import PreferenceSelector from "./components/PreferenceSelector";
import FlightData from "./components/flightData/FlightData";

export default function FlightList() {
  const [filters, setFilters] = useState({
    airline: [],
    class: null,
    trip: null,
    travelFrom: null,
    travelTo: null,
    departureDate: null,
    returnDate: null,
    travellers: null,
    stops: [],
    travelBaggage: [],
    departureTimeRange: [],
    arrivalTimeRange: [],
    preference: "RECOMMENDED", // 'RECOMMENDED' | 'CHEAPEST' | 'FASTEST'
  });
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const mainComponentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilteredFlights(
      flights.map((flight) => ({ ...flight, stops: flight.stops.splice(0, 2) }))
    );
  }, []);

  return (
    <div className="flex-grow flex flex-col">
      <FilterFields />
      <div ref={mainComponentRef} className={"flex-grow bg-[#F3F3F3] "}>
        <div className="max-w-7xl mx-auto flex flex-row items-start gap-5 p-5">
          <FilterSidebar />
          <div className="flex-grow flex flex-col gap-5">
            <PreferenceSelector
              preference={filters.preference}
              setPreference={(preference) =>
                setFilters({ ...filters, preference })
              }
            />
            {filteredFlights.map((flight, index) => (
              <FlightData key={index} flight={flight} />
            ))}
          </div>
          <Advertisements />
        </div>
      </div>
    </div>
  );
}
