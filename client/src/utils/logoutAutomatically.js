import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { disconnectSocket, getSocket } from "./socket";
import { useDispatch } from "react-redux";
import { NotSignedIn } from "../redux/slices/isSignInSlice";

const logoutAutomatically = () => {
  const token = Cookies.get("token");
//   const dispatch = useDispatch();
  const location = useLocation();

  if (token) {
    if (
      location.pathname !== "/dashboard" ||
      location.pathname !== "/agentDashboard" ||
      location.pathname !== "/adminDashboard"
    ) {
      const decoded = jwtDecode(token);
      disconnectSocket();
    //   dispatch(NotSignedIn());
    //   Cookies.remove("token");
    }
  }else{
    console.log("No token found, user is not signed in.");
  }
};

export default logoutAutomatically;
