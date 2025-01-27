import HeroSection from "@/components/heroSection/heroSection";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Homecart from "@/components/homeCart/homecart";
import HomePageImges from "@/components/homethreeImges/homePageImges";
import Link from "next/link";
import DynamicContent from "@/components/dynamicContent/dynamicContent";
import { client } from "@/sanity/lib/client";

export default  async function Home() {
const query = `*[_type == "product"][0...5]{
  productName,
  price,
  category,
  _id,
  "image":image.asset->url
  }`

 const res = await client.fetch(query)
 
   return (
    <div>
      {/* herosection */}
      <HeroSection />
     <DynamicContent data={res} />
      <section className="px-10 pt-24">
        <div className="text-[15px] mb-5 font-[500]">Featured</div>
        <div className="max-w-[1344px] ">
          <Image
            src="/manwalk.jpg"
            width={1344}
            height={1344}
            alt="man while walking"
          />
        </div>
      </section>
      <section>
        <div className="text-[15px] px-5 gap-6 my-12 font-[500] flex flex-col  items-center">
          <h2 className="md:leading-[60px] text-center text-4xl md:text-[56px] ">
            STEP INTO WHAT FEELS GOOD
          </h2>
          <p className="font-[400] max-w-[511px] text-center">
            Cause everyone should know the feeling of running in that perfect
            pair.
          </p>
          <div className="">
            <Link href="/allProducts">
              <Button variant="default">Find Your Shoe</Button>
            </Link>
          </div>
        </div>
      </section>
      <div>
        <Homecart />
      </div>
      <section className="mt-24 px-10">
        <div className=" text-[22px] mb-5">Don't Miss</div>
        <div className="max-w-[1344px]">
          <Image
            src="/FullImg.jpg"
            width={1344}
            height={1344}
            alt="man while walking"
          />
          <div className="text-[15px] px-5 gap-6 my-12 font-[500] flex flex-col  items-center">
            <h2 className="md:leading-[60px] text-center text-4xl md:text-[56px] ">
              FLIGHT ESSENTIALS
            </h2>
            <p className="font-[400] max-w-[511px] text-center">
              Your built-to-last, all-week wears—but with style only Jordan
              Brand can deliver.
            </p>
            <div className="">
            <Link href="/allProducts">
              <Button variant="default">Shop</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HomePageImges />
    </div>
  );
}
