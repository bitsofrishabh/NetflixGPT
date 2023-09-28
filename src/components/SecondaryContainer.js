import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlaying = useSelector((store) => store.movies?.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);

  return (
    <div className="bg-black">
      <div className=" -mt-64  pl-4 relative z-20">
        <MovieList title={"Now Playing"} movies={nowPlaying} />
        <MovieList title={"Top Rated"} movies={topRatedMovies} />
        <MovieList title={"Popular"} movies={popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={upcomingMovies} />
        {/* <MovieList title={"Horror"} movies={movies} /> */}
      </div>
    </div>
  );
};

export default SecondaryContainer;
