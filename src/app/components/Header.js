import React from "react";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BiSolidInfoCircle } from "react-icons/bi";
import Link from "next/link";
export default function Header() {
  return (
    <div className=" flex justify-between mx-2 max-w-7xl sm:mx-auto items-center py-3">
      <div className="flex">
        <MenuItem title="Home" href="/" Icon={AiFillHome} />
        <MenuItem title="About" href="/about" Icon={BiSolidInfoCircle} />
      </div>
      <div className="">
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold  bg-amber-500 py-1 px-2 rounded-lg mr-1">
              Movie
            </span>
            <span className=" text-xl sm:inline  hidden font-bold py-1 px-2 rounded-lg">
              {" "}
              Website
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
