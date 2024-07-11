import React from 'react';

const ScrollingMessage = () => {
  return (
    <div class="relative flex overflow-x-hidden bg-purple-300 border-t-4 border-solid border-black">
  <div class="py-12 animate-marquee whitespace-nowrap font-bold text-orange-600">
    <span class="text-8xl mx-12">EDGE NEWS </span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
  </div>

  <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap font-bold text-orange-600">
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
    <span class="text-8xl mx-12">EDGE NEWS</span>
  </div>
</div>
  );
};

export default ScrollingMessage;



