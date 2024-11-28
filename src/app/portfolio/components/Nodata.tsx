"use client";
import Nodata from "@/assets/img/no-data.svg";

const NoData = (props: { className?: string }) => {
  const { className } = props;
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center ${className}`}
    >
      <Nodata />
      <div className="mt-[8px] text-[12px] text-[#9CA3AF]">No Data</div>
    </div>
  );
};

export default NoData;
