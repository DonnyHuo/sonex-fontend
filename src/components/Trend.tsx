import clsx from "clsx";
import { FC, ReactNode } from "react";

import IconArrowDown from "@/assets/img/portfolio/icon-arrow-down.svg";
import IconArrowUp from "@/assets/img/portfolio/icon-arrow-up.svg";

interface TrendProps {
  children: ReactNode;
  withBg?: boolean;
  isFall?: boolean;
}

export const Trend: FC<TrendProps> = ({
  children,
  isFall = false,
  withBg = false,
}) => {
  return (
    <div
      className={clsx(
        "flex w-fit items-center gap-x-[2px] rounded-[6px]",
        withBg &&
          (isFall
            ? "bg-sn-panel-bg-3 px-[6px] py-1"
            : "bg-sn-panel-bg-2 px-[6px] py-1")
      )}
    >
      {!isFall && <IconArrowUp />}
      {isFall && <IconArrowDown />}
      <span
        className={clsx(
          "text-[12px] font-semibold",
          isFall ? "text-sn-progress-fail" : "text-sn-progress-success"
        )}
      >
        {children}
      </span>
    </div>
  );
};
