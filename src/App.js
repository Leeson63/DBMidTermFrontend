import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";

import { useAuth, ProvideAuth } from "./Component/authority.js"
import Person from "./Pages/Person"
import Filter from "./Pages/Filter"
import Result, { ProvideResult } from "./Pages/Result"
import Search from "./Pages/Search"
import LoginPage from "./Pages/Login"
import Topic from "./Pages/Topic"
import Torrent from "./Pages/Torrent"
import Upload from "./Pages/Upload"
import Post from "./Pages/Post"

import "./App.css"

import { Button, Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export default function AuthExample() {
  const mystyle = {
    color: "white",
    //backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };

  /*
return (

  <ProvideAuth>
    <ProvideResult>
      <Router>
        <div className="demo">

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
*/
  return (
    <Layout className="layout">
      <ProvideAuth>
        <ProvideResult>
          <Router>
            <Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}
                style={{ margin: '0 -50px', border: '100px 100px', padding: '-10px -10px' }}>
                <Menu.Item key="1"> <Link to="/Search">Search</Link></Menu.Item>
                <Menu.Item key="2"> <Link to="/Filter">Filter</Link></Menu.Item>
                <Menu.Item key="3"> <Link to="/Upload">Upload</Link> </Menu.Item>
                <Menu.Item key="4"> <Link to="/Post">Post</Link> </Menu.Item>
                <Menu.Item key="5"> <Link to="/Person">Account</Link> </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '10px 50px' }}>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/Person">
                  <Person />
                </PrivateRoute>
                <PrivateRoute path="/Search" >
                  <Search />
                </PrivateRoute>
                <PrivateRoute path="/Result">
                  <Result />
                </PrivateRoute>
                <PrivateRoute path="/Filter">
                  <Filter />
                </PrivateRoute>
                <PrivateRoute path="/TopicPage/:topic_id">
                  <Topic />
                </PrivateRoute>
                <PrivateRoute path="/TorrentPage/:torrent_id">
                  <Torrent />
                </PrivateRoute>
                <PrivateRoute path="/Upload">
                  <Upload />
                </PrivateRoute>
                <PrivateRoute path="/Post">
                  <Post />
                </PrivateRoute>
                <PrivateRoute path="/">
                  <Person />
                </PrivateRoute>
              </Switch>
            </Content>

            <Footer>
                <AuthButton/>
            </Footer>
          </Router>
        </ProvideResult>
      </ProvideAuth>
    </Layout>
  )
}


// 登出的按钮
function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p align="center">
      <Button
      type="dashed"
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      danger>
        logout
      </Button>
    </p>
  ) : (
    <p align="center">Welcome to btForum</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, component, ...rest }) {
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