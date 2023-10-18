import React from "react";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BiSolidInfoCircle } from "react-icons/bi";
import {AiOutlineMail} from "react-icons/ai";
import {VscAccount} from "react-icons/vsc";
import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";




export default function Header() {
  return (
    <div className=" flex justify-between mx-2 max-w-6xl  sm:mx-auto items-center py-3 ">
      <div className="flex">
        <MenuItem title="Home" href="/" Icon={AiFillHome} />
        <MenuItem title="About" href="/about" Icon={BiSolidInfoCircle} />
        <MenuItem title="Contact" href="/contact" Icon={AiOutlineMail} />
      </div>
      <div className="flex items-center space-x-7">
        <DarkModeSwitch className="" />
        <MenuItem title="Sign Up" href="/login" Icon={VscAccount} />
        <Link href="/">
          <h2 className="text-2xl">
            <span className="font-bold  bg-amber-500 py-1 px-2 rounded-lg mr-1">
              Movie
            </span>
            <span className=" text-xl sm:inline  hidden font-bold py-1 px-2 rounded-lg">
              {" "}
              IMDB
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
