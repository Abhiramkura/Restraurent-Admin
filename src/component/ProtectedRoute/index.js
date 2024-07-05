import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/adminlogin" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
