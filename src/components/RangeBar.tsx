import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface RangeBarProps extends HTMLAttributes<HTMLDivElement> {
  currentTick: string;
  lowTick: string;
  highTick: string;
  childrenClassName?: string;
}

export const RangeBar: FC<RangeBarProps> = ({
  currentTick,
  lowTick,
  highTick,
  className,
  childrenClassName,
}) => {
  const isInRange =
    Number(currentTick) >= Number(lowTick) &&
    Number(currentTick) <= Number(highTick);
  // clamp the position to be between 0 and 100
  let val =
    Math.max(
      (Number(currentTick) - Number(lowTick)) /
        (Number(highTick) - Number(lowTick))
    ) * 100;
  if (isInRange && val < 20) val = 20;
  if (!isInRange && val < 0) val = 0;
  const pos = Math.min(100, val);

  return (
    <div
      className={twMerge(
        clsx("flex items-center justify-between gap-x-3", className)
      )}
    >
      <div
        className={twMerge(
          clsx(
            "relative h-[12px] w-[160px] rounded-full border-2 border-sn-section-border py-[1px]"
          ),
          childrenClassName
        )}
      >
        <div
          style={{ left: pos + "%" }}
          className="absolute top-1/2 h-[16px] w-[4px] translate-y-[-50%] rounded-[12px] bg-white"
        ></div>
        <div
          className={clsx(
            "mx-auto h-[6px] w-[60%]",
            isInRange ? "bg-sn-progress-success " : "bg-sn-progress-fail"
          )}
        ></div>
      </div>
      <div
        className={clsx(
          "rounded-[6px] px-[6px] py-1 text-[12px]",
          isInRange
            ? "bg-sn-panel-bg-2 text-sn-progress-success "
            : "bg-sn-panel-bg-3 text-sn-progress-fail"
        )}
      >
        {isInRange ? "In range" : "Out of range"}
      </div>
    </div>
  );
};
