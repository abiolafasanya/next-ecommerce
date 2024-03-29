import Head from 'next/head';
import { useState, useLayoutEffect } from 'react';
import { Inter } from '@next/font/google';
import Nav from '../components/Nav';
import Store from '../components/Store';
import Sidebar from '../components/Sidebar';
import UseCart from '../hooks/useCart';
import { ThreeCircles } from 'react-loader-spinner';
import { PrismaClient, Product } from '@prisma/client';
import { GetServerSideProps } from 'next';
import MobileMenu from '../components/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

interface Iprops {
  products: Product[]
}

export default function Home(props: Iprops) {
  const { isOpen, closeCart } = UseCart();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full">
      <Head>
        <title>Ecommerce Website</title>
        <meta name="description" content="Shop store for the Ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#4b556380"
          wrapperStyle={{}}
          wrapperClass="flex items-center justify-center my-auto sm:my-60 lg:my-64"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#4b556380"
          innerCircleColor="#4b556380"
          middleCircleColor="#4b556380"
        />
      ) : (
        <>
          <header className="sm:h-[450px] lg:h-[550px] home-image w-full">
            <div className="font-montserrat bg-gray-900/50 backdrop-opacity-50 h-full">
              <Nav />
              <section
                className="mx-5 lg:mx-12 text-clip"
                onClick={() => closeCart()}
              >
                <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white sm:mt-[90px] lg:mt-[150px]">
                  {'Easy Express Ecommerce Store'}
                </h1>
                <h4 className="text-gray-200 my-4">
                  Shop with us and get all the benefits of our store
                </h4>
                <button className="btn bg-yellow-500 hover:bg-yellow-600 rounded-none py-5 text-black">
                  Shop Now
                </button>
              </section>
            </div>
          </header>
          <Sidebar isOpen={isOpen} products={props.products} />
          <MobileMenu />

          <main
            className="font-montserrat bg-white w-full"
            onClick={() => closeCart()}
          >
            <div className="p-5">
              <Store products={props.products} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();

  const client = prisma.product;
  const products = await client.findMany();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
};
