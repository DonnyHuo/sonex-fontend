"use client";

import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { Button } from "@nextui-org/react";
import { displayAddress } from "@/utils";

import Logo from "../assets/img/logo/logo-white-text.svg";
import Nav from "./nav";

const Header = () => {
  const { open } = useAppKit();
  const { address, isConnected, caipAddress, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  console.log("status", status);
  return (
    <div className="w-full px-[24px] h-[64px] bg-sn-section-bg flex items-center justify-between">
      <div className="flex items-center">
        <Logo className="w-[134px] h-[38px]" />
        <Nav />
      </div>
      <div className="flex h-[40px] items-center justify-between gap-2 rounded-full border border-white/0 bg-[#1A1B1F] px-2 hover:cursor-pointer hover:opacity-85">
        {isConnected ? (
          <div
            className="text-[14px] px-[6px] text-white"
            onClick={() => open({ view: "Account" })}
          >
            <span></span>
            <span className="">{displayAddress(address ?? "")}</span>
          </div>
        ) : (
          <Button color="primary" onClick={() => open({ view: "Connect" })}>
            Connect wallet
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
