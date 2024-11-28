"use client";

import {
  Avatar,
  AvatarGroup,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useAppKitAccount } from "@reown/appkit/react";
import { useGetPoolsMyPositions } from "@/services/api/pools";
import { RangeBar } from "@/components/RangeBar";
import ArrowDown from "@/assets/img/arrow-down.svg";

import NoData from "../../components/Nodata";

const Current = () => {
  const { address } = useAppKitAccount();

  const router = useRouter();

  const requestPoolsMyPositions = useGetPoolsMyPositions({
    address,
  });

  const myPoolsPositions = requestPoolsMyPositions.data?.positions || [];

  const columns = [
    { key: "liquidityPool", label: "Liquidity Pool" },
    { key: "status", label: "Status" },
    { key: "balance", label: "Balance" },
    { key: "totalPnL", label: "Total PnL" },
    { key: "claimableFees", label: "Claimable Fees" },
  ];

  const [myPositions, setMyPositions] = useState(myPoolsPositions);

  useEffect(() => {
    setMyPositions(myPoolsPositions);
  }, [requestPoolsMyPositions.isLoading]);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "balance",
    direction: "descending",
  });

  const sortedItems = useMemo(() => {
    return [...myPositions].sort((a, b) => {
      const first = Number(a["balance"]);
      const second = Number(b["balance"]);
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, myPositions]);

  return (
    <Table
      removeWrapper
      aria-label="positions table"
      className="min-w-[1198px]"
      sortDescriptor={sortDescriptor}
    >
      <TableHeader>
        {columns.map((list) => {
          return (
            <TableColumn
              key={list.key}
              className="h-auto cursor-pointer border-b-[1px] border-solid border-white/8 bg-transparent px-[32px] py-[16px] text-[12px] text-[#9CA3AF]"
            >
              {list.key == "balance" ? (
                <div
                  className="flex items-center gap-1"
                  onClick={() =>
                    setSortDescriptor((pre: SortDescriptor) => {
                      return {
                        column: "balance",
                        direction:
                          pre.direction == "ascending"
                            ? "descending"
                            : "ascending",
                      };
                    })
                  }
                >
                  <span>{list.label}</span>
                  <>
                    {list.key == "balance" &&
                      (sortDescriptor.direction == "descending" ? (
                        <ArrowDown />
                      ) : (
                        <ArrowDown className="rotate-180" />
                      ))}
                  </>
                </div>
              ) : (
                <span>{list.label}</span>
              )}
            </TableColumn>
          );
        })}
      </TableHeader>

      <TableBody
        items={sortedItems}
        isLoading={requestPoolsMyPositions.isLoading}
        loadingContent={<Spinner color="default" labelColor="foreground" />}
        emptyContent={<NoData />}
      >
        {(item) => (
          <TableRow
            className="cursor-pointer"
            key={item.tokenId}
            onClick={() => {
              router.push(`/pool/${item.tokenId}`);
            }}
          >
            <TableCell className="px-[32px] py-[20px]">
              <div className="flex items-center gap-2">
                <AvatarGroup isBordered max={3}>
                  <Avatar
                    classNames={{ base: "w-[24px] h-[24px]" }}
                    isBordered={false}
                    src={item?.pool?.token0?.logo}
                  />
                  <Avatar
                    classNames={{ base: "w-[24px] h-[24px]" }}
                    isBordered={false}
                    src={item?.pool?.token1?.logo}
                  />
                </AvatarGroup>
                <div className="text-[16px] font-[500]">
                  {item?.pool?.token0?.symbol} / {item?.pool?.token1?.symbol}
                </div>
                <section className="rounded-[6px] bg-[#273345] px-[6px] py-[2px] text-[12px] text-white">
                  {Number(item?.pool?.feeTier || 0) / 10000}%
                </section>
                <span className="rounded-[6px] bg-sn-section-bg-2">
                  <Image
                    src={require("@/assets/img/soneium.png")}
                    width={16}
                    height={16}
                    alt="soneium"
                  />
                </span>
              </div>
            </TableCell>
            <TableCell className="px-[32px] py-[20px]">
              <RangeBar
                className="w-[220px] justify-start gap-[12px]"
                currentTick={item.pool.tick}
                lowTick={item.tickLower}
                highTick={item.tickUpper}
                childrenClassName="w-[120px]"
              />
            </TableCell>
            <TableCell className="px-[32px] py-[20px] text-[12px]">
              ${item?.balance}
            </TableCell>
            <TableCell className="px-[32px] py-[20px] text-[12px]">
              ${item?.pnl30d}
            </TableCell>
            <TableCell className="px-[32px] py-[20px] text-[12px]">
              ${item?.claimableFees}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Current;
