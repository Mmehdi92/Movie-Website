"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession() || {};
  

  const router = useRouter();
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: "",
  });


  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log('on is waty')
    const callback = await signIn( "credentials", {
      ...userCredentials,
      redirect: false,
     
    });
    console.log(callback, 'callback');
    if (callback.error) {
      alert(callback.error);
    }

    if (callback.ok) {
    
      alert("Login successful!");
      console.log(JSON.stringify(session), 'session');
       router.push("/profile");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center m-[50px] overflow-hidden ">
      <div className="w-full p-6 bg-white border-2 border-gray-500 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Log in</h1>
        <form onSubmit={handleLogIn} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setuserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                });
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
                setuserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                });
              }}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <span className="text-sm text-blue-400 hover:underline hover:cursor-pointer">
            Forgot Password
          </span>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Dont have an account?{" "}
          <Link
            href={"/sign-up"}
            className="text-blue-400 hover:underline hover:cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
