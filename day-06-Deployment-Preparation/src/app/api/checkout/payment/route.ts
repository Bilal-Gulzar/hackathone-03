import { client } from "@/sanity/lib/client";
import { products } from "@/types";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SK);

export const POST = async (req:NextRequest) => {
  try {
    const { shoppingCart, email, firstName,lastName, phone,postalCode , city, country, address } =
      await req.json();
    let name = firstName+ " "+lastName
    const orderDoc = await client.create({
      _type: "order",
      customerEmail: email,
      customerName: name,
      phone: phone,
      shippingAddress: address,
      postalCode: postalCode,
      city: city,
       orderItems: shoppingCart.map((item: products) => ({
        productName: item.productName,
        description: item.description,
        color: item.color,
        id: item._id,
        category: item.category,
        image: item.image.asset._ref
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: item.image.asset._ref,
              },
            }
          : null,
        quantity: item.qty || 1,
        price: item.price || 0,
      })),
      paid: false,
      country: country,
      totalAmount: 0,
      status: "pending",
    });
    // console.log(orderDoc.totalAmount,"subbefore")

    let stripLineItems = [];
    let Subtotal = 0;
    for (const cartProduct of shoppingCart) {
        let productPrice = 0;
        let query = `*[_type == "product" && _id == "${cartProduct._id}"][0]`
        let productInfo = await client.fetch(query);
        productPrice += productInfo.price * cartProduct.qty;
        Subtotal += productInfo.price * cartProduct.qty;
      await client.patch(productInfo._id).set({inventory:productInfo.inventory - cartProduct.qty}).commit();

      let productName = cartProduct.productName;
      stripLineItems.push({
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: productName,
          },
          unit_amount: productPrice * 100,
        },
      });
    }
      let documentId = orderDoc._id;
      let updatedData = {
        totalAmount: Subtotal,
      };
     await client.patch(documentId).set(updatedData).commit();
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripLineItems,
      mode: "payment",
      customer_email: email,
      success_url:
        process.env.NEXT_PUBLIC_HOST +
        "/orders/" +
        orderDoc._id +
        "?clear-cart=1",
      cancel_url: process.env.NEXT_PUBLIC_HOST + "/orders?canceled=1",
      metadata: { orderId: orderDoc._id.toString()},
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "INR" },
          },
        },
      ],
    });
    return NextResponse.json(stripeSession.url);
  } catch (e) {
    console.log("error while creating an invoice", e);

    return NextResponse.json(e);
  }
};
