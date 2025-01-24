import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req:NextRequest) {
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (error) {
    console.error("stripe error");
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      await client.patch(orderId).set({ paid: true }).commit();

    }
  }

  return NextResponse.json(event, { status: 200 });
}
