import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return token ? <Component {...props} /> : <Redirect to="/signin" />;
        }}
      ></Route>
    </>
  );
};

export default PrivateRoute;
