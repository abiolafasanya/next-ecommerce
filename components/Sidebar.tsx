import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdCancel, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import UseCart from '../hooks/useCart';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatter';
import storeData from '../data/items.json';

type Props = {
  isOpen: boolean;
  // children: ReactNode;
};

const Sidebar = ({ isOpen }: Props) => {
  const { closeCart, cartItems } = UseCart();
  return (
    <>
      {isOpen && (
        <motion.div
          className="absolute top-0 right-0 h-screen w-[400px] bg-gray-50"
          initial={{ width: 0 }}
          animate={{ width: 400 }}
          onClick={(e) =>
            console.log(e.currentTarget.parentElement?.accessKeyLabel)
          }
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
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          <div className="font-semibold mx-5 float-right my-4">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeData.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
