import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/GPTSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearchView());
  };

  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute px-8 py-6 bg-gradient-to-b from-black z-10 flex justify-between w-[100%]">
      <img className="w-44" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={handleGPTSearch}
          >
          {showGPTSearch?'Home Page':'GPT Search'}  
          </button>
          <img className="w-12 " src={user?.photoURL} alt="Netflix Logo" />
          <button className="font-bold px-2 text-white" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
