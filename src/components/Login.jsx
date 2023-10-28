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


    // useEffect(()=>{
    //   if(login) navigate("/")
    // },[])

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
      document.cookie=`email=${email}`
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

      <div className="login-container gradient bg-gradient-to-b from-[#171717] to-[black]">
        <div className="login-form">
          <h1>Log in to Spotify </h1>

          <ul className="continueWith">

            <li>
              <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=1046568431490-ij1gi5shcp2gtorls09frkc56d4mjbe2.apps.googleusercontent.com&state=AQB1yxmmSRiLAUqI4yZEy4zG%2FzlB97UdjQuB8i4qUeEavObDg4DTjJDveEZc%2BeyYJF%2FE0xIrlinN%2Ff3jmWGRJDvyPS6jGkTRLYgiOs42%2FqsflkQJUfRgqM0ML%2BiRJSfg%2FnFOtGeH%2B9xDAE%2B%2FFfEE3ivosujP0Wp6wvtUe9ulLtjfeW7mhxnWrJs%2F135PvNT3SQ9xRtkceEIBjNQrynrFuQN3e8zhmajAU77SdPoz0FEPYxfx1hMcX475032ZjmyZa%2FjD4RYlFD9mkITRwglYPhKHPi250Ht3LZFp%2FnNE%2BK7KYokDFNokAbmq0vtO4pGgkmDREoJi7Wrs0%2BnSc1cUzHBKLBrFxunt4zpsiyBkRv8GlVe%2FZPKpOBN%2BDka%2BT%2B5gijls2PpD3OKMD40JtsjFubSVJKXAGSGh7N4ROEAkRNVJLCSDR52Xqg07mTKSxZBODi0GVQ1QOYSFfbwbKPEF6x83Cl6v%2FfxMkL8mxW7mWP2c9MFJwNlyUPqKBvaCJ21M3s2AH9BFSAq1cXZ7c4Qfp7TWncf1KRYCmnoRzdhpmnZpOUp8qOLWleFD73mlXpQrcCTx9VXr0B6iF3EH0yOQ&scope=profile%20email%20openid&redirect_uri=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Fgoogle%2Fredirect%2Fsignup&service=lso&o2v=2&flowName=GeneralOAuthFlow&theme=glif" 
                  target="_blank" id="google-login" className="continueWithBtn">
                
                <span className="google-icon"><Icon icon="flat-color-icons:google" width="24" height="24" /></span>
                <span className="icon-text">Continue with Google</span>
              </a>
            </li>

            <li>
              <a href="https://www.facebook.com/login.php?skip_api_login=1&api_key=174829003346&kid_directed_site=0&app_id=174829003346&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv17.0%2Fdialog%2Foauth%3Fclient_id%3D174829003346%26state%3DAQCkBDAi%252BqAyYbtQUlcVDGwSMsyVuihP26UUhdW5y0qMh5slau%252BM6ZX03rI%252B%252FvYfhMbJ8w3PX5%252B7qfn9E3NIKdUDcoUyJLhcweOCMDCjEJChXCDr7yetgINHZK4MUZPCj%252B6mN0umkG18iuP4i81MpNHupIFAsAZFO2K6AYiYDGv3npx37c3AKCj5cZ89ccNiTo1lQ1eN9SXtu65NTxovPzjTdc2IC5CRZedZnjjbhMC3Oh5GwtWN6kTZfzAbYCKCu1xk5n68BeNcyHzQZGDBy3ulZ9BHSfF2etR0Hkpn%252BXtsF1%252Bs%252BImRjLWS5NyCm9u3D59CNrMLosP8nbc5IUNzRx71XSA5Dyrtt6kHALwBlhvEb82xALFfGsb5vUfOeUlW%252BsI6KBvKrdKyg8HoHSD4hFccUKPl24PMZU8bRclDBmA%252F0DfsVbzPp6RfExOfWK9G2HdLN8BS64tN5kTrAxBvyu%252FA7AIVO8T4LdnmNQFwcqDxtHqh5ZcAaUNXyMJb5dYVeEujnW6C3ylbTg2Zd2CZCgy3qI%252BUTfKLX8UTw7jbTVlaICeNODzgGNDkHmRd65SePuQv%252F1i55inkvCzW0qSb%26redirect_uri%3Dhttps%253A%252F%252Faccounts.spotify.com%252Flogin%252Ffacebook%252Fredirect%252Fsignup%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D55ab3aa3-600b-4b51-82b5-6cffe486156c%26tp%3Dunspecified&cancel_url=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Ffacebook%2Fredirect%2Fsignup%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3DAQCkBDAi%252BqAyYbtQUlcVDGwSMsyVuihP26UUhdW5y0qMh5slau%252BM6ZX03rI%252B%252FvYfhMbJ8w3PX5%252B7qfn9E3NIKdUDcoUyJLhcweOCMDCjEJChXCDr7yetgINHZK4MUZPCj%252B6mN0umkG18iuP4i81MpNHupIFAsAZFO2K6AYiYDGv3npx37c3AKCj5cZ89ccNiTo1lQ1eN9SXtu65NTxovPzjTdc2IC5CRZedZnjjbhMC3Oh5GwtWN6kTZfzAbYCKCu1xk5n68BeNcyHzQZGDBy3ulZ9BHSfF2etR0Hkpn%252BXtsF1%252Bs%252BImRjLWS5NyCm9u3D59CNrMLosP8nbc5IUNzRx71XSA5Dyrtt6kHALwBlhvEb82xALFfGsb5vUfOeUlW%252BsI6KBvKrdKyg8HoHSD4hFccUKPl24PMZU8bRclDBmA%252F0DfsVbzPp6RfExOfWK9G2HdLN8BS64tN5kTrAxBvyu%252FA7AIVO8T4LdnmNQFwcqDxtHqh5ZcAaUNXyMJb5dYVeEujnW6C3ylbTg2Zd2CZCgy3qI%252BUTfKLX8UTw7jbTVlaICeNODzgGNDkHmRd65SePuQv%252F1i55inkvCzW0qSb%23_%3D_&display=page&locale=en_GB&pl_dbl=0" 
                  target="_blank" id="facebook-login" className="continueWithBtn">
                <Icon icon="logos:facebook"  height="24" width="24" /><span className="icon-text">Continue with Facebook</span>
              </a>
              
            </li>

            <li>
              <a href="https://appleid.apple.com/auth/authorize?client_id=com.spotify.accounts&response_type=code&response_mode=form_post&scope=name%20email&state=AQDHP%2F2tTdDSVlkqTDsA2mxn%2BHXXYTENnfi4nIdFFmQ3j%2BMvOnYp6NIBALawMd8H8LDOYrqfTRcyqTQsUEIwx9q7ouxXwYI14yuPxLJvBvffTUGjB3TqIFZHUDZhJQodSvtNU6sdVoa0Gv2B0PsOw86WJw9dUO2l8tqWNXYrKNjDszmolEEAoHfQ3D2LNMvmA8jL9%2FF6G74vBiQ%2BoKhZ%2F3FsOP47HOJkRBACnS2ZFsh1A5tE%2BQPCBDhPeTna4dZ80Z3qfK0%2BF5zPuveuLsKKmiSNpfrT0rJSkoLTI38rhWDBtWfZgMuAIccJBiUvJRunmoTC98Btpc22BKdVEV0pxqmkopOwkqfLNMEZgqnGyCEobumVJUdc7OyI1dPMs%2B4CcwQWzPOdHEhDjHQxX5A9VhoL9sV5VnDJM8YPGSDqKDJReRPVqC4JTZLV9MycrLxpWTJYB39UgkSNzUIE4rbOoHUMxatVlYrgKYTPl0IAdmEHY9jXzM3hvRlaiqkN%2BVAo99alR6aoRWqUnMd1gIUGDilCz1HjI8DYbDdURAUGvup4jmbNKeq%2BwhY8tVBf92pSbgrKOufliPUXgBa30dVDxABlJGHB%2Foo1etCavBN5fy5X7Yeay5UrLg%3D%3D&redirect_uri=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Fapple%2Fredirect" 
              target="_blank" id="apple-login" className="continueWithBtn">
                <Icon icon="basil:apple-solid" width="24" height="24" color="white" /><span className="icon-text">Continue with Apple</span>
              </a>
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
                to={"/passwordreset"}
              >
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
