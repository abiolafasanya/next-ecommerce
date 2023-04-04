import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import NoSSR from './NoSSR';
import useMobile from '../hooks/useMobile';
import { navMenus } from '../data/drop';


const MobileMenu = () => {
  const { open, setOpen } = useMobile();
  return (
    <>
      {open && (
        <motion.div
          className="z-50 sm:inline-block lg:hidden w-full absolute top-[4rem] h-screen bg-gray-100 shadow-r-md p-3"
          initial={{ width: 0 }}
          animate={{ width: '80%' }}
        >
          <NoSSR>
            <MdClose
              className="ml-auto text-[2rem] text-gray-500"
              onClick={() => setOpen(false)}
            />
            <div className="flex flex-wrap flex-col gap-y-4">
              {navMenus.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.link}
                  className="hover:bg-black/10 p-3 text-black"
                >
                  <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {menu.text}
                  </motion.a>
                </Link>
              ))}
            </div>
          </NoSSR>
        </motion.div>
      )}
    </>
  );
};

export default MobileMenu;
