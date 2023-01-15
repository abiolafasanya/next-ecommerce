import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import Sidebar from './Sidebar';
import UseCart from '../hooks/useCart';

const Nav = () => {
  const { openCart, closeCart } = UseCart();
  const isAuth = true;
  return (
    <nav className="w-full py-2 bg-gray-700 px-3 sticky">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="bg-gray-100 text-white text-2xl mr-5">
            <Image
              src="/comlogo.png"
              width={120}
              height={120}
              alt="Ecommer Website"
            />
          </Link>
          <ul className="flex space-x-8 text-white text-[14px]">
            <li className="hover:text-gray-200 transition-all ease-in-out">
              <Link href={'/'}>Home</Link>
            </li>
            <li className="hover:text-gray-200 transition-all ease-in-out">
              <Link href={'/stroe'}>Store</Link>
            </li>
            <li className="hover:text-gray-200 transition-all ease-in-out">
              <Link href={'/trending'}>Trending</Link>
            </li>
            <li className="hover:text-gray-200 transition-all ease-in-out">
              <Link href={'/about'}>About</Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-8">
          {isAuth ? (
            <button
              className="rounded-full bg-gray-100 w-[2.5rem] h-[2.5rem] p-2 relative "
              onClick={() => openCart()}
            >
              <BsCart4 className="text-yellow-600 text-2xl mx-auto" />
              <span className="absolute bottom[0] right-[0] w-[1rem] h-[1rem] bg-red-500 rounded-full flex justify-center items-center">
                1
              </span>
            </button>
          ) : (
            <>
              <button className="btn bg-black text-white">Login</button>
              <button className="btn bg-yellow-500 text-black">Signup</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
