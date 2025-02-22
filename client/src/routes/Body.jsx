import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.signin.isSignedIn);
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn]);
  return <div>body component</div>;
};

export default Body;
