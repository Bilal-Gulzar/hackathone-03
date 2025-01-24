"use client"
import React, { useEffect, useState } from 'react'
import useAppContext from '@/context/contextAPI';

function Color({colors}:{colors:string[]}) {
    const {setColor} = useAppContext() 
    const [select,setSelect] = useState(colors[0])
    
    useEffect(()=>{
      setColor(colors[0])
    },[])
  return (
    <section>
      <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
        <div className="flex gap-1">
          <span className="mr-3">Color</span>

          {colors && colors.length > 0 && colors.map((color:string,index:number)=>((
              <button
               onClick={()=>{setSelect(color),setColor(color)}}
                style={{
                  backgroundColor: color,
                }}
                key={index}
                className={`border-2 border-gray-300  ${color == select ? "ring-2 ring-black" : ""}  rounded-full w-6 h-6 focus:outline-none`}
              ></button>
            )))}
        </div>
      </div>
    </section>
  );
}

export default Color