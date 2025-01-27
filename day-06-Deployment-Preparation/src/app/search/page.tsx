import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { MyImage, products } from '@/types';
import imageUrlBuilder from "@sanity/image-url";
import AddtoWishlist from '@/components/addtoWhislist/addtoWishlist';

export default async function Search({searchParams}: {searchParams:Promise<{query:string}>}) {
  let {query} = (await searchParams);

  const builder = imageUrlBuilder(client);

 function urlFor(source:MyImage) {
   return builder.image(source);
 }
const GrooQuery = `*[_type == "product" && (productName match "${query}"  || description match "${query}")]`;
   let results:products[] = await client.fetch(GrooQuery);
   
  return (
    <div className=" mx-5 lg:container lg:mx-auto mt-5">
      <h1 className="text-3xl font-bold text-center">Search Results:{query}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3  pt-10 pb-20 lg:grid-cols-4 gap-x-3 gap-y-10">
        {results &&
          results.length > 0 &&
          results.map((item: products,index:number) => (
            <div className="flex sm:flex-row flex-col gap-4">
                <div>
                  <Link key={index} href={`/allProducts/${item._id}`} className="bg-500 w-full ">
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
                    <AddtoWishlist wishtlistItem={item} />
                  </div>
                  <div className=" mt-4">
                    <div className="line-clamp-1"> MRP : ₹ {item.price}</div>
                  </div>
                </div>
              </div>
          ))}
        {/* <Link href="/allProducts/2">
              <div className="flex sm:flex-row flex-col gap-4">
                <div className="">
                  <div className="bg-500 w-full ">
                    <Image
                      src="/Rectangle1.jpg"
                      width={300}
                      height={300}
                      alt="shoes"
                    />
                  </div>
                  <div className="font-[500] flex flex-col gap-2.5 pe-2 mt-6 justify-between text-[15px]">
                    <div className="text-[#9E3500]">Just In</div>
                    <div className="line-clamp-1">
                      Nike Court Vision Low Next Nature{" "}
                    </div>
                  </div>
                  <div className="font-[500] text-[#757575] space-y-0.5 text-[15px] mt-1.5">
                    <div className="line-clamp-1">Men's Shoes </div>
                    <div>1 Colour </div>
                  </div>
                  <div className=" mt-4">
                    <div className="line-clamp-1">MRP : ₹ 4 995.00</div>
                  </div>
                </div>
              </div>
            </Link> */}
      </div>
    </div>
  );
}
