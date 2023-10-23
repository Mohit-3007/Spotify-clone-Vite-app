import { useNavigate, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { BsHeartFill, BsSpotify, BsSearch } from "react-icons/bs";
import { AiTwotonePushpin } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";


export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { likedSongIds, login } = useContextProvider();
  const [hover, setHover] = useState(false)
  
  function handleExpand() {
    setExpanded(!expanded);
  }

  function handleHover(){
    setHover(!hover)
  }


  // console.log("Liked Songs Array", likedSongIds)

  return (
    <>
      <div className="w-[17.6875rem] h-[calc(100vh-96px)] hidden sm:block text-white fixed top-2 left-2">
        
        {/* Upper SideBar */}
        <div className="w-[17.6875rem] h-[9.75rem] bg-[#121212] flex flex-col rounded-lg mb-2">

            {/* Spotify Logo */}
            <div className="w-[17.6875rem] h-11">
              <Link className="w-[7.875rem] h-6 mt-[1.25rem] px-6 flex justify-start items-center text-white font-figtree font-medium">
                <BsSpotify className="w-6 h-6 mr-1" /> <span className="flex justify-center items-center text-sm">Spotify</span>
              </Link>
            </div>

            {/* Home & Search icon */}
            <ul className="w-[17.6875rem] h-28 py-2 px-[0.625rem] list-none">

              <li className="w-[16.1875rem] h-12 py-1 px-3 flex items-center relative">
                <a className="w-[14.6875rem] h-10 flex items-center">
                  <GoHomeFill className="fill-white w-7 h-7" />
                  <span onClick={() => navigate("/")} className="h-10 absolute ml-4 top-[14px] left-9 font-figtree font-bold">Home</span>
                </a>
              </li>

              <li className="w-[16.1875rem] h-12 py-1 px-4 flex items-center relative">
                <a className="w-[14.6875rem] h-10 flex items-center">
                  <BsSearch className="fill-[#A5A5A5] hover:fill-white w-[1.375rem] h-[1.375rem]" />
                  <span onClick={() => navigate("/search")} className="h-10 absolute ml-4 text-[#A5A5A5] hover:text-white top-[14px] left-9 font-figtree font-semibold">Search</span>
                </a>
              </li>

            </ul>

        </div>

        {login && (
          <>
            <div className="h-[calc(100%-164px)] bg-[#121212] rounded-lg">

              {/* Your Library and playlist */}
              <div className="h-[6.5rem]">

                <header className="py-2 px-4">
                  <div className="flex items-center h-[2.5rem]">

                    <div className="mr-[4.125rem]">
                      <button className="px-2 py-1 text-[#A7A7A7]">
                        <span className="mr-3 text-xl">&#9779;</span>
                        <span className=" font-figtree text-base font-extrabold">
                          Your Library
                        </span>
                      </button>
                    </div>

                    {/* <span className="text-[#A7A7A7] text-3xl">
                      <button className="p-2">
                        <span>&#43;</span>
                      </button>
                    </span> */}

                  </div>
                </header>

                <div className="h-12 cursor-pointer" onClick={()=> navigate("/liked-songs")}>
                  <div className="w-[4.6875rem] h-8 my-2 mx-4 bg-[#232323] rounded-3xl flex justify-center items-center"><span className="  text-sm">Playlists</span></div>
                </div>

              </div>

              {/* Liked Songs */}
              <div className="h-[29.1563rem]">
                <div className="h-[29.1563rem] pb-2 px-2">   
                  <div className="h-[2.125rem] pt-0.5 px-2 flex justify-between mb-2.5 relative">
                    <div className="w-8 h-8 flex justify-center items-center text-lg"><CiSearch /></div>

                    {/* <div className="w-[6.375rem] h-8 flex justify-center items-center" onClick={handleExpand}>
                      <button className="w-[6.375rem] h-8 ml-2 pl-3 pr-2 flex justify-between items-center
                       font-figtree bg-inherit text-[#B8B8B8] hover:text-white">
                        <span className=" text-sm">Recents</span>
                        <IoMdArrowDropdown size={25}  />
                      </button>
                    </div> */}

                    <div className={"w-[10rem] h-[13rem] bg-[#282828] absolute top-[2.125rem] right-0 rounded-md " + (expanded ? "block" : "hidden")}>
                      <div className="w-[10rem] h-[13rem]">
                        <ul className="w-[10rem] h-[13rem] p-1">
                          <li className="">   
                            <span className="font-figtree text-[#B3B3B3] w-[9.5rem] h-[2.5rem] py-3 pl-3 pr-2">Sort By</span>
                          </li>
                          <li className="">
                            <button className="font-figtree text-[#CACACA] w-[9.5rem] h-[2.5rem] py-3 pl-3 pr-2 flex justify-start">
                              <span>Recents</span>
                              {/* SVG */}
                            </button>
                          </li>
                          <li className="">
                            <button className="font-figtree text-[#CACACA] w-[9.5rem] h-[2.5rem] py-3 pl-3 pr-2 flex justify-start">
                              <span>Recently Added</span>
                              {/* SVG */}
                            </button>
                          </li>
                          <li className="">
                            <button className="font-figtree text-[#CACACA] w-[9.5rem] h-[2.5rem] py-3 pl-3 pr-2 flex justify-start">
                              <span>Alphabetical</span>
                              {/* SVG */}
                            </button>
                          </li>
                          <li className="">
                            <button className="font-figtree text-[#CACACA] w-[9.5rem] h-[2.5rem] py-3 pl-3 pr-2 flex justify-start">
                              <span>Creator</span>
                              {/* SVG */}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Liked Songs Div */}
                  <div className="w-[16.6875rem]">
                    <ul className="list-none font-figtree">
                      <li className={"w-[16.6875rem] h-[4rem] rounded-lg " + (hover ? "bg-[#4b4a4a]" : "bg-[#232323] ")}>
                        <div className="w-[16.6875rem] h-[4rem] p-2 flex justify-between relative">

                          {/* on hover change bg */}
                          <div className="w-[16.6875rem] h-[4rem] absolute top-0 left-0" onClick={()=>navigate("/liked-songs")} onMouseEnter={handleHover} onMouseLeave={handleHover}></div>

                          {/* Heart Div */}
                          <div className="w-12 h-12 bg-gradient-to-br from-[#4507F4] to-[#B9DFDA] opacity-90 flex justify-center items-center">
                            <BsHeartFill />
                          </div>

                          {/* Liked songs number */}
                          <div className="w-[11.9375rem] h-[3rem]">
                            <div className="w-[100%] h-[3rem] flex flex-col justify-center">
                              <p className="w-[100%] h-[1.5938rem]"><span className="text-white  text-base font-semibold"> Liked Songs</span></p>
                              <div className="w-[100%] h-[1.4375rem] text-white">
                                <p className="w-[100%] h-[1.4375rem] flex items-center ">
                                  <span><AiTwotonePushpin className="fill-[#1ED760] mr-1" /></span>
                                  <span className="text-sm text-[#919191] w-[100%] flex items-center">Playlist <b className="mx-1">.</b> {likedSongIds?.songs?.length} songs</span>
                                  
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}


        {!login && (     
          <>
          {/* h-[35.5778rem] */}
            {/* Library_create playlist && Cookies and about us */}
            <div className=" h-[calc(100%-164px)] bg-[#121212] rounded-lg relative">

              {/* Library and create playlist */}
              {/* h-[22.5625rem] */}
              <div className=" h-[100%] relative">

                {/* Your Library */}
                <div className="h-14 absolute top-0">
                  <header className="py-2 px-4">
                    <div className="flex items-center">
                      <div className="mr-[4.125rem]">
                        <button className="px-2 py-1 text-[#A7A7A7]">
                          <span className="mr-3 text-xl">&#9779;</span>
                          <span className=" font-figtree font-[16px] font-extrabold">
                            Your Library
                          </span>
                        </button>
                      </div>
                      <span className="text-[#A7A7A7] text-3xl">
                        <button className="p-2">
                          <span>&#43;</span>
                        </button>
                      </span>
                    </div>
                  </header>
                </div>
                
                {/* Create PlayList & Browse Podcasts */}
                <div className="w-[17.5rem] absolute top-14 text-white font-figtree bg-[#121212] 
                      px-2 pb-2 font-figtree  flex flex-col justify-around overflow-x-hidden ">

                  {/* Section-Create Playlist */}
                  <section className="my-2 py-4 px-5 h-[8.75rem] w-[16.5rem] bg-[#242424] flex flex-col justify-between">
                    <div className="text-white flex flex-col justify-between h-14">
                      <span className="text-base font-extrabold">
                        Create your first playlist
                      </span>
                      <span className="text-sm">Create your first playlist</span>
                    </div>
                    <div className="my-4">
                      <button className="bg-white py-1 px-4 rounded-3xl">
                        <span className="text-center text-sm text-black leading-normal font-semibold">
                          Create playlist
                        </span>
                      </button>
                    </div>
                  </section>

                  {/* Section- Browse Podcasts */}
                  <section className="my-2 py-4 px-5 h-[188px] w-[16.5rem] bg-[#242424] flex flex-col justify-between">
                    <div className="flex flex-col justify-between h-[6.5rem]">
                      <span className="text-white text-base font-extrabold">
                        Let's find some podcasts to follow
                      </span>
                      <span className="text-white text-sm">
                        We'll keep you updated on new episodes
                      </span>
                    </div>
                    <div className="w-[143px] h-8 bg-white items-center flex justify-center rounded-2xl">
                      <a>
                        <span className="px-4 py-1 text-black text-sm font-semibold">
                          Browse podcast
                        </span>
                      </a>
                    </div>
                  </section>

                </div>

                {/* Cookies and about us */}
                <BottomSideBar />

              </div>

            </div>
          </>
        ) }
      
      </div>
    </>
  );
}

function BottomSideBar(){
  return (
    <div className="h-[13.4168rem] text-white absolute bottom-1.5 bg-[#121212]">

      <div className="my-8 px-6">

        <div className="flex flex-wrap text-[#A7A786] text-[0.6563rem]">
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/legal/end-user-agreement/" className="mb-2 hover:underline">
              <span>Legal</span>
            </a>
          </div>
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/privacy" className="mb-2 hover:underline">
              <span>Privacy Centre</span>
            </a>
          </div>
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/legal/privacy-policy/" className="mb-2 hover:underline">
              <span>Privacy Policy</span>
            </a>
          </div>
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/legal/cookies-policy/" className="mb-2 hover:underline">
              <span>Cookies</span>
            </a>
          </div>
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/legal/privacy-policy/#s3" className="mb-2 hover:underline">
              <span>About Ads</span>
            </a>
          </div>
          <div className="mr-4 h-[1.9063rem] flex items-center">
            <a href="https://www.spotify.com/in-en/accessibility" className="mb-2 hover:underline">
              <span>Accessibility</span>
            </a>
          </div>
        </div>

        <a href="https://www.spotify.com/in-en/legal/cookies-policy/" className="pr-4 text-[#A7A786] text-[0.6563rem] cursor-pointer hover:underline">
          <span>Cookies</span>
        </a>

      </div>

      <div className="mb-8 px-6">

        <button className="w-24 h-8 border border-white border-solid text-[14px] flex py-[3px] px-[0.9375rem] items-center border-r rounded-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26Zm81.57 64h-40.18a139.15 139.15 0 0 0-23.45-50.2A90.32 90.32 0 0 1 209.57 90Zm8.43 38a89.7 89.7 0 0 1-3.83 26h-42.31a159 159 0 0 0 0-52h42.31a89.7 89.7 0 0 1 3.83 26Zm-90 90a1.75 1.75 0 0 1-1.32-.59C113.8 203.54 104.34 185.73 99 166h58c-5.34 19.73-14.8 37.54-27.68 51.41a1.75 1.75 0 0 1-1.32.59Zm-31.69-64a147.48 147.48 0 0 1 0-52h63.38a147.48 147.48 0 0 1 0 52ZM38 128a89.7 89.7 0 0 1 3.83-26h42.31a159 159 0 0 0 0 52H41.83A89.7 89.7 0 0 1 38 128Zm90-90a1.75 1.75 0 0 1 1.32.59C142.2 52.46 151.66 70.27 157 90H99c5.34-19.73 14.8-37.54 27.68-51.41A1.75 1.75 0 0 1 128 38Zm-17.94 1.8A139.15 139.15 0 0 0 86.61 90H46.43a90.32 90.32 0 0 1 63.63-50.2ZM46.43 166h40.18a139.15 139.15 0 0 0 23.45 50.2A90.32 90.32 0 0 1 46.43 166Zm99.51 50.2a139.15 139.15 0 0 0 23.45-50.2h40.18a90.32 90.32 0 0 1-63.63 50.2Z"
            />
          </svg>
          <span>English</span>
        </button>

      </div>

    </div>
  )
}
