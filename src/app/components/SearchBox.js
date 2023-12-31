"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";    

export default function SearchBox() {
  const [input, setInput] = useState("");
    const router = useRouter();

    
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    if (!input) return;
    try {
        router.push(`/search/${input}`);
    } catch (error) {
        console.log(error.message); 
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between max-w-6xl px-5 mx-auto"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 w-full font-mono placeholder-gray-500 bg-transparent rounded-sm outline-none h-14"
        type="text"
        placeholder="Search your movie... "
      />
      <button disabled={!input} className="text-amber-600 disabled:text-gray-400" type="submit">
        {" "}
        Search
      </button>
    </form>
  );
}
