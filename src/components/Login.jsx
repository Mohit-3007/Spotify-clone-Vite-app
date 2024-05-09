import "../styles/login.css";
import { useEffect, useState, } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useLoginCredentialProvider } from "./ContextProvider/LoginCredentialProvider";

export default function Login() {
  const navigate = useNavigate()
  const { login ,handleLoginState } = useContextProvider();
  const { email, handleEmail, password, handlePassword } = useLoginCredentialProvider()

  useEffect(()=>{
    if(login) navigate("/")
  },[])

  async function handleLogin() { 
    const login = await fetch(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "nyiisjkwy2r6",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          appType: "music",
        }),
      }
      );
    console.log("Login api response ", login);
    const data = await login.json();
    console.log("Login data",data);
    if (data.status === "success") {
      document.cookie=`email=${email}`
      document.cookie = `data=${data.token}`; 
      handleLoginState()
      navigate("/")
    } 
  }
  return (
    <>
    <div className="logo">
      <Icon icon="logos:spotify" width="116" height="36" />
    </div>
    <div className="login-container gradient bg-gradient-to-b from-[#171717] to-[black]">
      <div className="login-form">
        <h1>Log in to Spotify </h1>
        <div className="login-details">
          <div className="login-username-div">
            <div className="username-label">
              <label htmlFor="email">Email</label>
            </div>
            <input className="text-white" id="email" type="text" placeholder="Email" value={email} onChange={(e)=> handleEmail(e.target.value)} />
          </div>
          <div className="login-password-div">
            <div className="username-password">
              <label htmlFor="password">Password</label>
            </div>
            <input className="text-white" id="password" type="password" placeholder="Password" password={password} onChange={(e)=> handlePassword(e.target.value)} />
          </div>
          <div className="toogle">
            <label className="switch">
              <input type="checkbox" className="input" />
              <span className="slider"></span>
            </label>
            <span className="remember">Remember Me</span>
          </div>
          <div className="button-div">
            <button className="button" onClick={handleLogin}>Log in</button>
          </div>
          <div className="forgotpass">
            <Link 
              to={"/passwordreset"}>
              <p>Forgot your Password?</p>
            </Link>
          </div>
        </div>
        <div className="br"></div>
        <p className="w-full mb-6">
          <span className="flex justify-center items-center text-[rgba(112,104,104,0.73)]">
            Don't have an account? <Link to={"/signup"} className="text-white ml-1 underline font-semibold text-base">Sign up for Spotify.</Link>
          </span>
          </p>
      </div>
    </div>
    </>
  );
}
