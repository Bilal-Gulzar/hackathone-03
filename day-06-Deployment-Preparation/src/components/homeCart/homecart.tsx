import React from 'react'
import Image from 'next/image';
import RigthArrowSvg from '../svg/rigthArrowSvg';
import LeftArrowSvg from '../svg/leftArrowSvg';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export type Obj = {
    productName: string;
    category: string;
    image: string;
    price: number;
    _id: string;
};  

export default async function Homecart() {

  const query = `*[_type == "product"][-6...-1]{
    productName,
    price,
    category,
    _id,
    "image":image.asset->url
    }`
     const res:Obj[] = await client.fetch(query)
    
  return (
    <section className="px-10">
      <div className=" text-[22px] lg:mb-0 mb-5">Gear Up</div>
      {/* <div className="flex flex-col sm:flex-row gap-8  items-center overflow-hidden  ">
        <div className="hidden lg:block">
          <div className="hidden sm:flex gap-3 justify-end pe-3 pb-3 items-center">
            <div className="text-[15px]">Shop</div>
            <div className="flex gap-3">
              <div className="w-[48px] h-[48px] rounded-full bg-500 flex justify-center items-center">
                <RigthArrowSvg />
              </div>
              <div className="w-[48px] h-[48px] rounded-full bg-500 flex justify-center items-center">
                <LeftArrowSvg />
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="shrink-0  sm:w-[280px]  ">
              <div className="bg-500 w-full ">
                <Image
                  src="/homeImg1.jpg"
                  width={300}
                  height={300}
                  alt="shoes"
                />
              </div>
              <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
                <div>Nike Dri-FIT ADV TechKnit Ultra </div>
                <div>₹ 3 895</div>
              </div>
              <div className="font-[500] text-[15px] mt-1.5">
                <div className="text-[#757575] w-[150px]">
                  Men's Short-Sleeve Running Top
                </div>
              </div>
            </div>
            <div className="shrink-0  sm:w-[280px]">
              <div className="bg-500  w-full ">
                <Image
                  src="/homeImg2.jpg"
                  width={300}
                  height={300}
                  alt="shoes"
                />
              </div>
              <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
                <div>Nike Dri-FIT Challenger</div>
                <div>₹ 2 495</div>
              </div>
              <div className="font-[500] text-[15px] mt-1.5">
                <div className="text-[#757575] w-[150px]">
                  Men's 18cm (approx.) 2-in-1 Versatile Shorts{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="hidden sm:flex gap-3 justify-end pe-3 pb-3 items-center">
            <div className="text-[15px]">Shop</div>
            <div className="flex gap-3">
              <div className="w-[48px] h-[48px] rounded-full bg-500 flex justify-center items-center">
                <RigthArrowSvg />
              </div>
              <div className="w-[48px] h-[48px] rounded-full bg-500 flex justify-center items-center">
                <LeftArrowSvg />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0  sm:w-[280px]">
              <div className="bg-500  w-full ">
                <Image
                  src="/homeImg3.jpg"
                  width={300}
                  height={300}
                  alt="shoes"
                />
              </div>
              <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
                <div>Nike Dri-FIT ADV Run Division</div>
                <div>₹ 5 295</div>
              </div>
              <div className="font-[500] text-[15px] mt-1.5">
                <div className="text-[#757575] w-[150px]">
                  Women's Long-Sleeve Running Top
                </div>
              </div>
            </div>
            <div className="shrink-0  sm:w-[280px]">
              <div className="bg-500  w-full ">
                <Image
                  src="/homeImg4.jpg"
                  width={300}
                  height={300}
                  alt="shoes"
                />
              </div>
              <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
                <div>Nike Fast</div>
                <div>₹ 3 795</div>
              </div>
              <div className="font-[500] text-[15px] mt-1.5">
                <div className="text-[#757575] w-[150px]">
                  Men's 18cm (approx.) 2-in-1 Versatile Shorts{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0  sm:w-[280px] lg:hidden  ">
          <div className="bg-500 w-full ">
            <Image src="/homeImg1.jpg" width={300} height={300} alt="shoes" />
          </div>
          <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
            <div>Nike Dri-FIT ADV TechKnit Ultra </div>
            <div>₹ 3 895</div>
          </div>
          <div className="font-[500] text-[15px] mt-1.5">
            <div className="text-[#757575] w-[150px]">
              Men's Short-Sleeve Running Top
            </div>
          </div>
        </div>
        <div className="shrink-0  sm:w-[280px]  lg:hidden ">
          <div className="bg-500  w-full ">
            <Image src="/homeImg2.jpg" width={300} height={300} alt="shoes" />
          </div>
          <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
            <div>Nike Dri-FIT Challenger</div>
            <div>₹ 2 495</div>
          </div>
          <div className="font-[500] text-[15px] mt-1.5">
            <div className="text-[#757575] w-[150px]">
              Men's 18cm (approx.) 2-in-1 Versatile Shorts{" "}
            </div>
          </div>
        </div>
        <div className="shrink-0  sm:w-[280px]  lg:hidden ">
          <div className="bg-500  w-full ">
            <Image src="/homeImg3.jpg" width={300} height={300} alt="shoes" />
          </div>
          <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
            <div>Nike Dri-FIT ADV Run Division</div>
            <div>₹ 5 295</div>
          </div>
          <div className="font-[500] text-[15px] mt-1.5">
            <div className="text-[#757575] w-[150px]">
              Women's Long-Sleeve Running Top
            </div>
          </div>
        </div>
        <div className="shrink-0  sm:w-[280px]  lg:hidden ">
          <div className="bg-500  w-full ">
            <Image src="/homeImg4.jpg" width={300} height={300} alt="shoes" />
          </div>
          <div className="font-[500] flex pe-2 mt-6 justify-between text-[15px]">
            <div>Nike Fast</div>
            <div>₹ 3 795</div>
          </div>
          <div className="font-[500] text-[15px] mt-1.5">
            <div className="text-[#757575] w-[150px]">
              Men's 18cm (approx.) 2-in-1 Versatile Shorts{" "}
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 mt-5 items-center sm:overflow-x-auto hide-scrollbar ">
        {res &&
          res.length > 0 &&
          res.map((item:Obj) => (
            <Link
              href={`/allProducts/${item._id}`}
              key={item._id}
              className="shrink-0  sm:w-[380px] h[441.36px]"
            >
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
