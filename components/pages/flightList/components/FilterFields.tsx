import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Abel } from "next/font/google";
import { CustomDropdown } from "@/components/common/CustomDropdown";
import { Flight } from "@/data/flights";
import { removeDuplicates } from "@/utility/removeDuplicates";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
});

export default function FilterFields({
  flights,
  airline,
  classSelect,
  trip,
  travelFrom,
  travelTo,
  departureDate,
  travellers,
  setFilters,
}: {
  flights?: Flight[];
  airline?: string | null;
  classSelect?: string | null;
  trip?: string | null;
  travelFrom?: string | null;
  travelTo?: string | null;
  departureDate?: Date | null;
  travellers?: string | null;
  setFilters: (filters: any) => void;
}) {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }} className="w-full">
      <div className="w-full py-12 px-6 max-w-7xl mx-auto">
        <div className="w-full flex flex-col gap-3 items-start">
          <div className="flex gap-3">
            <CustomDropdown
              placeholder="Select flight"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
              options={removeDuplicates(
                flights?.map((flight) => flight.airline)
              ).map((airline) => ({ label: airline, value: airline }))}
              value={airline as string}
              onChange={(value) => {
                setFilters((filters: {}) => ({ ...filters, airline: [value] }));
              }}
            />
            <CustomDropdown
              placeholder="Select Class"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
              options={removeDuplicates(
                flights?.map((flight) => flight.class)
              ).map((classSelect) => ({
                label: classSelect,
                value: classSelect,
              }))}
              value={classSelect as string}
              onChange={(value) => {
                setFilters((filters: {}) => ({ ...filters, class: value }));
              }}
            />
            <CustomDropdown
              placeholder="Select  Trip"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
              options={removeDuplicates(
                flights?.map((flight) => flight.trip)
              ).map((trip) => ({ label: trip, value: trip }))}
              value={trip as string}
              onChange={(value) => {
                setFilters((filters: {}) => ({ ...filters, trip: value }));
              }}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center -ml-4">
              <Image
                height={50}
                width={50}
                className="h-4 w-4 relative left-7 z-50"
                alt=""
                src="/icons/plane-rising.png"
              />
              <CustomDropdown
                search
                placeholder="From"
                className="border border-[#A1B0CC] pl-9 py-2.5 w-52"
                iconClassName="hidden"
                options={removeDuplicates(
                  flights
                    ?.map((flight) => flight.stops.map((stop) => stop.stopName))
                    .flat()
                ).map((stop) => ({
                  label: stop,
                  value: stop,
                  keywords: stop.split(" "),
                }))}
                value={travelFrom as string}
                onChange={(value) => {
                  setFilters((filters: {}) => ({
                    ...filters,
                    travelFrom: value,
                  }));
                }}
              />
            </div>
            <div className="shrink-0 flex items-center">
              <button
                onClick={() => {
                  setFilters((filters: {}) => ({
                    ...filters,
                    travelFrom: travelTo,
                    travelTo: travelFrom,
                  }));
                }}
                className="p-2 rounded bg-[#F2EAFF] hover:opacity-80"
              >
                <Image
                  height={20}
                  width={20}
                  alt=""
                  src="/icons/switch.png"
                  className="h-4 w-4"
                />
              </button>
            </div>
            <div className="flex items-center -ml-4">
              <Image
                height={50}
                width={50}
                className="h-4 w-4 relative left-7 z-50"
                alt=""
                src="/icons/plane-landing.png"
              />
              <CustomDropdown
                search
                placeholder="To"
                className="border border-[#A1B0CC] pl-9 py-2.5 w-52"
                iconClassName="hidden"
                options={removeDuplicates(
                  flights
                    ?.map((flight) => flight.stops.map((stop) => stop.stopName))
                    .flat()
                )
                  .filter((val) => val !== travelFrom)
                  .map((stop) => ({
                    label: stop,
                    value: stop,
                    keywords: stop.split(" "),
                  }))}
                value={travelTo as string}
                onChange={(value) => {
                  setFilters((filters: {}) => ({
                    ...filters,
                    travelTo: value,
                  }));
                }}
              />
            </div>
            <div className="flex items-center -ml-4">
              <Image
                src="/icons/calender.png"
                height={20}
                width={20}
                alt=""
                className="h-4 w-4 relative left-7 z-50 pointer-events-none"
              />
              <DatePicker
                selected={departureDate}
                onChange={(date) =>
                  setFilters((filters: {}) => ({
                    ...filters,
                    departureDate: date,
                  }))
                }
                minDate={new Date()}
                placeholderText="Departing - Returning"
                className="rounded border border-[#A1B0CC] pl-9 py-2.5 w-72"
              />
            </div>
            <div className="flex items-center -ml-4">
              <Image
                height={50}
                width={50}
                className="h-4 w-4 relative left-7 z-50"
                alt=""
                src="/icons/person.png"
              />
              <input
                type="number"
                placeholder="Travellers"
                className="rounded border border-[#A1B0CC] pl-9 py-2.5 w-52"
                value={travellers ?? ""}
                onChange={(e) => {
                  setFilters((filters: {}) => ({
                    ...filters,
                    travellers: e.target.value,
                  }));
                }}
              />
            </div>
            <button className="flex flex-row items-center gap-3 rounded font-semibold bg-[#5D36AF] hover:opacity-80 text-white pl-4 pr-5">
              <Image
                height={50}
                width={50}
                className="h-4 w-4"
                alt=""
                src="/icons/lense.png"
              />
              Search
            </button>
            <button
              onClick={() => {
                setFilters({
                  preference: "RECOMMENDED",
                });
              }}
              className="focus:outline-none font-semibold border border-[#482A89] rounded text-[#482A89] hover:text-white hover:bg-[#482A89] py-2 px-6 duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
