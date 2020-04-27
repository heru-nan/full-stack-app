import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route, Redirect } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetails } from "./TaskDetails";
import { ConnectedLogin } from "./Login";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";

const RouteGuard = (Component) => ({ match }) => {
  console.info("route guard", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router history={history}>
      <Provider store={store}>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin} />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetails)}
        />
      </Provider>
    </Router>
  </ThemeProvider>
);
