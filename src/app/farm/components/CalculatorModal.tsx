import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";

import Close from "@/assets/img/modal-close.svg";
import Tips from "@/assets/img/tips-big.svg";

import { ListData } from "./FarmList";
import styles from "./styles.module.css";

const CalculatorModel = (props: {
  selectList: ListData | undefined;
  setCalculatorModal: any;
  open: boolean;
}) => {
  const { selectList, setCalculatorModal, open } = props;
  const onClose = () => {
    setCalculatorModal(false);
  };

  const [timeList, setTimeList] = useState([
    {
      id: 1,
      value: "1D",
      active: true,
    },
    {
      id: 2,
      value: "7D",
    },
    {
      id: 3,
      value: "30D",
    },
    {
      id: 4,
      value: "1Y",
    },
    {
      id: 5,
      value: "5Y",
    },
  ]);
  const changeActive = (id: number) => {
    const newTimeList = timeList.map((list) => {
      if (list.id == id) {
        list.active = true;
      } else {
        list.active = false;
      }
      return list;
    });

    setTimeList(newTimeList);
  };
  return (
    <Modal isOpen={open} onClose={onClose} hideCloseButton={true}>
      <ModalContent className="bg-[#1B1B1B]">
        <ModalHeader className="flex items-center justify-between py-[12px] pt-[24px]">
          <span>ROl Calculator</span>
          <span className="cursor-pointer" onClick={onClose}>
            <Close />
          </span>
        </ModalHeader>
        <ModalBody className="p-[24px]">
          <Input
            endContent={
              <div className="w-[160px] text-[12px]">
                {selectList?.token0.symbol}-{selectList?.token1.symbol} LP
              </div>
            }
            size="lg"
            placeholder="0 USD"
            labelPlacement="outside"
            label=""
            className={styles.inputBox}
          />
          <div className="mt-[8px] flex items-center justify-between">
            <Button className="h-[24px] w-[116px]">$100</Button>
            <Button className="h-[24px] w-[116px]">$1000</Button>
            <div className="flex items-center gap-1">
              <Button className="h-[24px] w-[116px]">My Blance</Button>
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
                <div>
                  <Tips />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="mt-[16px]">
            <div className="text-[16px]">Staked for</div>
            <div className="mt-[8px]  flex items-center justify-between">
              {timeList.map((list) => {
                return (
                  <div
                    key={list.id}
                    className={`${
                      list.active && "bg-[#273345]"
                    } h-[32px] w-[20%] cursor-pointer rounded-lg text-center leading-8`}
                    onClick={() => changeActive(list.id)}
                  >
                    {list.value}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-[16px] flex items-center justify-between rounded-xl bg-[#12131A] px-[16px] py-[12px] text-[14px]">
            <span className="text-[#86868B]">ROl at current rates</span>
            <span className="text-white">$99.00 (999.00%)</span>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CalculatorModel;
