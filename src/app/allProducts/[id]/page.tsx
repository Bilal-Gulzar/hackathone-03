import React from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton";
// import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { MyImage, products } from "@/types";
import Color from '@/components/color/color';
import AddToCart from '@/components/addToCart/addToCart';
import Loading from '@/app/loading';

interface params {
  params:Promise<{id:string}>
}

export default async function ProductPage({params}:params) {

  const {id} = await params
   const query = `*[_type == "product" && _id == "${id}"][0]`
    const res:products = await client.fetch(query)
  if(!res){
return (

<Loading/>

)
  }
  const builder = imageUrlBuilder(client);
  
  function urlFor(source:MyImage) {
    return builder.image(source);
  }

  return (
    <section className="text-gray-600 body-font pb-44 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {res.image?.asset ? (
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-96  object-fill  rounded"
              src={urlFor(res.image).url()}
              width={200}
              height={200}
            />
          ) : (
            <Skeleton className="lg:w-1/2 w-full lg:h-auto h-96 object-fill rounded" />
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 space-y-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {res.productName}
            </h1>
            <p className="leading-relaxed">{res.description}</p>
            <div>
              <Color colors={res.colors} />
            </div>
            <div className="space-y-6">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹ {res.price}
              </span>
             <AddToCart addtocart={res}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
