"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BiSolidInfoCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [menuProfile, setMenuProfile] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setMenuProfile(!menuProfile);
    // console.log(menuProfile);
  };

  return (
    <div className="flex items-center justify-between max-w-6xl py-3 mx-2 sm:mx-auto">
      <div className="flex">
        <MenuItem title="Home" href="/" Icon={AiFillHome} />
        <MenuItem title="About" href="/about" Icon={BiSolidInfoCircle} />
        <MenuItem title="Contact" href="/contact" Icon={AiOutlineMail} />
      </div>
      <div className="flex items-center space-x-7">
        <DarkModeSwitch className="" />
        {session ? (
          <div>
            <CgProfile
              className="mx-4 text-2xl hover:cursor-pointer"
              onClick={handleClick}
            />
          </div>
        ) : (
          <div>
            <MenuItem title="Sign Up" href="/login" Icon={VscAccount} />
          </div>
        )}
        <Link href="/">
          <h2 className="text-2xl">
            <span className="px-2 py-1 mr-1 font-bold rounded-lg bg-amber-500">
              Movie
            </span>
            <span className="hidden px-2 py-1 text-xl font-bold rounded-lg sm:inline">
              {" "}
              IMDB
            </span>
          </h2>
        </Link>
      </div>
      {menuProfile && (
        <div
          onMouseLeave={() => {
            setMenuProfile(false);
          }}
          className="container absolute top-0 left-0 z-10 flex flex-col justify-start h-screen p-4 space-y-4 rounded-lg w-fit dark:bg-gray-400"
        >
          <Link href="/profile">
            <span className="font-semibold text-black text-md dark:text-black ">
              {" "}
              Welcome <br />
              <span className="underline underline-offset-2 decoration-slate-950">
                {JSON.stringify(session.user?.first_name).replaceAll('"', "")}
              </span>
            </span>
          </Link>
          <Link href={`/dashboard/${session?.user.id}`}>
            <span className="font-semibold text-black text-md dark:text-black">
              Lists
            </span>
          </Link>
          <Link href="/favorites">
            <span className="font-semibold text-black text-md dark:text-black ">
              Favorites
            </span>
          </Link>
          <hr />
          <div
            className="absolute flex space-x-2 text-sm duration-200 bottom-5 hover:cursor-pointer hover:text-black hover:scale-105 hover:font-semibold"
            onClick={() => {
              signOut().then(() => {
                router.push("/");
              });
            }}
          >
            <p className="dark:text-black">Log out</p>
            <IoIosLogOut className="text-2xl text-black " />
          </div>
        </div>
      )}
    </div>
  );
}
