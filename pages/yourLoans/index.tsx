import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import MyLoans from '../../components/MyLoans'

const Home: NextPage = () => {
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
            <MyLoans/>
        </div>
    </div>
  );
};

export default Home;
