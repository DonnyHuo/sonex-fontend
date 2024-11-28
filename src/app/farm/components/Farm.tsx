"use client";

import {
  Input,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { useState } from "react";

import { Key } from "@react-types/shared";
import LearnHow from "@/assets/img/learn-how.svg";
import SearchIcon from "@/assets/img/search.svg";

import FarmList from "./FarmList";
import styles from "./styles.module.css";

const Farm = () => {
  const animals = [
    { key: "HOT", label: "Hot" },
    { key: "APR", label: "APR" },
    { key: "Liquidity", label: "Liquidity" },
    { key: "Multiplier", label: "Multiplier" },
  ];

  const [status, setStatus] = useState(0);

  const [staked, setStaked] = useState(false);

  const changeTabs = (data: Key) => {
    setStatus(Number(data.toString().split(".")[1]));
  };
  const changeSwitch = (data: any) => {
    setStaked(data);
  };

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("HOT");

  const changeSelect = (val: { target: { value: string } }) => {
    setSortBy(val.target.value);
  };

  return (
    <div className="m-auto max-w-[1200px]">
      <div className="mt-[48px] text-[30px] font-medium">Earn from LP</div>
      <div className="mt-[8px] text-[16px] font-medium text-[#9CA3AF]">
        Liquidity Pools & Farms
      </div>
      <div className="mt-[8px] flex items-center gap-1">
        <span className="text-[14px] text-sn-blue">Learn How</span>
        <LearnHow />
      </div>
      <div className="mt-[40px] flex items-center justify-between">
        <div className="flex items-center gap-[32px]">
          <Tabs
            className={styles.tabs}
            onSelectionChange={(data) => changeTabs(data)}
          >
            <Tab title="Live" className="text-[16px]"></Tab>
            <Tab title="Finished" className="text-[16px]"></Tab>
          </Tabs>
          <Switch
            size="sm"
            aria-label="Automatic updates"
            onValueChange={changeSwitch}
          >
            <span className="text-[16px]">⚡Staked Only</span>
          </Switch>
        </div>
        <div className="flex items-center gap-[16px]">
          <Select
            defaultSelectedKeys={["HOT"]}
            selectedKeys={[sortBy]}
            className="w-[200px] rounded-xl border border-[rgba(255,255,255,0.120)] backdrop-blur-xl"
            onChange={changeSelect}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Input
            label=""
            placeholder="Search Farm"
            labelPlacement="outside"
            className="rounded-xl border border-[rgba(255,255,255,0.120)] backdrop-opacity-30"
            startContent={<SearchIcon />}
            onChange={(val) => setSearch(val.target.value)}
          />
        </div>
      </div>
      <FarmList filter={{ status, staked, sortBy: sortBy, search }} />
    </div>
  );
};

export default Farm;
