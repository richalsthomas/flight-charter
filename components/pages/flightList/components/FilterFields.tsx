import CustomDropdown from "@/components/common/CustomDropdown";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Abel } from "next/font/google";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
});

export default function FilterFields({}) {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }} className="w-full">
      <div className="w-full py-12 px-6 max-w-7xl mx-auto">
        <div className="w-full flex flex-col gap-3 items-start">
          <div className="flex gap-3">
            <CustomDropdown
              placeholder="Select flight"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
            />
            <CustomDropdown
              placeholder="Select Class"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
            />
            <CustomDropdown
              placeholder="Select  Trip"
              className={"border border-[#A1B0CC] pl-3 w-40 " + abel.className}
            />
          </div>
          <div className="flex gap-3">
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
              />
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded bg-[#F2EAFF] hover:opacity-80">
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
              />
            </div>
            <div className="flex items-center -ml-4">
              <Image
                src="/icons/calender.png"
                height={20}
                width={20}
                alt=""
                className="h-4 w-4 relative left-7 z-50"
              />
              <DatePicker
                // selected={startDate} onChange={(date) => setStartDate(date)}
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
          </div>
        </div>
      </div>
    </div>
  );
}
