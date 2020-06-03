import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home/index";
import CreatePoint from "./pages/CreatePoint/index";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cadastro" component={CreatePoint} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
