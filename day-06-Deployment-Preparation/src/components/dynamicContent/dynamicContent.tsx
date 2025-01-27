import React from 'react'
import LeftArrowSvg from "@/components/svg/leftArrowSvg";
import RigthArrowSvg from "@/components/svg/rigthArrowSvg";
import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/types';


export default function DynamicContent({data}:content) {

    
  return (
    <section className="px-4 sm:ps-10 py-7 overflow-hidden">
      <div className="font-[500]  flex justify-between items-center pe-10 mb-5 ">
        <div className=" text-[22px]">Best of Air Max</div>
       
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-4  items-center sm:overflow-x-auto hide-scrollbar ">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Link href={`/allProducts/${item._id}`} key={item._id} className="shrink-0  sm:w-[380px] h[441.36px]">
              <div className="bg-500">
                <Image
                  src={item.image}
                  width={441}
                  height={441}
                  alt={item.productName}
                />
              </div>
              <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
                <div>{item.productName}</div>
                <div>₹ {item.price}</div>
              </div>
              <div className="font-[500] text-[15px] mt-1.5">
                <div className="text-[#757575]">{item.category}</div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
