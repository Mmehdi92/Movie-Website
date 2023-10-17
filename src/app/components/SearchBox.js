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
      className="flex max-w-6xl mx-auto justify-between items-center px-5"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-14 flex-1 rounded-sm font-mono placeholder-gray-500 outline-none bg-transparent"
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
