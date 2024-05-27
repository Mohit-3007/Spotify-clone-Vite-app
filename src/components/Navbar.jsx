import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { BsArrowDownCircle, BsSpotify, BsSearch } from "react-icons/bs";
import { IoChevronBackOutline, IoChevronForwardOutline, IoReorderThree } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { GoBellFill, GoPersonFill } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import headers from '../assets/config';

 const Navbar = ({handleShowSearchResult, handleHideSearchResult, showSearchRes}) => {
  const [expand, setExpand] = useState(false);
  const location = useLocation();
  const { handleLoginState, login } = useContextProvider();
  const navigate = useNavigate();
  const logoutRef = useRef();
  const inputRef = useRef();
  const profileRef = useRef();
  const [ popSettingDiv, setPopSettingDiv ] = useState(false);
  const [inputVal, setInputVal] = useState("");
  // let timer;

  function handleKeyDown(e){
    if(e.key == "Enter" && inputVal.length != 0){
      console.log("make fetch call");
      makeFetchCall()
      handleShowSearchResult()
    }
  }
  const handleOnInputChange = (e) => {
    setInputVal(e.target.value);
    // clearTimeout(timer);
    // debouncedFunction(e);
  }
  const debouncedFunction = DebouncingFunction(makeFetchCall, 2000)
  function DebouncingFunction(func, delay){
    let timer;
    return function(){
      let args = arguments;
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(()=>{
        func.apply(context, args);
      }, delay)
    }
  }

  function handleCrossClick(){
    setInputVal("");
    if(showSearchRes) handleHideSearchResult();

  }

  async function makeFetchCall(){
    console.log('Enter key pressed! Input value: ', inputVal);
    const reqOptions = {
      "method": "GET",
      headers,
    }
    const url = `https://academics.newtonschool.co/api/v1/music/song?filter={"title":"${inputVal}"}`
    const resp = await fetch(url,reqOptions);
    console.log(resp);
    const res = await resp.json();
    console.log(res);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleExpand() {
    if(expand) {
      setExpand(false)
    }
    else{
      setExpand(true);
    }     
  }

  const handleDocumentClick = (e) => {
    if(profileRef?.current?.contains(e.target)){
      return
    }
    else if (expand && !logoutRef?.current?.contains(e.target)){
      setExpand(false);
    }
  };

  useEffect(() => {
      document.addEventListener("mousedown", handleDocumentClick);
      return () => {
          document.removeEventListener("mousedown", handleDocumentClick);
        };
  }, [expand]);

  

  function handlePopRendering(){
    console.log("Pop rendering ")
    setPopSettingDiv(!popSettingDiv);  
  }

  // console.log("popSettingDiv popSettingDiv ... ", popSettingDiv)

  function handleLogin() {
    console.log("Cookie remove");
    handleLoginState()
    navigate("/")
    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return (
    <>
    <div className="w-[calc(100% - 307px)] fixed top-0 right-2 left-[18.6875rem] bg-black hidden sm:block h-2 z-20"></div>
    {/* <div className={"max-sm:w-screen w-full max-sm:z-20 h-14 sm:h-16 z-20 bg-[#121212] " + (popSettingDiv ? "hidden" : "")}> */}
    <div className={"max-sm:w-screen w-[calc(100% - 307px)] max-sm:z-20 h-14 sm:h-16 fixed sm:top-2 top-0 sm:right-2 z-20 left-0 sm:left-[18.6875rem] bg-[#121212] " + (popSettingDiv ? "hidden" : "")}>
      <header className="px-6 w-full h-full py-4 flex items-center justify-between relative">
        {/* For sm Screen: Logo */}
        <div className="sm:hidden w-full flex items-center">
            <BsSpotify className="text-white w-8 h-8" />
            <span className="w-8 h-9 ml-6 text-xl font-figtree font-bold text-white flex justify-center items-center">Spotify</span>
        </div>
        {/* For sm: search icon */}
        <div className="sm:hidden flex h-[2.125rem]">
          <Link className="flex items-center"><BsSearch className="fill-[#A5A5A5] hover:fill-white w-[1.375rem] h-[1.375rem]" /></Link>
          <div className="w-10 h-[2.125rem] flex justify-end items-start ml-2 hover:scale-110 "><IoReorderThree className="text-white w-9 h-9" onClick={handlePopRendering} /></div>
        </div>

        {/* Back & Forward Buttons */}
        <div className="w-[4.5rem] sm:flex justify-between hidden">
          <button className="h-8 w-8 bg-black rounded-[50%] justify-center items-center flex" onClick={() => 
            {navigate(-1)
              window.scrollTo({
                top: 0,
                behavior: "smooth",
                });
            }
            } >
            <IoChevronBackOutline size="1.4rem" color="white" />
          </button>
          <button className="h-8 w-8 bg-black rounded-[50%] justify-center items-center flex" onClick={() => navigate(1)}>
            <IoChevronForwardOutline size="1.4rem" color="white" />
          </button>
        </div>

        {/* If user is not logged in */}
        {!login && (
          <>
            { location.pathname === "/search"  && (
              <div className="hidden sm:block h-12 w-[46.75rem] mr-[1.125rem] relative">
                <input ref={inputRef} className="w-[22.75rem] h-full bg-[#2A2A2A] rounded-3xl py-1.5 px-10 flex justify-center items-center 
                  gap-1.5 placeholder:text-[#757575] font-figtree bg-inherit text-sm pl-9 text-white" 
                  placeholder="What do you want to listen to?" type="text">
                </input>
                <span>
                    <CiSearch className="text-white text-xl absolute top-3.5 left-2" />
                </span>

              </div>
            )}

            {( location.pathname === "/" || location.pathname === "/more-artist" ) && (
              <div className="hidden sm:block h-12 w-[46.75rem] mr-[1.125rem]"></div>
            )}

            <Link to={"https://www.spotify.com/in-en/premium/?utm_source=app&utm_medium=desktop&utm_campaign=upgrade&ref=web_loggedout_premium_button"} 
            target="_blank" className="max-lg:hidden font-figtree h-12 py-2 text-[#9B9B9B] text-base font-extrabold tracking-widest mr-2 hover:text-white
             hover:scale-[1.03]">Premium</Link>

            <Link to={"https://support.spotify.com/in-en/"} 
            target="_blank" className="max-lg:hidden font-figtree h-12 py-2 text-[#9B9B9B] text-base font-extrabold tracking-widest mr-2
             hover:text-white hover:scale-[1.03]">Support</Link>

            <Link to={"https://www.spotify.com/in-en/download/windows/"} 
            target="_blank" className="max-lg:hidden font-figtree h-12 py-2 text-[#9B9B9B] text-base font-extrabold tracking-widest mr-2
             hover:text-white hover:scale-[1.03]">Download</Link>

            <div className="hidden sm:block m-4 h-[1.5625rem] bg-white w-[1px]"></div>

            <div className="hidden w-[12.8125rem] h-12 sm:flex">
              <button className=" font-figtree w-[6rem] py-2 pl-2 pr-7 text-[#9B9B9B] font-bold hover:scale-[1.04] hover:text-white"
                onClick={() => navigate("/signup")}>Sign up</button>

              <button className=" font-figtree w-[6.875rem] bg-white rounded-3xl flex justify-center items-center hover:scale-[1.04]">
                <span className="w-[6.8125rem] h-12 py-2 px-7 text-black flex items-center text-base font-bold"
                  onClick={() => navigate("/login")}>Log in</span>
              </button>
            </div>

          </>
        )}

        {/* If user is logged in */}
        {login && (
          <>
            {location.pathname === "/search" && (
              <>
                {/* Search Input */}
                <div className="h-12 w-[872px] mr-[1.125rem] ml-2">
                  <input ref={inputRef} value={inputVal} 
                    onChange={e => handleOnInputChange(e)}
                    onKeyDown={e => handleKeyDown(e)}
                    className="w-[22.75rem] h-full rounded-3xl py-1.5 pr-10 outline-none focus:outline focus:outline-[0.8px] focus:outline-white bg-[#242424] flex justify-center items-center gap-1.5
                     placeholder:text-[#757575] font-figtree text-sm pl-9 text-white" 
                    placeholder="What do you want to listen to?" type="text">
                  </input>
                  <span>
                    <CiSearch className="text-white text-xl absolute top-[1.375rem] left-[108px]" />
                  </span>
                  {inputVal.length > 0 && (
                    <span onClick={handleCrossClick}>
                      <RxCross1 className="text-white cursor-pointer text-xl absolute top-[1.375rem] left-[425px]" />
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-center items-center">
              {/* Explore Premium */}
              <button className=" w-[8.9375rem] hover:scale-[1.04] h-8 mr-2 text-black bg-white rounded-2xl font-figtree" onClick={()=> navigate("/stay-tuned")}>
              <span className=" w-[8.9375rem] h-8 px-4 py-1 text-sm font-bold ">
                Explore Premium
              </span>
            </button>
            
            {/* Install App */}
            <a className="w-[7.375rem] h-8 text-white hover:scale-[1.04] hover:bg-[#392923] bg-[#080808] mr-2 rounded-2xl font-figtree
                          px-4 py-1 flex justify-center items-center" onClick={()=> navigate("/stay-tuned")} >
              <span className="relative right-1">
                <BsArrowDownCircle />
              </span>
              <span className="text-sm font-bold">Install App</span>
            </a>
            
            {/* Notification Bell */}
            <button className=" hover:scale-[1.04] bg-[#080808] rounded-[50%] mr-2 flex justify-center items-center" onClick={()=> navigate("/stay-tuned")}>
              <span className="w-8 h-8 flex justify-center items-center hover:stroke-white">
                <GoBellFill className="stroke-[#a7a7a7] h-4.5 w-4.5 hover:stroke-white stroke-2" />
              </span>
            </button>

            {/* Profile */}
            <button ref={profileRef} className="w-8 h-8 hover:scale-[1.04] bg-[#080808] rounded-[50%] flex justify-center items-center" onClick={handleExpand}>
              <GoPersonFill className="stroke-white stroke-2" />
            </button>
            </div>

            {/* Logout/Login & Premium */}
            <div ref={logoutRef} className={"w-[12.25rem] h-[7.625rem] bg-[#282828] font-figtree  absolute top-14 rounded-md right-[3.4375rem] " +
                (expand ? "block" : "hidden")}>

              <div className="w-[12.25rem] h-[7.625rem]">
                <ul>
                  <li className="w-[11.75rem] h-[2.5rem]">
                    <Link className=" py-3 pl-3 pr-2 text-white text-sm font-semibold" to={"/changepassword"}>
                      <span>Change Password</span>
                    </Link>
                  </li>
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
                      <span>{login ? "Log out" : "Log in"}</span>
                    </button>
                  </li>
                </ul>
              </div>

            </div>

          </>
        )}
      </header>
    </div>

    {/* for sm screen- Setting Icon Div popup */}
    {!login && (
      <div className={"bg-black w-full h-full px-10 mt-2 fixed top-0 left-0 z-30 " + (popSettingDiv ? "" : "hidden")}>
        {/* Un-Render div */}
        <button className="w-full p-3 h-10 flex justify-end" onClick={handlePopRendering}>
          <RxCross1 className="stroke-2 stroke-white h-6 w-6 hover:scale-105 " />
        </button>
        {/* Login */}
        <div className="h-12 py-2" onClick={() => navigate("/login")}>
          <span className="font-figtree text-2xl text-white font-bold">Login</span>
        </div>
        {/* SignUp */}
        <div className="h-12 py-2">
          <span className="font-figtree text-2xl text-white font-bold" onClick={()=> navigate("/signup")}>Sign up</span>
        </div>
        {/* Break */}
        <div className="w-4 h-[3.125rem] flex justify-center items-center">
          <div className="w-[14px] h-[2px] bg-white"></div>
        </div>
        {/* Website Links */}
        <div className="w-full font-figtree font-bold text-xl text-white flex flex-col gap-3 ">
          <button className="h-[33px] py-1 flex items-center"><span className=""><Link to={"/premium"} href="">Premium</Link></span></button>
          <button className="h-[33px] py-1 flex items-center"><span className=""><a href="https://support.spotify.com/in-en/">Support</a></span></button>
          <button className="h-[33px] py-1 flex items-center"><span className="https://www.spotify.com/in-en/privacy"><a href="">Privacy</a></span></button>
          <button className="h-[33px] py-1 flex items-center"><span className="https://www.spotify.com/in-en/legal/end-user-agreement/"><a href="">Terms</a></span></button>
        </div>

      </div>

    )}   
    </>
  );
};


export default Navbar;


