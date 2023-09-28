import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import openAI from "../utils/openAI";
import React, { useRef } from "react";
import { addGPTMoviesResult } from "../utils/GPTSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearch = async () => {
    const query =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ".Limit the search to only 5 movies with comma separated like the example given ahead. Example Result: Gadar, Sholay,Don,koi mil gaya, Golmal";

    const gptResults = await openAI.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    console.log("gptMovies:", gptMovies);
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGPTMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    console.log("tmdbResults:", tmdbResults);
  };

  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className="bg-black  w-1/2 grid grid-cols-12  rounded-lg "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className=" m-4 p-4 rounded-lg col-span-9"
          placeholder="What do you want to watch today!!!"
        />
        <button
          className="text-white m-4 py-2 px-4 col-span-3 rounded-lg bg-red-700"
          onClick={handleGPTSearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
