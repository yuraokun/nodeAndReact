import React from "react";
import { useState } from "react";

const Login = ({ login }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
  });
  const tryLogin = (e) => {
    e.preventDefault();

    if (loginInfo.email && loginInfo.password) {
      login(loginInfo);
    }
  };
  return (
    <form onSubmit={tryLogin}>
      <div>
        email
        <input
          type="email"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
        />
      </div>
      <div>
        password
        <input
          type="password"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
