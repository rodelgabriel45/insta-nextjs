/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { PiSignOutFill } from 'react-icons/pi';
import Modal from './Modal';

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

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
          id='search'
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

      {/* Modal */}
      <AnimatePresence>
        {isOpen && <Modal open={isOpen} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Header;
