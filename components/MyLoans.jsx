import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { parseEther } from 'viem';
import { useAccount} from 'wagmi';
import { useAccount as useAccountSTRK } from '@starknet-react/core';
import { Contract } from 'starknet';
import { Address } from 'viem';

import contractAbi from '../abis/abi.json'
const contractAddress = "0x05f761ae8fb3207e8f676ebf4b12e1b15459439e704a88bca6aa64f81a2cf36c"


const  MyLoans = () => {


  const { account: addressSTRK } = useAccountSTRK();


//  console.log( nftTknId, paybackDuration, apr, loanAmount, addressSTRK , typeof(addressSTRK), addressSTRK, liquidationThreshold, firstHalf, secondHalf);
  const pay = async() => {
    try{
      const contract = new Contract(contractAbi, contractAddress, addressSTRK)
      await contract.invoke("pay",[])
      alert("Lended Nft")
    }
    catch(error) {
      console.log(error.message)
    }
}

  return (
    <div>
      <div className=' pb-5'>
  <div className="sm:hidden">
    <label htmlFor="Tab" className="sr-only">Tab</label>

    <select id="Tab" className="w-full rounded-md border-gray-200">
      <option>Your Nfts</option>
      <option>Your Loans</option>
    </select>
  </div>

  <div className="hidden sm:block">
    <div className="border-b border-white">
      <nav className="-mb-px flex gap-6">
        <a
          href="/yourLoans"
          className="shrink-0 rounded-t-lg border bg-white bg-opacity-10 border-gray-300 border-b-white p-3 text-sm font-medium text-blue-500"
        >
          Yours Loans
        </a>

        <a
          href="/profile"
          className="shrink-0 border border-transparent p-3 text-sm font-medium text-white hover:text-blue-500"
        >
          Your Nfts
        </a>

      </nav>
    </div>
  </div>
</div>
      <div className=' flex gap-6 justify-center '>
      <div className=' grid-rows-2 grid-cols-2 grid gap-7'>
              <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://i.seadn.io/s/raw/files/96072e769db75251e413b92e9e0308f6.png?auto=format&dpr=1&w=1000'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105 " />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${4 > 4 ? 'text-yellow-500' : 4 > 1 ? 'text-blue-500' : 4 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {4 > 4 ? 'Gem' : 4 > 1 ? 'Solid' : 4 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">Elemental #12371 </p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${4 > 4 ? 'bg-yellow-500' : 4 > 1 ? 'bg-blue-500' : 4 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${4} USDT`}</span>
                  </span>
                  <button type="button" onClick={pay} className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Pay Loan</button>
                </div>
              </div>

              <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://i.seadn.io/gae/xZmFOKmy-XBocr_F7XiuEVNvdFj4YtFTBkcxws7iJqz3tN3ypnfe-_mpUBpciGBVAHzHvgYzfaf-SxXXgMDN1bowMDDZHKNf4JE1?auto=format&dpr=1&w=1000'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105" />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${0.5 > 4 ? 'text-yellow-500' : 0.5 > 1 ? 'text-blue-500' : 0.5 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {0.5 > 4 ? 'Gem' : 0.5 > 1 ? 'Solid' : 0.5 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">The Turks #3960</p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${0.5 > 4 ? 'bg-yellow-500' : 0.5 > 1 ? 'bg-blue-500' : 0.5 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${0.5} USDT`}</span>
                  </span>
                  <button type="button" onClick={pay} className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Pay Loan</button>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MyLoans;
