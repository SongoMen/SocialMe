import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import { firebaseAuth } from "./components/auth";

import LandingPage from "./components/landing-page/landing-page-container";
import Login from "./components/login/login-container";
import Register from "./components/register/register-container";
import Dashboard from "./components/dashboard/dashboard-container";
import AddAccount from "./components/addAccount/AddAccount";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Dashboard" />
        )
      }
    />
  );
}

class App extends Component {
  state = {
    authed: false,
    loading: true,
    theme: ""
  };
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }

  componentWillMount() {
    let theme = localStorage.getItem("theme");
    if (
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ] !== ""
    ) {
      if (theme !== null)
        this.setState({
          theme: theme
        });
      else
        this.setState({
          theme: "dark"
        });
    }
  }

  render() {
    if (this.state.theme === "light") {
      localStorage.setItem("theme", "light");
      document.getElementById("root").classList.add("light");
    }
    if (this.state.theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.getElementById("root").classList.remove("light");
    }
    return this.state.loading ? (
      <svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity="0.5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    ) : (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <PublicRoute
              authed={this.state.authed}
              path="/login"
              component={Login}
            />
            <PublicRoute
              authed={this.state.authed}
              path="/register"
              component={Register}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/addaccount"
              component={AddAccount}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
