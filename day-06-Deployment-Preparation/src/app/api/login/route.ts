import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(req:NextRequest) {
  const body = await req.json();
  try {
     let query = `*[_type == "auth" && email == "${body.email}"][0]`
    let User = await client.fetch(query);
    if (User) {
      var bytes = CryptoJS.AES.decrypt(User.password, process.env.SECRET_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (User.email === body.email && originalText === body.password) {
        var token = jwt.sign(
          {
            name: User.firstName,
            email: User.email,
            id: User._id
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return NextResponse.json({ success: true, token });
      } else {
        return NextResponse.json({
          success: false,
          error: "Invalid Credentials",
        });
      }
    } else {
      return NextResponse.json({ success: false, error: "User Not found" });
    }
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Internal serval Error" });
  }
}
