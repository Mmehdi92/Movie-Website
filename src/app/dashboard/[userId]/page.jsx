"use client";
import React from "react";
import { MdDelete, MdAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AddBanner from "../../components/AddBanner";
import {
  getListFromUserById,
  deleteListById,
  addNewList,
} from "@/controller/Listcontroller";

export default function Dashboard({ params }) {
  const { data: session, status } = useSession();
  const userId = params.userId;
  const [togleList, setTogleList] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [listItems = [], setListItems] = useState([]);
  const [user, setUser] = useState(session?.user?.first_name || "");

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
    } catch (error) {
      console.error("Error deleting list:", error.message);
    }
  };

  // const addList = async () => {
  //   try {
  //     console.log("Trying to add list:", list);

  //     const response = await fetch("/api/list", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         list_name: list.list_name,
  //         userId: list.user_id,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.status !== 201) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //     await fetchUserLists(list.user_id);
  //     console.log("Response Data:", data);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const addList = async () => {
    try {
      const data = await addNewList(list);
      await fetchUserLists(list.user_id);
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Failed to add a new list", error.message);
    }
  };

  const editList = async () => {
    try {
      const updateList = {
        listName: list.list_name,
        listId: list.id,
      };

      const response = await fetch(`/api/list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateList),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getListMovieItem = async (listId) => {
    try {
      const response = await fetch(`/api/movie/${listId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setListItems(data);
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  const deleteMovieItem = async (listId) => {
    try {
      const response = await fetch(`/api/movie/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listId),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setListItems(listItems.filter((list) => list.id !== listId));
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  return (
    <div className="flex h-screen max-w-full p-1 mt-2 ">
      {/* list bar */}
      <div className="h-full pl-5 mr-5">
        {userLists.length > 0 ? (
          <ol className="space-y-4">
            {userLists.map((list, key) => (
              <li
                key={key}
                onClick={() => {
                  setListClicked(true);
                  getListMovieItem(list.id);
                }}
                className="flex items-center space-x-3 align-middle"
              >
                <p className="tracking-wider hover:cursor-pointer">
                  {" "}
                  {list.list_name}
                </p>{" "}
                <CiEdit
                  onClick={() => {
                    setClickedListItem(!clickedListItem);
                    setList({ ...list, list_name: list.list_name });
                  }}
                  className="hover:cursor-pointer"
                />
                <MdDelete
                  className="hover:cursor-pointer"
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
          className="absolute flex items-center hover:cursor-pointer bottom-5"
        >
          {" "}
          List <MdAdd className="ml-2 text-xl" />{" "}
        </p>
      </div>

      <div className="w-full h-full border border-black">
        {togleList ? (
          <div className="flex flex-col h-full p-4 space-y-2">
            <form>
              <label className="mr-2">List Name</label>
              <input
                onChange={(e) =>
                  setList({ ...list, list_name: e.target.value })
                }
                type="text"
                placeholder="e.g. Actions"
                className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
              />
            </form>

            <button
              onClick={() => {
                addList();
                setTogleList(false);
              }}
              className="hover:cursor-pointer hover:underline hover:underline-offset-4"
            >
              Add List
            </button>
          </div>
        ) : (
          <div className="">
            {listClicked &&
            Array.isArray(listItems) &&
            listItems.length !== 0 ? (
              <div className="">
                <div className="flex flex-col h-full p-4 space-y-2">
                  {listItems.map((item, key) => (
                    <div
                      key={key}
                      className="flex flex-row items-center space-x-2"
                    >
                      <p className="flex w-full mt-2 text-xl border-b">
                        {item.movie_title}{" "}
                        <MdDelete
                          size={40}
                          color="red"
                          className="ml-auto hover:cursor-pointer"
                          onClick={() => {
                            console.log(item.id);
                            deleteMovieItem(item.id);
                          }}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>No items in the list</div>
            )}
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
              className="p-2 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                editList();
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
