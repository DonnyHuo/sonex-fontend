"use client";

import { ReactNode } from "react";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum, soneiumMinato } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "736a7b78330e35e8dd301d3460cd86b2";

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [soneiumMinato],
  projectId,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  allWallets: "HIDE",
});

function ContextProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default ContextProvider;
