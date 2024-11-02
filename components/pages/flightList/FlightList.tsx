"use client";
import { Flight, flights } from "@/data/flights";
import { useEffect, useRef, useState } from "react";
import FilterFields from "./components/FilterFields";
import FilterSidebar from "./components/FilterSidebar";
import Advertisements from "./components/Advertisements";
import PreferenceSelector from "./components/PreferenceSelector";
import FlightData from "./components/flightData/FlightData";
import { filterStops } from "./filters/fromToFilter";
import { filtering } from "./filterning";

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
    departureTimeRange: null,
    arrivalTimeRange: null,
    preference: "RECOMMENDED", // 'RECOMMENDED' | 'CHEAPEST' | 'FASTEST'
  });
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const mainComponentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const filterFlights = async () => {
      const tempFilteredFlights = filtering(flights, filters);
      setFilteredFlights([...tempFilteredFlights]);
    };
    filterFlights();
  }, [filters, filters.stops, filters.preference]);

  return (
    <div className="flex-grow flex flex-col min-w-[600px]">
      <FilterFields
        flights={flights}
        {...filters}
        airline={filters.airline?.length === 1 ? filters.airline[0] : null}
        classSelect={filters.class}
        setFilters={setFilters}
      />
      <div ref={mainComponentRef} className={"flex-grow bg-[#F3F3F3] "}>
        <div className="max-w-7xl mx-auto flex flex-row items-start gap-5 p-5">
          <FilterSidebar
            flights={flights}
            {...filters}
            setFilters={setFilters}
          />
          <div className="flex-grow flex flex-col gap-5">
            <PreferenceSelector
              preference={filters.preference}
              setPreference={(preference) =>
                setFilters((filters) => ({ ...filters, preference }))
              }
            />
            {filteredFlights.map((flight, index) => (
              <FlightData key={flight.id} flight={flight} />
            ))}
          </div>
          <Advertisements />
        </div>
      </div>
    </div>
  );
}
