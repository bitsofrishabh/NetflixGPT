import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="netflix-background"
        />
      </div>
      <form className="absolute w-3/12 p-12 my-36 mx-auto right-0 left-0 bg-black rounded opacity-[95%]">
        <p className="text-4xl font-bold py-3 mb-4 text-white">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </p>
        {!isSignInForm && (
          <input
            className="w-full p-3 my-4 rounded-lg bg-gray-700"
            placeholder="Full Name"
            type="text"
          />
        )}
        <input
          className="w-full p-3 my-4 rounded-lg bg-gray-700"
          placeholder="email"
          type="email"
        />
        <input
          className="w-full p-3 my-4 rounded-lg bg-gray-700"
          placeholder="password"
          type="password"
        />
        <button className="bg-red-900 w-full p-3 my-4 rounded-lg text-white">
          Submit
        </button>
        <p
          className="text-lg font-bold py-3 my-4 text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix. Sign up Now" : "Already Registered"}
        </p>
      </form>
    </div>
  );
};

export default Login;
