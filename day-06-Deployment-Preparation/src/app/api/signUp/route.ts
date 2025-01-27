import { client } from "@/sanity/lib/client";
import { NextRequest,NextResponse } from "next/server";
import CryptoJS from "crypto-js";
var jwt = require("jsonwebtoken");

export  const POST = async(req:NextRequest)=>{

try{
   const body= await req.json()
const encodePass = CryptoJS.AES.encrypt(
       body.password,
       process.env.SECRET_KEY as string 
     ).toString()

   let Userinfo = {
     _type: "auth",
     email: body.email,
     password: encodePass,
     country: body.country,
     firstName: body.firstName,
     lastName: body.lastName,
     date: body.date,
   };
//  ,
   const createAccount =  await client.create(Userinfo) 
      const jwtsign = jwt.sign({name:createAccount.firstName, email:createAccount.email,id:createAccount._id},process.env.JWT_SECRET_KEY,{
       expiresIn: "1d"}) 
    return NextResponse.json({ success: true, token:jwtsign });

}catch(e){

    return NextResponse.json("Error occured while creating an account"+e)
}
}