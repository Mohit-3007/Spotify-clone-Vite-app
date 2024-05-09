import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import Footer from "./Footer";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaSpotify } from "react-icons/fa";
import { BsHeartFill, BsFillPlayFill } from "react-icons/bs";
import { BiTime, BiDotsHorizontalRounded } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import headers from "../assets/config";


export default function ArtistTrack() {
  const location = useLocation();
  const [ artistData, setArtistData ] = useState();
  const [artistId, setArtistId] = useState();
  const likes = Math.floor(Math.random() * 99999);
  const subscriber = Math.floor(Math.random() * 9999999);
  const formattedLikes = likes.toLocaleString('en-US')
  const formattedSubscriber = subscriber.toLocaleString('en-US')
  const dotDivRef = useRef();
  const optionDivRef = useRef();
  const [ showOption, setShowOption ] = useState(false);
  const { musicDispatch } = useMusic()
  const [ follow, setFollow ] = useState(false)

  function handleFollow(){
    setFollow(!follow);
  }

  function handleShowOptions(){
    setShowOption(!showOption);
  }

  const handleDocumentClick = (e) => {
    if(dotDivRef?.current?.contains(e.target)){
      return
    }
    else if (showOption && !optionDivRef?.current?.contains(e.target)){
      setShowOption(false);
    }
  };

  useEffect(() => {
      document.addEventListener("mousedown", handleDocumentClick);
      return () => {
          document.removeEventListener("mousedown", handleDocumentClick);
        };
  }, [showOption]);

  useEffect(()=>{
    setArtistId(location?.state?.id)
  },[])

  function handleArtistId(val){
    setArtistId(val)
  }

  useEffect(() => {
    async function fetchData() {
      try{
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`,
          {
            headers: headers,
          }
        );
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        }
        // console.log("Artist ID Fetch Response ", resp);
        let res = await resp.json();
        // console.log("Artist ID Fetch Result ", res);
        setArtistData(res.data);
      }
      catch(error){
        console.error("Error while fetching artist data:", error);
      }
    }
    fetchData();
  }, [artistId]);

  const handleIconClick = () => {
    musicDispatch({ type: "setMusicId", payload: artistData?.songs[0]?._id })
  }

  return ( 
    <>
      <div className="max-sm:w-screen w-[calc(100%-307px)] h-fit absolute top-0 sm:top-[72px] left-0 sm:left-[18.6875rem] pb-8">
        {/* Main Container */}
        <div>
          <section className="w-[100%] font-figtree relative">

            {/* Music Thumbnail & Title */}
            <div className="w-[100%] px-6 pb-6 h-[21.25rem] relative">

              {/* BG- Color */}
              <div className="w-[100%] h-[21.25rem] bg-gradient-to-b from-[#CFD7CF] to-[#6A6E6A] absolute left-0 top-0"></div>

              {/* Artist pic */}
              <button className="w-[10.5rem] h-[10.5rem] sm:w-[14.5rem] sm:h-[14.5rem] mr-6 z-10 absolute left-6 bottom-6 shadow-2xl rounded-[50%] hover:scale-[1.03]">
                <div className="w-[10.5rem] h-[10.5rem] sm:w-[14.5rem] sm:h-[14.5rem]">
                  <img className="rounded-[50%]" src={artistData?.image} alt="Artist pic" />
                </div>
              </button>

              {/* Artist details */}
              <div className="w-[87.05%] h-[19.75rem] absolute left-[14.5rem] sm:left-[17.5rem] bottom-6 flex flex-col justify-end text-white font-figtree">
              
                <span className="w-[100%] h-[1.375rem] text-sm absolute bottom-[148px] flex items-center">
                  <MdVerified  className="w-6 h-6 fill-[#3D91F4] mr-1.5" />
                  Verified Artist
                </span>
                
                {/* Title */}
                <span className="w-[100%] h-[7.25rem] mt-2 absolute bottom-[32px] text-5xl truncate sm:text-8xl font-bold flex items-center">
                  {artistData?.name}
                </span>

                <div className="w-[100%] h-6 mt-2 absolute bottom-0 text-sm font-bold flex items-center">
                  <div className="h-6 flex items-center">
                    <span className="h-6 flex items-center mr-1"><FaSpotify className="w-6 h-6 fill-[#1ED760]" /></span>
                    <span className="flex items-center text-white">Spotify</span>
                  </div>
                  <div className="h-3 flex items-end">
                    <span className="w-[0.3125rem] mx-[0.375rem] h-[0.3125rem] rounded-[50%] bg-white flex items-end"></span>
                  </div>
                  <div className="h-6 flex items-center">{formattedLikes} likes</div>
                  <div className="h-3 flex items-end">
                    <span className="w-[0.3125rem] mx-[0.375rem] h-[0.3125rem] rounded-[50%] bg-white flex items-end"></span>
                  </div>
                  <div className="h-6 flex items-center">{artistData?.songs?.length} songs,</div>
                  <div className="h-3 flex items-end">
                    <span className="w-[0.3125rem] mx-[0.375rem] h-[0.3125rem] rounded-[50%] bg-white flex items-end"></span>
                  </div>
                  <div className="h-6 flex items-center">{formattedSubscriber} followers</div>
                </div>

              </div>

            </div>

            {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="w-[100%] pb-6 bg-gradient-to-b from-[#525552] to-[rgb(18,20,20)] to-20% ">

                {/* Artist Player & Like Icon && */}
                <div className="w-[100%] h-[6.5rem] top-[21.25rem] z-20" onClick={handleIconClick}>
                  <div className="w-[100%] h-[6.5rem] flex p-6 items-center relative">
                    {/* Play Icon */}
                    <div className="mr-8 w-14 h-14 hover:scale-105 ">
                      <button className="w-14 h-14 flex justify-center items-center">
                        <span className="w-14 h-14 rounded-[50%] bg-[#1ED760] flex justify-center items-center">
                            <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />
                        </span>
                      </button>
                    </div> 
                    {/* Like Icon */}
                    <FavouriteIcon musicObj={artistData}/>
                    {/* Follow Button */}
                    <button onClick={handleFollow} className={"h-[1.875rem]  mr-6 py-[0.1875rem] hover:scale-[1.03] hover:border-white hover:font-extrabold px-[0.9375rem] flex justify-center items-center font-figtree text-white font-bold text-sm rounded-[31.25rem] border-[#878787] border-[0.0781rem] " 
                    + (follow ? "w-[94px]" : "w-[4.625rem] ")}>{follow ? "Following" : "Follow"}</button>
                    {/* More Options */}
                    <button ref={dotDivRef} className="w-8 h-14 py-3" onClick={handleShowOptions}>
                      <span className="w-8 -8"><BiDotsHorizontalRounded className="w-8 h-8 cursor-pointer fill-[#6a6a6a] hover:fill-white" /></span>
                    </button>

                    {/* expand options */}
                    <div ref={optionDivRef} className={"w-[12.5rem] shadow-xl bg-[#282828] rounded-md absolute -bottom-24 z-20 left-[260px] " + (showOption ? "block" : "hidden")}>
                      <ul className="w-[12.5rem] p-1 text-sm font-figtree font-semibold text-[#EAEAEA] ">
                        <li className="w-[12rem] h-10 py-3 pl-3 pr-2 flex items-center  hover:bg-[#3E3E3E]" onClick={handleFollow}>{follow ? "Unfollow" : "Follow"}</li>
                        <li className="w-[12rem] h-10 py-3 pl-3 pr-2 flex items-center  hover:bg-[#3E3E3E]">Remove from your Library</li>
                        <li className="w-[12rem] h-10 py-3 pl-3 pr-2 flex items-center  hover:bg-[#3E3E3E]">Add to queue</li>
                      </ul>
                    </div>
                  </div>   
                </div>

                {/* Table Heading, List Items-(Map) & Copy Right */}
                <div className="w-[100%] px-6 max-h-fit top-[28.75rem] flex flex-col">

                    {/* Title & Music List- Table head */}
                    <div className="w-[100%] max-h-fit border-[0.0781rem] border-transparent ">
                      {/* Title */}
                      <div className="w-[100%] h-[2.25rem] mb-4 ">
                        <div className="w-[100%] h-[2.1719rem] border-b-[0.0781rem] border-b-[#1e3b43] px-4 flex relative text-[#B3B3B3]">
                          <div className="w-3 h-[2.1719rem] flex items-center mr-4">#</div>
                          <div className="w-[38%] h-[2.1719rem] flex justify-start items-center mr-4"><span>Title</span></div>
                          <div className="w-[22.8%] h-[2.1719rem] flex justify-start items-center mr-4">Album</div>
                          <div className="w-12 h-[2.1719rem] flex items-center absolute right-3"><BiTime className="w-4.5 h-4.5" /></div>
                        </div>
                      </div>
                    </div>

                    {/* Liked Song- Map Function */}
                    <div className="w-[100%]"> 
                        {artistData?.songs &&
                            artistData?.songs.map((each, index) => {
                            return <SongContainer key={each._id} eachSong={each} index={index} handleArtistId={handleArtistId}/> 
                        })}
                    </div> 

                    {/* Copy Right */}
                    <div className="mt-8 w-[100%] h-[3.5rem]  text-white">
                      <div className="w-[24.25rem] h-[3.5rem] text-[#9D9D9D]">
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

                </div> 
            </div>

          </section> 
        </div>
        <Footer />
      </div>
      
    </>
  );
}

function FavouriteIcon({musicObj}){
  const { likedSongIds, handleFavSongId }= useContextProvider();
  const [ selected, setSelected ]= useState(false);
  const [ path, setPath ] = useState();
  const location = useLocation();

  useEffect(()=>{
    setPath(location.pathname)
  },[])

  useEffect(()=>{
    const isPresent = likedSongIds?.songs?.find((eachID)=>{
      return eachID._id == musicObj?.songs[0]?._id
    })
    if(isPresent) setSelected(true)
  },[likedSongIds, path])

  function handleLikedState(songId){
    handleFavSongId(songId)
    if(selected) setSelected(!selected)
  }

  return (
    <button className="w-8 h-14 mr-6 flex items-center" onClick={()=>handleLikedState(musicObj?.songs[0]?._id)}>
      <span className="w-8 h-8 flex justify-center items-center" >
        <BsHeartFill  className={"w-[2.9rem] h-[2.9rem] hover:stroke-white hover:scale-105 " + (selected ? "fill-[#1ED760]" : "fill-white")} />
      </span>
    </button>

  )
}


function SongContainer({eachSong, index, handleArtistId}){
    const [hover, setHover] = useState(false);
    const { musicDispatch } = useMusic();
    const { likedSongIds, handleFavSongId }= useContextProvider();
    // console.log("likedSongId's of Index",index,"  ", likedSongIds );
    // console.log(eachSong._id, "  song Id")

    const min = 18;
    const max = 25;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;


    const [ selected, setSelected ]= useState(false);
    const [path, setPath] = useState();
    const location = useLocation();
    useEffect(()=>{
      setPath(location.pathname)
    },[])

    useEffect(()=>{
      const isPresent = likedSongIds?.songs?.find((each)=>{
        return each._id == eachSong?._id
      })
      // console.log(index," Index ",isPresent)
      if(isPresent) setSelected(true)
    },[likedSongIds, path])

    function handleLikedState(songId){
        handleFavSongId(songId)
        if(selected) setSelected(!selected)
    }
    function handleHover(){
        setHover(!hover)
    }

    const handleIconClick = (event) => {
        // event.preventDefault(); 
        musicDispatch({ type: "setMusicId", payload: eachSong._id })
    }
   

    return (
        <div index={index} className={"min-w-[450px] sm:min-w-[612px] w-[97%] h-[3.375rem] relative px-4 border-[0.0781rem] border-transparent flex items-center gap-4 " +
          (hover ? "bg-[#727079]" : "")}
          onMouseEnter={handleHover} onMouseLeave={handleHover}>

          {/* Index  Number */}
          <div className="w-[1rem] h-[3.375rem] flex justify-center items-center" onClick={handleIconClick}>
            <span className="text-white cursor-pointer">{hover ? <BsFillPlayFill className="w-5 h-5" /> : index + 1}</span>
          </div>

          {/* Image, Title & Artists */}
          <div className="h-[3.375rem] w-[36.64%] mr-4 text-white flex items-center ">
            <img src={eachSong.thumbnail} alt={eachSong.title} className="w-10 h-10 mr-4 " />

            {/* title & artists list */}
            <div className="w-[90.59%] h-[3.375rem] flex flex-col">
                {/* Title */}
                <span className="h-[1.3281rem] flex items-end truncate text-white cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis font-semibold hover:underline">{eachSong.title}</span>

                {/* Artists- Map */}
                <span className="h-[1.4rem] w-[100%] flex flex-wrap gap-[3px] overflow-hidden ">
                    {eachSong.artist?.map((eArtist, index) => {
                        return (
                        <CurrentSongArtists
                            key={eArtist}
                            artistId={eArtist}
                            index={index}
                            hover={hover}
                            handleArtistId={handleArtistId}
                        />
                        );
                    })}
                </span>
            </div>
          </div>

          {/* Album */}
          <div className={"sm:min-w-[140px] w-[22.90%] h-[3.375rem] text-sm justify-start hover:underline cursor-pointer flex items-center mr-4 " + (hover ? "text-white" : "text-[#b3b3b3]")}>{eachSong.title}</div>

          {/* heart & duration */}
          <div className="h-[3.375rem] w-[6.875rem] text-white absolute right-3 flex items-center">
            <button className="py-2 w-4 h-8 mr-4 flex justify-center items-center cursor-pointer" onClick={()=>handleLikedState(eachSong._id)}>
              <BsHeartFill className={"w-[2.9rem] h-[2.9rem] hover:stroke-white hover:scale-105 " + (selected ? "fill-[#1ED760]" : "")} />
            </button>
            <div className="w-[2.875rem] h-[1.25rem] flex justify-end text-sm text-[#b3b3b3] mr-4">{"0 : "+randomNum}</div>
            {hover && <button className="w-4 h-8 py-2 flex items-center"><BiDotsHorizontalRounded className="w-7 h-7 cursor-pointer" /></button>}
          </div>

        </div>
    )
}

function CurrentSongArtists({ artistId, index, hover, handleArtistId }) {
    let [artistName, setArtistname] = useState()
    async function fetchData() {
        let data3 = await fetch(
          `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`,
          {
            headers: headers,
          }
        );
        let info3 = await data3.json();
        // console.log("INFOOO ",info3);
        setArtistname(info3?.data?.name)
      }

    useEffect( () => {
        fetchData();
    }, []);

    function artistIdHandler(){
      handleArtistId(artistId)
    }
  
//   console.log("Line- 435:- SingerName", artistName);
  return (
    <Link onClick={artistIdHandler} className={"h-[1.4rem] w-fit flex items-center  cursor-pointer truncate justify-start text-xs hover:underline "  + 
    (hover ? "text-white" : "text-[#b3b3b3]")}>
      {index != 0 && <span className="w-[2px]">,</span>}
      {artistName}
    </Link>
  );
}


