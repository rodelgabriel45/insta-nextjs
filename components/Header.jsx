/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className='shadow-md border-b sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* logo */}
        <Link href='/'>
          <Image
            src='/800px-Instagram_logo_2016.webp'
            alt='Instagram Logo'
            width={40}
            height={40}
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
          placeholder='search...'
          className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]'
        />

        {/* sign in/nav */}

        {session ? (
          <img
            onClick={() => signOut()}
            src={session.user.image}
            alt={session.user.username}
            className='h-10 w-10 rounded-full cursor-pointer'
          />
        ) : (
          <button
            onClick={() => signIn()}
            className='text-sm font-semibold text-blue-500'
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
