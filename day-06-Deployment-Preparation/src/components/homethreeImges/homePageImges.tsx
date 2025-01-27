import React from 'react'
import Image from 'next/image';

function HomePageImges() {
  return (
    <section className="px-10">
      <div className=" text-[22px] mb-5">The Essentials</div>
      <div className="grid md:grid-cols-2  justify-items-center lg:grid-cols-3 gap-4">
        <div className="">
          <Image src="/shirt.png" width={600} height={600} alt="img" />
        </div>
        <div className="">
          <Image src="/shoes.png" width={600} height={600} alt="img" />
        </div>
        <div className="">
          <Image src="/bags.png" width={600} height={600} alt="img" />
        </div>
      </div>
      <div className="flex lg:flex-nowrap flex-wrap gap-x-28 gap-y-14 items-center  lg:gap-28 justify-center py-24">
        <div className="text-[15px] flex flex-col items-center md:items-start gap-8 font-[500]">
          <h2>Icons</h2>
          <ul className="text-[#757575] items-center md:items-start flex flex-col gap-5">
            <li>Air Force 1</li>
            <li>Huarache</li>
            <li>Air Max 90</li>
            <li>Air Max 95</li>
          </ul>
        </div>
        <div className="text-[15px] flex items-center md:items-start flex-col gap-8 font-[500]">
          <h2>Shoes</h2>
          <ul className="text-[#757575] items-center md:items-start flex flex-col gap-5">
            <li>All Shoes</li>
            <li>Custom Shoes</li>
            <li>Jordan Shoes</li>
            <li>Running Shoes</li>
          </ul>
        </div>
        <div className="text-[15px] flex flex-col items-center md:items-start gap-8 font-[500]">
          <h2>Clothing</h2>
          <ul className="text-[#757575] flex flex-col items-center md:items-start gap-5">
            <li>All Clothing</li>
            <li>Modest Wear</li>
            <li>Hoodies & Pullovers</li>
            <li>Shirts & Tops</li>
          </ul>
        </div>
        <div className="items-center md:items-start text-[15px] flex flex-col gap-8 font-[500]">
          <h2>Kids'</h2>
          <ul className="text-[#757575] flex items-center md:items-start flex-col gap-5">
            <li>Infant & Toddler Shoes</li>
            <li>Kids' Shoes</li>
            <li>Kids' Jordan Shoes</li>
            <li>Kids' Basketball Shoes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HomePageImges