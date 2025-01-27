"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchSvg from '../svg/searchSvg';
import HeartSvg from '../svg/heartSvg';
import CartSvg from '../svg/cartSvg';
import { usePathname } from 'next/navigation';
import SmsSvg from '../svg/smsSvg';
import LoginSvg from '../svg/loginSvg';
import Link from 'next/link';
import useAppContext from '@/context/contextAPI';
import { client } from '@/sanity/lib/client';
import SearchSkeleton from '../searchSkeleton/search';
import { MyImage, products } from '@/types';
import imageUrlBuilder from "@sanity/image-url";
import { MdBorderAll } from "react-icons/md";
import SearchBar from '../search/search';
import FilterSvg from '../svg/filterSvg';
var jwt = require("jsonwebtoken");

function Header() {
  const { search, setSearch, setFilter } = useAppContext();
  const[searchQuery,setSearchQuery] = useState<string>("");
  const[token,setToken] = useState<undefined|string> ("");
  const[name,setName] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const path = usePathname()
  const { shoppingCart,wishlist} = useAppContext();

const builder = imageUrlBuilder(client);

function urlFor(source:MyImage) {
  return builder.image(source);
}

useEffect(()=>{
if(searchQuery.length > 0){

  const query = `*[_type == "product" && (productName match "${searchQuery}"  || description match "${searchQuery}")]`;
   client.fetch(query).then((res) => {
    setSearchResults(res.slice(0,5))
    console.log(res)
    
  }).catch((err) => {
    console.log(err)
  })

}else{
  setSearchResults([]) 
}


},[searchQuery])

useEffect(()=>{

const token  = localStorage.getItem("token")
if(token){
  setToken(token)
const decode = jwt.decode(token)

setName(decode.name)
}else{
  setToken(undefined)
}
},[])

  return (
    <header className={`${path === "/checkout" ? "" : " bg-100"}`}>
      {!(path === "/checkout") ? (
        <div>
          <div className=" hidden sm:flex px-5 md:px-10 justify-between  py-4 items-center">
            <div>
              <Link href="/">
                <Image src="/logo.png" alt="img" width={19} height={19} />
              </Link>
            </div>
            {/* <div className=" lg:block hidden leading-[26px] text-[13px] relative left-24 font-[500]">
              Skip to main content
            </div> */}
            <div className="flex justify-center  items-center gap-[15.38px] font-[500] text-[14px]">
              <Link
                href={"/allProducts"}
                className="border-r border-black pe-2.5"
              >
                Find a Store
              </Link>
              <Link href="/contact-us">
                <div className="border-r border-black pe-2.5">Help</div>
              </Link>
              {!token && (
                <div className={`border-r border-black pe-2.5`}>
                  <Link href="/joinUs">Join Us</Link>
                </div>
              )}
              {token ? (
                <div className="flex gap-3 items-center">
                  <p className="">
                    Hi {name.length > 8 ? name.slice(0, 8) + "..." : name}
                  </p>
                  <LoginSvg />
                </div>
              ) : (
                <Link href="/login">
                  <div className="">Sign In</div>
                </Link>
              )}
            </div>
          </div>
          <div
            className={`bg-white  px-5 md:px-10 py-4 ${
              path === "/cart" ? "lg:ps-10 lg:pe-0" : ""
            } flex justify-between items-center`}
          >
            <div>
              <Link href="/">
                <Image src="/Frame.jpg" alt="img" width={58} height={58} />
              </Link>
            </div>
            <nav className="font-[500]  relative left-16 text-[15px] items-center hidden lg:flex gap-[15.38px] list-none">
              <Link href="/allProducts">
                <li>New & Featured</li>
              </Link>
              <Link href="/allProducts">
                <li
                  className={` ${
                    path === "/cart" ? "border-b-[2px]  border-black" : ""
                  }`}
                >
                  Men
                </li>
              </Link>
              <Link href="/allProducts">
                <li>Women</li>
              </Link>

              <Link href="/allProducts">
                <li>Kids</li>
              </Link>

              <Link href="/allProducts">
                <li>Sales</li>
              </Link>

              <Link href="/allProducts">
                <li>SNKRS</li>
              </Link>
            </nav>
            <div className="flex items-center gap-[15.38px]">
              <div className="sm:block hidden w-[180px] relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[40px] rounded-[100px] bg-500 pe-2 ps-12"
                  placeholder="Search"
                />
                <div className="absolute top-2 left-3">
                  <SearchSvg />
                </div>
                {searchQuery.length > 0 ? (
                  searchResults.length > 0 ? (
                    <div className="absolute z-20">
                      {searchResults &&
                        searchResults.map((item: products) => (
                          <Link
                            onClick={() => setSearchQuery("")}
                            href={`/search?query=${searchQuery}`}
                            key={item._id}
                            className="flex gap-2 items-center top-12 left-0 w-full p-2   shadow-lg bg-white z-10  "
                          >
                            <div className="size-12 shrink-0">
                              <Image
                                src={urlFor(item.image).url()}
                                alt={item.productName}
                                width={58}
                                height={58}
                              />
                            </div>
                            <div className="flex text-xs flex-col w-full gap-2">
                              <div className="w-full h-4 line-clamp-1">
                                {item.productName}
                              </div>
                              <div className="w-[60%] h-4">{item.price}</div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <SearchSkeleton />
                  )
                ) : (
                  ""
                )}
              </div>
              <div onClick={() => setSearch(!search)} className="sm:hidden">
                <SearchSvg />
              </div>
              <Link href={"/wishlist"} className="lg:block hidden relative">
                <HeartSvg />
                <div
                  className={`absolute text-white size-4 text-xs flex justify-center items-center -right-2 top-0 ${wishlist.length == 0 ? "hidden" : ""}
                     bg-black rounded-full`}
                >
                  {wishlist.length}
                </div>
              </Link>
              <div>
                <Link href={"/orders"}>
                  <MdBorderAll className="size-5" />
                </Link>
              </div>
              <div className="lg:hidden">
                <Link href="/login">
                  <LoginSvg />
                </Link>
              </div>
              <Link href="/cart">
                <div className="relative">
                  <CartSvg />
                  <div
                    className={`absolute text-white size-4 text-xs flex justify-center items-center -right-2 top-0 ${path == "/cart" || shoppingCart.length == 0 ? "hidden" : ""}
                     bg-black rounded-full`}
                  >
                    {shoppingCart.length}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className=" px-5 sm:px-10 lg:px-0 lg:ps-10 flex justify-between items-center mt-5">
          <div>
            <Link href="/">
              <Image src="/Frame.jpg" alt="img" width={70} height={70} />
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <div className="sm:block hidden">000 800 100 9538</div>
            <Link href={`contact-us`}>
              <SmsSvg />
            </Link>
            <div>
              <Link href="/cart">
                <CartSvg />
              </Link>
            </div>
          </div>
        </div>
      )}

      <nav className="font-[500]  text-[15px] items-center pt-1 justify-center flex bg-white lg:hidden  gap-[15.38px] list-none">
        <Link href="/allProducts" className="sm:block hidden">
          <li>New & Featured</li>
        </Link>
        <Link href="/allProducts">
          <li
            className={` ${
              path === "/cart" ? "border-b-[2px]  border-black" : ""
            }`}
          >
            Men
          </li>
        </Link>
        <Link href="/allProducts">
          <li>Women</li>
        </Link>

        <Link href="/allProducts">
          <li>Kids</li>
        </Link>

        <Link href="/allProducts" className="sm:block hidden">
          <li>Sales</li>
        </Link>

        <Link href="/allProducts">
          <li>SNKRS</li>
        </Link>
      </nav>
      <div
        onClick={() => setFilter(true)}
        className={`${path === "/allProducts" ? "" : "hidden "} md:hidden cursor-pointer bg-white`}
      >
        <FilterSvg />
      </div>
        <SearchBar />
    </header>
  );
}

export default Header