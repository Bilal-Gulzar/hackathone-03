"use client"
import useAppContext from '@/context/contextAPI';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Filter() {
    const  router = useRouter()
     const {setFilter,filter} = useAppContext();
    // console.log(setFilter, filter);
    const [men,setMen] = useState(false)
    const [girl,setGirl] = useState(false)
    const [boy,setBoy] = useState(false)
    const [women,setWomen] = useState(false)
    const [minPrice,setMinPrice] = useState(false)
    const [maxPrice,setMaxPrice] = useState(false)

const handle = () => {
  const selectedCategories: string[] = [];
  if (men) selectedCategories.push("Men's Shoes");
  if (women) selectedCategories.push("Women's Shoes");
  if (boy) selectedCategories.push("Boys Shoes");
  if (girl) selectedCategories.push("Girls Shoes");

  // Set price filters as strings
  const selectedMinPrice = minPrice ? "2500" : "";
  const selectedMaxPrice = maxPrice ? "7500" : "";

  // Build the query string
  const query: Record<string, string | string[]> = {};

  if (selectedCategories.length > 0) {
    query.category = selectedCategories;
  }
  if (selectedMinPrice) {
    query.minPrice = selectedMinPrice;
  }
  if (selectedMaxPrice) {
    query.maxPrice = selectedMaxPrice;
  }

  // Update the URL with the query parameters
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  router.push(`/allProducts?${queryString}`);
};


useEffect(()=>{
    handle()
},[men,women,boy,girl,minPrice,maxPrice])

  return (
    <>
      <section className="md:block hidden">
        <div className="border-gray-300 border-y py-4">
          <div className="flex justify-between  mb-5 items-center  ">
            <p> Gender</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={men}
                onChange={() => {
                  setMen(!men);
                }}
              />
              <label>Men</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={women}
                onChange={() => {
                  setWomen(!women);
                }}
              />
              <label>Women</label>
            </li>
          </ul>
        </div>
        <div className="py-4">
          <div className="flex justify-between mb-5 items-center ">
            <p> Kids</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={boy}
                onChange={() => {
                  setBoy(!boy);
                }}
              />
              <label>Boys</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={girl}
                onChange={() => {
                  setGirl(!girl);
                }}
              />
              <label>Girls</label>
            </li>
          </ul>
        </div>
        <div className="py-4 border-t border-gray-300">
          <div className="flex justify-between mb-5 items-center ">
            <p> Shop By Price</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={minPrice}
                onChange={() => {
                  setMinPrice(!minPrice);
                }}
              />
              <label>Under ₹ 2 500.00</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={maxPrice}
                onChange={() => {
                  setMaxPrice(!maxPrice);
                }}
              />
              <label>₹ 2 501.00 - ₹ 7 500.00</label>
            </li>
          </ul>
        </div>
      </section>
      <section
        className={`${filter ? "" : "-translate-y-full"} p-10 md:hidden shadow-md top-0 bottom left-0 absolute w-screen h-auto z-50 bg-white duration-200`}
      >
        <div className="flex border-b-[1.5px] border-black justify-between items-center pb-4">
          <span className="text-3xl font-semibold">Filters</span>{" "}
          <span onClick={() => setFilter(false)}>
            <IoIosCloseCircleOutline size={30} />
          </span>
        </div>
        <div className="border-gray-300 border-b mt-10 py-4">
          <div className="flex justify-between  mb-5 items-center  ">
            <p> Gender</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={men}
                onChange={() => {
                  setMen(!men);
                }}
              />
              <label>Men</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={women}
                onChange={() => {
                  setWomen(!women);
                }}
              />
              <label>Women</label>
            </li>
          </ul>
        </div>
        <div className="py-4">
          <div className="flex justify-between mb-5 items-center ">
            <p> Kids</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={boy}
                onChange={() => {
                  setBoy(!boy);
                }}
              />
              <label>Boys</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={girl}
                onChange={() => {
                  setGirl(!girl);
                }}
              />
              <label>Girls</label>
            </li>
          </ul>
        </div>
        <div className="pt-4 pb-2 border-t border-gray-300">
          <div className="flex justify-between mb-5 items-center ">
            <p> Shop By Price</p>
          </div>
          <ul className="text-[15px] font-[500] flex flex-col gap-4">
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={minPrice}
                onChange={() => {
                  setMinPrice(!minPrice);
                }}
              />
              <label>Under ₹ 2 500.00</label>
            </li>
            <li className="flex gap-1">
              <input
                type="checkbox"
                checked={maxPrice}
                onChange={() => {
                  setMaxPrice(!maxPrice);
                }}
              />
              <label>₹ 2 501.00 - ₹ 7 500.00</label>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
