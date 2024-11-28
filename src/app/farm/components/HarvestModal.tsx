import {
  Avatar,
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

const Harvest = (props: {
  selectList: ListData | undefined;
  open: boolean;
  setHarvestModal: any;
}) => {
  const { selectList, setHarvestModal, open } = props;
  const onClose = () => {
    setHarvestModal(false);
  };
  return (
    <Modal isOpen={open} onClose={onClose} hideCloseButton={true}>
      <ModalContent className="bg-[#1B1B1B]">
        <ModalHeader className="flex items-center justify-between py-[12px] pt-[24px]">
          <span>Harvest</span>
          <span className="cursor-pointer" onClick={onClose}>
            <Close />
          </span>
        </ModalHeader>
        <ModalBody className="gap-0 p-[24px] pt-[12px]">
          <div className="mb-[8px] text-[14px]">Harvest balance</div>
          <div className="flex flex-col gap-[14px] rounded-xl bg-[#191D26] px-[16px] py-[12px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar
                  classNames={{ base: "w-[24px] h-[24px]" }}
                  isBordered={false}
                  src={selectList?.token0.logo}
                />
                <span className="text-[14px] text-[#D1D5DB]">
                  {selectList?.token0?.symbol}
                </span>
              </div>
              <div className="text-[14px] text-white">616.1566</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar
                  classNames={{ base: "w-[24px] h-[24px]" }}
                  isBordered={false}
                  src={selectList?.token1.logo}
                />
                <span className="text-[14px] text-[#D1D5DB]">
                  {selectList?.token1?.symbol}
                </span>
              </div>
              <div className="text-[14px] text-white">616.1566</div>
            </div>
          </div>

          <div className="mt-[24px] flex items-center justify-between">
            <Button
              className="h-[48px] w-[190px] border border-[#273345] bg-[#191D26]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="h-[48px] w-[190px] border border-[#273345] bg-[#59F6FD] font-semibold text-[#12131A]"
              onClick={onClose}
            >
              Comfirm
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Harvest;
