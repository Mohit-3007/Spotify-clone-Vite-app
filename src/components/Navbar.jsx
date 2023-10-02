import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowDownCircle } from "react-icons/bs";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { GoBellFill, GoPersonFill } from "react-icons/go";

export default function Navbar() {
  const logoutRef = useRef();
  const [loggedIn, SetLoggedIn] = useState(false);
  const [expand, SetExpand] = useState(false);
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const [showBackground, setShowBackground] = useState(true);



  useEffect(() => {
    if (decodeURIComponent(document.cookie)) SetLoggedIn(true);
    if(location.pathname === "/songtrack") setShowBackground(!showBackground)
  },[]);

  function handleExpand() {
    // console.log('expand');
    SetExpand(!expand);
  }

  function handleLogin() {
    console.log("Cookie remove");
    // document.cookies.remove("data=; path=/;");
    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";



  }

  return (
    <>
      <div className="fixed top-0 right-2 left-[18.6875rem] w-[87.4087rem] bg-black h-2 z-10"></div>
      <div className={"w - [87.4087rem] h-16 fixed top-2 right-2 left-[18.6875rem] z-10 rounded-t-lg " + (showBackground ? "bg-[#121212]" : "bg-none")
      }>
        <header className="px-6 h-full py-4 flex items-center relative">
          <div className="w-[4.5rem] flex justify-between">
            <button className="h-8 w-8 bg-black rounded-[50%] justify-center items-center flex">
              <IoChevronBackOutline size="1.4rem" color="white" />
            </button>
            <button className="h-8 w-8 bg-black rounded-[50%] justify-center items-center flex">
              <IoChevronForwardOutline size="1.4rem" color="white" />
            </button>
          </div>

          {/* If user is not logged in */}
          {!loggedIn && (
            <>
              {location.pathname === "/search" && (
                <div className="h-12 w-[46.75rem] mr-[1.125rem]">
                  <div className="w-[22.75rem] h-full bg-[#2A2A2A] rounded-3xl py-1.5 px-3 flex justify-center items-center gap-1.5">
                    <span>
                      <CiSearch className="text-white text-xl" />
                    </span>
                    <input
                      className="placeholder:text-[#757575] w-full border-none font-figtree bg-inherit 
                              text-sm"
                      type="text"
                      placeholder="What do you want to listen to?"
                    ></input>
                  </div>
                </div>
              )}
              {location.pathname === "/" && (
                <div className="h-12 w-[46.75rem] mr-[1.125rem]"></div>
              )}

              <button
                className=" font-figtree h-12 py-2 text-[#9B9B9B] text-base
                            font-extrabold tracking-widest mr-2"
              >
                Premium
              </button>

              <button
                className=" font-figtree h-12 py-2 text-[#9B9B9B] text-base
                            font-extrabold tracking-widest mr-2"
              >
                Support
              </button>

              <button
                className=" font-figtree h-12 py-2 text-[#9B9B9B] text-base
                            font-extrabold tracking-widest mr-2"
              >
                Download
              </button>

              <div className="m-4 h-[1.5625rem] bg-white w-[1px]"></div>

              <div className="w-[12.8125rem] h-12 flex">
                <button
                  className=" font-figtree w-[6rem] py-2 pl-2 pr-7 text-[#9B9B9B] font-bold"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
                <button className=" font-figtree w-[6.875rem] bg-white rounded-3xl flex justify-center items-center">
                  <span
                    className="w-[6.8125rem] h-12 py-2 px-7 text-black flex items-center
                                text-base font-bold"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </span>
                </button>
              </div>
            </>
          )}

          {/* If user is logged in */}
          {loggedIn && (
            <>
              {location.pathname === "/search" && (
                <>
                  <div className="h-12 w-[56.625rem] mr-[1.125rem]">
                    <div className="w-[22.75rem] h-full bg-[#2A2A2A] rounded-3xl py-1.5 px-3 flex justify-center items-center gap-1.5">
                      <span>
                        <CiSearch className="text-white text-xl" />
                      </span>
                      <input
                        className="placeholder:text-[#757575] w-full border-none font-figtree bg-inherit 
                              text-sm"
                        type="text"
                        placeholder="What do you want to listen to?"
                      ></input>
                    </div>
                  </div>
                  {/* <div className="w-[56.625rem]"></div> */}
                  <button
                    className=" w-[8.9375rem] h-8 mr-2 text-black bg-white rounded-2xl font-figtree"
                    onClick={() => navigate("/premium")}
                  >
                    <span className=" w-[8.9375rem] h-8 px-4 py-1 text-sm font-bold ">
                      Explore Premium
                    </span>
                  </button>
                </>
              )}

              {(location.pathname === "/" ||
                location.pathname === "/featured" ||
                location.pathname === "/morealbums" ||
                location.pathname === "/songtrack" ||
                location.pathname === "/artistsongs") && (
                <div className="w-[65.5625rem]"></div>
              )}

              <a
                className="w-[7.375rem] h-8 text-white bg-[#080808] mr-2 rounded-2xl font-figtree
                            px-4 py-1 flex justify-center items-center"
              >
                <span className="relative right-1">
                  <BsArrowDownCircle />
                </span>
                <span className="text-sm font-bold">Install App</span>
              </a>
              <button className="w-8 h-8 bg-[#080808] rounded-[50%] mr-2 flex justify-center items-center">
                <GoBellFill stroke="white" strokeWidth={1.8} />
              </button>
              <button
                className="w-8 h-8 bg-[#080808] rounded-[50%] flex justify-center items-center"
                onClick={handleExpand}
              >
                <GoPersonFill stroke="white" strokeWidth={1.8} />
              </button>

              {/* Logout/Login & Premium */}
              <div
                ref={logoutRef}
                className={
                  "w-[12.25rem] h-[5.125rem] bg-[#282828] font-figtree  absolute top-14 rounded-md right-[3.4375rem] " +
                  (expand ? "block" : "hidden")
                }
              >
                <div className="w-[12.25rem] h-[5.125rem]">
                  <ul>
                    <li className="w-[11.75rem] h-[2.5rem]">
                      <button
                        className="w-[11.75rem] py-3 pl-3 pr-2 text-white text-sm font-semibold flex justify-between"
                        onClick={() => navigate("/premium")}
                      >
                        <span>Upgrade to Premium</span>
                        <FiExternalLink className="h-6 w-5" />
                      </button>
                    </li>
                    <li className="w-[11.75rem] h-[2.5rem]">
                      <button className=" py-3 pl-3 pr-2 text-white text-sm font-semibold" onClick={handleLogin}>
                        <span>{loggedIn ? "Log out" : "Log in"}</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </header>
      </div>
    </>
  );
}
