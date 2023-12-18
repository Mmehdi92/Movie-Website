"use client";
import React from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";

export default function Dashboard() {
  const [list, setList] = useState({
    listName: "",
  });
  const [togleList, setTogleList] = useState(false);

  const handleClickAddList = () => {
    console.log("add list");
  };

  return (
    <div className="flex h-screen max-w-full p-1 mt-2 ">
      {/* list bar */}
      <div className="h-full pl-5 mr-5">
        <ol className="space-y-4">
          <li className="flex items-center space-x-3 align-middle">
            <p>Actions</p>
            <CiEdit />
            <MdDelete />
          </li>
          <li className="flex items-center space-x-3 align-middle">
            <p>Actions</p>
            <CiEdit />
            <MdDelete />
          </li>
          <li className="flex items-center space-x-3 align-middle">
            <p>Actions</p>
            <CiEdit />
            <MdDelete />
          </li>
          <li className="flex items-center space-x-3 align-middle">
            <p>Actions</p>
            <CiEdit />
            <MdDelete />
          </li>
          <li className="flex items-center space-x-3 align-middle">
            <p>Actions</p>
            <CiEdit />
            <MdDelete />
          </li>
        </ol>
        <hr className="mt-6" />
        <p
          onClick={(prev) => {
            setTogleList(!togleList);
          }}
          className="absolute flex items-center hover:cursor-pointer bottom-5"
        >
          {" "}
          List <MdAdd className="ml-2 text-xl" />{" "}
        </p>
      </div>
      {/* list results */}
      <div className="w-full h-full border border-black">
        {togleList ? (
          
            <div className="flex flex-col h-full p-4 space-y-2">
                <label className="mr-2">List Name</label>
              <input
                type="text"
                placeholder="e.g. Actions"
                className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
              />
             
              <button onClick={()=>{
                    setTogleList(false)
              }} className=" hover:cursor-pointer hover:underline hover:underline-offset-4">Add List</button>
            </div>
          
        ) : (
          <div>
            {/* show results or a standard template */}
            que pasando
          </div>
        )}
      </div>
    </div>
  );
}
