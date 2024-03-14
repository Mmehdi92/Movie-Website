"use client";
import React from "react";
import { useState } from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { useSession } from "next-auth/react";
import {
  getListFromUserById,
  deleteListById,
  UpdateListById,
} from "@/controller/Listcontroller";
export default function UserList() {
  const [clickedListItem, setClickedListItem] = useState(false);
  const [listClicked, setListClicked] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [togleList, setTogleList] = useState(false);

  // const fetchUserLists = async (userId) => {
  //   try {
  //     const data = await getListFromUserById(userId);
  //     if (data.length !== 0 ? data : []) {
  //       setUserLists(data);
  //     } else {
  //       setUserLists([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user lists:", error.message);
  //   }
  // };

  const fetchUserLists = async (userId) => {
    try {
      const data = await getListFromUserById(userId);
      setUserLists(data.length !== 0 ? data : []);
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteListById(id);
      setUserLists(userLists.filter((list) => list.id !== id));
      // setListItems([]);
    } catch (error) {
      console.error("Error deleting list:", error.message);
    }
  };

  // const addList = async (newList) => {
  //   try {
  //     const data = await addNewList(newList);
  //     await fetchUserLists(list.user_id);
  //     console.log("Response Data:", data);
  //   } catch (error) {
  //     console.error("Failed to add a new list", error.message);
  //   }
  // };

  const editList = async (updatedList) => {
    try {
      const data = await UpdateListById(updatedList);
      const UpdatedListData = await fetchUserLists(updatedList.user_id);
      if (UpdatedListData.length !== 0) {
        setUserLists(UpdatedListData);
      } else {
        setUserLists([]);
      }
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Failed to update the list:", error.message);
    }
  };

  return (
    <div className="h-full p-4 pl-5 mr-5 text-gray-700 bg-white rounded-lg dark:bg-gray-800/90 dark:text-gray-200">
      {userLists.length > 0 ? (
        <ol className="space-y-4">
          {userLists.map((list, key) => (
            <li
              key={key}
              onClick={() => {
                setListClicked(true);
                getListMovieItem(list.id);
              }}
              className="flex items-center space-x-3 align-middle cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              <p className="tracking-wider">{list.list_name}</p>{" "}
              <CiEdit
                onClick={() => {
                  setClickedListItem(!clickedListItem);
                  editList(list);
                  setList({ ...list, list_name: list.list_name });
                }}
                className="hover:text-yellow-400 dark:hover:text-yellow-400 hover:scale-150"
              />
              <MdDelete
                className="hover:text-red-500 dark:hover:text-red-400 hover:scale-150"
                onClick={() => {
                  deleteList(list.id);
                }}
              />
            </li>
          ))}
        </ol>
      ) : (
        <p>No list make 1 💪</p>
      )}
      <hr className="mt-6" />
      <p
        onClick={() => {
          setTogleList(!togleList);
        }}
        className="absolute flex items-center cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 bottom-5 hover:scale-125"
      >
        List <MdAdd className="ml-2 text-xl " />
      </p>
    </div>
  );
}
