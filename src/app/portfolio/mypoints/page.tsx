"use client";
import { useAppKitAccount } from "@reown/appkit/react";

import Positions from "../../portfolio/mypoints/Positions";
import Assets from "../../portfolio/myportfolio/Assets";
import Disconnect from "../components/Disconnect";

const Mypoints = () => {
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
export default Mypoints;
