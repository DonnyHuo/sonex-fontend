"use client";

import {
  useGetPoolsMyPositions,
  useGetPoolsPositions,
} from "@/services/api/pools";
import { useMemo, useState } from "react";
import { Address } from "viem";

import { Tooltip } from "@nextui-org/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { PoolsPositionsParams } from "@/types/pools";
import { Trend } from "@/components/Trend";
import Avatar from "@/assets/img/avatar.svg";

import Doughnut from "../components/Doughnut";
import NoData from "../components/Nodata";

const Assets = () => {
  const { address: accountAddress } = useAppKitAccount();
  const address = accountAddress?.toLocaleLowerCase() as Address;

  const [interval] = useState<PoolsPositionsParams["interval"]>("1y");

  const requestPoolsPositions = useGetPoolsPositions({
    interval,
    address,
  });

  const poolsPositions = requestPoolsPositions.data;

  const requestPoolsMyPositions = useGetPoolsMyPositions({
    address,
  });

  const myPoolsPositions = useMemo(() => {
    return requestPoolsMyPositions.data?.positions || [];
  }, [requestPoolsMyPositions]);

  const getLabelAndData = useMemo(() => {
    const labels: Array<string> = [];
    const datas: Array<number> = [];

    let totalDatas: number = 0;

    myPoolsPositions.map((list) => {
      labels.push(`${list.pool.token0.symbol}-${list.pool.token1.symbol}`);
      datas.push(Number(list.balance));
    });

    if (datas.length) {
      totalDatas = datas.reduce((a, b) => a + b);
    }

    return {
      labels,
      datas,
      totalDatas,
    };
  }, [myPoolsPositions]);

  const chartData = {
    labels: getLabelAndData.labels,
    datasets: [
      {
        data: getLabelAndData.datas,
        hoverBackgroundColor: [
          "#e89571",
          "#89eff5",
          "#de51ee9e",
          "#110acf",
          "#13dd13",
        ],
        hoverOffset: -20,
        borderWidth: 0,

        backgroundColor: [
          "#FF8E5E",
          "#59F6FD",
          "#c632d79e",
          "#110ca7",
          "#15b415",
        ],
      },
    ],
  };

  return (
    <div className="mx-[16px] mt-[16px] flex min-h-[264px] flex-col rounded-3xl border border-sn-border bg-sn-section-bg px-[16px] py-[32px] lg:mx-0 lg:mt-[34px] lg:flex-row lg:items-center lg:justify-between lg:px-[32px] lg:py-[32px]">
      {getLabelAndData.totalDatas ? (
        <div>
          <div className="flex items-center gap-[8px]">
            <Avatar />
            <span className="text-[14px] font-medium text-[#D1D5DB]">
              {address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ""}
            </span>
          </div>
          <div className="mt-[24px] flex flex-col items-start gap-[24px] lg:mt-[32px] lg:flex-row lg:gap-[48px]">
            <div>
              <div className="mb-[16px] text-[14px] text-[rgba(255,255,255,0.650)]">
                <Tooltip
                  className="w-[240px] text-[12px]"
                  showArrow={true}
                  placement="right-end"
                  content={
                    <div>
                      Assets are calculated based on the current corresponding
                      USDT value.
                    </div>
                  }
                >
                  <span className="hidden underline decoration-dashed lg:block">
                    Assets by pool
                  </span>
                </Tooltip>
                <span className="block lg:hidden">Total Assets</span>
              </div>
              <div className="text-[30px] font-medium leading-none lg:text-[36px] lg:leading-normal">
                ${getLabelAndData.totalDatas.toFixed(2)}
              </div>
              <div className="mt-[8px] flex items-center gap-[5px] text-[14px] text-[#7E7E7E]">
                <Trend withBg isFall={requestPoolsPositions?.data?.isNegative}>
                  ${requestPoolsPositions?.data?.ratio}
                </Trend>
                <span className="text-[12px] text-sn-text-tertiary">
                  24h Change
                </span>
              </div>
            </div>
            <div className="mt-[20px] hidden h-[80px] w-[1px] bg-[#273345] lg:block" />
            <div>
              <div className="mb-[8px] text-[14px] text-[rgba(255,255,255,0.650)] lg:mb-[16px]">
                Claimable Fees
              </div>
              <div className="flex flex-col items-start gap-[8px] lg:flex-row lg:items-center">
                <div className="text-[30px] font-medium leading-none lg:text-[36px] lg:leading-normal">
                  ${poolsPositions?.totalFees}
                </div>
                {/* <Button className='hidden h-[48px] cursor-pointer rounded-[12px] bg-[#59F6FD] px-[16px] text-[16px] font-[600] text-black lg:block'>
                Claim all
              </Button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoData className="mt-[60px] lg:mt-0" />
      )}

      {getLabelAndData.labels.length ? (
        <div className="mt-[40px] flex items-center justify-center lg:mt-0">
          <Doughnut
            data={chartData}
            className="h-[260px] w-[260px] lg:h-[200px] lg:w-[200px]"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Assets;
