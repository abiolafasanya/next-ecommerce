import React from 'react';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import UseCart from '../hooks/useCart';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatter';
import { Product } from '@prisma/client';
import NoSSR from './NoSSR';

type Props = {
  isOpen: boolean;
  products: Product[];
  // children: ReactNode;
};

const Sidebar = ({ isOpen, products }: Props) => {
  const { closeCart, cartItems } = UseCart();
  // useMemo(() => {
  //   console.log(products);
  // }, [products]);
  return (
    <NoSSR>
      {isOpen && (
        <motion.div
          className="absolute top-0 right-0 h-screen sm:w-full lg:w-[400px] bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ ease: "easeOut", duration: 2 }}
          // exit={{opacity: 0, transition: {duration: 5}}}
          // onClick={(e) =>
          //   console.log(e.currentTarget.parentElement)
          // }
        >
          <div className="flex justify-between items-center px-4 py-5">
            <h1 className="text-lg font-semibold">Cart</h1>
            <MdClose
              color="gray"
              className="text-gray-700 text-[24px] cursor-pointer"
              onClick={() => closeCart()}
            />
          </div>
          {/* <div className="flex flex-col">
            </div> */}
          {cartItems.map((item, id) => (
            <CartItem key={id} {...item} products={products} />
          ))}

          <div className="font-semibold mx-5 float-right my-4">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const d = products?.map((product) => product);
                const item = d?.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </motion.div>
      )}
    </NoSSR>
  );
};

export default Sidebar;
