import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BsHeart } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

export default function SongTrack() {
  const [albumObj, setAlbumObj] = useState([]);
  const location = useLocation();
  const dataRecieved = location.state;
  const musicObj = dataRecieved?.musicObj;

  var year;

  function getYear() {
    var dateOfRelease = musicObj?.dateOfRelease;
    year = new Date(dateOfRelease).getFullYear();
    // console.log(year);
  }

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  async function checkAlbum() {
    if (musicObj.album) {
      let data1 = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album/${musicObj?.album}`,
        {
          headers: headers,
        }
      );
      let info1 = await data1.json();
      // console.log("Album data", info1);
      setAlbumObj(info1.data);
    }
    // console.log(musicObj.album, "album")
  }

  // console.log(albumObj);

  useEffect(() => {
    checkAlbum();
  }, []);

  getYear();

  // console.log("SongTrack Component", musicObj);

  return (
    <>
      <Navbar />
      <div className="w-[87.4087rem] h-screen absolute left-[18.6875rem] pb-8">
        {/* Main Container */}
        <div>
          {/* Main_Music_Container */}
          <section className="w-[87.4087rem] font-figtree">
            {/* Music Thumbnail & Title */}
            <div className="w-[87.4087rem] px-6 pb-6 h-[21.25rem] relative">
              {/* BG- Color */}
              <div className="w-[87.4087rem] h-[21.25rem] bg-[#298EAB] opacity-60 absolute left-0 top-0"></div>
              {/* Album pic */}
              <button className="w-[14.5rem] h-[14.5rem] mr-6 z-10 absolute left-6 bottom-6 shadow-xl hover:scale-105">
                <div className="w-[14.5rem] h-[14.5rem]">
                  <img src={musicObj?.thumbnail} alt="album pic" />
                </div>
              </button>
              {/* Song details */}
              <div className="w-[68.5313rem] h-[19.75rem] absolute left-[17.5rem] bottom-6 flex flex-col justify-end text-white font-figtree">
                <span className="w-[68.5313rem] h-[1.375rem] text-sm absolute bottom-[148px]">
                  {musicObj?.album === "undefined" ? "Single" : "Album"}
                </span>
                <span className="w-[68.5313rem] h-[7.25rem] mt-2 absolute bottom-[32px]">
                  {/* <h1 className="mt-2 mb-3 w-[1096.5008px] h-[7.25rem] font-extrabold text-8xl whitespace-nowrap overflow-hidden text-ellipsis">{musicObj?.title}</h1> */}
                  <ResponsiveTitle maxWidth={1096.5008} height={7.25} title={musicObj?.title} />
                </span>
                <div className="w-[68.5313rem] h-[1.625rem] mt-2 flex absolute bottom-0 text-sm">
                  {musicObj?.artist.map((each, index) => {
                    return (
                      <div
                        key={index}
                        className="h-6 font-bold flex items-center"
                      >
                        {index != 0 && (
                          <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">
                            .
                          </span>
                        )}
                        <span>{each.name}</span>
                      </div>
                    );
                  })}

                  <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">
                    .
                  </span>
                  <span className="h-6 flex items-center text-sm">{year}</span>
                  <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">
                    .
                  </span>
                  <span className="h-6 flex items-center text-sm mr-1">
                    {musicObj?.album ? albumObj?.songs?.length : 1} Song,
                  </span>
                  <span className="h-6 flex items-center text-sm text-[#CDB1AC]">
                    {" "}
                    2 min 34 sec
                  </span>
                </div>
              </div>
            </div>

            {/* Background Color */}
            <div className="w-[87.5rem] h-[14.5rem]"></div>

            {/* Music Player & Likes */}
            <div className="w-[87.5rem] h-[6.5rem]">
              <div className="w-[87.5rem] h-[6.5rem]">
                <div className="w-[87.5rem] h-[6.5rem] p-6">
                  <div className="w-[84.5313rem] h-14">
                    {/* Player Icon */}
                    <div className="mr-8 w-14 h-14 ">
                      <button className="w-14 h-14 flex justify-center items-center">
                        <span className="w-14 h-14 rounded-[50%] bg-[#1ED760] flex justify-center items-center">
                          <TbPlayerPlayFilled />
                        </span>
                      </button>
                      {/* Like Heart Icon */}
                      <button className="w-8 h-14 mr-6">
                        <span className="w-8 h-8 flex justify-center items-center">
                          <BsHeart />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* List Items & Copy Right */}
            <div className="w-[87.5rem] h-[12.5625rem] px-6">
              {/* Title & Music List */}
              <div className="w-[84.375rem] border-[0.0781rem] h-[6.875rem]">
                {/* Title */}
                <div className="w-[84.375rem] h-[2.25rem] mb-4 ">
                  <div className="w-[84.375rem] h-[2.1719rem] border-b-[0.0781rem] border-b-yellow-300 px-4 flex relative">
                    <div className="w-3 h-[2.1719rem] content-center">#</div>
                    <div className="w-7 h-[2.1719rem] flex justify-center items-center">
                      <span>Title</span>
                    </div>
                    <div className="w-12 h-[2.1719rem] flex items-center">
                      <BiTime />
                    </div>
                  </div>
                </div>

                {/* Music List- Map Function */}
                <div className="w-[84.375rem]">
                  <div className="w-[82.2188rem] h-[3.375rem] px-4 border-[0.0781rem]">
                    <div className="h-[3.375rem] flex justify-center items-center">
                      <span className="">1</span>
                    </div>
                    <div className="h-[3.375rem]">
                      <span className="h-[1.5938rem]">Song Name</span>
                      <Link className="h-[1.4rem]">Singer Name</Link>
                    </div>
                    <div className="h-[3.375rem]">
                      <button className="py-2 w-4 h-4 flex justify-center items-center">
                        <BsHeart />
                      </button>
                      <div className="mr-4">2 : 30</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy Right */}
              <div className="mt-8 w-[84.5rem] h-[3.5rem]">
                <div className="w-[24.25rem] h-[3.5rem] ">
                  <p>August 11, 2023</p>
                  <div className="h-9">
                    <p>@ 2023 @ 2023 @ 2023 @ 2023 @ 2023</p>
                    <p>@ 2023 @ 2023 @ 2023 @ 2023 @ 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* More by Artist */}
            <div className="w-[87.5rem] h-[20.625rem] px-6">
              <section className="w-[84.5rem] h-[20.625rem] mt-12 mb-4">
                {/* More by Artist */}
                <div className="w-[84.5rem] h-[2.875rem]">
                  <div className="mb-4 w-[84.5rem] h-[1.875rem]">
                    <h2 className="text-white font-bold text-2xl"></h2>
                  </div>
                </div>
                {/* More Song Card of Artist */}
                <div className="w-[84.5rem] h-283px"></div>
              </section>
            </div>
          </section>

          {/* Main_Footer_Container */}
          <div className="w-[87.5rem] h-[24.25rem] mt-10">
            <nav className="w-[87.5rem] h-[24.25rem] px-8 pt-2 pb-10">
              {/*Company Details, Community Details, other usefull links & Social Media Links */}
              <div className="w-[83.5313rem] h-[14.625rem] mt-8">
                {/*Company Details, Community Details, other usefull links  */}
                <div className="w-[68.625rem] h-[14.625rem] flex">
                  {/* Company */}
                  <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                    <ul className="font-figtree flex flex-col">
                      <p className="text-white font-bold text-base">Company</p>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          About
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          Jobs
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          For the Record
                        </span>
                      </Link>
                    </ul>
                  </div>
                  {/* Community */}
                  <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                    <ul className="font-figtree flex flex-col">
                      <p className="text-white font-bold text-base">
                        Communities
                      </p>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          For Artists
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          Developers
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          Adverstising
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          Investors
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                          Vendors
                        </span>
                      </Link>
                    </ul>
                  </div>
                  {/* Usefull Links */}
                  <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                    <ul className="font-figtree flex flex-col">
                      <p className="text-white font-bold text-base">
                        Useful links
                      </p>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 bg-[#A7A7A7] text-base font-normal">
                          Support
                        </span>
                      </Link>
                      <Link className="w-[2.8125rem] h-[1.625rem]">
                        <span className="pb-2 bg-[#A7A7A7] text-base font-normal">
                          Free Mobile App
                        </span>
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* Social Media Links */}
                <div className="w-[9.5rem] h-[12.125rem] mb-10 flex">
                  <div className="pr-4">
                    <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] flex justify-center items-center">
                      I
                    </Link>
                  </div>
                  <div className="pr-4">
                    <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] flex justify-center items-center">
                      I
                    </Link>
                  </div>
                  <div className="pr-4">
                    <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] flex justify-center items-center">
                      I
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-[83.6063rem] h-[0.0781rem] mb-6 bg-white opacity-10"></div>

              {/*Legal, Cookies & Privacy Center  */}
              <div className="w-[83.5313rem] h-[3.0625rem] flex justify-between pt-4">
                <div className="w-[31.75rem] h-[2.0625rem] flex">
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      Legal
                    </Link>
                  </div>
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      Privacy Center
                    </Link>
                  </div>
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      Privacy Policy
                    </Link>
                  </div>
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      Cookies
                    </Link>
                  </div>
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      About Ads
                    </Link>
                  </div>
                  <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                    <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                      Accessibility
                    </Link>
                  </div>
                </div>
                <div className="w-[8.4375rem] h-[1.4063rem]">
                  <div className="w-[8.4375rem] pr-4">
                    <p className="text-[#A7A7A7] font-figtree font-normal text-sm">
                      c 2023 Spotify AB
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function ResponsiveTitle({ maxWidth, height, title }) {
  const titleRef = useRef()

  useEffect(() => {
    function adjustFontSize() {
      const h1 = titleRef.current;
      const fontSize = parseInt(window.getComputedStyle(h1).fontSize);
      // console.log("fontSize",fontSize);
      // console.log(h1.offsetWidth, " ", maxWidth);
      
      while (h1.offsetWidth > maxWidth && fontSize > 0) {
        // console.log("while loop entered");
        // console.log(h1.offsetWidth,"Inside while");
        fontSize -= 1;
        h1.style.fontSize = fontSize + 'px';
      }
    }
    // window.addEventListener("load", adjustFontSize);
    adjustFontSize();

    // return () => {
    //   window.removeEventListener('load', adjustFontSize); // Clean up the event listener
    // };
  }, [])
 
  return (
    <h1 ref={titleRef} className={`mt-2 mb-3 h-[${height}rem] font-extrabold text-[96px] flex items-center whitespace-nowrap overflow-hidden`}>{title}</h1>
  )
}
