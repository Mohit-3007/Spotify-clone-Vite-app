import "../styles/signup.css";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const signup = await fetch(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "nyiisjkwy2r6",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          appType: "music",
        }),
      }
    );
    const data = await signup.json();

    console.log(data);

    document.cookie = `data = ${data.token}`;
    console.log(decodeURIComponent(document.cookie));
  }

  return (
    <>
      <div className="container">
        <div className="signup-container">
          <div className="header-container">
            <div className="logooo">
              <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CiAgICA8cGF0aCBkPSJNMjUuMDA5LDEuOTgyQzEyLjMyMiwxLjk4MiwyLDEyLjMwNCwyLDI0Ljk5MVMxMi4zMjIsNDgsMjUuMDA5LDQ4czIzLjAwOS0xMC4zMjEsMjMuMDA5LTIzLjAwOVMzNy42OTYsMS45ODIsMjUuMDA5LDEuOTgyeiBNMzQuNzQ4LDM1LjMzM2MtMC4yODksMC40MzQtMC43NjUsMC42NjgtMS4yNSwwLjY2OGMtMC4yODYsMC0wLjU3NS0wLjA4MS0wLjgzMS0wLjI1MkMzMC4xOTQsMzQuMSwyNiwzMywyMi41LDMzLjAwMSBjLTMuNzE0LDAuMDAyLTYuNDk4LDAuOTE0LTYuNTI2LDAuOTIzYy0wLjc4NCwwLjI2Ni0xLjYzNS0wLjE2Mi0xLjg5Ny0wLjk0OHMwLjE2My0xLjYzNiwwLjk0OS0xLjg5NyBjMC4xMzItMC4wNDQsMy4yNzktMS4wNzUsNy40NzQtMS4wNzdDMjYsMzAsMzAuODY4LDMwLjk0NCwzNC4zMzIsMzMuMjUzQzM1LjAyMiwzMy43MTMsMzUuMjA4LDM0LjY0NCwzNC43NDgsMzUuMzMzeiBNMzcuNzQsMjkuMTkzIGMtMC4zMjUsMC41MjItMC44ODYsMC44MDktMS40NTksMC44MDljLTAuMzEsMC0wLjYyNC0wLjA4My0wLjkwNi0wLjI2Yy00LjQ4NC0yLjc5NC05LjA5Mi0zLjM4NS0xMy4wNjItMy4zNSBjLTQuNDgyLDAuMDQtOC4wNjYsMC44OTUtOC4xMjcsMC45MTNjLTAuOTA3LDAuMjU4LTEuODYxLTAuMjcyLTIuMTItMS4xODNjLTAuMjU5LTAuOTEzLDAuMjcyLTEuODYyLDEuMTg0LTIuMTIgYzAuMjc3LTAuMDc5LDMuODU0LTAuOTU5LDguNzUxLTFjNC40NjUtMC4wMzcsMTAuMDI5LDAuNjEsMTUuMTkxLDMuODI2QzM3Ljk5NSwyNy4zMjgsMzguMjQyLDI4LjM4OCwzNy43NCwyOS4xOTN6IE00MC43MjUsMjIuMDEzIEM0MC4zNTIsMjIuNjQ3LDM5LjY4NCwyMywzOC45OTgsMjNjLTAuMzQ0LDAtMC42OTItMC4wODktMS4wMTEtMC4yNzVjLTUuMjI2LTMuMDY4LTExLjU4LTMuNzE5LTE1Ljk5LTMuNzI1IGMtMC4wMjEsMC0wLjA0MiwwLTAuMDYzLDBjLTUuMzMzLDAtOS40NCwwLjkzOC05LjQ4MSwwLjk0OGMtMS4wNzgsMC4yNDctMi4xNTEtMC40MTktMi40MDEtMS40OTUgYy0wLjI1LTEuMDc1LDAuNDE3LTIuMTQ5LDEuNDkyLTIuNEMxMS43MjksMTYuMDEsMTYuMTE3LDE1LDIxLjkzNCwxNWMwLjAyMywwLDAuMDQ2LDAsMC4wNjksMCBjNC45MDUsMC4wMDcsMTIuMDExLDAuNzUzLDE4LjAxLDQuMjc1QzQwLjk2NSwxOS44MzUsNDEuMjg0LDIxLjA2MSw0MC43MjUsMjIuMDEzeiI+PC9wYXRoPgo8L3N2Zz4="
                height={43}
                width={43}
              />
              <span>Spotify</span>
            </div>

            <h2>Sign up for free to start listening.</h2>
          </div>
          <div className="facebook-signup">
            <a
              target="_blank"
              className="facebook-link"
              href="https://www.facebook.com/login.php?skip_api_login=1&api_key=174829003346&kid_directed_site=0&app_id=174829003346&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv17.0%2Fdialog%2Foauth%3Fclient_id%3D174829003346%26state%3DAQCkBDAi%252BqAyYbtQUlcVDGwSMsyVuihP26UUhdW5y0qMh5slau%252BM6ZX03rI%252B%252FvYfhMbJ8w3PX5%252B7qfn9E3NIKdUDcoUyJLhcweOCMDCjEJChXCDr7yetgINHZK4MUZPCj%252B6mN0umkG18iuP4i81MpNHupIFAsAZFO2K6AYiYDGv3npx37c3AKCj5cZ89ccNiTo1lQ1eN9SXtu65NTxovPzjTdc2IC5CRZedZnjjbhMC3Oh5GwtWN6kTZfzAbYCKCu1xk5n68BeNcyHzQZGDBy3ulZ9BHSfF2etR0Hkpn%252BXtsF1%252Bs%252BImRjLWS5NyCm9u3D59CNrMLosP8nbc5IUNzRx71XSA5Dyrtt6kHALwBlhvEb82xALFfGsb5vUfOeUlW%252BsI6KBvKrdKyg8HoHSD4hFccUKPl24PMZU8bRclDBmA%252F0DfsVbzPp6RfExOfWK9G2HdLN8BS64tN5kTrAxBvyu%252FA7AIVO8T4LdnmNQFwcqDxtHqh5ZcAaUNXyMJb5dYVeEujnW6C3ylbTg2Zd2CZCgy3qI%252BUTfKLX8UTw7jbTVlaICeNODzgGNDkHmRd65SePuQv%252F1i55inkvCzW0qSb%26redirect_uri%3Dhttps%253A%252F%252Faccounts.spotify.com%252Flogin%252Ffacebook%252Fredirect%252Fsignup%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D55ab3aa3-600b-4b51-82b5-6cffe486156c%26tp%3Dunspecified&cancel_url=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Ffacebook%2Fredirect%2Fsignup%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3DAQCkBDAi%252BqAyYbtQUlcVDGwSMsyVuihP26UUhdW5y0qMh5slau%252BM6ZX03rI%252B%252FvYfhMbJ8w3PX5%252B7qfn9E3NIKdUDcoUyJLhcweOCMDCjEJChXCDr7yetgINHZK4MUZPCj%252B6mN0umkG18iuP4i81MpNHupIFAsAZFO2K6AYiYDGv3npx37c3AKCj5cZ89ccNiTo1lQ1eN9SXtu65NTxovPzjTdc2IC5CRZedZnjjbhMC3Oh5GwtWN6kTZfzAbYCKCu1xk5n68BeNcyHzQZGDBy3ulZ9BHSfF2etR0Hkpn%252BXtsF1%252Bs%252BImRjLWS5NyCm9u3D59CNrMLosP8nbc5IUNzRx71XSA5Dyrtt6kHALwBlhvEb82xALFfGsb5vUfOeUlW%252BsI6KBvKrdKyg8HoHSD4hFccUKPl24PMZU8bRclDBmA%252F0DfsVbzPp6RfExOfWK9G2HdLN8BS64tN5kTrAxBvyu%252FA7AIVO8T4LdnmNQFwcqDxtHqh5ZcAaUNXyMJb5dYVeEujnW6C3ylbTg2Zd2CZCgy3qI%252BUTfKLX8UTw7jbTVlaICeNODzgGNDkHmRd65SePuQv%252F1i55inkvCzW0qSb%23_%3D_&display=page&locale=en_GB&pl_dbl=0"
            >
              <span className="facebook-logo">
                <div>
                  <Icon icon="logos:facebook" height="24" width="24" />
                </div>
                <p>Sign up with Facebook</p>
              </span>
            </a>
          </div>
          <div className="google-signup">
            <a
              target="_blank"
              className="google-link"
              href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=1046568431490-ij1gi5shcp2gtorls09frkc56d4mjbe2.apps.googleusercontent.com&state=AQB1yxmmSRiLAUqI4yZEy4zG%2FzlB97UdjQuB8i4qUeEavObDg4DTjJDveEZc%2BeyYJF%2FE0xIrlinN%2Ff3jmWGRJDvyPS6jGkTRLYgiOs42%2FqsflkQJUfRgqM0ML%2BiRJSfg%2FnFOtGeH%2B9xDAE%2B%2FFfEE3ivosujP0Wp6wvtUe9ulLtjfeW7mhxnWrJs%2F135PvNT3SQ9xRtkceEIBjNQrynrFuQN3e8zhmajAU77SdPoz0FEPYxfx1hMcX475032ZjmyZa%2FjD4RYlFD9mkITRwglYPhKHPi250Ht3LZFp%2FnNE%2BK7KYokDFNokAbmq0vtO4pGgkmDREoJi7Wrs0%2BnSc1cUzHBKLBrFxunt4zpsiyBkRv8GlVe%2FZPKpOBN%2BDka%2BT%2B5gijls2PpD3OKMD40JtsjFubSVJKXAGSGh7N4ROEAkRNVJLCSDR52Xqg07mTKSxZBODi0GVQ1QOYSFfbwbKPEF6x83Cl6v%2FfxMkL8mxW7mWP2c9MFJwNlyUPqKBvaCJ21M3s2AH9BFSAq1cXZ7c4Qfp7TWncf1KRYCmnoRzdhpmnZpOUp8qOLWleFD73mlXpQrcCTx9VXr0B6iF3EH0yOQ&scope=profile%20email%20openid&redirect_uri=https%3A%2F%2Faccounts.spotify.com%2Flogin%2Fgoogle%2Fredirect%2Fsignup&service=lso&o2v=2&flowName=GeneralOAuthFlow"
            >
              <span className="google-logo">
                <div>
                  <Icon icon="flat-color-icons:google" width="24" height="24" />
                </div>
                <p>Sign up with Google</p>
              </span>
            </a>
          </div>
          <div className="formDivider">
            <div className="formbreak">
              <div className="breakline brleft"></div>
              <div className="brText">o r</div>
              <div className="breakline brright"></div>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="signup-form">
            <div className="email-container formPadding">
              <div className="emailText">
                <label htmlFor="email">What's your email?</label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="error"></span>
              <a className="useNumber" href="#">
                Use phone number instead.
              </a>
            </div>
            <div className="password-container formPadding">
              <div className="passwordText">
                <label htmlFor="password">Create a password</label>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Create a password."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="error"></span>
            </div>
            <div className="name-container formPadding">
              <div className="nameText">
                <label htmlFor="name">What should we call you?</label>
              </div>
              <input
                id="name"
                type="text"
                placeholder="Enter a profile name."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="error"></span>
              <div className="nameAppear">This appears on your profile.</div>
            </div>
            <div className="dob-container formPadding">
              <div className="dobText">
                <label>What's your date of birth?</label>
              </div>
              <div className="dobParent">
                <div className="year">
                  <div className="yearText">
                    <label htmlFor="yearInput">Year</label>
                  </div>
                  <input
                    id="yearInput"
                    className="dobPlaceholder"
                    type="year"
                    placeholder="YYYY"
                  />
                </div>
                <div className="month">
                  <div className="monthText">
                    <label htmlFor="monthInput">Year</label>
                  </div>
                  <input
                    id="monthInput"
                    className="dobPlaceholder"
                    placeholder="Month"
                  />
                </div>
                <div className="day">
                  <div className="dayText">
                    <label htmlFor="dayInput">Year</label>
                  </div>
                  <input
                    id="dayInput"
                    className="dobPlaceholder"
                    placeholder="DD"
                  />
                </div>
              </div>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="gender-container formPadding">
              <div className="genderText">
                <label>What's your gender?</label>
              </div>
              <div className="gender-parent">
                <div className="male">
                  <input type="checkbox" className="checkbox" />
                  <label className="flex centre">
                    <span className="round-checkbox"></span>
                    <span className="genderSpan">Male</span>
                  </label>
                </div>
                <div className="female">
                  <input type="checkbox" className="checkbox" />
                  <label className="flex centre">
                    <span className="round-checkbox"></span>
                    <span className="genderSpan">Female</span>
                  </label>
                </div>
                <div className="trans">
                  <input type="checkbox" className="checkbox" />
                  <label className="flex centre">
                    <span className="round-checkbox"></span>
                    <span className="genderSpan">Non-binary</span>
                  </label>
                </div>
                <div className="other">
                  <input type="checkbox" className="checkbox" />
                  <label className="flex centre">
                    <span className="round-checkbox"></span>
                    <span className="genderSpan">Other</span>
                  </label>
                </div>
                <div className="preferNot">
                  <input type="checkbox" className="checkbox" />
                  <label className="flex centre">
                    <span className="round-checkbox"></span>
                    <span className="genderSpan">Prefer not to say</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="terms">
              <div className="termContainer">
                <input type="checkbox" />
                <label className="termCondition">
                  I would prefer not to receive marketing messages from Spotify
                </label>
              </div>
            </div>

            <div className="terms">
              <div className="termContainer">
                <input type="checkbox" />
                <label className="termCondition">
                  Share my registration data with Spotify's content providers
                  for marketing purposes.
                </label>
              </div>
            </div>

            <button className="bg-green-400 text-white p-4" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
