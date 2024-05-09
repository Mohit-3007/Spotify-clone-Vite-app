import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BsHeartFill, BsFillPlayFill } from "react-icons/bs";
import { BiTime, BiDotsHorizontalRounded } from "react-icons/bi";
import headers from "../assets/config";
import Footer from "./Footer";

const monthNames = ["January","February","March","April","May", "June","July","August","September","October","November","December",];
export default function SongTrack() {
  const [musicObj, setMusicObj] = useState();
  const [albumObj, setAlbumObj] = useState();
  const [queryType, setQueryType] = useState("")
  const [searchId, setSearchId] = useState()
  const location = useLocation();
  const [path, setpath] = useState()
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const { musicDispatch } = useMusic()
  const [ audioId, setAudioId ] = useState("");

  useEffect(()=>{
    setpath(location.pathname)
  },[])

  function handleSearchId(id){
    setSearchId(id)
  }

  function handleQueryType(val){
    setQueryType(val)
  }

  // Splitting Location State String
  useEffect(()=>{
    const splitState= (location?.state?.data)?.split("&");
    if(splitState){
      const id = splitState[0]
      setSearchId(id);
      const type = splitState[1]
      if(type == "false"){
        setQueryType("song")
      }
      else{
        setQueryType("album")
      }
    }
  },[path])

  // console.log(" Line  97  ",searchId, queryType)
  useEffect(()=>{
    if(queryType) fetchData();
    async function fetchData() {
      try{
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/${queryType}/${searchId}`,
          {
            headers: headers,
          }
        );
        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`);
        };
        let res = await resp.json();
        console.log(queryType, "Song ID Fetch Result ", res);
        setMusicObj(res.data);
      }
      catch(error){
        console.error("Error while fetching artist data:", error);
      }
    }
  },[searchId, queryType])

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

  useEffect(() => {
    async function checkAlbum() {
      if (musicObj?.album) {
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/album/${musicObj?.album}`,
          {
            headers: headers,
          }
        );
        let info = await resp.json();
        setAlbumObj(info.data);
      }
      // console.log("album id", musicObj.album);
    }
    checkAlbum();
  }, [musicObj]);
  // console.log("albumObject", albumObj);
  useEffect(()=>{
    if(musicObj?.type === "song"){
      setAudioId(musicObj?._id)
    }
    else{
      setAudioId(musicObj?.songs[0]?._id)
    }
  },[musicObj])

  const handleIconClick = () => {
    musicDispatch({ type: "setMusicId", payload: audioId })
  }
  console.log("AUDIO URL AUDIO URL AUDIO URL   ", audioId)
  return ( 
    <>
    <div className="max-sm:w-screen w-[calc(100%-307px)] h-fit absolute top-0 sm:top-[72px] left-0 sm:left-[18.6875rem] pb-8">
      {/* Main Container */}
      <div>
        <section className="w-[100%] font-figtree relative">
          {/* Music Thumbnail & Title */}
          <div className="w-[100%] px-6 pb-6 h-[21.25rem] relative">
            {/* BG- Color */}
            <div className="w-[100%] h-[21.25rem] bg-gradient-to-b from-[#2D99B8] to-[#154A59] absolute left-0 top-0"></div>
            {/* Album pic */}
            <button className="w-[14.5rem] h-[14.5rem] mr-6 z-10 absolute left-6 bottom-6 shadow-xl hover:scale-[1.03]">
              <div className="w-[14.5rem] h-[14.5rem]">
                <img src={queryType === "album" ? musicObj?.image : musicObj?.thumbnail} alt="album pic" />
              </div>
            </button>
            {/* Song details */}
            <div className="w-[87.05%] h-[19.75rem] absolute left-[17.5rem] bottom-6 flex flex-col justify-end text-white font-figtree">   
              {/* Single Song OR Album */}
              <span className="w-[100%] h-[1.375rem] text-sm absolute bottom-[148px]">
                {musicObj?.type === "song" ? 
                  (musicObj?.album === undefined ? "Single" : "Album" )
                  :
                  (musicObj?.songs?.length == 1 ? "Single" : "Album")
                }
              </span>             
              {/* Title */}
              <span className="w-[100%] h-[7.25rem] mt-2 absolute bottom-[32px]">
                <h1 className="mt-2 mb-3 w-[100%] h-[7.25rem] font-extrabold text-8xl whitespace-nowrap overflow-hidden text-ellipsis">{musicObj?.title}</h1>
              </span>
              {/* Artist map & Year & SongArray Length */}
              <div className="w-[100%] h-[1.625rem] mt-2 flex absolute bottom-0 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {/* If Data from song API*/}
                {musicObj?.artist?.map((each, index) => {
                  return (
                    <Link key={index} className="h-6 font-bold flex items-center cursor-pointer hover:underline"
                    to={"/artist-track"}
                    state={{id: each._id}}
                    >
                      {index != 0 && (
                        <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">
                          .
                        </span>
                      )}
                      <span>{each.name}</span>
                    </Link>
                  );
                })}
                {/* If Data from album API*/}
                {musicObj?.artists?.map((each, index) => {
                  return (
                    <Link key={index} className="h-6 font-bold flex items-center cursor-pointer hover:underline"
                    to={"/artist-track"}
                    state={{id: each._id}}
                    >
                      {index != 0 && (
                        <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">
                          .
                        </span>
                      )}
                      <span>{each.name}</span>
                    </Link>
                  );
                })}
                <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">.</span>
                <span className="h-6 flex items-center text-sm">{year}</span>
                <span className="h-[1.625rem] w-[0.9375rem] flex justify-center items-start text-base font-extrabold">.</span>
                <span className="h-6 flex items-center text-sm mr-1">{musicObj?.album ? albumObj?.songs?.length+" Songs" : 1+" Song"} </span>
              </div>
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////// */}
          <div className="w-[100%] pb-6 bg-gradient-to-b from-[rgb(18,61,74)] to-[rgb(18,20,20)] to-20%">
            {/* Music Player & Likes */}
            <div className="w-[100%] h-[6.5rem] top-[21.25rem] z-20">
              <div className="w-[100%] h-[6.5rem]">
                <div className="w-[100%] h-[6.5rem] p-6">
                  <div className="w-[100%] h-14 flex">
                    {/* Player Icon */}
                    <div className="mr-8 w-14 h-14 " onClick={handleIconClick}>
                      <button className="w-14 h-14 flex justify-center items-center">
                        <span className="w-14 h-14 rounded-[50%] bg-[#1ED760] flex justify-center items-center">
                          <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />
                        </span>
                      </button>
                    </div>                 
                    {/* Like Heart Icon */}
                    <FavouriteIcon Object={musicObj}/>                
                  </div>
                </div>
              </div>
            </div>
            {/* Table Heading & MusicList Items-(Map) & Copy Right & More By artist */}
            <div className="min-w-[400px] sm:min-w-[800px] w-[100%] px-6 max-h-fit top-[28.75rem] flex flex-col">
              {/* Table Heading  */}
              <div className="w-[100%] max-h-fit border-[0.0781rem] border-transparent">
                <div className="w-[100%] h-[2.25rem] mb-4 ">
                  <div className="w-[96.5%] h-[2.1719rem] border-b-[0.0781rem] border-b-[#1e3b43] px-4 flex relative text-[#B3B3B3]">
                    <div className="w-3 h-[2.1719rem] flex items-center mr-4">#</div>
                    <div className="w-7 h-[2.1719rem] flex justify-center items-center"><span>Title</span></div>
                    <div className="w-12 h-[2.1719rem] flex items-center absolute right-3"><BiTime className="w-4.5 h-4.5" /> </div>
                  </div>
                </div>
              </div>
              {/* Music List- Map Function{" "}   */}
              <div className="w-[100%]"> 
                {/* if Single Song ? song API : album API*/}
                {musicObj?.type === "song" ? 
                  (musicObj?.album === undefined && <SongContainer musicObj={musicObj} handleSearchId={handleSearchId} handleQueryType={handleQueryType} /> ):
                  (musicObj?.songs?.length <= 1 && <SongContainer musicObj={musicObj} handleSearchId={handleSearchId} handleQueryType={handleQueryType} />)}
                {/* If Album from song API */}
                {musicObj?.album &&
                  albumObj?.songs.map((each, index) => {
                    return (
                      <SongsContainer key={each._id} each={each} index={index} albumObj={albumObj} handleSearchId={handleSearchId} handleQueryType={handleQueryType} />
                    )
                  })
                }
                {/* If Album from Album API */}
                {musicObj?.songs?.length > 1 && 
                  musicObj?.songs.map((each, index) => {
                    return (
                      <SongsContainer key={each._id} each={each} index={index} albumObj={musicObj} handleSearchId={handleSearchId} handleQueryType={handleQueryType} />
                    )
                  })
                } 
              </div>
              {/* Copy Right */}
              <div className="mt-8 w-[84.5rem] h-[3.5rem]  text-white">
                <div className="w-[24.25rem] h-[3.5rem] text-[#9D9D9D]">
                  <p className="text-sm font-semibold">{month} {day}, {year}</p>
                  <div className="h-9 text-[0.6875rem]">
                    <p>@ 2023 Meri marzi Pictures LLP under exclusive licenses to Warner Music India</p>
                    <p>@ 2023 Meri marzi Pictures LLP under exclusive licenses to Warner Music India </p>
                  </div>
                </div>
              </div>
              {/* More by Artist */}
              <div className="w-[100%] h-[20.625rem] mt-12 mb-4">
                <section className="w-[100%] h-[20.625rem]">
                  {/* More by Artist */}
                  <div className="w-[100%] h-[2.875rem]">
                    <div className="mb-4 w-[100%] h-[1.875rem] ">
                      {musicObj?.type === "song" ? <ArtistNameHeading artistObj={musicObj?.artist} />: <ArtistNameHeading artistObj={musicObj?.artists} />}
                    </div>
                  </div>
                  {/* More Song Card of Artist */}
                  <div className="w-[100%]  flex flex-wrap gap-6">
                    <MoreArtistSong musicObj={musicObj} headers={headers} handleSearchId={handleSearchId} handleQueryType={handleQueryType} />
                  </div>
                </section>
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

function ArtistNameHeading({artistObj}){
  const artistInfo = artistObj?.map((each, index)=>{
    if(index == 0){
      const arr = {name: each.name, 
                    id: each._id,};            
      return arr;}
  })

  console.log("artistInfo artistInfo ",artistInfo);

  return (
    <Link className="text-white font-bold text-2xl hover:underline"
    to="/artist-track"
    // state={{id: artistInfo[0]?.id}}
    >
      {artistInfo && (
        <>More by {artistInfo[0]?.name}</>
      )}
    </Link>
  )
}

function SongContainer({musicObj}){
  const [hover, setHover] = useState(false)
  const { likedSongIds, handleFavSongId }= useContextProvider();
  const { musicDispatch } = useMusic()
  // console.log("Single Song Container ", musicObj )

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
    if(musicObj?.type === "song"){
      const isPresent = likedSongIds?.songs?.find((eachID)=>{
        return eachID._id == musicObj?._id
      })
      if(isPresent) setSelected(true)
    }
    else{
      const isPresent = likedSongIds?.songs?.find((eachID)=>{
        return eachID._id == musicObj?.songs[0]?._id
      })
      if(isPresent) setSelected(true)
    }
  },[likedSongIds, path])

  function handleLikedState(musicObj){
    if(musicObj?.type === "song"){
      handleFavSongId(musicObj?._id)
      if(selected) setSelected(!selected)
    }
    else{
      handleFavSongId(musicObj?.songs[0]?._id)
      if(selected) setSelected(!selected)
    }
  }
  function handleHover(){
    setHover(!hover)
  }

  const handleIconClick = () => { 
    if(musicObj?.type === "song"){
      musicDispatch({ type: "setMusicId", payload: musicObj?._id })
    }
    else{
      musicDispatch({ type: "setMusicId", payload: musicObj?.songs[0]?._id })
    }
    
  }

  return (
    <div className={"w-[97.4%] h-[3.375rem] relative px-4 border-[0.0781rem] border-transparent flex items-center gap-4 " + 
    (hover ? "bg-[#727079]" : "" )}
    onMouseEnter={handleHover} onMouseLeave={handleHover}>
                        
      {/* Index */}
      <div className="w-[1rem] h-[3.375rem] flex justify-center items-center" onClick={handleIconClick}>
        <span className="text-white cursor-pointer">{hover ? <BsFillPlayFill className="w-5 h-5" /> : 1}</span>
      </div>

      {/* Title & Artists Name */}
      <div className="h-[3.375rem] w-[37.35%] text-white flex flex-col justify-center">

        {/* Title */}
        <span className="h-[1.5938rem] flex items-end text-white cursor-pointer font-semibold hover:underline">
          {musicObj?.title}
        </span>

        {/* Artists Name */}
        <div className="h-[1.4rem] w-[100%] flex flex-wrap gap-[3px] overflow-hidden">

          {/* If Data from song API*/}
          {musicObj?.artist?.map((e, index) => {
            return (
              <Link key={index} className="h-[1.4rem] flex items-end text-xs hover:underline"
              to="/artist-track"
              state={{id: e._id}}
              >{e.name}</Link>
            );
          })}

          {/* If Data from album API*/}
          {musicObj?.artists?.map((e, index) => {
            return (
              <Link key={index} className="h-[1.4rem] flex items-end text-xs hover:underline"
              to="/artist-track"
              state={{id: e._id}}
              >{e.name}</Link>
            );
          })}

        </div>

      </div>

      {/* Heart Icon */}
      <div className="h-[3.375rem] w-[6.875rem] text-white absolute right-3 flex items-center">
        <button className="w-4 h-8 py-2 mr-4 flex justify-center items-center cursor-pointer" onClick={()=>handleLikedState(musicObj)}>
          <BsHeartFill className={"w-[2.9rem] h-[2.9rem] hover:stroke-white hover:scale-105 " + (selected ? "fill-[#1ED760]" : "")} />
        </button>
        <div className="w-[2.875rem] h-[3.375rem] flex items-center justify-end text-sm text-[#b3b3b3] mr-4">{"0 : "+randomNum}</div>
        {hover && <button className="w-4 h-8 py-2 flex items-center"><BiDotsHorizontalRounded className="w-7 h-7 cursor-pointer" /></button>}
      </div>

    </div>
  )
}

function SongsContainer({ each, index , albumObj, handleSearchId, handleQueryType}){
  const [hover, setHover] = useState(false)
  const { likedSongIds, handleFavSongId }= useContextProvider();
  const { musicDispatch } = useMusic()

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
    const isPresent = likedSongIds?.songs?.find((eachID)=>{
      return eachID._id == each?._id
    })
    if(isPresent) setSelected(true)
  },[likedSongIds, path])


  function handleLikedState(songId){
    handleFavSongId(songId)
    if(selected) setSelected(!selected)
  }
  function handleHover(){
    setHover(!hover)
  }

  const handleIconClick = () => {
    musicDispatch({ type: "setMusicId", payload: each._id })
  }

  function handleRender(){
    handleQueryType("song")
    handleSearchId(each._id)
  }

  return (
    <div key={index} className={"w-[97.4%] h-[3.375rem] relative px-4 border-[0.0781rem] border-transparent flex items-center gap-4 " + 
    (hover ? "bg-[#727079]" : "" )}
    onMouseEnter={handleHover} onMouseLeave={handleHover}>
        
        {/* Index Number */}
        <div className="w-[1rem] h-[3.375rem] flex justify-center items-center" onClick={handleIconClick}>
          <span className="text-white cursor-pointer">{hover ? <BsFillPlayFill className="w-5 h-5" /> : index + 1}</span>
        </div>

        {/* Title & Artists */}
        <div className="h-[3.375rem] w-[37.35%] text-white flex flex-col justify-center">
          {/* Title */}
          <span onClick={()=>handleRender()} className="h-[1.5938rem] flex items-end text-white cursor-pointer font-semibold hover:underline">
            {each.title}
          </span>
          {/* Artists */}
          <span className="h-[1.4rem] w-[100%] flex flex-wrap gap-[3px] overflow-hidden">
            {each.artist?.map((eArtist) => {
              return (
                <CurrentSongArtists
                  key={eArtist}
                  albumArtists={albumObj?.artists}
                  artistId={eArtist}
                  hover={hover}
                />
              );
            })}
          </span>

        </div>

        {/* heart & duration */}
        <div className="h-[3.375rem] w-[6.875rem] text-white absolute right-3 flex items-center">

          <button className="w-4 mr-4 h-8 py-2 flex justify-center items-center cursor-pointer" onClick={()=>handleLikedState(each._id)}>
            <BsHeartFill className={"w-[2.9rem] h-[2.9rem] hover:stroke-white hover:scale-105 " + (selected ? "fill-[#1ED760]" : "")} />
          </button>

          <div className="w-[2.875rem] h-[3.375rem] flex items-center justify-end text-sm text-[#b3b3b3] mr-4">{"0 : "+randomNum}</div>

          {hover && <button className="w-4 h-8 py-2 flex items-center"><BiDotsHorizontalRounded className="w-7 h-7 cursor-pointer" /></button>}
        </div>
        
    </div>
  )
}

function FavouriteIcon({Object}){
  const { likedSongIds, handleFavSongId }= useContextProvider();
  const [ selected, setSelected ]= useState(false);
  const [ musicId, setMusicId ]= useState();
  const [ path, setPath ] = useState();
  const location = useLocation();

  useEffect(()=>{
    if(Object?.type === "song"){
      setMusicId(Object._id)
    }
    else{
      setMusicId(Object?.songs[0]?._id)
    }
  },[Object])

  useEffect(()=>{
    setPath(location.pathname)
  },[])

  useEffect(()=>{
    const isPresent = likedSongIds?.songs?.find((eachID)=>{
      return eachID._id == musicId
    })
    if(isPresent) setSelected(true)
  },[musicId, likedSongIds, path])

  function handleLikedState(songId){
    handleFavSongId(songId)
    if(selected) setSelected(!selected)
  }

  return (
    <button className="w-8 h-14 mr-6" onClick={()=>handleLikedState(musicId)}>
      <span className="w-8 h-8 flex justify-center items-center" >
        <BsHeartFill className={"w-[2.9rem] h-[2.9rem] hover:scale-105 " + (selected ? "fill-[#1ED760]" : "fill-white")} />
      </span>
    </button>
  )
}

function MoreArtistSong({ musicObj, headers, handleSearchId, handleQueryType }) {
  const [artistobj, setArtistObj] = useState();
  const [fetchId, setFetchId] = useState()

  useEffect(()=>{
    if(musicObj?.type === "song"){
      setFetchId(musicObj?.artist[0]?._id);
   }
   else{
      setFetchId(musicObj?.artists[0]?._id);
   }
  },[musicObj])
  
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
  }, [musicObj, fetchId]);

  return (
    <>
      {artistobj?.songs?.splice(0,6).map((each) => { 
        return <MoreArtistSongCard key={each._id} songData={each} handleQueryType={handleQueryType} handleSearchId={handleSearchId} />
      })}  
    </>
  )
}

function MoreArtistSongCard({songData, handleSearchId, handleQueryType}) {
  const [hover, setHover] = useState(false);
  const [year, setYear] = useState(0);
  const [isImage, setIsImage] = useState(false);

  useEffect(()=>{
    if(songData?.release){
      setIsImage(true);
    }
  },[])

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
  
  function handleCardRender(){
    handleQueryType("song")
    handleSearchId(songData._id)
  }

  return (
    <Link onClick={()=>handleCardRender()} className={"w-[14.92%] h-[17.5rem] relative p-4 flex flex-col rounded-lg cursor-pointer " + 
    (hover ? "bg-[#282828]" : "bg-[#171717]")}

    >
      <div className="w-[86.069%] h-[15.7188rem]">

        {/* Image & PlayIcon */}
        <div className="w-[100%] h-[10.8125rem] mb-4">
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
        <div className="w-[100%] h-[3.875rem] flex flex-col justify-between">
          <a className="w-[10.8125rem] h-[1.875rem] text-white font-bold text-base whitespace-nowrap overflow-hidden text-ellipsis flex items-center">{songData.title}</a>
          <a className="w-[10.8125rem] h-[1.4rem] text-white text-sm flex items-center">{ year}</a>
        </div>

        {/* card click handler */}
        <div
          className="w-[138%] h-[17.5rem] absolute left-0 top-0"
          onMouseOver={handleHoverState}
          onMouseLeave={handleHoverState}
          
        ></div>

      </div>

    </Link>
  )
}

function CurrentSongArtists({ albumArtists, artistId }) {
  
  const singerName = albumArtists.filter((e) => {
    return e._id === artistId;
  });

  return (
    <Link
      className="h-[1.4rem] flex items-end text-xs hover:underline"
      to="/artist-track"
      state={{id: artistId}}
    >
      {singerName[0]?.name}
    </Link>
  );
}

