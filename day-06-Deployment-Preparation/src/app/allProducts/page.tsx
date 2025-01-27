import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from "@sanity/image-url";
import { MyImage, products } from '@/types';
import AddtoWishlist from '@/components/addtoWhislist/addtoWishlist';
import Filter from '@/components/filter/filter';


export default  async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<{ category:string,minPrice:string,maxPrice:string}>;
}) {
  let maxP = (await searchParams).maxPrice;
  let minP = (await searchParams).minPrice;
  let category = (await searchParams).category;
  let categoryQueryString:string |undefined;
  if (category !== undefined) {
     const CategoryUrl = category?.split(",")
       categoryQueryString = CategoryUrl.map(
      (cat) => `category=${cat.trim()}`
    ).join("&");
  } else {
    
  }

  let get = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products?${categoryQueryString}&maxPrice=${maxP}&minPrice=${minP}`);
  const res: products[] = await get.json();
  const builder = imageUrlBuilder(client);
  function urlFor(source: MyImage) {
    return builder.image(source);
  }

  return (
    <div>
      <div className="grid  pb-20 md:grid-cols-12 w-full px-5 mt-12 sm:mt-16 sm:px-10">
         <div className="md:col-span-3 w-full pe-14"> 
          <Filter />
        </div> 
        <div className="col-span-9 pb-5">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10">
            {res &&
              res.length > 0 &&
              res.map((item: products) => (
                <div key={item._id}>
                  <div className="flex sm:flex-row flex-col gap-4">
                    <div>
                      <Link
                        href={`/allProducts/${item._id}`}
                        className="bg-500 w-full "
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
                        <AddtoWishlist wishtlistItem={item} />
                      </div>
                      <div className=" mt-4">
                        <div className="line-clamp-1">
                          {" "}
                          MRP : ₹ {item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
