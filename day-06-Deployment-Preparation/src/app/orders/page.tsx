"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Loading from './loading';
import useAppContext from '@/context/contextAPI';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
var jwt = require("jsonwebtoken");

type Items = {
  productName: string;
  id: string;
 image:string;
  category: string;
  color: string;
  price: number;
  quantity: number;
};
export type order = {
  customerEmail: string;
  customerName: string;
  orderItems: Items[];
  status: string;
  paid: string;
  phone: string;
  postalCode: string;
  country: string;
  shippingAddress: string;
  totalAmount: number;
  _id: string;
  _createdAt: string;
};


export default function Orders() {
const[orders,setOrders] = useState([])
  const {ClearCart} = useAppContext()
  const router =  useRouter()

const [loading,setLaoding] = useState(true)

  useEffect(()=>{
const token =  localStorage.getItem('token')
if(token){
 const  decode = jwt.decode(token) 
 fetch("/api/orders?email=" + decode.email)
   .then((res) =>res.json())
   .then((data) => {
     if (data && data.length > 0) {
       setOrders(data);
      setLaoding(false); 

     } else {
       setOrders([]);
      setLaoding(false); 

     }
   })
   .catch((error) => {
     console.error("Error fetching orders:", error); // Handle fetch errors
     setOrders([]); // Optionally set empty array on error
   });
}else{
  router.push('/login')
} 

  if (typeof window !== "undefined") {
    if (window.location.href.includes("canceled=1")) {
      ClearCart();
      toast.error("Order canceled.");
    }
  }

  },[])
  return (
    <div>
      <section className="py-24 relative">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
              Your order history
            </h2>
            
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
             {orders && orders?.length > 0 ? "Thanks for making a purchase you can check your order summary from below" : "You haven't placed an order yet. Go to the product page to make a purchase"}
            </p>
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="w-full px-3 min-[400px]:px-6">
                {orders && orders?.length > 0 ? (
                  orders.map((item: order) => (
                    <Link
                      href={`orders/${item._id}`}
                      key={item._id}
                      className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                    >
                      <div className="img-box max-lg:w-full">
                        <img
                          src={item.orderItems[0]?.image}
                          alt={item.orderItems[0]?.productName || "image"}
                          className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex flex-row items-center w-full ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                          <div className="flex items-center">
                            <div className="">
                              <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                {item.orderItems[0]?.productName}
                              </h2>
                              <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                {item.orderItems[0]?.category}
                              </p>
                              <div className="flex items-center ">
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Color:{" "}
                                  <span className="text-gray-500">
                                    {item.orderItems[0]?.color}
                                  </span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black ">
                                  Qty:{" "}
                                  <span className="text-gray-500">
                                    {item.orderItems[0]?.quantity}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5">
                            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">
                                  price
                                </p>
                                <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                  $
                                  {item.orderItems[0]?.quantity *
                                    item.orderItems[0]?.price}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">
                                  shipping Status
                                </p>
                                <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                  {item.status}
                                </p>
                              </div>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                  Payment Status
                                </p>
                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                  {item.paid ? "paid" : "unpaid"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-3xl flex justify-center font-medium bg-gray-100 mx-5 p-5">
                    No order Yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
