"use client";
import React, {useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Animation from "../animation/animation";
import { client } from "@/sanity/lib/client";
import useAppContext from "@/context/contextAPI";
import { MyImage, products } from "@/types";
import imageUrlBuilder from "@sanity/image-url";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function SearchBar() {
  const router = useRouter();
  const { search, setSearch } = useAppContext();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [animate, setAnimate] = useState(false);
  const modalRef = useRef<null | HTMLElement>(null);


const builder = imageUrlBuilder(client);

function urlFor(source:MyImage) {
  return builder.image(source);
}

  const handleSearch = () => {
    setAnimate(true);
      const GrooqQuery = `*[_type == "product" && (productName match "${query}"  || description match "${query}")]`;

       client.fetch(GrooqQuery).then((res) => {
        setResult(res.slice(0, 5))
         setAnimate(false);

      }).catch((err) => {
        console.log(err);
       setAnimate(false);

      })
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const navigateToSearchPage = (value:string) => {
    router.push(`/search?query=` + value);
    setSearch(false);
    setQuery("");
  };

useEffect(() => {
      if (modalRef.current) {
  if (search) {
    disableBodyScroll(modalRef.current);
  } else {
    enableBodyScroll(modalRef.current);
  }
  }

  // Cleanup on unmount
  return () => {
    if (modalRef.current) {  
    enableBodyScroll(modalRef.current)
  }
  }
}, [search]);

  return (
    <section
      className={`${search ? "fixed sm:hidden z-50 bg-black/80 inset-0 " : ""}`}
      ref={modalRef}
    >
      <div
        className={`min-h-screen   ml-12 w-[80vw] z-50 sm:hidden fixed right-0 top-0 bg-white ${
          search ? "" : "translate-x-full"
        } transition-all duration-500`}
      >
        <div className="bg-black items-center flex justify-between py-3 px-4 text-white text-lg">
          <p>SEARCH OUR SITE</p>
          <span
            onClick={() => setSearch(false)}
            className="cursor-pointer hover:rotate-180 transition-all delay-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.07797 6.07797C6.22442 5.93153 6.46186 5.93153 6.6083 6.07797L12 11.4697L17.3917 6.07797C17.5381 5.93153 17.7756 5.93153 17.922 6.07797C18.0685 6.22442 18.0685 6.46186 17.922 6.6083L12.5303 12L17.922 17.3917C18.0685 17.5381 18.0685 17.7756 17.922 17.922C17.7756 18.0685 17.5381 18.0685 17.3917 17.922L12 12.5303L6.6083 17.922C6.46186 18.0685 6.22442 18.0685 6.07797 17.922C5.93153 17.7756 5.93153 17.5381 6.07797 17.3917L11.4697 12L6.07797 6.6083C5.93153 6.46186 5.93153 6.22442 6.07797 6.07797Z"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </span>
        </div>
        <div className="w-[90%] mx-auto mt-5 relative">
          <IoIosSearch
            onClick={() => navigateToSearchPage(query)}
            className=" cursor-pointer size-[22px] absolute right-4 top-2"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="border rounded-full py-[8px] border-gray-500 w-full pl-4 pr-12 text-sm font-light outline-none"
          />
        </div>
        <div className="py-2 px-5 mt-9 border shadow-md  border-l-0 font-medium border-t-black border-b-black">
          {query.length > 0 ? " search result " : "Quick search"}
        </div>
        {result?.length > 0 && query !== "" && (
          <div className="pl-5 overflow-y-auto height hide-scrollbar pb-[17.5rem]">
            {result.map((v: products) => (
              <Link
                onClick={() => setSearch(false)}
                href={`/allProducts/${v._id}`}
                key={v._id}
                className="mt-3  gap-3 flex"
              >
                <div className="relative min-w-20 h-24 bg-gray-100">
                  <Image
                    src={urlFor(v.image).url()}
                    alt={v.productName}
                    fill
                    sizes="100vw"
                  />
                </div>
                <div className="text-sm flex flex-col gap-0.5 break-all pr-4">
                  <p className="text-black">{v.productName}</p>
                  <p className=" text-gray-500">${v.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {query !== "" && result?.length === 0 && !animate && (
          <div className="px-4 mt-3">
            <p className="text-sm font-light">
              No Items were found matching your search criteria.
            </p>
          </div>
        )}
        {animate && (
          <div>
            <Animation />
            <Animation />
            <Animation />
            <Animation />
          </div>
        )}
      </div>
    </section>
  );
}
