import React from "react";

const Login = () => {
  return (
    <div className="wrapper-login">
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input 
          placeholder="Enter your email..." 
          required />
        </div>

        <div className="input-box">
          <input 
          placeholder="Enter your password..." 
          required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
