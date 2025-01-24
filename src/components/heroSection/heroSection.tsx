import React from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function HeroSection() {
  return (
    <div className="px10 pb-4">
      <div className="font-[500] px-10  bg-500 py-3 leading-[16px] flex flex-col items-center gap-2">
        <div className="text-[15px]">Hello Nike App</div>
        <div className="text-[11px]  sm:text-start text-center font-[400] leading-24px">
          Download the app to access everything Nike.
          <span className="underline font-[500]"> Get Your Great</span>
        </div>
      </div>
      <div className="max-w-[1344px] px-10 max-h-[700px] mt-4">
        <Image
          src="/heroSectionImg.png"
          width={1344}
          height={1334}
          alt=" best-shoes"
        />
      </div>
      <div className="text-[15px] gap-6 my-12 px-4 sm:px-0 font-[500] flex flex-col  items-center">
        <div>First Look</div>
        <h2 className="leading-[60px] text-[56px] text-center sm:text-start ">
          Nike Air Max Pulse
        </h2>
        <p className="font-[400] max-w-[511px] text-center sm:text-start">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max
          Pulse —designed to push you past your limits and help you go to the
          max.
        </p>
        <div className="flex gap-2">
            <Link href="/allProducts">

          <Button variant="default">Notify Me</Button>
          </Link>
            <Link href="/allProducts">

          <Button variant="default">Shop Air Max</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection