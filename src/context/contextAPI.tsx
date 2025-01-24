"use client"
import { products } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
var jwt = require("jsonwebtoken");

type children = {
  children: React.ReactNode;
}

// type context = {
//  [key:string]:any
// }

 
export const AppContext = createContext<any>(null)

export function AppWrapper({children}:children){
const [shoppingCart, setShoppingCart] = useState<products[]>([]);
const [subtotal, setSubtotal] = useState(0);
const [color, setColor] = useState('');
const [wishlist, setWishlist] = useState([]);
const [search, setSearch] = useState(false)  
const [filter, setFilter] = useState(false)  
 const param = useParams();
 const Pathname = usePathname();
 const router = useRouter();

 useEffect(() => {
   const checkTokenAndLogout = () => {
     const token = localStorage.getItem("token");
     //  console.log("Current Token:", token);

     if (token) {
       const decoded = jwt.decode(token);
       const isExpired = decoded.exp * 1000 < Date.now();

       if (isExpired) {
         console.log("Token expired. Logging out...");
         localStorage.removeItem("token");
         router.push("/login");        }
     }
   };

   checkTokenAndLogout();
 }, [param, Pathname]);


//  Check if localStorage is available
  const is = typeof window !== "undefined" ? window.localStorage : null;

  const ClearCart = () => {
    setShoppingCart([]); 
    // setWishlist([]);
    localStorage.removeItem("shoppingCart"); 
    localStorage.removeItem("subtotal"); 
    // localStorage.removeItem("wishlist")
  };

const CalculateAndSaveSubtotal = (totalprice:products[]) => {
  let subtotal = 0; 


  for (let item of totalprice) {
    subtotal += item.price * item.qty; 
  }
  localStorage.setItem("subtotal", JSON.stringify(subtotal));
  setSubtotal(subtotal);
};


const saveCartToLocalStorage = (cart:products[]) => {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
};

 const saveWishListToLocalStorage = (wishlist:products[]) => {
   localStorage.setItem("wishlist", JSON.stringify(wishlist));
 };


const AddToCart = (item:products)=>{

setShoppingCart((prev):any => {

let existingItem = prev.find((v:products)=> v._id === item._id)
let updatedCart; 
if(existingItem){

updatedCart = prev.map((v:products)=> v._id === item._id ? {...v, qty: v.qty + 1} : item)

}else{
updatedCart = [...prev ,{...item, qty: 1 }]

}
saveCartToLocalStorage(updatedCart);
CalculateAndSaveSubtotal(updatedCart);

return updatedCart; 
  })

}

const deleteItem = (item:products) =>{
setShoppingCart((prev):any =>{
 const removeItem = prev.filter((v:products)=> v._id !== item._id) 
saveCartToLocalStorage(removeItem);
CalculateAndSaveSubtotal(removeItem);

return removeItem

})

}

const addToWishlist = (item:products) => {
  setWishlist((prev):any => {
    const newWishlist = [...prev, item];
    // Save to local storage after updating state
    saveWishListToLocalStorage(newWishlist);
    return newWishlist;
  });
};

  const removeFromWishlist = (itemId:string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item:products) => item._id !== itemId);
      saveWishListToLocalStorage(newWishlist); // Save to local storage after removal
      return newWishlist;
    });
  };
 useEffect(() => {
   try {
     // Load cart from localStorage
     if (is && is.getItem("shoppingCart")) {
       const cart = JSON.parse(is.getItem("shoppingCart") as string);
       setShoppingCart(cart);
     }

     // Load subtotal from localStorage
     if (is && is.getItem("subtotal")) {
       const savedSubtotal = JSON.parse(is.getItem("subtotal") as string);
       setSubtotal(savedSubtotal);
     }
     if (typeof window !== "undefined") {
       const storedWishlist = localStorage.getItem("wishlist");
       if (storedWishlist) {
         setWishlist(JSON.parse(storedWishlist));
       }
     }
   } catch (error) {
     console.error("Error loading cart from localStorage:", error);
     ClearCart(); // Clear the cart if there's an error
   }
 }, []);


return (
  <AppContext.Provider
    value={{
      shoppingCart,
      setShoppingCart,
      color,
      setColor,
      AddToCart,
      subtotal,
      deleteItem,
      addToWishlist,
      wishlist,
      setWishlist,
      removeFromWishlist,
      ClearCart,
      setSearch,
      search,
      filter,
      setFilter,
    }}
  >
    {children}
  </AppContext.Provider>
);

}

export default function useAppContext() {
  return useContext(AppContext);
}