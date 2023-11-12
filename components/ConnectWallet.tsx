"use client"
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, Connector } from "@starknet-react/core";
import { motion } from "framer-motion";
import Image from "next/image";

const ConnectWallet = () => {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();
    const [isDisconnectHovered, setIsDisconnectHovered] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
  
  return (
    <div>
        <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" w-[220px]"
    >
      {isConnected ? (
        <motion.button
        className={`flex items-center gap-2 bg-white ml-auto hover:text-red-500 duration-200 ease-in font-bold backdrop-blur-[8px] text-black px-3 py-2 max-md:scale-95 text-md min-w-[180px] rounded-[10px]`}
        onClick={() => disconnect()}
        onHoverStart={() => setIsDisconnectHovered(true)}
        onHoverEnd={() => setIsDisconnectHovered(false)}
      >
        <Image
          src={'/SN.svg'}
          width={20}
          height={30}
          alt="Starknet Logo"
        />
        {isDisconnectHovered ? 'Disconnect' : `${address?.slice(0, 5)}...${address?.slice(60, 66)}`}
      </motion.button>
      ) : (
      <motion.button
        className="block ml-auto bg-[#0e76fd] font-bold hover:scale-[1.03] duration-200  backdrop-blur-[8px] text-white  px-3 py-2 max-md:scale-95 text-md min-w-[180px] rounded-[10px]"
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03}}
      >
        Connect to Starknet
      </motion.button>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-[#22232E] w-full rounded-3xl border border-[#2E3041] mx-6 p-6 pb-8 text-center text-white max-w-[380px]">
            <div className=" flex flex-col">  
              <div className="flex items-center justify-center flex-col mb-2 relative">
                <div className=" flex flex-col font-semibold">
                  <div className=" text-gray-400 text-sm">
                    Connect to
                  </div>
                  <div className=" text-xl mb-6 
                  max-w-[240px] overflow-hidden 
                  whitespace-nowrap text-ellipsis">
                    Piggylet
                  </div>
                </div>
                <span onClick={closeModal} className="absolute top-0 right-0 p-2 cursor-pointer
                  rounded-full bg-[#2E3041] hover:bg-[#2E3041]/60"> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>

            </div>

            <button
              className='flex flex-row w-full justify-between items-center 
              p-3 rounded-md cursor-pointer mb-4 
              bg-[#2E3041] hover:bg-[#2E3041]/60'
              onClick={() => {
                connect({ connector: connectors[0] });
                setIsOpen(!isOpen);
                setIsDisconnectHovered(false);
              }}
            >
              <Image
                src={'/argent.svg'}
                width={24}
                height={24}
                alt="connector logo"
              />
              <div className=" capitalize">
              Argent X
              </div>
              <span className=" w-8 h-8"></span>
            </button>
            <button
              className='flex flex-row w-full justify-between items-center 
              p-3 rounded-md cursor-pointer 
              bg-[#2E3041] hover:bg-[#2E3041]/60'
              onClick={() => {
                connect({ connector: connectors[1] });
                setIsOpen(!isOpen);
                setIsDisconnectHovered(false);
              }}
            >
              <Image
                src={'/braavos.svg'}
                width={24}
                height={24}
                alt="connector logo"
              />
              <div className=" capitalize">
              {connectors[1].id}
              </div>
              <span className=" w-8 h-8"></span>
            </button>
            </div>
        </div>
      )}

    </motion.nav>
    </div>
  )
}

export default ConnectWallet