import RangeSelector from "@/components/common/RangeSelector";
import { Flight } from "@/data/flights";
import { customDateString } from "@/utility/customDateString";
import { removeDuplicates } from "@/utility/removeDuplicates";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FiltersType } from "../FlightList";

export default function FilterSidebar({
  flights,
  setFilters,
  departureTimeRange,
  arrivalTimeRange,
  travelBaggage,
  stops,
  airline,
}: {
  flights?: Flight[];
  departureTimeRange: { min: string; max: string } | null;
  arrivalTimeRange: { min: string; max: string } | null;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  travelBaggage: string[];
  stops: string[];
  airline: string[];
}) {
  const sortedTimes = useCallback(
    (start?: boolean) => {
      return removeDuplicates(
        flights?.map((flight) =>
          start
            ? flight.stops[0]?.arrivalTime
            : flight.stops[flight.stops.length - 1]?.arrivalTime
        )
      ).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
    },
    [flights]
  );

  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }}
      className="bg-white flex flex-col w-[260px] rounded-sm"
    >
      <span className="p-2 text-lg font-semibold">Filter By</span>
      <div className="-mt-2 flex flex-col divide-y divide-[#C8C8C8]">
        {[
          {
            label: "Stop",
            value: "stops",
            options: [
              {
                label: `Nonstop(${
                  flights?.filter((val) => val.stops.length === 2).length
                })`,
                value: "Nonstop",
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => val.stops.length === 2)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              },
              {
                label: `1 Stop (${
                  flights?.filter((val) => val.stops.length === 3).length
                })`,
                value: "1_stop",
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => val.stops.length === 3)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              },
              {
                label: `2+ Stops (${
                  flights?.filter((val) => val.stops.length > 3).length
                })`,
                value: "2+_stop",
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => val.stops.length > 3)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              },
            ],
          },
          {
            label: "Airlines",
            value: "airline",
            options: removeDuplicates(flights?.map((val) => val.airline)).map(
              (airline) => ({
                label: airline,
                value: airline,
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => val.airline === airline)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              })
            ),
          },
          {
            label: "Travel and Baggage",
            value: "travelBaggage",
            options: [
              {
                label: "Carry-on bag",
                value: "carry-on",
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => val.checkedBag)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              },
              {
                label: "Checked bag",
                value: "checked-bag",
                minAmount:
                  "$" +
                  Math.min(
                    ...(flights
                      ?.filter((val) => !val.checkedBag)
                      ?.map((val) => val.pricePerStop) ?? [0])
                  ),
              },
            ],
          },
        ].map((filter, index) => (
          <div key={index} className="px-4 py-5 flex flex-col gap-4">
            <div className="flex gap-2 items-start text-sm font-semibold">
              <span className="flex-grow">{filter.label}</span>
              <span>From</span>
            </div>
            {filter.options.map((option, index) => {
              const currentFilteres =
                option.value === "travelBaggage"
                  ? travelBaggage
                  : option.value === "stops"
                  ? stops
                  : airline;
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={
                      currentFilteres?.includes(option.value) ? true : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters((filters: FiltersType) => ({
                          ...filters,
                          [filter.value]: [
                            ...(currentFilteres ?? []),
                            option.value,
                          ],
                        }));
                      } else {
                        setFilters((filters: FiltersType) => ({
                          ...filters,
                          [filter.value]: currentFilteres?.filter(
                            (val: string) => val !== option.value
                          ),
                        }));
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <label htmlFor={option.value} className="flex-grow">
                    {option.label}
                  </label>
                  <span>{option.minAmount}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div className="px-4 py-5 flex flex-col gap-6">
          <div className="-mb-2 text-sm font-semibold">Departure Time</div>
          <RangeSelector
            ranges={sortedTimes(true).map((time) => ({
              label: customDateString(time),
              value: time,
            }))}
            value={
              departureTimeRange ?? {
                min: sortedTimes(true)[0],
                max: sortedTimes(true)[sortedTimes(true).length - 1],
              }
            }
            onChange={(val) => {
              setFilters((filters: FiltersType) => ({
                ...filters,
                departureTimeRange: val,
              }));
            }}
          />
        </div>

        <div className="px-4 py-5 flex flex-col gap-6">
          <div className="-mb-2 text-sm font-semibold">Arrival Time</div>
          <RangeSelector
            ranges={sortedTimes().map((time) => ({
              label: customDateString(time),
              value: time,
            }))}
            value={
              arrivalTimeRange ?? {
                min: sortedTimes()[0],
                max: sortedTimes()[sortedTimes().length - 1],
              }
            }
            onChange={(val) => {
              setFilters((filters: FiltersType) => ({
                ...filters,
                arrivalTimeRange: val,
              }));
            }}
          />
        </div>
        <div className="flex gap-3 px-2 py-3">
          <button
            onClick={() => {
              setFilters({
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
                preference: "RECOMMENDED",
              });
            }}
            className="focus:outline-none font-semibold text-[#482A89] hover:scale-110 px-3 py-2 w-full duration-300"
          >
            Reset
          </button>
          <button className="focus:outline-none font-semibold bg-[#482A89] text-white hover:opacity-80 rounded px-3 py-2 w-full duration-300">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
