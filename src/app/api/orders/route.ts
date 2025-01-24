import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest)=>{
try{
const url = new URL(req.url)
const session =  url.searchParams.get('email')
const query = `*[_type == "order" && _id  == "j9x2C1MXzEn1Hzo4Lb4XN8" 
 ]{
...,
orderItems[]{
...,
"image":image.asset->url
}
 }`;
 const getOrders = await client.fetch(query)
 if(getOrders){
return NextResponse.json(getOrders);
 }else{
return NextResponse.json(null);  
 }
}catch(e){
return NextResponse.json(e)

}


}  