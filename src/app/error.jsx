'use client'
import React,{ useEffect } from "react"

export default function Error({ error, reset}) {

useEffect(() => {
    console.log(error);
},[error]);
  
    
  return (
    <div className="mt-10 text-4xl text-center "> 
        <h1 className="my-10 text-red-700">Something went wrong</h1>
        <button className="p-3 rounded-lg hover:bg-red-500 " onClick={()=> reset()}>Try Again</button>
    </div>
  )
}
