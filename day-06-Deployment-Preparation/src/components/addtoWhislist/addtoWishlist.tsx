"use client"
import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import Link from 'next/link';
import useAppContext from '@/context/contextAPI';
import WishlistHeart from '../svg/wishlistHeart';
import { products } from '@/types';

interface addItem {
  wishtlistItem:products;
}

function AddtoWishlist({ wishtlistItem}:addItem) {
  const { addToWishlist, removeFromWishlist, wishlist } = useAppContext();

  const isInWishlist = wishlist.some((wishItem:products) => wishItem?._id === wishtlistItem?._id);
  
  const handleClick = () => {
    if (isInWishlist) {
        removeFromWishlist(wishtlistItem._id);
      } else {
        addToWishlist(wishtlistItem);
      }
    };

  return (
    <section>
      <div className="flex text-sm items-center justify-between relative">
        <div className="sm:flex hidden gap-1 items-center cursor-pointer">
          {isInWishlist ? (
            <Link href="/wishlist">
              <span className="flex items-center gap-1">
                Wishlisted <WishlistHeart />
              </span>
            </Link>
          ) : (
            <button
              onClick={handleClick}
              className=" gap-1 flex items-center"
              type="button"
            >
              Add whislist <IoMdHeartEmpty className="size-4" />
            </button>
          )}
        </div>
        {/* <span className="sm:hidden flex gap-1 items-center cursor-pointer "> */}
        <div>
          {isInWishlist ? (
            <Link href="/wishlist">
              <span className="sm:hidden flex flex-wrap gap-1 pr-1 items-center cursor-pointer ">
                Wishlisted <WishlistHeart />
              </span>
            </Link>
          ) : (
            <span
              onClick={handleClick}
              className="sm:hidden flex gap-1 items-center cursor-pointer "
            >
              <IoMdHeartEmpty className="size-3" />
              Add Whistlist
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default AddtoWishlist