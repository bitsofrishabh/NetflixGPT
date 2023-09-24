import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import { addUser } from "../utils/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const navigate = useNavigate();

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
            photoURL:
              "https://lh3.googleusercontent.com/pw/ADCreHdSQVB7-5rXYDmhMOw4c1tNRcJWF141zKksrBW9elL8M7S5hJRVJBRIhQdttqM7mTvtPzYxM7ExbzG7L_E5P6RO1AItpbCgd7gDBqelsV_XDDVqDH8Uw90_RyCYaqtI3y-g5WtEFzdWagPOeS_lpPB0zAa3_OUJR3MrP0mpNerUFJbl2aMh24MAzaVc1lu0tJA6gcbAIen4rzfl3xJ2LmQRJBsjwXDyYR4DDsZNvc9MJoDKlQ8XvdmSghPiSKc21JdNYSrWzBh_atFlFhsYzjEHZS3zrLB8bd_zhA_Nm1gHQs1WYJ_3CiHTRd4t0vcka5Qi4K0WsdSxOgTpOt2eNdSKk9PV2tWMJqfwlpmGt8SG2qtsQrmy9RvgjWSDW7EpIk7kgOeutZlbflLzW8m8D89xDwRg5jKa-Dp5_wQhBa0duKOvf611x3-p3zUNifpRnJZ1EB0tMORQ9TMn83lc_sGKgTETOzcvqtDzS79_7os2_GMJYjiV60Yv27eM7NPhI6EVp_uSH-jxxt87ABWnb1QdxzH-cSK_2ImPbQ9OW7hQ-OVnxyn0VJLWaxRJ5Bivq2Pdnl25WcvUmADVr8OklBOV2W9nwlrvVJihNQxS4OVL4gipwYX727aJAzYa1Xvd2kmYNkKtyEheaur1eeKvfDdr44Ajv_xPxT6BODJh1Qbdswh6kla5k-PdWy22F8KV8LOnOa2tggqP0heBkHk3z0k07Gqw3_-4JpXIlIfEqF_l4gBfBDg8jrYz7Wd9f0Dcu9toDWD2fCepzMqlpTT4lUTQWpYH0GA1C2BQswKaICOdtvvci-aqp2UHZmoF1-fcly58qtTbaBTichwYWdWO_KQAKx25yAiAGNqjHUG85YaqnzYdNYdKHxwQnv6ApjF5hinUyrMIqvvnl1wwE4eoaWfV9NM=w1340-h1786-s-no?authuser=0",
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
              navigate("/browse");
            })
            .catch((error) => {});

          console.log("user:", user);
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
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log("user:", user);
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
