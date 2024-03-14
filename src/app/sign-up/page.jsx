"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/new/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status === 201) {
        alert("Account Created Successfully");
        router.push("/login");
       
      } else {
        alert("Something went wrong");
      }
  
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    router.push("/login");
  };

  return (
    <div className="relative flex flex-col items-center justify-center m-[50px] overflow-hidden ">
      <div className="w-full p-6 bg-white border-2 border-gray-500 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Create an account 😎🍿
        </h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input
              type="text"
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button
              onClick={handlesubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
