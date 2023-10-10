import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useSongTrack } from "./ContextProvider/SongTrackProvider";
import Navbar from "./Navbar";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BsHeartFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";
import LikedSongs from "./LikedSongs";



export default function SongTrack() {
  const [musicObj, setMusicObj] = useState();
  const [albumObj, setAlbumObj] = useState();
  const location = useLocation();
  const { songData } = useSongTrack();
  
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(()=>{
    console.log(songData)
    setMusicObj(songData);
    // checkAlbum()
  },[songData])

  useEffect(() => {
    function getYear() {
      if (musicObj?.album === undefined) {
        const dateOfCreation = musicObj?.createdAt;
        const date = new Date(dateOfCreation);
        const fullYear = date.getFullYear();
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        setYear(fullYear);
        setDay(day);
        setMonth(monthNames[monthIndex]);
      } else {
        const dateOfRelease = musicObj?.dateOfRelease;
        const date = new Date(dateOfRelease);
        const fullYear = date.getFullYear();
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        setYear(fullYear);
        setDay(day);
        setMonth(monthNames[monthIndex]);
      }
    }
    getYear();
  }, [musicObj]);

  async function checkAlbum() {
    if (songData?.album) {
      let resp = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album/${songData?.album}`,
        {
          headers: headers,
        }
      );
      let info = await resp.json();
      setAlbumObj(info.data);
    }
    // console.log("album id", musicObj.album);
  }

  useEffect(() => {
    checkAlbum();
  }, []);
  console.log("albumObject", albumObj);

  return ( 
    <>
      <Navbar />
      <div className="w-[87.4087rem] h-screen absolute left-[18.6875rem] pb-8">
        {/* Main Container */}
        <div>
          {/* Main_Music_Container */}
          <section className="w-[87.4087rem] font-figtree relative">

            {/* Music Thumbnail & Title */}
            <div className="w-[87.4087rem] px-6 pb-6 h-[21.25rem]  from relative">

              {/* BG- Color */}
              <div className="w-[87.4087rem] h-[21.25rem] bg-gradient-to-b from-[#2D99B8] to-[#154A59] absolute left-0 top-0"></div>

              {/* Album pic */}
              <button className="w-[14.5rem] h-[14.5rem] mr-6 z-10 absolute left-6 bottom-6 shadow-xl hover:scale-105">
                <div className="w-[14.5rem] h-[14.5rem]">
                  <img src={musicObj?.thumbnail} alt="album pic" />
                </div>
              </button>

              {/* Song details */}
              <div className="w-[68.5313rem] h-[19.75rem] absolute left-[17.5rem] bottom-6 flex flex-col justify-end text-white font-figtree">
              
                <span className="w-[68.5313rem] h-[1.375rem] text-sm absolute bottom-[148px]">
                  {musicObj?.album === undefined ? "Single" : "Album"}
                </span>
                {/* Title */}
                <span className="w-[68.5313rem] h-[7.25rem] mt-2 absolute bottom-[32px]">
                  {/* <h1 className="mt-2 mb-3 w-[1096.5008px] h-[7.25rem] font-extrabold text-8xl whitespace-nowrap overflow-hidden text-ellipsis">{musicObj?.title}</h1> */}
                  <ResponsiveTitle
                    maxWidth={1096.5008}
                    height={7.25}
                    title={musicObj?.title}
                  />
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
            <div className="w-[87.5rem] h-[14.5rem]  bg-gradient-to-b from-[rgb(18,61,74)] to-[rgb(18,20,20)]"></div>

            {/* Music Player & Likes */}
            <div className="w-[87.5rem] h-[6.5rem] absolute top-[21.25rem]">
              <div className="w-[87.5rem] h-[6.5rem]">
                <div className="w-[87.5rem] h-[6.5rem] p-6">
                  <div className="w-[84.5313rem] h-14 flex">
                    {/* Player Icon */}
                    <div className="mr-8 w-14 h-14 ">
                      <button className="w-14 h-14 flex justify-center items-center">
                        <span className="w-14 h-14 rounded-[50%] bg-[#1ED760] flex justify-center items-center">
                          <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />
                        </span>
                      </button>
                    </div>
                    {/* Like Heart Icon */}
                    {/*  */}
                    <FavouriteIcon musicObj={musicObj}/>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* List Items-(Map) & Copy Right */}
            {/* h-[12.5625rem] */}
            <div className="w-[87.5rem] px-6 max-h-fit absolute top-[28.75rem] bg-opacity-5 flex flex-col">

              {/* Title & Music List */}
              <div className="w-[84.375rem] max-h-fit border-[0.0781rem] border-transparent h-[6.875rem]">
                {/* Title */}
                <div className="w-[84.375rem] h-[2.25rem] mb-4 ">
                  <div className="w-[82.2188rem] h-[2.1719rem] border-b-[0.0781rem] border-b-[#1e3b43] px-4 flex relative text-[#B3B3B3]">

                    <div className="w-3 h-[2.1719rem] flex items-center mr-4">
                      #
                    </div>
                    <div className="w-7 h-[2.1719rem] flex justify-center items-center">
                      <span>Title</span>
                    </div>
                    <div className="w-12 h-[2.1719rem] flex items-center absolute right-3">
                      <BiTime className="w-4.5 h-4.5" />
                    </div>

                  </div>
                </div>
              </div>

              {/* Music List- Map Function */}{" "}  {/* for index 0, bg-opacity-0 */}
              <div className="w-[84.375rem]"> 

                  {musicObj?.album === undefined && (
                    <div className="w-[82.2188rem] h-[3.375rem] relative px-4 border-[0.0781rem] bg-opacity-0 border-transparent bg-[#121212] flex gap-4">
                      <div className="w-[1rem] h-[3.375rem] flex justify-center items-center">
                        <span className="text-white">1</span>
                      </div>
                      <div className="h-[3.375rem] text-white flex flex-col">
                        <span className="h-[1.5938rem] flex items-end text-[#ECECEC] hover:text-[#fffcfc]">
                          {musicObj?.title}
                        </span>
                        {musicObj?.artist.map((e, index) => {
                          return (
                            <Link
                              key={index}
                              className="h-[1.4rem] flex items-end text-xs"
                            >
                              {e.name}
                            </Link>
                          );
                        })}
                      </div>
                      <div className="h-[3.375rem] text-white absolute right-4">
                        <button className="py-2 w-4 h-4 flex justify-center items-center">
                          <BsHeartFill />
                        </button>
                        <div className="mr-4">2 : 30</div>
                      </div>
                    </div>
                  )}

                  {musicObj?.album &&
                    albumObj?.songs.map((each, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "w-[82.2188rem] h-[3.375rem] relative px-4 border-[0.0781rem] border-transparent bg-[#121212] flex gap-4 " +
                            (index == 0 && "bg-opacity-0")
                          }
                        >
                          <div className="w-[1rem] h-[3.375rem] flex justify-center items-center">
                            <span className="text-white">{index + 1}</span>
                          </div>
                          <div className="h-[3.375rem] text-white flex flex-col">
                            <span className="h-[1.5938rem] flex items-end text-[#ECECEC] hover:text-[#fffcfc]">
                              {each.title}
                            </span>
                            <span className="h-[1.4rem] flex gap-2">
                              {each.artist?.map((eArtist) => {
                                return (
                                  <CurrentSongArtists
                                    key={eArtist}
                                    albumArtists={albumObj.artists}
                                    artistId={eArtist}
                                  />
                                );
                              })}
                            </span>
                          </div>
                          <div className="h-[3.375rem] text-white absolute right-4">
                            <button className="py-2 w-4 h-4 flex justify-center items-center">
                              <BsHeartFill />
                            </button>
                            <div className="mr-4">2 : 30</div>
                          </div>
                        </div>
                      );
                  })}

              </div>

              {/* Copy Right */}
              <div className="mt-8 w-[84.5rem] h-[3.5rem]  text-white">
                <div className="w-[24.25rem] h-[3.5rem] text-[#9D9D9D]">
                  <p className="text-sm font-semibold">
                    {month} {day}, {year}
                  </p>
                  <div className="h-9 text-[0.6875rem]">
                    <p>
                      @ 2023 Meri marzi Pictures LLP under exclusive licenses to
                      Warner Music India
                    </p>
                    <p>
                      @ 2023 Meri marzi Pictures LLP under exclusive licenses to
                      Warner Music India
                    </p>
                  </div>
                </div>
              </div>

              {/* More by Artist */}
              <div className="w-[87.5rem] h-[20.625rem] px-6">
                <section className="w-[84.5rem] h-[20.625rem] mt-12 mb-4">
                  {/* More by Artist */}
                  <div className="w-[84.5rem] h-[2.875rem]">
                    <div className="mb-4 w-[84.5rem] h-[1.875rem]">
                      <h2 className="text-white font-bold text-2xl">
                        More by {musicObj?.artist[0].name}
                      </h2>
                    </div>
                  </div>

                  {/* More Song Card of Artist */}
                  <div className="w-[84.5rem] h-280px flex flex-wrap gap-6">
                    <MoreArtistSong musicObj={musicObj} headers={headers} />
                  </div>
                </section>
              </div>
              
              {/* Main_Footer_Container */}
              
            </div>    
          </section> 
        </div>
      </div>
    </>
  );
}

function FavouriteIcon({musicObj}){
  const {  likedSongIds ,handleFavSongId }= useContextProvider();
  const [ selected, setSelected ]= useState(false);
  const [path, setPath] = useState();
  const location = useLocation()
  useEffect(()=>{
    setPath(location.pathname)
  },[])
  // console.log(musicObj?.title," ", path);

  useEffect(()=>{
    const isPresent = likedSongIds?.songs?.find((each)=>{
      return each._id == musicObj?._id
    })
    if(isPresent) setSelected(!selected)
  },[likedSongIds, path])

  function handleLikedState(songId){
    handleFavSongId(songId)
    if(selected) setSelected(!selected)
    // const isPresent = likedSongIds.songs.find((each)=>{
    //   return each._id == songId
    // })
    // if(isPresent) setSelected(!selected)
  }

  return (
    <button className="w-8 h-14 mr-6" onClick={()=>handleLikedState(musicObj?._id)}>
      <span className="w-8 h-8 flex justify-center items-center" >
        <BsHeartFill  className={"w-[2.9rem] h-[2.9rem] hover:stroke-white hover:scale-105 " + (selected ? "fill-[#1ED760]" : "")} />
      </span>
    </button>
    // style={{fill: 'red'}}
  )
}

function MoreArtistSong({ musicObj, headers }) {
  const [artistobj, setArtistObj] = useState();
  const fetchId = musicObj?.artist[0]._id;

  // console.log("MoreArtistSong", musicObj, fetchId);
  useEffect(() => {
    async function getArtistSongs() {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/music/artist/${fetchId}`,
        {
          headers: headers,
        }
      );
      const data = await resp.json();
      setArtistObj(data.data);
    }
    if(fetchId){
      getArtistSongs();
    }
  }, [fetchId]);
  // console.log("ARTIST OBJECT", artistobj);

  return (
    <>
      {artistobj?.songs?.splice(0,6).map((each) => { 
        return <MoreArtistSongCard key={each._id} songData={each} />
      })}  
    </>
  )
}

function MoreArtistSongCard({songData}) {
  const [hover, setHover] = useState(false);
  const [year, setYear] = useState(0);

  useEffect(() => {
    function getYear() {
      if (songData?.album === undefined) {
        const dateOfCreation = songData.createdAt;
        const date = new Date(dateOfCreation);
        const fullYear = date.getFullYear();
        setYear(fullYear);
      } else {
        const dateOfRelease = songData.dateOfRelease;
        const date = new Date(dateOfRelease);
        const fullYear = date.getFullYear();
        setYear(fullYear);
      }
    }
    getYear();
  }, [songData]);

  function handleHoverState() {
    setHover(!hover);
  }

  return (
    <div className={"w-[12.625rem] h-[17.5rem] relative p-4 flex flex-col rounded-lg cursor-pointer " + (hover ? "bg-[#282828]" : "bg-[#171717]")}>
      <div className="w-[10.8125rem] h-[15.7188rem]">

        {/* Image & PlayIcon */}
        <div className="w-[10.8125rem] h-[10.8125rem] mb-4">
          {/* Image */}
          <div className="w-[10.8125rem] h-[10.8125rem]">
            <div className="w-[10.8125rem] h-[10.8125rem] rounded-md overflow-hidden">
              <img src={songData.thumbnail} alt="" />
            </div>
          </div>
          {/* Play Icon on hover */}
          {hover && (
            <div className={"w-12 h-12 bg-[#1ED760] rounded-[50%] absolute top-[141px] right-4 " + (hover ? "-translate-y-3" : "-translate-y-0")}>
              <button className="w-12 h-12 flex justify-center items-center"
              // onClick={sendDataToParent}
              >
                <span>
                  {" "}
                  <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />{" "}
                </span>
              </button>
            </div>
          )}  
        </div>

        {/* Title & Year */}
        <div className="w-[10.8125rem] h-[3.875rem] flex flex-col justify-between">
          <a className="w-[10.8125rem] h-[1.875rem] text-white font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis flex items-center">{songData.title}</a>
          <a className="w-[10.8125rem] h-[1.4rem] text-white text-sm flex items-center">{ year}</a>
        </div>

        {/* card click handler */}
        <div
          className="w-[12.625rem] h-[17.5rem] absolute left-0 top-0"
          onMouseOver={handleHoverState}
          onMouseLeave={handleHoverState}
        ></div>

      </div>
    </div>
  )
}

function CurrentSongArtists({ albumArtists, artistId }) {
  
  const singerName = albumArtists.filter((e) => {
    // console.log("Filter", e._id, "Artist Id", artistId);
    return e._id === artistId;
  });
  // console.log("SingerName", singerName);
  // console.log(artistId,"ARTIST IDDFDD");0
  return (
    <Link
      className="h-[1.4rem] flex items-end text-xs hover:underline"
    >
      {singerName[0].name}
    </Link>
  );
}

function ResponsiveTitle({ maxWidth, height, title }) {
  const titleRef = useRef();

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
        h1.style.fontSize = fontSize + "px";
      }
    }
    // window.addEventListener("load", adjustFontSize);
    adjustFontSize();

    // return () => {
    //   window.removeEventListener('load', adjustFontSize); // Clean up the event listener
    // };
  }, []);

  return (
    <h1
      ref={titleRef}
      className={`mt-2 mb-3 h-[${height}rem] font-extrabold text-[96px] flex items-center whitespace-nowrap overflow-hidden`}
    >
      {title}
    </h1>
  );
}
