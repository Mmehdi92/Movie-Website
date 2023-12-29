"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AddFavoriteMovie() {
  const { data: session, status } = useSession();
  const [userLists, setUserLists] = useState([]);
  const [isAddToFavoritesClicked, setAddToFavoritesClicked] = useState(false);

  const toggleAddToFavorites = () => {
    setAddToFavoritesClicked(!isAddToFavoritesClicked);
  };

  useEffect(() => {
    if (isAddToFavoritesClicked && session?.user?.id) {
      fetchUserLists(session.user.id);
    }
  }, [isAddToFavoritesClicked, session]);

  const fetchUserLists = async (userId) => {
    try {
      const response = await fetch(`/api/list/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setUserLists(data);
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  return (
    <div className="flex flex-col w-full mt-16 h-fit">
      <p
        onClick={toggleAddToFavorites}
        className="mx-auto text-2xl font-bold text-yellow-400 cursor-pointer"
      >
        Add To Favorites ⭐
      </p>
      {isAddToFavoritesClicked && (
        <div className="flex flex-row items-center">
          <label htmlFor="favoriteLists" className="mr-2" >
            Select a List:
          </label>
          <select
            name="favoriteLists"
            id="favoriteLists"
            className="p-1 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
          >
            {userLists.map((list) => (
              <option className="text-xl" key={list.id} value={list.id}>
                {list.list_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
