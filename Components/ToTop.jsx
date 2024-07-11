import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { assets } from '@/Assets/assets';

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`fixed bottom-10 right-10 ${isVisible ? '' : 'hidden'} z-50 transition duration-150 ease-in-out `}
      onClick={backToTop}
    >
      <span className="w-4">
        <Image src={assets.totop} width={60} alt="" />
      </span>
    </button>
  );
};

export default ToTop;

