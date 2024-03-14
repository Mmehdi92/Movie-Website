"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ErrorAlert from "./ErrorAlert";
import SuccesAlert from "./SuccesAlert";
import { addMovieToList } from "@/controller/MovieController";
export default function AddFavoriteMovie({ movieId, movieTitle }) {
  const { data: session } = useSession();
  const [addedSucces, setAddedSucces] = useState(false);
  const [addedFailure, setAddedFailure] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [isAddToFavoritesClicked, setAddToFavoritesClicked] = useState(false);
  const [listId, setListId] = useState("");

  const toggleAddToFavorites = () => {
    setAddToFavoritesClicked(!isAddToFavoritesClicked);
  };

  useEffect(() => {
    // console.log("Session:", session);
    if (isAddToFavoritesClicked && session?.user?.id) {
      fetchUserLists(session.user.id);
    }
  }, [isAddToFavoritesClicked, session]);

  // console.log(session?.user?.id, "session?.user?.id");

  const handleListChange = (e) => {
    setListId(e.target.value);
    console.log(e.target.value);
  };

  // const addMovieToList = async () => {
  //   const newMovie = new Movie(movieId, movieTitle, listId);
  //   try {
  //     const response = await fetch(`/api/movie`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         movieTitle: newMovie.title,
  //         movieId: newMovie.id,
  //         listId: newMovie.listId,
  //       }),
  //     });
  //     // console.log(response);
  //     if (response.status === 200) {
  //       setAddedSucces(true);
  //     }
  //     return new Response(JSON.stringify(response));
  //   } catch (error) {
  //     setAddedFailure(true);
  //     return new Response(error.message, { status: 500 });
  //   }
  // };

  const addMovieOnList = async () => {
    console.log("Add movie on list", movieId, movieTitle, listId);
    const newMovie = {movieId, movieTitle, listId};
    try {
      const response = await addMovieToList(newMovie);
      if (response.status === 200) {
        setAddedSucces(true);
      }
    } catch (error) {
      console.error("Error adding movie to list:", error.message);
      setAddedFailure(true);
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
      console.log("User List Log ", data);
      setUserLists(data);
    } catch (error) {
      console.error("Error fetching user lists:", error.message);
    }
  };

  return (
    <div className="flex flex-col w-full mt-16 h-fit">
      {addedSucces ? (
        <SuccesAlert
          succesTitle={"Movie is added"}
          succesMessage={"Check your list out 😎😎"}
          onSucces={setAddedSucces}
        />
      ) : null}
      {addedFailure ? (
        <ErrorAlert
          onError={setAddedFailure}
          errorTitle={"Something went wrong"}
          errorMessage={
            "Ooopss.... try again. If the  errors keeps occuring please contact our support"
          }
        />
      ) : null}
      {session ? (
        <>
          <p
            onClick={toggleAddToFavorites}
            className="mx-auto text-2xl font-bold text-yellow-400 cursor-pointer"
          >
            Add To Favorites ⭐
          </p>

          {isAddToFavoritesClicked && (
            <div className="flex flex-row items-center justify-center ">
              <label htmlFor="favoriteLists" className="mr-2">
                Select a List:
              </label>
              {/* als er 1  lijst in die word niet geselecteerd ook niet bij default */}
              <select
                name="favoriteLists"
                id="favoriteLists"
                className="p-1 rounded-lg ring ring-white focus:ring-black focus-within:bg-gray-300 focus-within:text-black focus-within:font-semibold"
                value={listId ? listId : ""}
                defaultValue=""
                onChange={handleListChange}
              >
                <option disabled value="">
                  -- select an option --
                </option>

                {userLists && userLists.length > 1 ? (
                  userLists.map((list) => (
                    <option
                      className="text-xl"
                      key={list.id}
                      value={list.id}
                      selected={false}
                    >
                      {list.list_name}
                    </option>
                  ))
                ) : (
                  <option disabled value="">
                    No lists found
                  </option>
                )}
              </select>
              <button
                onClick={() => {
                  addMovieOnList();
                }}
                className="p-2 ml-8 text-base text-white bg-gray-500 rounded-lg hover:cursor-pointer hover:bg-green-600"
              >
                Add to your list
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/login`}
          className="items-center justify-center mx-auto text-sm font-semibold tracking-widest text-yellow-400 "
        >
          Save it for later! Log in to add to your favorites
        </Link>
      )}
    </div>
  );
}
