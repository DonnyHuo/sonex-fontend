"use client";

import {
  Accordion,
  AccordionItem,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useAppKitAccount } from "@reown/appkit/react";
import Browser from "@/assets/img/browser.svg";
import Calculator from "@/assets/img/calculator.svg";
import Tips from "@/assets/img/tips.svg";

import CalculatorModal from "./CalculatorModal";
import HarvestModal from "./HarvestModal";
import StakeModal from "./StakeModal";

export interface ListData {
  id?: number;
  item?: string;
  token0: {
    logo: string;
    symbol: string;
  };
  token1: {
    logo: string;
    symbol: string;
  };
  status: number;
  staked: boolean;
  earned: string;
  apr?: string;
  multiplier?: string;
  balance?: string;
  liquidity?: string;
  stake?: string;
}

interface SortBy {
  [key: string]: any;
}

const FarmList = (props: {
  filter: {
    status: number;
    staked?: boolean;
    search: string;
    sortBy: string;
  };
}) => {
  const { filter } = props;
  const lists: ListData[] = [
    {
      id: 1,
      token0: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/sonex-logo.png",
        symbol: "SONEX",
      },
      token1: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/usdc-logo.png",
        symbol: "USDC.e",
      },
      status: 0,
      staked: true,
      earned: "82.31",
      apr: "2122",
      multiplier: "328.22",
      balance: "272.30",
      liquidity: "12",
      stake: "32",
    },
    {
      id: 2,
      token0: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/sonex-logo.png",
        symbol: "ETH",
      },
      token1: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/usdc-logo.png",
        symbol: "USDT",
      },
      status: 0,
      staked: false,
      earned: "392",
      apr: "3422",
      multiplier: "238.98",
      balance: "272.30",
      liquidity: "234",
      stake: "59",
    },
    {
      id: 3,
      token0: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/sonex-logo.png",
        symbol: "SONEX",
      },
      token1: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/usdc-logo.png",
        symbol: "USDC.e",
      },
      status: 0,
      staked: true,
      earned: "3233.43",
      apr: "453",
      multiplier: "87.2",
      balance: "32.30",
      liquidity: "232",
      stake: "27",
    },
    {
      id: 4,
      token0: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/sonex-logo.png",
        symbol: "SONEX",
      },
      token1: {
        logo: "https://sonex-img.s3.ap-southeast-1.amazonaws.com/usdc-logo.png",
        symbol: "USDC.e",
      },
      status: 1,
      staked: false,
      earned: "223.1",
      apr: "222",
      multiplier: "22.22",
      balance: "272.30",
      liquidity: "26726",
      stake: "35",
    },
  ];
  const [fillterList, setFillterList] = useState<ListData[]>([]);

  useEffect(() => {
    console.log("sortBy", filter.sortBy, filter.search);
    if (filter.sortBy == "HOT") {
      filter.sortBy = "earned";
    }
    setFillterList(
      lists
        .filter((list) => {
          if (filter.staked) {
            if (list.status == filter.status && list.staked) {
              return list;
            }
          } else {
            if (list.status == filter.status) {
              return list;
            }
          }
        })
        .filter((list) => {
          if (
            list.token0.symbol
              .toLocaleLowerCase()
              .includes(filter.search.toLocaleLowerCase()) ||
            list.token1.symbol
              .toLocaleLowerCase()
              .includes(filter.search.toLocaleLowerCase())
          ) {
            return list;
          }
        })
        .sort((a: SortBy, b: SortBy) => {
          const key = filter.sortBy.toLocaleLowerCase();
          if (key in a && key in b) {
            return Number(b[key]) - Number(a[key]);
          }
          return 0;
        })
    );
  }, [filter]);

  const [selectList, setSelectList] = useState<ListData>();

  const titleContent = (data: ListData) => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AvatarGroup isBordered max={4}>
            <Avatar
              classNames={{ base: "w-[24px] h-[24px]" }}
              isBordered={false}
              src={data?.token0.logo}
            />
            <Avatar
              classNames={{ base: "w-[24px] h-[24px]" }}
              isBordered={false}
              src={data?.token1.logo}
            />
          </AvatarGroup>
          <div className="w-[180px] truncate text-[16px] font-semibold text-white">
            {data?.token0?.symbol} / {data?.token1?.symbol} {data.id}
          </div>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">Earned</div>
          <div className="w-[120px] truncate text-[16px] font-semibold text-white">
            ${data.earned}
          </div>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">APR</div>
          <div
            className="pointer-events-auto flex w-[80px] items-center gap-1 truncate text-[16px] font-semibold text-sn-blue"
            onClick={() => {
              setSelectList(data);
              setCalculatorModal(true);
            }}
          >
            <span>{data.apr}%</span>
            <Calculator className="pointer-events-none" />
          </div>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">
            Staked Liquidity
          </div>
          <div className="w-[80px] truncate text-[16px] font-semibold text-white">
            ${data.liquidity}
          </div>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">Multiplier</div>
          <Tooltip
            className="w-[244px] bg-[#273345] p-[16px]"
            showArrow={true}
            placement="right"
            content={
              <div className="text-[12px]">{`Farm's SoneX PerSecond:~0.007037 Total Multipliers: 405.3 The Farm
              Multiplier represents the proportion of SoneX rewards each farm
              receives as a proportion of its farmgroup. For example, if a lx
              farm received 1 SoneX per block, a 40x farm would receive 40 SoneX
              per block Different farm groups have different sets of
              multipliers.`}</div>
            }
          >
            <div className="flex w-[80px] items-center gap-1 truncate text-[16px] font-semibold text-white">
              <span>{data.multiplier}</span>
              <Tips />
            </div>
          </Tooltip>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">Balance</div>
          <div className="w-[80px] truncate text-[16px] font-semibold text-white">
            {data.balance} LP
          </div>
        </div>
        <div>
          <div className="text-[12px] leading-4 text-[#9CA3AF]">Staked</div>
          <div className="w-[80px] truncate  text-[16px] font-semibold text-white">
            {data.stake} LP
          </div>
        </div>
      </div>
    );
  };

  const { isConnected } = useAppKitAccount();

  const [calculatorModal, setCalculatorModal] = useState(false);

  const [harvestModal, setHarvestModal] = useState(false);

  const [stakeModal, setStakeModal] = useState(false);

  return (
    <>
      {fillterList.length ? (
        <Accordion showDivider={false} className="!px-0">
          {fillterList.map((list) => {
            return (
              <AccordionItem
                key={list.id}
                aria-label="Accordion"
                title={titleContent(list)}
                className="mt-[16px] rounded-3xl border border-[rgba(255,255,255,0.120)] bg-[#12131A] p-[24px]"
              >
                <div className="flex items-center justify-between border-t-1 border-[rgba(255,255,255,0.120)] pt-[32px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-1 text-[14px]">
                      <span>
                        Get {list.token0.symbol}-{list.token1.symbol} LP
                      </span>
                      <Browser />
                    </div>
                    <div className="flex items-center gap-1 text-[14px]">
                      <span>View Contract</span>
                      <Browser />
                    </div>
                  </div>
                  <div>
                    {isConnected ? (
                      <div className="flex items-center gap-4">
                        <Button
                          className="h-[48px] w-[200px] border border-[#273345] bg-[#191D26]"
                          onClick={() => {
                            setSelectList(list);
                            setHarvestModal(true);
                          }}
                        >
                          Harvest
                        </Button>
                        <Button
                          className="h-[48px] w-[200px] border border-[#273345] bg-[#191D26]"
                          onClick={() => {
                            setSelectList(list);
                            setStakeModal(true);
                          }}
                        >
                          Unstake
                        </Button>
                        <Button
                          color="primary"
                          className="h-[48px] w-[200px] font-semibold text-[#12131A] bg-sn-blue"
                          onClick={() => {
                            setSelectList(list);
                            setStakeModal(true);
                          }}
                        >
                          Stake LP
                        </Button>
                      </div>
                    ) : (
                      <Button
                        color="primary"
                        className="h-[48px] w-[400px] font-semibold text-[#12131A]"
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <Card
          className="mt-[24px] flex h-[126px] w-full flex-row items-center justify-between border border-[rgba(255,255,255,0.120)] bg-[#12131A] p-[24px]"
          radius="lg"
        >
          <Skeleton className="w-1/6 rounded-lg">
            <div className="h-10 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>

          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div className="flex w-1/12 flex-col gap-2">
            <Skeleton className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <div>
            <Skeleton className="flex h-12 w-12 rounded-full" />
          </div>
        </Card>
      )}

      <CalculatorModal
        selectList={selectList}
        setCalculatorModal={setCalculatorModal}
        open={calculatorModal}
      />

      <HarvestModal
        selectList={selectList}
        setHarvestModal={setHarvestModal}
        open={harvestModal}
      />

      <StakeModal
        selectList={selectList}
        setStakeModal={setStakeModal}
        open={stakeModal}
      />
    </>
  );
};

export default FarmList;
