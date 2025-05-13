import Cookie from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NotSignedIn } from "../redux/slices/isSignInSlice";
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      navigate("/login");
      dispatch(NotSignedIn());
    }
  }, []);
};
export default useAuth;
