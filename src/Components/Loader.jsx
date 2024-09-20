import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.to(loaderRef.current, {
      duration: 1,
      rotation: 360,
      repeat: -1,
      ease: "linear"
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div ref={loaderRef} className="w-16 h-16 border-4 border-blue-500 border-t-golden-500 rounded-full"></div>
    </div>
  );
};

export default Loader;
