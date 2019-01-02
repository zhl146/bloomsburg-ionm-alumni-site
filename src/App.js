import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import AuthProvider from "./wrappers/AuthProvider";
import Landing from "./Landing";
import Connect from "./Connect";
import Profile from "./Profile";
import Work from "./Work";
import Home from "./Home";

import theme from "./theme";

const App = () => (
  <MuiThemeProvider theme={theme}>
    <AuthProvider
      render={({ loggedIn }) =>
        loggedIn ? (
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Connect} />
              <Route path="/connect" component={Connect} />
              <Route path="/profile" component={Profile} />
              <Route path="/work" component={Work} />
            </Switch>
          </BrowserRouter>
        ) : (
          <Landing />
        )
      }
    />
  </MuiThemeProvider>
);

export default App;
