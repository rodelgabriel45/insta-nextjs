/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import Modal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { PiSignOutFill } from 'react-icons/pi';
import { FaCamera } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='shadow-md border-b sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* logo */}
        <Link href='/'>
          <Image
            src='/800px-Instagram_logo_2016.webp'
            alt='Instagram Logo'
            width={30}
            height={30}
            className='inline-flex lg:hidden'
          />
          <Image
            src='/Instagram_logo_black.webp'
            width={96}
            height={96}
            alt='Instagram Logo'
            className='hidden lg:inline-flex'
          />
        </Link>

        {/* search input */}
        <input
          type='text'
          placeholder='Search...'
          className='bg-gray-50 border border-gray-200 rounded text-sm w-[130px] py-2 px-4 sm:w-[210px]'
        />

        {/* sign in/nav */}

        {session ? (
          <div className='flex items-center gap-3'>
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className='border px-2 py-1 rounded-full bg-black'
            >
              <AiOutlinePlusCircle className='text-xs text-white' />
            </motion.button>

            <img
              src={session.user.image}
              alt={session.user.username}
              className='h-7 w-7 rounded-full cursor-pointer border border-gray-100'
            />
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={() => signOut()}
            >
              <PiSignOutFill className='text-xl text-red-700' />
            </motion.button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className='text-sm font-semibold text-blue-500'
          >
            Sign In
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className='fixed top-0 left-0 w-[100%] h-screen bg-[#000000BF] z-index: 20;'
              onClick={() => setIsOpen(false)}
            />
            <motion.dialog
              className='max-w-lg w-[90%] p-6 py-10 top-56 bg-white border-2 rounded-md shadow-md'
              open={isOpen}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <div className='flex flex-col justify-center items-center h-[100%]'>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                >
                  <FaCamera className='text-gray-400 text-2xl' />
                </motion.div>
                <input
                  type='text'
                  maxLength='150'
                  className='text-sm m-4 p-2 text-center w-full focus:ring-0 outline-none border-b '
                  placeholder='Enter your caption...'
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className='w-full bg-green-600 text-white p-2 text-sm shadow-md rounded-md disabled:opacity-80'
              >
                Upload Post
              </motion.button>

              <div
                onClick={() => setIsOpen(false)}
                className='cursor-pointer absolute top-2 right-2 border rounded-full border-red-500 text-xs p-1 hover:text-white hover:bg-red-500'
              >
                <IoClose />
              </div>
            </motion.dialog>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
