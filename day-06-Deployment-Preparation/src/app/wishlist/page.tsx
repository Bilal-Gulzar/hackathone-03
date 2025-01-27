"use client"
import React from 'react'
import { MyImage, products } from "@/types";
import Link from "next/link";
import { TbHeartX } from "react-icons/tb";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import useAppContext from '@/context/contextAPI';
import Image from 'next/image';
import WishlistHeart from '@/components/svg/wishlistHeart';

export default function WishList() {
    const {removeFromWishlist, wishlist } = useAppContext();
  const reversedwishlist = [...(wishlist || [])].reverse();
  

   const builder = imageUrlBuilder(client);
    
    function urlFor(source:MyImage) {
        return builder.image(source);
      }
    
  return (
    <div className=" mx-5 lg:container lg:mx-auto mt-5">
      {wishlist?.length == 0 && (
        <div className="gap-3 flex-col flex items-center my-40">
          <div>
            <TbHeartX className="text-[#d7d7d7] size-48" />
          </div>
          <h2 className="text-3xl font-medium">Wishlist is empty.</h2>
          <div className="flex flex-col gap-1 items-center sm:px-0 px-5 ">
            <p className="text-gray-500 text-sm text-center">
              You don't have any products in the wishlist yet.
            </p>
            <p className="text-gray-500 text-sm text-center">
              You will find a lot of interesting products on our "Shop" page.
            </p>
          </div>
        </div>
      )}
      {wishlist?.length > 0 &&
      <div className="grid grid-cols-2 sm:grid-cols-3  pt-10 pb-20 lg:grid-cols-4 gap-x-3 gap-y-10">
        {reversedwishlist &&
          reversedwishlist.length > 0 &&
          reversedwishlist.map((item: products,index:number) => (
            <div key={index}>
              <div className="flex sm:flex-row flex-col gap-4">
                <div>
                  <Link
                    href={`/allProducts/${item._id}`}
                    className="bg-500 w-full"
                  >
                    <Image
                      src={urlFor(item.image).url()}
                      width={300}
                      height={300}
                      alt={item.productName}
                    />
                  </Link>
                  <div className="font-[500] flex flex-col gap-2.5 pe-2 mt-6 justify-between text-[15px]">
                    <div className="text-[#9E3500]">{item.status}</div>
                    <div className="line-clamp-1">{item.productName}</div>
                  </div>
                  <div className="font-[500] text-[#757575] space-y-0.5 text-[15px] mt-1.5">
                    <div className="line-clamp-1">{item.category}</div>
                    <div>{item.colors?.length} Colour </div>
                    <div className="flex text-sm tracking-wide items-center justify-between relative">
                      <span
                        onClick={() => removeFromWishlist(item._id)}
                        className="sm:flex hidden gap-1 items-center cursor-pointer"
                      >
                        <WishlistHeart />
                        Remove
                      </span>
                      <span
                        onClick={() => removeFromWishlist(item._id)}
                        className=" sm:hidden flex flex-wrap pr-1 gap-1 items-center cursor-pointer"
                      >
                        <WishlistHeart />
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className=" mt-4">
                    <div className="line-clamp-1"> MRP : ₹ {item.price}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
     }
    </div>
  );
}


