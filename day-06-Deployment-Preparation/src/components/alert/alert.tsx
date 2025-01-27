"use client"
import useAppContext from "@/context/contextAPI";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


function Alert() {
  const { ClearCart } = useAppContext()
  const router = useRouter()
     useEffect(() => {
       if (typeof window !== "undefined") {
         if (window.location.href.includes("clear-cart=1")) {
           ClearCart();
           toast.success("Thank you for your order.");
         }
       }
if(!localStorage.getItem('token')){
    router.push('/login')
}
 }, []);

     return null
}

export default Alert
