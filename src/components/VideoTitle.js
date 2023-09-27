import React from "react";

const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[17%] px-20 absolute bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold  text-white">{original_title}</h1>
      <p className="text-md w-1/4 my-4 text-white">{overview}</p>
      <div className="">
        <button className="text-xl text-black p-4 px-12 rounded bg-white hover:bg-opacity-80  ">
          ▶️ Play
        </button>
        <button className=" mx-2 text-xl text-white p-4 px-12 rounded bg-gray-400 bg-opacity-50  ">
          ℹ️ Show More
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
