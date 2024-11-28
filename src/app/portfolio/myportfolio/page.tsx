"use client";

import { useAppKitAccount } from "@reown/appkit/react";

import Assets from "../../portfolio/myportfolio/Assets";
import Positions from "../../portfolio/myportfolio/Positions";
import Disconnect from "../components/Disconnect";

const Myportfolio = () => {
  const { address } = useAppKitAccount();
  return (
    <>
      {address ? (
        <>
          <Assets />
          <Positions />
        </>
      ) : (
        <Disconnect />
      )}
    </>
  );
};
export default Myportfolio;
