import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { userLoggedout } from "../redux/slices/signInSlice";
const Header = () => {
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);
  // const token=Cookies.get("jwt-token");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt-token");
    console.log("logout clled")
    dispatch(userLoggedout());
    navigate("/login");
  };
  return (
    <div className="bg-blue-600 flex justify-between p-4 shadow-md">
      <h1 className="text-white text-3xl font-bold">Welcome to RuralFin</h1>
      <div>
        {isSignedIn ? (
            <button onClick={handleLogout} className="text-white text-2xl cursor-pointer font-bold">Logout</button>
        ) : (
          <Link to="/login">
            <h1 className="text-white text-xl cursor-pointer font-bold">
              SignIn/SignUp
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
