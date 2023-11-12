import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { parseEther } from 'viem';
import { useAccount} from 'wagmi';
import { useAccount as useAccountSTRK } from '@starknet-react/core';
import { Contract } from 'starknet';
import { Address } from 'viem';

import contractAbi from '../abis/abi.json'
const contractAddress = "0x002e3c885d6ccd749ab191b9df59329df95e5525e0e04879287d5a0e6cb339eb"


const NFTPage = () => {
  const [nfts, setNFTs] = useState([]);
  const prices = [0.05, 2, 2000000, 50000000];
  const [isOpen, setIsOpen] = useState(false);
  const loanValue = 90;
  const liqudationPenalty= 5;
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



  const { address: addressSTRK } = useAccountSTRK();
  const { address } = useAccount();
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [apr, setApr] = useState('');
  const [paybackDuration, setPaybackDuration] = useState('');
  const [nftTknId , setNftTknId] = useState('')
  const [nftCntrct , setNftCntrct] = useState('')
  const [firstHalf, setFirstHalf] = useState('');
  const [secondHalf, setSecondHalf] = useState('');
  const usdtAddres = '0x03aD7E497F93B29DA585A5ec71088586af000d1792677B3ec15AA1C3cf0cbBED'
  const repaymentDuration =
    loanAmount &&
    apr &&
    paybackDuration &&
    ((apr / 365) * paybackDuration * loanAmount + parseFloat(loanAmount)).toFixed(2);

  const liquidationThreshold =
    loanAmount &&
    (loanAmount / 20 + parseInt(loanAmount));

  const setInformations = (contractAddress, tokenId) => {
      setNftCntrct(contractAddress);
      setNftTknId(tokenId);
  
      splitAndSetStates(contractAddress);
    };
  
  const splitAndSetStates = (value) => {
      if (value.length > 0) {
        const halfLength = Math.ceil(value.length / 2);
        const firstHalf = value.slice(0, halfLength);
        const secondHalf = value.slice(halfLength);
  
        setFirstHalf(firstHalf);
        setSecondHalf(secondHalf);
      }
    };

  



  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };
  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };
  const handleAprChange = (e) => {
    setApr(e.target.value);
  };
  const handlePaybackDurationChange = (e) => {
    setPaybackDuration(e.target.value);
  };


  const {write,isSuccess,isLoading,isError} = useContractWrite({
    address: '0xCC7Db96eF49d77f1E20d3353D361b13f582ceB6C',
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
      value:parseEther("0"),
    functionName: 'setApprovalForAll',       
  })
  
  const {write: writeForStake,data:writeForData,isSuccess:successForData} = useContractWrite({
      address:'0x8f1C11aeaE993b28768bcda1163a29642C914c40',
      abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_nftContract",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_nftTokenId",
              "type": "uint256"
            }
          ],
          "name": "lendNft",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
      ],
      functionName: "lendNft",
      value:parseEther("0")
  })


//  console.log( nftTknId, paybackDuration, apr, loanAmount, addressSTRK , typeof(addressSTRK), addressSTRK, liquidationThreshold, firstHalf, secondHalf);
  const set_offer = async() => {
    try{
      const contract = new Contract(contractAbi, contractAddress, addressSTRK)
      await contract.invoke("set_offer")
      alert("Lended Nft")
    }
    catch(error) {
      console.log(error.message)
    }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://eth-goerli.g.alchemy.com/nft/v3/alcht_CioxKYNjPw5RMnrXeKwyA40q5GjM17/getNFTsForOwner/?owner=0xAce58a61386588a24795b553e92694Fe23209c6b&pageSize=5'
        );
        const data = await response.json();
        let currentIndex = 0;
        const nftsWithPrice = data.ownedNfts.map((nft) => ({
          ...nft,
          price: prices[currentIndex++ % prices.length] || 0,
        }));
        setNFTs(nftsWithPrice);
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(nfts);
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
          href="#"
          className="shrink-0 border border-transparent p-3 text-sm font-medium text-white hover:text-blue-500"
        >
          Yours Loans
        </a>

        <a
          href="#"
          className="shrink-0 rounded-t-lg border bg-white bg-opacity-10 border-gray-300 border-b-white p-3 text-sm font-medium text-blue-500"
        >
          Your Nfts
        </a>

      </nav>
    </div>
  </div>
</div>
      <div className=' flex gap-6 '>
        {nfts.map((nft) => (
          <div className=' flex flex-col cursor-pointer' onClick={() => setInformations(nft.contract.address, nft.tokenId)}  key={nft.id}>
                <div className=' flex flex-col  justify-center max-h-[400px]'>
                <a href={nft.href} key={nft.id} className="col-span-1 group relative p-2 pb-5 flex flex-col items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
              {/* ::Image */}
              <div className="relative max-h-64 rounded-2xl overflow-hidden">
                <img src={nft.image.originalUrl} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105" />
                {/* :::time left */}
                <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${nft.price > 4 ? 'text-yellow-500' : nft.price > 1 ? 'text-blue-500' : nft.price > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                {nft.price > 4 ? 'Gem' : nft.price > 1 ? 'Solid' : nft.price > 0.4 ? 'Greenlight' : 'Greenlight'}
                </span>
              </div>
              {/* :: */}
              <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                {/* :::name */}
                <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">{nft.name || 'Ape'} </p>
                {/* :::author */}
                <p className="flex items-center">
                  <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${nft.price > 4 ? 'bg-yellow-500' : nft.price > 1 ? 'bg-blue-500' : nft.price > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                  </span>
                </p>
                {/* :::bid infos */}
                <span className="flex justify-between items-center">
                  <span className="mr-4 text-sm text-white font-semibold">{`${nft.price} USDT`}</span>
                  <button type="button" className="relative inline-flex items-center px-2.5 py-1.5 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-xs text-white font-bold tracking-wide hover:to-blue-600" onClick={openModal}>Create Loan</button>
                </span>
              </div>
            </a>
                      {isOpen && (
                        <div className="fixed inset-0 z-50 overflow-auto bg-black/25 backdrop-blur-sm flex justify-center items-center">
                          <div className="bg-[#22232E] w-full rounded-3xl min-w-[90vw] max-w-[1460px] min-h-[80vh] border border-[#2E3041] mx-6 p-6 pb-8 text-center text-white ">
                            <div className="flex items-center justify-center flex-col mb-2 relative">
                              <div className=" flex flex-col font-semibold">
                                <div className=" text-xl mb-6 
                                overflow-hidden 
                                whitespace-nowrap text-ellipsis">
                                  Create Loan Request
                                </div>
                              </div>
                              <span onClick={closeModal} className="absolute top-0 right-0 p-2 cursor-pointer
                                rounded-full bg-[#2E3041] hover:bg-[#2E3041]/60"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </span>
                            </div>
                            <div className=' flex gap-4'>
                              <div className=' border border-[#2E3041] border-t-amber-400 max-w-[25%] h-full '>
                                <div className=''>
                                  <div className=' font-bold text-xl pt-2'> GEM Classifications </div>
                                  <div className=' text-start py-4 border-b-4 border-[#2E3041] mx-4'> 
                                    <div className=' flex justify-between font-light text-gray-300'>Max Loan Amount: <span className=' font-medium text-white'>{nft.price / 100 * loanValue} USDT</span> </div>
                                    <div className=' flex justify-between font-light text-gray-300'>Max Liquidation Threshold: <span className=' text-white font-medium whitespace-pre my-auto'>{(nft.price / 100 * loanValue) / 100 * 105} USDT</span></div>
                                  </div>
                                </div>
                                <div className=' text-start mx-4 my-4'>
                                  <div className=' font-bold text-lg'>
                                    NFT Classification
                                  </div>
                                  <div className=' text-gray-300'>
                                    NFTs have unique market conditions, and they require tailored financing terms. Piggylet classifies NFTs and customizes term frames to proivde the best NFT-backed lending experience.
                                  </div>
                                  <div className=' text-start py-4 '> 
                                    <div className=' flex justify-between font-light text-gray-300'>Loan to Value <span className=' font-medium text-white'>{loanValue}% </span> </div>
                                    <div className=' flex justify-between font-light text-gray-300'>Max Liquidation Penalty  <span className=' text-white font-medium whitespace-pre my-auto'>5%</span></div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className=' flex flex-col gap-4'>
                                  <p className=' font-bold text-lg '>Push Nft To Layer 1</p>
                                  <div className=' flex gap-20'>
                                    <button onClick={() => write({ args: ['0x8f1C11aeaE993b28768bcda1163a29642C914c40', true]})} className="block ml-auto bg-[#0e76fd] font-bold hover:scale-[1.03] duration-200  backdrop-blur-[8px] text-white  px-3 py-2 max-md:scale-95 text-md min-w-[180px] rounded-[10px]">
                                      {isLoading && 'Approving...'}
                                      {!isLoading && isSuccess && 'Approved'}
                                      {!isLoading && !isSuccess && 'Approve'}
                                    </button>
                                    <button onClick={() => writeForStake({ args: [ nft.contract.address, nft.tokenId]})} className="block ml-auto bg-[#0e76fd] font-bold hover:scale-[1.03] duration-200  backdrop-blur-[8px] text-white  px-3 py-2 max-md:scale-95 text-md min-w-[180px] rounded-[10px]">
                                      {successForData && 'Sended'}
                                      {!successForData && 'Send the Nft'}
                                    </button>
                                  </div>
                                </div>
                                <div className=' text-start gap-4 flex flex-col mt-10'>
                                  <p className=' text-center font-bold text-lg'>Push Details To Starknet</p>
                                  <div>
                                    <label htmlFor="loanAmount" className="block text-sm text-start font-medium text-white">
                                      Enter Loan Amount
                                    </label>

                                    <input
                                      type="number"
                                      id="loanAmount"
                                      value={loanAmount}
                                      onChange={handleLoanAmountChange}
                                      placeholder="Enter Amount"
                                      className="mt-1 w-full rounded-md p-1 border-gray-200 shadow-sm text-black sm:text-sm"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label for="PaymentToken" class="block text-sm font-medium text-white">
                                      Payment Token
                                    </label>

                                    <select
                                      name="Payment Tokent"
                                      id="Payment Token"
                                      value={selectedToken}
                                      onChange={handleTokenChange}
                                      class="mt-1.5 w-full rounded-md border-gray-300 py-1 text-gray-700 sm:text-sm"
                                    >
                                      <option value="">Select Token</option>
                                      <option value="USDT">USDT</option>
                                      <option value="ETH">Ethereum</option>
                                      <option value="DAI">Dai</option>
                                      <option value="STRK"> Stark :)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label htmlFor="APR" className="block text-md font-medium text-white">
                                      APR
                                    </label>

                                    <input
                                      type="number"
                                      id="APR"
                                      value={apr}
                                      onChange={handleAprChange}
                                      placeholder="Enter APR"
                                      className="mt-1 w-full rounded-md p-1 border-gray-200 shadow-sm text-black sm:text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="PaybackDuration" className="block text-md font-medium text-white">
                                      Payback Duration
                                    </label>

                                    <input
                                      type="number"
                                      id="PaybackDuration"
                                      value={paybackDuration}
                                      onChange={handlePaybackDurationChange}
                                      placeholder="Enter Payback Duration"
                                      className="mt-1 w-full rounded-md p-1 border-gray-200 shadow-sm text-black sm:text-sm"
                                    />
                                  </div>
                                  <p>Entered Amount: {liquidationThreshold} {selectedToken} </p>
                                  <button onClick={set_offer} className="block ml-auto bg-[#0e76fd] font-bold hover:scale-[1.03] duration-200  backdrop-blur-[8px] text-white  px-3 py-2 max-md:scale-95 text-md min-w-[180px] rounded-[10px]">
                                      Create Loan
                                  </button>
                                </div>
                                
                              </div>
                              <div>
                              </div>
                            </div>
                            </div>

                        </div>
                      )}
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTPage;
