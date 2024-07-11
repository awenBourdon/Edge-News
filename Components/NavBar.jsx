import React from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';

const NavBar = () => {
  return (
    <div className="py-3 px-5 md:px-12 lg:px-28 border-b-2 bg-input-bg border-solid border-black top-0 z-10">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={150} alt="Logo" className="sm:w-[200px]" />
      </div>
     
    </div>
  )
}

export default NavBar