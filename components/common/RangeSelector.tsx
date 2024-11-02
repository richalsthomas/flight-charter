import { useCallback, useState } from "react";

export default function RangeSelector({
  ranges,
  value,
  onChange,
}: {
  ranges: { label: string; value: string }[];
  value: { min: string; max: string };
  onChange: (range: { min: string; max: string }) => void;
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

  return (
    <div
      onMouseUp={() => {
        setDragging(false);
      }}
      onMouseLeave={() => {
        setDragging(false);
      }}
      className="flex flex-col items-start gap-3"
    >
      <span className="text-xs font-normal">
        {ranges.find((range) => range.value === value.min)?.label} -{" "}
        {ranges.find((range) => range.value === value.max)?.label}
      </span>
      <div className="w-full flex px-3 h-2 overflow-visible rounded-sm bg-[#E9ECEF] justify-between">
        {ranges.map((range, index) => (
          <div
            key={index}
            className={`flex py-0.5 ${
              index === ranges.length - 1 ? "pr-0" : "w-full pr-3"
            } ${inRange(index) ? "bg-[#5D36AF]" : ""}`}
            onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
              if (dragging === false) return;
              event.preventDefault(); // Necessary to allow a drop
              if (
                dragging === 0 &&
                ranges.findIndex((r) => r.value === value.max) > index
              ) {
                onChange({ min: range.value, max: value.max });
              } else if (
                dragging === 1 &&
                ranges.findIndex((r) => r.value === value.min) < index
              ) {
                onChange({ min: value.min, max: range.value });
              }
            }}
          >
            {value.min === range.value || value.max === range.value ? (
              <div
                className={
                  "shrink-0 h-5 w-5 relative bottom-2 right-2 rounded-full bg-[#5D36AF] cursor-grab " +
                  ((dragging === 0 && value.min === range.value) ||
                  (dragging === 1 && value.max === range.value)
                    ? "scale-125"
                    : "")
                }
                draggable="true"
                onDragStart={() => {
                  setDragging(value.min === range.value ? 0 : 1);
                }}
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
