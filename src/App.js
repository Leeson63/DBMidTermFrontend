import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

import { useAuth, ProvideAuth } from "./Conponent/authority.js"
import Person from "./Pages/Person"
import Filter from "./Pages/Filter"
import Result, { ProvideResult } from "./Pages/Result"
import Search from "./Pages/Search"
import LoginPage from "./Pages/Login"
import Topic from "./Pages/Topic"

import "./App.css"

export default function AuthExample() {
  const mystyle = {
      color: "white",
      //backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
  return (

    <ProvideAuth>
      <ProvideResult>
        <Router>
          <div className="demo">
            <AuthButton />

            <div className="demo-nav">
                <Link to="/Search">Search</Link>
                <Link to="/Filter">Filter</Link>
                <Link to="/Person">Personal Information</Link>
            </div>

            <Switch>
              <Route path="/login" component={LoginPage}/>
              <PrivateRoute path="/Person">
                <Person/>
              </PrivateRoute>
              <Route path="/Search" component={Search}/>
              <Route path="/Result" component={Result}/>
              <Route path="/Filter" component={Filter}/>
              <Route path="/TopicPage/:topic_id" component={Topic}/>

            </Switch>
          </div>
        </Router>
      </ProvideResult>
    </ProvideAuth>
  );
}


// 登出的按钮
function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}