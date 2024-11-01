import { useCallback, useEffect, useState } from "react";

export default function RangeSelector({
  ranges,
  value,
}: // onChange,
{
  ranges: { label: string; value: string }[];
  value: { min: string; max: string };
  // onChange: (range: { min: string; max: string }) => void;
}) {
  const [dragging, setDragging] = useState<false | 0 | 1>(false);
  const inRange = useCallback(
    (index: number) => {
      const startIndex = ranges.findIndex((range) => range.value === value.min);
      const endIndex = ranges.findIndex((range) => range.value === value.max);
      return index >= startIndex && index <= endIndex - 1;
    },
    [ranges, value.min, value.max]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setDragging(false);
    };

    window.addEventListener("mouseup", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseMove);
    };
  }, []);
  return (
    <div className="flex flex-col items-start gap-3">
      <span className="text-xs font-normal">
        {ranges.find((range) => range.value === value.min)?.label} -{" "}
        {ranges.find((range) => range.value === value.max)?.label}
      </span>
      <div className="w-full flex px-3 h-2 overflow-visible rounded-sm bg-[#E9ECEF] justify-between">
        {ranges.map((range, index) => (
          <div
            key={index}
            className={`flex py-0.5 ${
              index === ranges.length - 1 ? "" : "w-full pr-3"
            } ${inRange(index) ? "bg-[#5D36AF]" : ""}`}
          >
            {value.min === range.value || value.max === range.value ? (
              <div
                onClick={() => setDragging(value.min === range.value ? 0 : 1)}
                className="h-5 w-5 relative bottom-2 right-2 rounded-full bg-[#5D36AF]"
              >
                <div className="h-2 w-2 relative top-1.5 left-1.5 bg-white rounded-full" />
              </div>
            ) : (
              <div className="bg-white relative bottom-[0.5px] transform translate-y-[0.5px] rounded-full h-1 w-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
