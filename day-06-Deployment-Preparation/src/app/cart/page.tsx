"use client"
import HeartSvg from '@/components/svg/heartSvg';
import TrashSvg from '@/components/svg/trashSvg';
import React from 'react'
import Link from 'next/link';
import useAppContext from '@/context/contextAPI';
import { MyImage, products } from "@/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { PiShoppingCartBold } from "react-icons/pi";


function CartPage() {
  const { shoppingCart, subtotal, deleteItem, wishlist, removeFromWishlist,addToWishlist } =
    useAppContext();
  const reversedShoppingCart = [...(shoppingCart || [])].reverse();

  const isInWishlist = shoppingCart  && shoppingCart.length > 0 ? shoppingCart.some((cartItem:products) => wishlist.some((wishItem:products) => wishItem?._id === cartItem?._id)) : false;

       const handleClick = (item:products) => {
            if(item && item._id){
         if (isInWishlist) {
          //  removeFromWishlist(item?._id);
         } else {
           addToWishlist(item);
         }
        }
         else {
      console.error('Data is null or undefined, cannot access _id');
  }
       };

let cart:products = shoppingCart || []
  const builder = imageUrlBuilder(client);
  
  function urlFor(source:MyImage) {
    return builder.image(source);
  }
  
  return (
    <div>
      {shoppingCart && shoppingCart.length > 0 ? (
        <div className="container mx-auto lg:mt-10">
          <div className="sm:flex mb-10 lg:my-10">
            <div className="  w-full  sm:w-3/4 lg:w-[900px] px-5 py-10">
              <div className="border-b pb-8 bg-500 ">
                <div className="flex flex-col relative top-4 left-6 justify-center">
                  <h1 className=" text-[13px] font-[500]">Free Delivery</h1>
                  <h1 className="font-[400] text-[13px] flex pe-10 sm:pe-0">
                    Applies to orders of ₹ {subtotal} or more.
                    <span className="underline ml-5 md:block hidden">
                      Place order
                    </span>
                  </h1>
                </div>
              </div>
              <div className="mt-5">Bag</div>
              {reversedShoppingCart &&
                reversedShoppingCart.length > 0 &&
                reversedShoppingCart.map((item: products, index: number) => (
                  <div
                    key={index}
                    className="lg:flex items-strech lg:gap-5 xl:gap-8 2xl:gap-3 py-8 border-b mb-6  -mt-4 lg:py-8 border-gray-200"
                  >
                    <div className="lg:w-4/12 2xl:w-1/4 w-full  lg:mb-0 mb-5">
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.productName}
                        width={300}
                        height={300}
                        className="h-full object-center object-cover lg:block hidden"
                      />
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.productName}
                        width={500}
                        height={500}
                        className="lg:hidden w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className=" md:pl-3 lg:pl-0 lg:-ml-2 xl:-ml-5 2xl:ml-0 lg:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-[15px] font-[500] leading-[28px]">
                          {item.productName}
                        </p>
                        <div className="font-[400] sm:block hidden text-[15px]">
                          MRP: ₹ {item.price * item.qty}
                        </div>
                      </div>
                      <p className="text-[#757575] text-[14px]  pt-2">
                        {item.category}
                      </p>
                      <p className="text-[#757575] line-clamp  text-[14px]   py-4">
                        {item.description}
                      </p>
                      <div className="text-[#757575] text-[14px] flex gap-6 ">
                        <div>color {item.color}</div>
                        <div> Quantity {item.qty}</div>
                      </div>
                      <div className="flex items-center justify-between pt-5">
                        <div className="flex gap-4 itemms-center">
                          <div className=" cursor-pointer">
                            {isInWishlist ? (
                              <Link href="/wishlist">
                                <span className="flex items-center gap-1">
                                  <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                  </svg>
                                </span>
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleClick(item)}
                                className=" gap-1 flex items-center"
                                type="button"
                              >
                                <HeartSvg />
                              </button>
                            )}
                          </div>
                          <div
                            onClick={() => deleteItem(item)}
                            className=" cursor-pointer"
                          >
                            <TrashSvg />
                          </div>
                        </div>
                        <div className="font-[400] sm:hidden text-[15px]">
                          MRP: ₹ {item.qty * item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div id="summary" className=" w-full   sm:w-1/2     px-8 py-10">
              <h1 className="font-[500] text-[21px]  pb-1">Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className=" text-[15px]">Subtotal</span>
                <span className=" text-[15px]">₹ {subtotal} </span>
              </div>
              <div>
                <div className="font-medium flex justify-between mb-3 text-sm uppercase">
                  <div>Estimated Delivery & Handling</div>
                  <div>Free</div>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex border-y justify-between py-6 text-[15px]">
                  <span>Total </span>
                  <span>₹ {subtotal}</span>
                </div>
                <Link href="/checkout">
                  <button className="bg-black text-[15px]  mt-8 rounded-full h-[60px] text-sm text-white w-full">
                    Member Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen  text-center gap-4 flex flex-col text-4xl font-semibold justify-center items-center">
          <PiShoppingCartBold size={100} />
          Your Cart is Empty!
        </div>
      )}
    </div>
  );
}

export default CartPage