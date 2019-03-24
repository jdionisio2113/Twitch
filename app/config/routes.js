import React from "react";
import Home from "../components/App";
import Categories from "../components/Categories";
var ReactRouter = require("react-router-dom");
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/new"
          component={Categories}
          // render={props => <Categories {...props} games={true} />}
          // render={props => <Categories {...props} twitchData={twitchData} />}
        />
      </Switch>
    </Router>
  );
};

export default routes;
