import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Pages/Redux/Slice/AuthSlice";
const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};
