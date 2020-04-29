import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route, Redirect } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetails } from "./TaskDetails";
import { ConnectedLogin } from "./Login";
import { ConnectedSignin } from "./Signin";

const RouteGuard = (Component) => ({ match }) => {
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <ConnectedNavigation />
      <Route exact path="/" component={ConnectedLogin} />
      <Route exact path="/signin" component={ConnectedSignin} />
      <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
      <Route exact path="/task/:id" render={RouteGuard(ConnectedTaskDetails)} />
    </Provider>
  </Router>
);
