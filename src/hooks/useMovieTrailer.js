import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movie_id) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  console.log("trailerVideo:", trailerVideo);

  const getMovieVideo = async () => {
    const movieData = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movie_id +
        "/videos?language=en-US",
      API_OPTIONS
    );
    let res = await movieData.json();
    const filterData = res.results.filter((res) => res.type === "Trailer");
    const trailer = filterData[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    if (!trailerVideo) getMovieVideo();
  }, []);
};

export default useMovieTrailer;
