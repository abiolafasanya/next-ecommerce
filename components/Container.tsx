import Head from 'next/head';
import { useState, useLayoutEffect } from 'react';
import { Inter } from '@next/font/google';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import UseCart from '../hooks/useCart';
import { ThreeCircles } from 'react-loader-spinner';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import MobileMenu from '../components/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

export default function Container(props: any) {
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
          wrapperClass="flex items-center justify-center my-auto sm:my-60 lg:my-64"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#4b556380"
          innerCircleColor="#4b556380"
          middleCircleColor="#4b556380"
        />
      ) : (
        <>
          <Nav />
          <Sidebar isOpen={isOpen} products={props.products} />
          <MobileMenu />

          <main
            className="font-montserrat bg-white w-full"
            onClick={() => closeCart()}
          >
            {props.children}
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
