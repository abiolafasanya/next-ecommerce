import React from 'react';
import Image from 'next/image';
import UseCart from '../hooks/useCart';
import { formatCurrency } from '../utils/formatter';
import Button from './Button';
import { MdAdd, MdClose, MdDelete, MdDeleteOutline, MdRemove } from 'react-icons/md';
import { Product } from '@prisma/client';

type CartItemProps = {
  id: string;
  quantity: number;
  products: Product[];
};

const CartItem = ({ id, quantity, products }: CartItemProps) => {
  console.log(products)
  const { removeCartQuantity, increaseCartQuantity, decreaseCartQuantity } = UseCart();
  const item =
    products?.length > 0 ? products.find((item) => item.id === id) : null;
  if (item == null) return null;

  return (
    <div className="flex flex-wrap items-center justify-between text-black bg-white rounded-md shadow-lg shadow-orange-50 mx-3">
      <div className="flex flex-wrap space-x-px items-center">
        <Image
          src={item.image as string}
          height={75}
          width={125}
          alt={item.name}
        />
      </div>
        <h5 className="text-sm font-semibold">{item.name}</h5>
      <div className='flex items-center'>
          <MdRemove className='mr-3 p-1 rounded-sm text-2xl bg-gray-300 text-black' onClick={() => decreaseCartQuantity(item.id)} />
          {quantity}
          <MdAdd className='ml-3 p-1 rounded-sm text-2xl bg-gray-300 text-black' onClick={() => increaseCartQuantity(item.id)} />
      </div>
      <div className="flex space-x-2 mr-2 items-center">
        <span className="text-small">
          {formatCurrency(item.price * quantity)}
        </span>
        <Button
          className="px-5 py-2 rounded"
          onClick={() => removeCartQuantity(item.id)}
        >
          <MdDeleteOutline className='sm:text-xl hover:text-red-500' />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
