import React from "react";
import history from "./history";
import { Route, Router, Switch } from "react-router-dom";
import Menu from "./menu/Menu";
import LandingPage from "./LandingPage";
import ShowUser from "./user/ShowUser";
import Login from "./auth/Login";
import Register from "./auth/Register";

const routes = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route
      path="/user/:id"
      exact
      render={props => <ShowUser props={props} />}
    />
  </Switch>
);

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Menu />
        {routes()}
      </Router>
    </div>
  );
};

export default App;
