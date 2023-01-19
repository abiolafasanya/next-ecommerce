import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCart4 } from 'react-icons/bs';
import { motion } from 'framer-motion';
import UseCart from '../hooks/useCart';
import NoSSR from './NoSSR';
import DropDown from './DropDown';
import Search from './Search';
import { MdMenu } from 'react-icons/md';
import useMobile from '../hooks/useMobile';
import { useSession, getSession } from 'next-auth/react';


const Nav = () => {
  const { openCart, cartQuantity } = UseCart();
  const { open, setOpen } = useMobile();
  const { status, data: session } = useSession();
  // const { theme, setTheme } = useTheme();
  return (
    // <nav className="sm:w-full lg:max-w-6xl lg:mx-auto w-full py-2 bg-gray-700 px-3 sticky">
    <nav className="sm:w-full md:px-10 lg:px-12 w-full py-2 bg-gray-700 px-3 sticky">

      <NoSSR>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <MdMenu
                className="md:flex lg:hidden text-white text-4xl"
                onClick={() => setOpen(true)}
              />
              <Link href="/" className="bg-gray-100 text-white text-2xl mr-5">
                <Image
                  src="/comlogo.png"
                  width={120}
                  height={120}
                  className="w-auto h-auto"
                  alt="Ecommer Website"
                />
              </Link>
            </div>
            <ul className="sm:hidden lg:flex space-x-8 text-white text-[14px]">
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
          <div className="flex md:space-x-8">
            <Search />
            <DropDown />
            <motion.button
              className="rounded-full bg-white w-[2.5rem] h-[2.5rem] p-2 relative "
              onClick={() => openCart()}
            >
              <BsCart4 className="text-yellow-600 text-2xl mx-auto" />
              {cartQuantity > 0 && (
                <div className="absolute bottom[0] right-[0] w-[1rem] h-[1rem] text-sm text-red-100 bg-red-500 rounded-full flex justify-center items-center">
                  {cartQuantity}
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </NoSSR>
    </nav>
  );
};

export default Nav;
