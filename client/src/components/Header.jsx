import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { userLoggedout } from "../redux/slices/signInSlice";
const Header = () => {
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);
  // const token=Cookies.get("jwt-token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt-token");
    console.log("logout clled");
    dispatch(userLoggedout());
    navigate("/login");
  };
  return (
    <div className="bg-gray-50 flex items-center z-50 relative justify-between p-4 shadow-lg">
      <h1 className="text-blue-700 text-3xl font-bold">Welcome to RuralFin</h1>
      <div>
        {isSignedIn ? (
          <button
            onClick={handleLogout}
            className="text-black text-2xl cursor-pointer font-bold"
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-18">
            <Link to="/login">
              <h1 className="text-black text-xl cursor-pointer font-semibold">
                Services
              </h1>
            </Link>
            <Link to="/login">
              <h1 className="text-black text-xl cursor-pointer font-semibold">
                About
              </h1>
            </Link>
            <Link to="/login">
              <h1 className="text-black text-xl cursor-pointer font-semibold">
                SignIn/SignUp
              </h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
