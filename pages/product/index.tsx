import React, { useState, useMemo } from 'react';
import Container from '../../components/Container';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Category, Product, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import StoreItem from '../../components/StoreItem';

const slides = [
  {
    url:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Good',
  },
  {
    url:
      'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Nice',
  },
  {
    url:
      'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Awesome',
  },
  {
    url:
      'https://images.pexels.com/photos/3843257/pexels-photo-3843257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Exeburant',
  },
  {
    url:
      'https://images.pexels.com/photos/5003441/pexels-photo-5003441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'This is Fancy',
  },
];

interface Iprops {
  categories: Category[];
  products: Product[];
}

const Index: NextPage<Iprops> = (props) => {
  const { products, categories } = props;

  useMemo(() => {
    const controller = new AbortController();
    console.log(products);
    console.log(categories);

    return () => {
      controller.abort();
    };
  }, [products, categories]);

  return (
    <Container className=''>
      <header className="h-1/2 w-full">
        <Slide indicators>
          {slides.map((each, index) => (
            <div key={index}>
              <div
                className="backdrop:opacity-50 flex items-center justify-center bg-cover bg-center h-[50vh]"
                style={{ backgroundImage: `url(${each.url})` }}
              >
                <span className="text-2xl p-5 font-semibold bg-black/20 text-white shadow-sm">
                  Slide {index + 1}
                </span>
              </div>
            </div>
          ))}
        </Slide>
      </header>
      <main>
        <div className="max-w-6xl mx-auto mt-5 ">
          <section>
            <h1 className="text2xl">Recent</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
              {products.map((product, index) => (
                <>
                  {product.categoryId === categories[0].id && (
                    <StoreItem key={index} {...product} />
                  )}
                </>
              ))}
            </div>
          </section>
          <section>
            <h1 className="text2xl">Men Fashion</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
              {products.map((product, index) => (
                <>
                  {product.categoryId === categories[1].id && (
                    <StoreItem key={index} {...product} />
                  )}
                </>
              ))}
            </div>
          </section>
          <section>
            <h1 className="text2xl">Women Fashion</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4">
              {products.map((product, index) => (
                <>
                  {product.categoryId === categories[2].id && (
                    <StoreItem key={index} {...product} />
                  )}
                </>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const client = prisma.product;
  const client2 = prisma.category;
  const categories = await client2.findMany();
  const products = await client.findMany();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
