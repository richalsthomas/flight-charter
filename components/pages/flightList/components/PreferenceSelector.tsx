import {
  CheapIcon,
  LightningIcon,
  ThumbsUpIcon,
} from "@/components/common/Icons";
import { useMemo } from "react";

export default function PreferenceSelector({
  preference,
  setPreference,
}: {
  preference: string;
  setPreference: (preference: "RECOMMENDED" | "CHEAPEST" | "FASTEST") => void;
}) {
  const preferences = useMemo(() => {
    return [
      {
        label: "Recommended",
        label2: "$500 - 10h 20m",
        icon: ThumbsUpIcon,
        value: "RECOMMENDED",
      },
      {
        label: "Fastest",
        label2: "$500 - 10h 20m",
        icon: LightningIcon,
        value: "FASTEST",
      },
      {
        label: "Cheapest",
        label2: "$500 - 10h 20m",
        icon: CheapIcon,
        value: "CHEAPEST",
      },
    ];
  }, []);
  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }}
      className="w-full bg-white grid grid-cols-3"
    >
      {preferences.map((item, index) => (
        <div
          key={index}
          className={`flex-grow flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b-2 ${
            preference === item.value
              ? "text-[#5D36AF] border-[#5D36AF]"
              : "text-black"
          }`}
          onClick={() =>
            setPreference(item.value as "RECOMMENDED" | "CHEAPEST" | "FASTEST")
          }
        >
          <item.icon className={`w-4 h-4`} />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{item.label}</span>
            <span className="text-xs">{item.label2}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
