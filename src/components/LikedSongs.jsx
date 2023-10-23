import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useSongTrack } from "./ContextProvider/SongTrackProvider";
import Footer from "./Footer";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BsHeartFill, BsFillPlayFill } from "react-icons/bs";
import { BiTime, BiDotsHorizontalRounded } from "react-icons/bi"; 
import headers from "../assets/config";
import { useMusic } from "./ContextProvider/MusicProvider";





export default function LikedSongs() {
  
  const location = useLocation();
  const [path, setPath] = useState();

  useEffect(()=>{
    setPath(location.pathname);
  })

  const { songData } = useSongTrack();
  const { likedSongIds } = useContextProvider()
 
  console.log("Line - 20 ", likedSongIds);

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  return ( 
    <>
      
      <div className="max-sm:w-screen w-[calc(100%-307px)] h-fit absolute top-0 sm:top-[72px] left-0 sm:left-[18.6875rem] pb-8">
        {/* Main Container */}
        <div>
          <section className="w-[100%] font-figtree relative">

            {/* Music Thumbnail & Title */}
            <div className="w-[100%] px-6 pb-6 h-[21.25rem] relative">

              {/* BG- Color */}
              <div className="w-[100%] h-[21.25rem] bg-gradient-to-b from-[#6085da] to-[#2A1F51] absolute left-0 top-0"></div>

              {/* Album pic */}
              <button className="w-[14.5rem] h-[14.5rem] mr-6 z-10 absolute left-6 bottom-6 shadow-xl hover:scale-105">
                <div className="w-[14.5rem] h-[14.5rem] bg-gradient-to-br from-[#4000F5] to-[#C2EED8] flex justify-center items-center">
                  <BsHeartFill className="fill-white w-16 h-16" />
                </div>
              </button>

              {/* Playlist details */}
              <div className="w-[87.05%] h-[19.75rem] absolute left-[17.5rem] bottom-6 flex flex-col justify-end text-white font-figtree">
              
                <span className="w-[100%] h-[1.375rem] text-sm absolute bottom-[148px]">Playlist</span>
                {/* Title */}
                <span className="w-[100%] h-[7.25rem] mt-2 absolute bottom-[32px] text-5xl sm:text-8xl font-bold flex items-center truncate">
                  Liked Songs
                </span>

                <div className="w-[100%] h-[1.625rem] mt-2 absolute bottom-0 text-sm font-bold flex items-center">{likedSongIds?.songs?.length} songs</div>

              </div>

            </div>

            {/* \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
            <div className="w-[100%] pb-6 bg-gradient-to-b from-[#4b4274d4] to-[rgb(18,20,20)] to-20% ">

                {/* Liked Player &  */}
                <div className="w-[100%] h-[6.5rem] top-[21.25rem] z-20">
                  <div className="w-[100%] h-[6.5rem]">
                    <div className="w-[100%] h-full flex p-6">
                      {/* Player Icon */}
                      <div className="mr-8 w-14 h-14 hover:scale-105 ">
                        <button className="w-14 h-14 flex justify-center items-center">
                          <span className="w-14 h-14 rounded-[50%] bg-[#1ED760] flex justify-center items-center">
                              <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />
                          </span>
                        </button>
                      </div> 
                    </div> 
                  </div>
                </div>

                {/* List Items-(Map) & Copy Right */}
                <div className="w-[100%] px-6 max-h-fit top-[28.75rem] flex flex-col">

                  {/* Title Table & Music List */}
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

                  {/* Liked Song- Map Function */}{" "} 
                  <div className="w-[100%]"> 
                    {likedSongIds?.songs &&
                      likedSongIds?.songs.map((each, index) => {
                        return <LikedSongContainer key={each._id} each={each} index={index} path={path}/> 
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

function LikedSongContainer({each, index, path}){
    const [hover, setHover] = useState(false)
    const { handleFavSongId }= useContextProvider();
    const { musicDispatch } = useMusic()
    const [ musicId, SetMusicId ] = useState();
    const [ isAlbum, setIsAlbum ] = useState(false)
    const type= "false";

    const min = 18;
    const max = 25;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

;

    useEffect(()=>{
      if(each.album) {
        SetMusicId(each.album)
        setIsAlbum(true)
      }
      else{
        SetMusicId(each._id)
      }
    },[])

    function handleLikedState(songId){
        handleFavSongId(songId)
    }
    function handleHover(){
        setHover(!hover)
    }

    const handleIconClick = (event) => {
        musicDispatch({ type: "setMusicId", payload: each._id })
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
            {/* image */}
            <Link to={"/songtrack"} state={{data: each._id +"&"+ type}} ><img src={each.thumbnail} alt={each.title}
              className="w-10 h-10 mr-4 hover:scale-[1.08]" />
            </Link>

            {/* title & artists list */}
            <div className="w-[90.59%] h-[3.375rem] flex flex-col justify-center">
              {/* Title */}
              <Link className="h-[1.3281rem] flex items-center text-white cursor-pointer font-semibold hover:underline truncate"
                to={"/songtrack"}
                state={{data: each._id +"&"+ type}}
              >{each.title}</Link>

              {/* Artists */}
              <span className="h-[1.4rem] w-[100%] flex flex-wrap gap-[3px] truncate overflow-hidden">
                {each.artist?.map((eArtist, index) => {
                  return (
                    <CurrentSongArtists
                      key={eArtist}
                      artistId={eArtist}
                      index={index}
                      hover={hover}
                      path={path}
                    />
                  );
                })}
              </span>
            </div>       
          </div>

          {/* Album */}
          <Link className={"sm:min-w-[140px] w-[22.90%] h-[3.375rem] text-sm justify-start hover:underline cursor-pointer flex items-center mr-4 truncate " + 
          (hover ? "text-white" : "text-[#b3b3b3]")}
          to={"/songtrack"}
          state={{data: musicId +"&"+ isAlbum}}
          >{each.title}
          </Link>

          {/* heart & duration */}
          <div className="h-[3.375rem] w-[6.875rem] text-white absolute right-3 flex items-center">
              <button className="py-2 w-4 h-8 mr-4 flex justify-center items-center cursor-pointer" onClick={()=>handleLikedState(each._id)}><BsHeartFill className="fill-[#1ED760]" /></button>
              <div className="w-[2.875rem] h-[1.25rem] flex justify-end text-sm text-[#b3b3b3] mr-4">{"0 : "+randomNum}</div>
              {hover && <button className="w-4 h-8 py-2 flex items-center"><BiDotsHorizontalRounded className="w-7 h-7 cursor-pointer" /></button>}
          </div>
        </div>
    )
}

function CurrentSongArtists({ artistId, index, hover, path }) {
    let [artistName, setArtistname] = useState()
    // console.log(artistId,"  Line no- 213", index )
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
  
//   console.log("Line- 435:- SingerName", artistName);
  return (
    <Link className={"h-[1.4rem] flex items-center cursor-pointer justify-start text-xs hover:underline "  + 
      (hover ? "text-white" : "text-[#b3b3b3]")}
      to="/artist-track"
      state={{id: artistId}}
    >
      {index != 0 && <span className="w-1">,</span>}
      {artistName}
    </Link>
  );
}


