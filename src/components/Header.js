import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
 
  const user = useSelector((store) => store.user);
  console.log("user:", user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute px-8 py-6 bg-gradient-to-b from-black z-10 flex justify-between w-[100%]">
      <img
        className="w-44"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex">
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
