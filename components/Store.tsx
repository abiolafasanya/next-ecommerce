import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import data from '../data/items.json';
import StoreItem from './StoreItem';
import { PrismaClient, Product } from '@prisma/client';
import NoSSR from './NoSSR';

type ItemType = {
  products: Product[];
};

interface Iprops {
  products: Product[];
}

const Store = ({ products }: ItemType) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Store</h1>
      <NoSSR>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center rounded-sm">
        {products.map((item, index) => (
          <StoreItem key={index} {...item} />
          ))}
      </div>
          </NoSSR>
    </div>
  );
};

export default Store;

//  main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
