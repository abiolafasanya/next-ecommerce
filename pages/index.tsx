import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from '@next/font/google';
import Nav from '../components/Nav';
import Store from '../components/Store';
import Sidebar from '../components/Sidebar';
import UseCart from '../hooks/useCart';
import { ThreeCircles } from 'react-loader-spinner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isOpen, closeCart } = UseCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ecommer Website</title>
        <meta name="description" content="Shop store for the Ecommer website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#4b556380"
          wrapperStyle={{}}
          wrapperClass="flex items-center justify-center my-auto lg:my-64"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#4b556380"
          innerCircleColor="#4b556380"
          middleCircleColor="#4b556380"
        />
      ) : (
        <>
          <header className="w-full h-[450px] home-image">
            <div className="font-montserrat bg-gray-900/50 backdrop-opacity-50 h-full">
              <section className="sm:w-screen lg:max-w-6xl lg:mx-auto">
                <Nav />
                <Sidebar isOpen={isOpen} />
              </section>
              <section className="mx-5 " onClick={() => closeCart()}>
                <h1 className="text-4xl font-bold text-white w-[450px] mt-[100px]">
                  {'Easy Express Ecommerce Store'}
                </h1>
                <h4 className="text-gray-400 my-4">
                  Learn all the details about the benefits of our token
                </h4>
                <button className="btn bg-yellow-500 hover:bg-yellow-600 rounded-none py-5 text-black">
                  Learn more
                </button>
              </section>
            </div>
          </header>
          <main className="font-montserrat" onClick={() => closeCart()}>
            <div className="p-5 bg-white">
              <Store />
            </div>
          </main>
        </>
      )}
    </>
  );
}
