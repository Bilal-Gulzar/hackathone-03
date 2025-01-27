import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const GET  = async (req:NextRequest)=>{
try{
const url = new URL(req.url);
const categories:string[] = url.searchParams.getAll("category") || [];
const minPrice = url.searchParams.get("minPrice");
const maxPrice  = url.searchParams.get("maxPrice");
const minPriceNum = minPrice ? Number(minPrice) : null;  
const maxPriceNum = maxPrice ? Number(maxPrice) : null;  

let query = `*[_type == "product"`

  if (categories && categories.length !== 0) {
    query += `&& category in [${categories.map((cat) => `"${cat}"`).join(", ")}]`;
  }

if ( minPrice != "undefined"  &&  maxPrice != "undefined") {
  query += `&& price >= ${minPriceNum} && price <= ${maxPriceNum}`;

} else if (minPrice != "undefined") {
  query += `&& price <= ${minPriceNum} `;


} else if (maxPrice != "undefined") {
  query += ` && price >= ${maxPriceNum} `;


}

query += `]`;

const products = await client.fetch(query)

return NextResponse.json(products);


}catch(error){

return NextResponse.json("Error occured while fetching data"+error)

}

}