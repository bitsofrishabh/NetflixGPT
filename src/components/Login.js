import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { addUser } from "../utils/userSlice";
import { UserAvatar } from "../utils/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: email.current.value,
            photoURL: UserAvatar,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {});

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute w-3/12 p-12 my-36 mx-auto right-0 left-0 bg-black rounded opacity-[95%] text-zinc-50"
      >
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
          ref={email}
          className="w-full p-3 my-4 rounded-lg bg-gray-700"
          placeholder="email"
          type="email"
        />
        <input
          ref={password}
          className="w-full p-3 my-4 rounded-lg bg-gray-700"
          placeholder="password"
          type="password"
        />
        <p className="text-red-600 font-bold py-2">{errorMessage}</p>
        <button
          className="bg-red-500 w-full p-3 my-4 rounded-lg text-white"
          onClick={handleButtonClick}
        >
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
