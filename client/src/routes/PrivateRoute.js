import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const token = useSelector(selectToken);

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
