import logo from "./logo.svg";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import "./App.css";
import Destination from "./Components/Destination/Destination";
import Header from "./Components/Header/Header";
import Blog from "./Components/Blog/Blog";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute path="/destination/:name">
            <Destination />
          </PrivateRoute>

          <Route path="/blog">
            <Blog />
          </Route>
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
