import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

//Create custom hooks to handle api calls and separte it from compones
//hooks are just javascript functions
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const response = await data.json();
    dispatch(addPopularMovies(response.results));
  };

  useEffect(() => {
    if (!popularMovies) getMoviesList();
  }, []);
};

export default usePopularMovies;
