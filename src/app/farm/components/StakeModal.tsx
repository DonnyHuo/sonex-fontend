import {
  Avatar,
  AvatarGroup,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import Close from "@/assets/img/modal-close.svg";
import GetLp from "@/assets/img/get-lp.svg";
import More from "@/assets/img/more.svg";

import { ListData } from "./FarmList";
import styles from "./styles.module.css";

const Stake = (props: {
  selectList: ListData | undefined;
  open: boolean;
  setStakeModal: any;
}) => {
  const { selectList, setStakeModal, open } = props;
  const onClose = () => {
    setStakeModal(false);
  };

  const lists = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];
  return (
    <Modal isOpen={open} onClose={onClose} hideCloseButton={true}>
      <ModalContent className="bg-[#1B1B1B]">
        <ModalHeader className="flex items-center justify-between py-[12px] pt-[24px]">
          <span>Stake LP Token</span>
          <span className="cursor-pointer" onClick={onClose}>
            <Close />
          </span>
        </ModalHeader>
        <ModalBody className="gap-0 p-[24px] pt-[12px]">
          <div className="mb-[8px] text-[12px] text-[#F3F4F6]">5 Active</div>
          <div className="flex max-h-[300px] flex-col gap-1 overflow-auto">
            {lists.map((list) => {
              return (
                <div
                  key={list.id}
                  className={`rounded-xl border border-[#273345] bg-[#191D26] p-[12px] ${styles.size}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <AvatarGroup isBordered max={4}>
                        <Avatar
                          classNames={{ base: "w-[24px] h-[24px]" }}
                          isBordered={false}
                          src={selectList?.token0.logo}
                        />
                        <Avatar
                          classNames={{ base: "w-[24px] h-[24px]" }}
                          isBordered={false}
                          src={selectList?.token1.logo}
                        />
                      </AvatarGroup>
                      <div className="text-[14px] font-semibold text-white">
                        {selectList?.token0?.symbol} /{" "}
                        {selectList?.token1?.symbol}
                      </div>
                    </div>
                    <Button className="h-[24px] w-[64px] rounded-md bg-[#59F6FD] text-[#12131A]">
                      Stake
                    </Button>
                  </div>

                  <div className="mt-[16px] text-[12px] text-[#9CA3AF]">
                    Min 526.571/ Max 582.065 of USDT per SONEX- $35.45
                    (18.160671 USDT/ 0.031150 BNB)
                  </div>
                </div>
              );
            })}
          </div>

          <div className="my-[8px] flex cursor-pointer items-center justify-center">
            <More />
          </div>

          <div className="flex cursor-pointer items-center justify-center gap-1 text-[14px] text-[#59F6FD]">
            <span>Get SoneX-USDT LP</span>
            <GetLp />
          </div>

          {/* <div className='mt-[24px] flex items-center justify-between'>
            <Button
              className='h-[48px] w-[190px] border border-[#273345] bg-[#191D26]'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className='h-[48px] w-[190px] border border-[#273345] bg-[#59F6FD] font-semibold text-[#12131A]'
              onClick={onClose}
            >
              Comfirm
            </Button>
          </div> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Stake;
