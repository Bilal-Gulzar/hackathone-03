"use client"
import React from 'react'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen justify-center  gap-6 flex flex-col items-center">
      <div className='hdden'>
      </div>
      <div className="text-9xl font-semibold ">404</div>
      <Link href="/">
        <button className="px-12 font-medium outline-none py-3 hover:bg-black hover:text-white duration-500 border-[1.5px] rounded-md  ">
          Go Back
        </button>
      </Link>
    </div>
  );
}
