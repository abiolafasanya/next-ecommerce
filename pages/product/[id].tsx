import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React from 'react';

const product = () => {
  return <div>product</div>;
};

export default product;

const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const client = prisma.product;
  const id = context.params?.id as string;
  const product = await client.findFirst({
    where: { id: id },
  });
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};
