"use client";
import React from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { CiEdit, CiHospital1 } from "react-icons/ci";
import { useState, useEffect } from "react";
import AddBanner from "../../components/AddBanner";
import {
  getListFromUserById,
  deleteListById,
  addNewList,
  UpdateListById,
} from "@/controller/ListController";

import {
  deleteMovieById,
  getMoviesByListId,
} from "@/controller/MovieController";

export default function Dashboard({ params }) {
  const userId = params.userId;
  const [togleList, setTogleList] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [listItems = [], setListItems] = useState([]);
  const [clickedListItem, setClickedListItem] = useState(false);
  const [listClicked, setListClicked] = useState(false);
  const [list, setList] = useState({
    list_name: "",
    user_id: userId,
    listId: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUserLists(userId);
    }
  }, [userId]);

  const fetchUserLists = async (userId) => {
    try {
      const data = await getListFromUserById(userId);
      if (data.length !== 0) {
        setUserLists(data);
      } else {
        setUserLists([]);
      }
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  const deleteList = async (id) => {
    try {
      await deleteListById(id);
      setUserLists(userLists.filter((list) => list.id !== id));
      setListItems([]);
    } catch (error) {
      console.error("Error deleting list:", error.message);
    }
  };

  const addList = async (newList) => {
    try {
      const data = await addNewList(newList);
      await fetchUserLists(list.user_id);
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Failed to add a new list", error.message);
    }
  };

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

  const getListMovieItem = async (listId) => {
    try {
      const data = await getMoviesByListId(listId);

      if (data.length !== 0) {
        setListItems(data);
      } else {
        setListItems([]);
      }
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  const deleteMovieItem = async (id) => {
    try {
      const data = await deleteMovieById(id);
      setListItems(listItems.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Error deleting list:", error.message);
    }
  };

  return (
    <div className="flex h-screen max-w-full p-1 mt-2 overflow-y-auto file:mb-8 dark:text-gray-200 overflow-clip">
      {/* list bar */}
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
          <div>
            <p>No list make 1 💪</p>
          </div>
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

      <div className="w-full h-full dark:border-gray-600">
        {togleList ? (
          <div className="flex flex-col h-full p-4 space-y-2 bg-white dark:bg-gray-800">
            <form>
              <label className="mr-2">List Name</label>
              <input
                onChange={(e) =>
                  setList({ ...list, list_name: e.target.value })
                }
                type="text"
                placeholder="e.g. Actions"
                className="p-2 rounded-lg ring ring-white focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
              />
            </form>

            <button
              onClick={() => {
                addList(list);
                setTogleList(false);
              }}
              className="underline cursor-pointer underline-offset-4 hover:underline hover:underline-offset-4"
            >
              Add List
            </button>
          </div>
        ) : (
          <div className="max-h-[75%] overflow-y-auto ">
            {listClicked &&
            Array.isArray(listItems) &&
            listItems.length !== 0 ? (
              <div className="container flex flex-col h-full p-4 space-y-6 bg-white rounded-lg dark:bg-gray-800">
                {listItems.map((item, key) => (
                  <div
                    key={key}
                    className="flex flex-row items-center space-x-2"
                  >
                    <p className="flex w-full pb-2 mt-2 text-xl font-semibold tracking-widest border-b rounded-lg">
                      {item.movie_title}{" "}
                      <MdDelete
                        size={40}
                        color="red"
                        className="ml-auto cursor-pointer hover:text-red-500 dark:hover:text-red-400"
                        onClick={() => {
                          console.log(item.id);
                          deleteMovieItem(item.id);
                        }}
                      />
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>No items in the list</div>
            )}
            {/* {listClicked && (
              <div className="flex items-center justify-center">
                <h1 className="text-transparent text-7xl bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Black Fryday Misssed ??
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-500">
                    Maybe next time 
                  </span>
                </h1>
              </div>
            )} */}
          </div>
        )}
      </div>

      {clickedListItem ? (
        <div className="flex w-1/3 h-full mx-4 ">
          <form>
            <label className="mr-2">List Name</label>
            <input
              onChange={(e) =>
                setList({ ...list, list_name: e.target.value, id: list.id })
              }
              type="text"
              value={list?.list_name || ""}
              placeholder="e.g. Actions"
              className="p-2 rounded-lg ring ring-white dark:ring-black focus:ring focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                editList(list);
                setClickedListItem(false);
              }}
              type="submit"
              className="px-16 mt-4 border rounded w-fit hover:scale-110"
            >
              Save
            </button>
          </form>
          <div className="w-1/3 mt-auto h-1/3">text</div>
        </div>
      ) : (
        <AddBanner />
      )}
    </div>
  );
}
