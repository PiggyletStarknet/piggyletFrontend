import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';

import { publicProvider } from '@starknet-react/core';
import contractAbi from '../abis/abi.json'
import { Contract  } from 'starknet';
import { useAccount as useAccountSTRK } from '@starknet-react/core';

const Home: NextPage = () => {
  const contractAddress = "0x414c3037d59c01a3580c54428ff28cca2ce7c75f5c3189442b7810ebe579d1f"
  const { account: addressSTRK } = useAccountSTRK();
  const set_start = async() => {
    try{
      const contract = new Contract(contractAbi, contractAddress, addressSTRK  )
      await contract.invoke("set_start",[])

      alert("Lended Nft")
    }
    catch(error) {
      console.log('error')
    }
}
  
  return (
    <div className=' bg-[#141416] w-screen h-screen '>
      <Head>
        <title>Piggylet</title>
        <meta
          content="Piggylet"
          name="Piggylet"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className='2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4'>
            <Header/>
        <div>
          <div className=' text-xl font-bold text-white text-center py-5'>
            Listed NFT's
          </div>
          <div className=' grid-rows-2 grid-cols-2 grid gap-7'>
            <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://ipfs.io/ipfs/QmeS6jUwUyKjNCvn4HfS81b7RWG1aQcuu8eG5EYU6GDLjA/hoc-images/80-Colser-Drive.png'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105" />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${10000 > 4 ? 'text-yellow-500' : 1000 > 1 ? 'text-blue-500' : 1000 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {1000 > 4 ? 'Gem' : 1000 > 1 ? 'Solid' : 1000 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">{'80 Colser Dr, Covington, GA 30016'} </p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${1000 > 4 ? 'bg-yellow-500' : 1000 > 1 ? 'bg-blue-500' : 1000 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${100000} USDT`}</span>
                  </span>
                  <button type="button" onClick={set_start} className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Give Loan</button>
                </div>
              </div>
              <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://i.seadn.io/s/raw/files/e6da8d4c1cf116bd8ac9779e9ac2aaaa.png?auto=format&dpr=1&w=1000'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105 " />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${4 > 4 ? 'text-yellow-500' : 4 > 1 ? 'text-blue-500' : 4 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {4 > 4 ? 'Gem' : 4 > 1 ? 'Solid' : 4 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">Azuki #2048 </p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${4 > 4 ? 'bg-yellow-500' : 4 > 1 ? 'bg-blue-500' : 4 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${4} USDT`}</span>
                  </span>
                  <button type="button" className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Give Loan</button>
                </div>
              </div>
              <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://i.seadn.io/gcs/files/f95d769f05785762720aecc5163e68e2.png?auto=format&dpr=1&w=1000'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105" />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${10000 > 4 ? 'text-yellow-500' : 1000 > 1 ? 'text-blue-500' : 1000 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {1000 > 4 ? 'Gem' : 1000 > 1 ? 'Solid' : 1000 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]"> 1280 Cols, LA 30016 </p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${1000 > 4 ? 'bg-yellow-500' : 1000 > 1 ? 'bg-blue-500' : 1000 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${2000} USDT`}</span>
                  </span>
                  <button type="button" className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Give Loan</button>
                </div>
              </div>
              <div className="col-span-1 group relative p-2 pb-5 flex items-center border-2 border-transparent rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm hover:shadow-xl hover:border-blue-500">
                {/* ::Image */}
                <div className="relative max-h-64 rounded-2xl overflow-hidden  max-w-[300px]">
                  <img src={'https://i.seadn.io/gae/t4gsWmagRD6mrONdRS3rUAtVpKjavolkGnIlqnjQ8Vy047r4GDH3eP20SqMqhRBlKMKsxcJ30uYBW8b245Usw4uRAJAa1hisbPxfUEA?auto=format&dpr=1&w=750'} alt="" className="object-cover transition duration-200 ease-in transform group-hover:scale-105" />
                  {/* :::time left */}
                  <span className={` absolute top-2 right-2 py-1 px-3 rounded-full bg-white bg-opacity-30 text-xs font-bold backdrop-filter backdrop-blur-sm ${0.5 > 4 ? 'text-yellow-500' : 0.5 > 1 ? 'text-blue-500' : 0.5 > 0.4 ? 'text-green-500' : 'text-green-500'} justify-center flex `}>
                  {0.5 > 4 ? 'Gem' : 0.5 > 1 ? 'Solid' : 0.5 > 0.4 ? 'Greenlight' : 'Greenlight'}
                  </span>
                </div>
                {/* :: */}
                <div className="mt-2 px-2 w-full flex flex-col space-y-1">
                  {/* :::name */}
                  <p className="text-xl text-white text-opacity-80 font-semibold tracking-wide group-hover:text-opacity-100 min-h-[60px]">The Turks #3900</p>
                  {/* :::author */}
                  <p className="flex items-center">
                    <span className={`relative mr-2 w-7 h-7 rounded-full shadow-sm overflow-hidden ${0.5 > 4 ? 'bg-yellow-500' : 0.5 > 1 ? 'bg-blue-500' : 0.5 > 0.4 ? 'bg-green-500' : 'bg-green-500'} justify-center flex `} aria-label="avatar">
                    </span>
                  </p>
                  {/* :::bid infos */}
                  <span className="flex justify-between items-center">
                    <span className="mr-4 text-sm text-white font-semibold">{`${0.5} USDT`}</span>
                  </span>
                  <button type="button" className=" !mt-12 flex max-w-[250px] px-6 text-center py-4 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 text-lg text-white font-bold hover:to-blue-600" >Give Loan</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
