import Link from "next/link";

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center m-[50px] overflow-hidden ">
      <div className="w-full p-6 border-2 border-gray-500 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Log in</h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
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
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <span className="text-blue-400 hover:underline hover:cursor-pointer text-sm">Forgot Password</span>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
      
            <span className="text-blue-400 hover:underline hover:cursor-pointer">Sign up</span>
         
        </p>
      </div>
    </div>
  );
}