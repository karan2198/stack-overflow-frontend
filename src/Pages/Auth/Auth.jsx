import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
const Auth = ({ isDay }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email && !password) {
  //     alert("Enter email and password");
  //     return;
  //   }

  //   const loginInfo = {
  //     browser: navigator.userAgent,
  //     os: navigator.platform,
  //     device: /Mobi/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
  //   }
  //   try {
  //     if (isSignup) {
  //       if (!name) {
  //         alert("Enter a name to continue");
  //         return;
  //       }
  //       await dispatch(signup({ name, email, password }, navigate));
  //     } else {
  //       await dispatch(login({ email, password }, navigate));
  //     }
  //     const backendUrl = 'https://stack-overflow-backend-qf3u.onrender.com';
  //     // const backendUrl = 'http://localhost:3000'

  //     const loginResponse = await fetch(`${backendUrl}/user/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginInfo),
  //     });
  //     const loginData = await loginResponse.json();
  //     console.log("Login Response:", loginData);
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };
  
  return (
    <section className={`auth-section ${isDay ? 'day' : 'night'}`}>
      {isSignup && <AboutAuth isDay={isDay} />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p className={`form-bottom ${isDay ? 'day' : 'night'}`}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
