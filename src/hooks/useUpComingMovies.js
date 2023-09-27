import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

//Create custom hooks to handle api calls and separte it from compones
//hooks are just javascript functions
const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const getMoviesList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const response = await data.json();
    console.log("response:", response.results);
    dispatch(addUpComingMovies(response.results));
  };

  useEffect(() => {
    getMoviesList();
  }, []);
};

export default useUpComingMovies;
