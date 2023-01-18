import React from 'react';
import Image from 'next/image';
import UseCart from '../hooks/useCart';
import storeData from '../data/items.json';
import { formatCurrency } from '../utils/formatter';
import Button from './Button';
import { MdCancel, MdClose } from 'react-icons/md';
import { Product } from '@prisma/client';

type CartItemProps = {
  id: string;
  quantity: number;
  products: Product[];
};

const CartItem = ({ id, quantity, products }: CartItemProps) => {
  const { removeCartQuantity, increaseCartQuantity } = UseCart();
  const item =
    products.length > 0 ? products.find((item) => item.id === id) : null;
  if (item == null) return null;

  return (
    <div className="flex items-center justify-between text-black bg-white rounded-md shadow-lg shadow-orange-50 mx-3">
      <div className="flex space-x-px items-center">
        <Image
          src={item.image as string}
          height={75}
          width={125}
          alt={item.name}
        />
        <h5 className="text-sm font-semibold">{item.name}</h5>
      </div>
      <div>{quantity}</div>
      <div className="flex space-x-2 mr-2 items-center">
        <span className="text-small">
          {formatCurrency(item.price * quantity)}
        </span>
        <Button
          className="bg-gray-200 hover:bg-red-500 px-5 py-2 rounded"
          onClick={() => removeCartQuantity(item.id)}
        >
          <MdClose />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
