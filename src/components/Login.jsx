import "../styles/login.css";
import { useState, } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useContextProvider } from "./ContextProvider/AppContextProvider";


export default function Login({handleEmail, handlePassword, email, password}) {

    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { handleLoginState } = useContextProvider();

    async function handleLogin() {

      document.cookie=`email=${email}`

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
      const data = await login.json();
  
      console.log("Login data",data);
  
      document.cookie = `data=${data.token}`;
      // console.log(decodeURIComponent(document.cookie)); 
      if (data.status === "success") {
        handleLoginState()
        navigate("/")
      }
      
    }

  return (
    <>
      <div className="logo">
        <Icon icon="logos:spotify" width="116" height="36" />
      </div>

      <div className="login-container">
        <div className="login-form">
          <h1>Log in to Spotify </h1>
          <ul className="continueWith">
            <li>
              <button id="google-login" className="continueWithBtn">
                
                <span className="google-icon"><Icon icon="flat-color-icons:google" width="24" height="24" /></span>
                <span className="icon-text">Continue with Google</span>
              </button>
            </li>
            <li>
              <button id="facebook-login" className="continueWithBtn">
                <Icon icon="logos:facebook"  height="24" width="24" /><span className="icon-text">Continue with Facebook</span>
              </button>
            </li>
            <li>
              <button id="apple-login" className="continueWithBtn">
                <Icon icon="basil:apple-solid" width="24" height="24" color="white" /><span className="icon-text">Continue with Apple</span>
              </button>
            </li>
            <li>
              <button id="number-login" className="continueWithBtn">
                <span className="icon-text">Continue with phone number</span>
              </button>
            </li>
          </ul>
          <div className="br"></div>
          <div className="login-details">
            <div className="login-username-div">
              <div className="username-label">
                <label htmlFor="email">Email</label>
              </div>
              <input className="text-black" id="email" type="text" placeholder="Email" value={email} onChange={(e)=> handleEmail(e.target.value)} />
            </div>
            <div className="login-password-div">
              <div className="username-password">
                <label htmlFor="password">Password</label>
              </div>
              <input className="text-black" id="password" type="text" placeholder="Password" password={password} onChange={(e)=> handlePassword(e.target.value)} />
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
                to={"/passwordreset"}
              >
                <p>Forgot your Password?</p>
              </Link>
            </div>
          </div>

          <div className="br"></div>
        </div>
      </div>
    </>
  );
}
