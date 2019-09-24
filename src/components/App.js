import React from "react";
import history from "./history";
import { Route, Router, Switch } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import Menu from "./menu/Menu";
import LandingPage from "./LandingPage";
import ShowUser from "./user/ShowUser";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FlashMessage from "./utility/FlashMessage";

const AuthRoute = ({ component, ...options }) => {
  const { isSignedIn } = useUserContext();
  const finalComponent = isSignedIn ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

const routes = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <AuthRoute
      path="/user/:id"
      exact
      render={props => <ShowUser props={props} />}
    />
  </Switch>
);

const App = () => {
  return (
    <div className="ui container borjessons-container">
      <Router history={history}>
        <Menu />
        <FlashMessage />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
