'use client'
import React,{ useEffect } from "react"

export default function Error({ error, reset}) {

useEffect(() => {
    console.log(error);
},[error]);
  
    
  return (
    <div className="text-center mt-10 text-4xl "> 
        <h1 className="text-red-700 my-10">Something went wrong</h1>
        <button className="hover:bg-red-500 p-3 rounded-lg " onClick={()=> reset()}>Try Again</button>
    </div>
  )
}
