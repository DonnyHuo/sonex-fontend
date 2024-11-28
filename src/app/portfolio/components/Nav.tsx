"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Select, SelectItem } from "@nextui-org/react";

const Nav = () => {
  const lists = [{ key: "Liquidity", label: "Liquidity" }];
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <div className="mx-[16px] flex flex-col justify-between gap-[24px] lg:mx-0 lg:flex-row lg:items-center">
      <div className="relative flex w-[320px] items-center gap-[24px] lg:w-[420px]">
        <Link
          href={"/portfolio/myportfolio"}
          className={`text-[20px] font-medium lg:text-[30px] ${
            pathname == "/portfolio/myportfolio"
              ? " text-[#fff]"
              : "text-[#9B9B9B]"
          }`}
        >
          <span className="hidden lg:block">My Portfolio</span>
          <span className="block lg:hidden">Assets by Pool</span>
        </Link>
        <div
          // href={'/portfolio/mypoints'}
          className={`text-[20px] font-medium lg:text-[30px] ${
            pathname == "/portfolio/mypoints"
              ? " text-[#fff]"
              : "text-[#9B9B9B]"
          }`}
        >
          My Points
        </div>
        <div
          className="absolute	-top-[14px] right-0 rounded-full px-[8px] py-[4px] lg:top-0"
          style={{ background: "rgba(89, 246, 253, 0.08)" }}
        >
          <div
            className="text-[10px]"
            style={{
              background:
                "linear-gradient(90deg, #59F6FD 0%, #3EF3FF 51.5%, #FF8E5E 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coming Soon
          </div>
        </div>
      </div>
      {/* <Multiple /> */}
      {pathname == "/portfolio/myportfolio" && (
        <Select
          className="w-full rounded-xl border border-[#9B9B9B] lg:w-[240px] bg-transparent"
          selectedKeys={["Liquidity"]}
          aria-label="Liquidity"
        >
          {lists.map((list) => (
            <SelectItem key={list.key}>{list.label}</SelectItem>
          ))}
        </Select>
      )}
    </div>
  );
};
export default Nav;
