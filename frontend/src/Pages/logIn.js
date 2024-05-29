import React from 'react';
import '../index.css'

export function Login() {
  return (
    <div className="login-frame-wrapper">
      <div className="login-frame">
        <div className="log-in">Log In</div>
        <form className="form">
          <div className="email">Email</div>
          <div className="username">
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="password">Password</div>
          <div className="password-input">
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="login-btn">
            <button>Login</button>
          </div>
        </form>
        <div className="no-account">Don’t have an account yet? Sign up.</div>
        </div>
    </div>
    
    );
}