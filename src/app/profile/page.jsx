"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
 
  const [user, setUser] = useState({
    firstName: session?.user?.first_name || "",
    lastName: session?.user?.last_name || "",
    email: session?.user?.email || "",
  });

  if (status === "loading") {
    return <div className=""> Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  const updateUser = async () => {
    try {
      
      const updatedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: session?.user?.id,
      };

      const response = await fetch(`/api/new/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert("Saved successfully");
        // Optionally, you can perform additional actions after a successful save
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="flex flex-col items-center max-w-6xl he-screen">
      <h1 className="text-2xl ">Hello {session?.user?.first_name}</h1>
      <div className="flex flex-row p-5">
        <form className="flex flex-col mx-6 space-y-5">
          <input
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            value={user?.firstName}
            placeholder="First Name"
            className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
          />
          <input
            type="text"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            value={user?.lastName}
            placeholder="Last Name"
            className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
          />
          <input
            type="text"
            value={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
          />
        </form>
        <Image
          src="/images/popcorn.jpg"
          width={300}
          height={200}
          className="rounded-sm"
        />
      </div>
      <button
        className="p-0.5 px-10 m-1 mb-10 text-lg border border-black rounded-full hover:text-green-500 hover:cursor-pointer"
        onClick={updateUser}
      >
        Save
      </button>
    </div>
  );
}
