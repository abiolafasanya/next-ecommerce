import React from 'react';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import UseCart from '../hooks/useCart';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatter';
import { Product } from '@prisma/client';
import NoSSR from './NoSSR';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  products: Product[];
  // children?: ReactNode;
};

const Sidebar = ({ isOpen, products }: Props) => {
  const { closeCart, cartItems } = UseCart();

  console.log(products)
 
  return (
    <NoSSR>
      {isOpen && (
        <motion.div
          className="absolute top-0 right-0 h-screen sm:w-full lg:w-[400px] bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center px-4 py-5">
            <h1 className="text-lg font-semibold">Cart</h1>
            <MdClose
              color="gray"
              className="text-gray-700 text-[24px] cursor-pointer"
              onClick={() => closeCart()}
            />
          </div>

          {cartItems.map((item, id) => (
            <CartItem key={id} {...item} products={products} />
          ))}

          <div className="font-semibold mx-5 text-right ml-auto my-4">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const d = products?.map((product) => product);
                const item = d?.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>

            <div className='flex mt-8 text-center w-[128px] mx-auto'>
              <Link href={'/checkout'} className='py-3 px-8 rounded-sm inline-block bg-yellow-500 hover:bg-yellow-600 text-black'>Checkout</Link>
            </div>
        </motion.div>
      )}
    </NoSSR>
  );
};

export default Sidebar;
