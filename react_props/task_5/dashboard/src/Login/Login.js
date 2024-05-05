import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">email</label>
          <input type="text" id="email"></input>
          <label htmlFor="password">password</label>
          <input type="password" id="password"></input>
          <button type="submit">Ok</button>
        </form>
      </div>
    </>
  );
};

export default Login;
