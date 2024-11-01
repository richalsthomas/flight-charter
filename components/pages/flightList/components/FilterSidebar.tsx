import RangeSelector from "@/components/common/RangeSelector";

export default function FilterSidebar() {
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
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
            ],
          },
          {
            label: "Airlines",
            value: "airline",
            options: [
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
            ],
          },
          {
            label: "Travel and Baggage",
            value: "airline",
            options: [
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
              { label: "Nonstop(23)", value: "Nonstop", minAmount: "$110" },
            ],
          },
        ].map((filter, index) => (
          <div key={index} className="px-4 py-5 flex flex-col gap-4">
            <div className="flex gap-2 items-start text-sm font-semibold">
              <span className="flex-grow">{filter.label}</span>
              <span>From</span>
            </div>
            {filter.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  id={option.value}
                  name={option.value}
                  value={option.value}
                  className="h-4 w-4"
                />
                <label htmlFor={option.value} className="flex-grow">
                  {option.label}
                </label>
                <span>{option.minAmount}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="px-4 py-5 flex flex-col gap-6">
          <div className="-mb-2 text-sm font-semibold">Departure Time</div>
          <RangeSelector
            ranges={[
              { label: "Mon 5:00 AM", value: "1" },
              { label: "Mon 8:00 AM", value: "2" },
              { label: "Mon 11:00 AM", value: "3" },
              { label: "Tue 12:00 AM", value: "4" },
            ]}
            value={{ min: "1", max: "3" }}
            onChange={() => {}}
          />
        </div>

        <div className="px-4 py-5 flex flex-col gap-6">
          <div className="-mb-2 text-sm font-semibold">Arrival Time</div>
          <RangeSelector
            ranges={[
              { label: "Mon 5:00 AM", value: "1" },
              { label: "Mon 8:00 AM", value: "2" },
              { label: "Mon 11:00 AM", value: "3" },
              { label: "Tue 12:00 AM", value: "4" },
            ]}
            value={{ min: "1", max: "3" }}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-3 px-2 py-3">
          <button className="focus:outline-none font-semibold text-[#482A89] hover:scale-110 px-3 py-2 w-full duration-300">
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
