"use client";
import { Button } from "@nextui-org/react";
// import { useConnectModal } from '@rainbow-me/rainbowkit'
import Null from "@/assets/img/null.svg";

export default function Disconnect() {
  // const { openConnectModal } = useConnectModal()
  const connectWallet = () => {
    // openConnectModal?.()
  };

  return (
    <div className="mx-[16px] h-auto lg:mx-0 lg:w-full">
      <div className="mt-[58px] flex flex-col items-center justify-center rounded-[16px] border-[1px] border-solid border-[#273345] py-[40px]">
        <Null />
        <section className="mt-[12px]">
          Connect your wallet to view your Pool assets.
        </section>
        <Button
          className="mt-[40px] flex h-[44px] min-w-[300px] cursor-pointer items-center justify-center gap-[8px] rounded-[12px] bg-[#59F6FD] px-[16px] text-[20px] font-[600] text-black"
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
