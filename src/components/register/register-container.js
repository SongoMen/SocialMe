import React from "react";
import { login } from "../auth";

import TopMenu from "../landing-page/top-menu";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    login(this.email.value, this.password.value).catch(error => {
      alert("Wrong Email or password");
    });
  }
  render() {
    return (
      <div className="login">
        <TopMenu />
        <div className="login__container">
          <h3>Member Login</h3>
          <form>
            <div>
              <label for="email">E-mail adress</label>
              <input
                id="email"
                type="text"
                ref={email => (this.email = email)}
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                ref={password => (this.password = password)}
              />
            </div>
            <button
              type="button"
              className="submit btn"
              onClick={event => this.handleClick(event)}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
