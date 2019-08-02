import React from "react";

import TopMenu from "../landing-page/top-menu";

const Login = () => {
  return (
    <div className="login">
      <TopMenu />
      <div className="login__container">
        <h3>Member Login</h3>
        <form>
          <div>
            <label>E-mail adress</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <button className="submit btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
