"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LoginPage() {
 const [email,setEmail] = useState<string>('')
 const [password,setPassword] = useState<string>('')
 const [disabledbtn, setDisabledbtn] = useState<boolean>(false)
  const router = useRouter();

const Login = async (evt: React.FormEvent<HTMLFormElement>) => {
   evt.preventDefault();
   setDisabledbtn(true);
   let data = { email,password};
   let res = await fetch("/api/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
   });
   setDisabledbtn(false);
   let json = await res.json()
  if(json.success){
     localStorage.setItem("token",json.token)
     toast.success("You have successfully logged in")
     router.push('/')
 }else{
 toast.error("INVALID CREDENTIALS")

 }
 setEmail('')
 setPassword('')
}

useEffect(()=>{

if(localStorage.getItem('token')){
router.push('/')

}

},[])

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="Frame.jpg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            YOUR ACCOUNT
            <br /> FOR EVERYTHING <br /> NIKE
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={Login} method="POST" className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Email address"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex -mt-2 items-center justify-between"></div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password || ''}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="sm:flex items-center gap-2  hidden">
                <input type="checkbox" />
                <p className="text-[12px] text-[#8D8D8D]">Keep me signed in</p>
              </div>
            </div>
            <div className="text-[12px] text-center max-w-[279px] mx-auto text-[#8D8D8D]">
              By logging in, you agree to Nike's{" "}
              <span className="underline">Privacy Policy</span> and
              <span className="underline">Terms</span> of Use.
            </div>
            <div>
              <button
              disabled={disabledbtn}
                type="submit"
                className="flex w-full disabled:bg-black/70 justify-center rounded-md bg-black px-3 h-[40px]  items-center  text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link href="/joinUs" className="font-semibold text-black underline">
              Join Us.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage