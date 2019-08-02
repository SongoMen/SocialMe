import React from "react";
import { auth } from "../auth";

import TopMenu from "../landing-page/top-menu";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ""
    };
    this.handleClickRegisterUser = this.handleClickRegisterUser.bind(this);
  }
  handleClickRegisterUser(e) {
    var re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      this.password.value.length > 6 &&
      re.test(String(this.email.value).toLowerCase())
    ) {
      localStorage.setItem("user", this.username.value);
      auth(this.email.value, this.password.value, this.username.value);
      this.setState({
        msg: "Register Successful"
      });
    }
    if (this.password.value.length < 6) {
      alert("Password must have at least 6 characters");
    }
    if (re.test(String(this.email.value).toLowerCase()) === false) {
      alert("wrong email adress");
    }
  }
  render() {
    return (
      <div className="register">
        <TopMenu />
        <div className="register__container">
          <h3>Register</h3>
          <form>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={username => (this.username = username)}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail adress</label>
              <input
                id="email"
                type="text"
                ref={email => (this.email = email)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                ref={password => (this.password = password)}
              />
            </div>
            <button
              type="button"
              className="submit btn"
              onClick={event => this.handleClickRegisterUser(event)}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
