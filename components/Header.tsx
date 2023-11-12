"use client"
import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Header = () => {
    const [show, setShow] = useState(false);

  return (
    <div>
      <div className=" w-full ">
        <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4">
          {/* For large and Medium-sized Screen */}
          <div className="flex justify-between ">
            <Link href={'/'} className="">
                <Image
                    src={'/piggylet.png'}
                    width={220}
                    height={72}
                    alt="Piggylet Logo"
                />
            </Link>
            <div className='hidden sm:flex min-w-[500px] my-auto gap-4'>
                <ConnectWallet/>
                <ConnectButton label="Connect to Ethereum" />

                <Link href={'/profile'} className="bg-[#0e76fd] hover:scale-105 duration-200 ease-linear p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </Link>
            </div>

            {/* Burger Icon */}
            <div
              id="bgIcon"
              onClick={() => setShow(!show)}
              className={`focus:outline-none my-auto max-md:fixed right-5 bg-[#3E6957]/30 hover:bg-[#3E6957]/60 duration-300 ease-in focus:ring-2 focus:ring-offset-2 p-2 rounded-lg focus:ring-[#133629]  justify-center items-center sm:hidden cursor-pointer`}
            >
              <svg
                className={`${show ? 'hidden' : ''}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="transform duration-150"
                  d="M4 6H20"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="transform duration-150"
                  d="M4 18H20"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className={`${show ? 'block' : 'hidden'}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* Mobile and small-screen devices (toggle Menu) */}
          <div
            id="MobileNavigation"
            className={`${show ? 'block' : 'hidden'} sm:hidden mt-[1rem] fixed w-[90vw] mx-auto`}
          >
            <div className=' w-full flex justify-center'>
              <div className=' flex flex-col w-full animate-fade text-center'>
                    <Link href={'/Lp'} className="inline-block rounded-l-lg p-[2px]  focus:outline-none  active:text-opacity-75">
                      <span className="block rounded-lg border border-current bg-[#3E6957]/30 hover:bg-[#3E6957]/60 duration-300 ease-in backdrop-blur-[8px] text-[#133629] px-8 py-3 text-sm ">Lp</span>
                    </Link>
                    <Link href={'/Airdrop'} className="inline-block p-[2px]  focus:outline-none  active:text-opacity-75">
                      <span className="block border rounded-lg border-current bg-[#3E6957]/30 hover:bg-[#3E6957]/60 duration-300 ease-in backdrop-blur-[8px] text-[#133629] px-8 py-3 text-sm ">Airdrop</span>
                    </Link>
                    <Link href={'/Earn'} className="inline-block p-[2px]  focus:outline-none  active:text-opacity-75">
                      <span className="block rounded-lg border border-current bg-[#3E6957]/30 hover:bg-[#3E6957]/60 duration-300 ease-in backdrop-blur-[8px] text-[#133629] px-8 py-3 text-sm ">Earn</span>
                    </Link>
                    <ConnectButton label='Connect to Ethereum'/>
                    <ConnectWallet/>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header