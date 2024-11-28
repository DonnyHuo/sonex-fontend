"use client";

import {
  Avatar,
  AvatarGroup,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";

import { useAppKitAccount } from "@reown/appkit/react";
import { useGetPoolsMyPositions } from "@/services/api/pools";
import { RangeBar } from "@/components/RangeBar";

import NoData from "../../components/Nodata";

const History = () => {
  const { address } = useAppKitAccount();

  const requestPoolsMyPositions = useGetPoolsMyPositions({
    address,
  });

  const myPoolsPositions = requestPoolsMyPositions.data?.positions || [];

  const columns = [
    { key: "LiquidityPool", label: "Liquidity Pool" },
    { key: "Status", label: "Status" },
    { key: "Balance", label: "Balance" },
    { key: "TotalPnL", label: "Total PnL" },
    { key: "ClaimableFees", label: "Claimable Fees" },
  ];
  return (
    <Table removeWrapper aria-label="Tokens table" className="min-w-[1198px]">
      <TableHeader>
        {columns.map((list) => {
          return (
            <TableColumn
              key={list.key}
              className="h-auto border-b-[1px] border-solid border-white/8 bg-transparent px-[32px] py-[16px] text-[12px] text-[#9CA3AF]"
            >
              {list.label}
            </TableColumn>
          );
        })}
      </TableHeader>

      <TableBody
        items={myPoolsPositions}
        isLoading={false}
        loadingContent={<Spinner color="default" labelColor="foreground" />}
        emptyContent={<NoData />}
      >
        {(item) => (
          <TableRow key={item.tokenId}>
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

export default History;
