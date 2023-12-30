"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AddFavoriteMovie({
  imgURL,
  movieId,
  movieTitle,
  movieOverview,
}) {
  const { data: session } = useSession();
  const [userLists, setUserLists] = useState([]);
  const [isAddToFavoritesClicked, setAddToFavoritesClicked] = useState(false);
  const [listId, setListId] = useState("");

  const toggleAddToFavorites = () => {
    setAddToFavoritesClicked(!isAddToFavoritesClicked);
  };

  useEffect(() => {
    console.log("Session:", session);
    if (isAddToFavoritesClicked && session?.user?.id) {
      fetchUserLists(session.user.id);
    }
  }, [isAddToFavoritesClicked, session]);

  console.log(session?.user?.id, "session?.user?.id");

  const handleListChange = (e) => {
    setListId(e.target.value);
    console.log(e.target.value);
  };

  const addMovieToList = async () => {
    try {
      const response = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          movieTitle: movieTitle,
          userId: session?.user?.id,
          listId: listId,
        }),
      });

      const data = await response.json();
      if(data.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      return new Response(error.message, { status: 500 })
    }
  };

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
      {session ? (
        <>
          <p
            onClick={toggleAddToFavorites}
            className="mx-auto text-2xl font-bold text-yellow-400 cursor-pointer"
          >
            Add To Favorites ⭐
          </p>
          {/* <div className="">
            <p className="text-2xl font-bold">{movieTitle}</p>
            <p className="text-xl">{movieOverview}</p>
            <p className="text-xl text-red-500">{movieId}</p>

            <Image
              src={`https://image.tmdb.org/t/p/original/${imgURL}`}
              height={500}
              width={500}
            />
          </div> */}

          {isAddToFavoritesClicked && (
            <div className="flex flex-row items-center justify-center ">
              <label htmlFor="favoriteLists" className="mr-2">
                Select a List:
              </label>
              <select
                name="favoriteLists"
                id="favoriteLists"
                className="p-1 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
                value={listId}
                onChange={handleListChange}
              >
                {userLists.map((list) => (
                  <option className="text-xl" key={list.id} value={list.id}>
                    {list.list_name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  addMovieToList();
                }}
                className="p-2 ml-8 text-base text-white bg-gray-500 rounded-lg hover:cursor-pointer hover:bg-green-600"
              >
                Add to your list
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Login to add to your favorites</p>
      )}
    </div>
  );
}
