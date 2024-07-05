import { Route, Switch } from "react-router-dom";

import AdminHomePage from "./component/AdminHomePage";
import ProtectedRoute from "./component/ProtectedRoute";
import AdminLogin from "./component/AdminLogin";
import AdminSignUp from "./component/AdminSignUp";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/adminLogin" component={AdminLogin} />
    <ProtectedRoute exact path="/" component={AdminHomePage} />
    <Route exact path="/adminsignup" component={AdminSignUp} />
  </Switch>
);

export default App;
