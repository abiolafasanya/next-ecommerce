import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdPersonOutline, MdVerifiedUser } from 'react-icons/md';
import { dropMenu } from '../data/drop';
import Link from 'next/link';

const DropDown = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center">
      <button
        className="sm:hidden md:flex btn rounded-sm bg-white text-black items-center"
        onClick={() => setOpen(!open)}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }}
      >
        <MdPersonOutline className="inline-block mr-2 text-2xl" />
        Account
      </button>
      <MdPersonOutline
        className="sm:flex md:hidden inline-block mr-2 text-3xl text-white border p-1 h-10 w-10 rounded-full"
        onClick={() => setOpen(!open)}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }}
      />

      {open && (
        <motion.div
          className="absolute top-[2.9rem] right-[-35px] w-[12rem] flex flex-col bg-white shadow-sm rounded-sm pt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mx-auto">
            <button className="btn px-10 py-3 rounded-sm bg-yellow-500 hover:bg-yellow-600 text-black">
              Login
            </button>
          </div>
          <div className="bg-gray-500/30 h-px w-full mt-2"></div>

          <div className="">
            {dropMenu.map((menu) => (
              <Link
                key={menu.id}
                href={menu.link}
                className={`hover:bg-black/10 py-2 px-3 block ${
                  menu.id === 1 ? 'mt-0' : 'md:mt-2 sm:mt-4'
                }`}
              >
                <menu.icon className="inline-block mr-4" />
                <a>{menu.text}</a>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DropDown;
