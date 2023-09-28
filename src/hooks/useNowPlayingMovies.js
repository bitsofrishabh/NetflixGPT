import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

//Create custom hooks to handle api calls and separte it from compones
//hooks are just javascript functions
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const response = await data.json();
    const shuffledResponse = response.results.sort(() => Math.random() - 0.5);
    dispatch(addNowPlayingMovies(shuffledResponse));
  };

  useEffect(() => {
    if (!nowPlayingMovies) getMoviesList();
  }, []);
};

export default useNowPlayingMovies;
