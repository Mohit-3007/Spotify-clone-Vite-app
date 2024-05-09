import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import headers from "../assets/config";
import MusicCard from "./MusicCard";
import ArtistCard from "./ArtistCard";
import Footer from "./Footer";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";



export default function SpotifyDashboard() {
  // const [songData, setSongData] = useState([]);
  // const [albumData, setAlbumData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const { handleLoginState, login }= useContextProvider();
  const [ popSetting, setPopSetting ] = useState(false);
  const navigate = useNavigate()

  const [musicList, setMusicList] = useState([
    {title: "Made For You", data: [], type: "made4u", filterKey: "made4u" },
    {title: "Popular new releases", data: [], type: "release", filterKey: "-1" },
    {title: "Trending Songs", data: [], type: "featured", filterKey: "Trending songs" },
    {title: "Soul soother", data: [], type: "featured", filterKey: "Soul soother" },
    {title: "Evergreen melodies", data: [], type: "featured", filterKey: "Evergreen melodies" },
    {title: "Let's Party", data: [], type: "mood", filterKey: "happy" },
    {title: "Top Romantic", data: [], type: "mood", filterKey: "romantic" },
    {title: "Heal Your Hearts", data: [], type: "mood", filterKey: "sad" },
    {title: "High Voltage Vibes", data: [], type: "mood", filterKey: "excited" },
  ])

  function setMusicData({filterKey, payload}){
    let updatedMusicList = musicList.map((eMusic)=>{
      if(eMusic.filterKey === filterKey) eMusic.data = payload;
      return eMusic;
    })
    setMusicList(updatedMusicList)
  }
  // console.log("MUSIC LIST   ",musicList);

  //Combine Fetch Function for All Music Types
  const fetchAllMusic = async () => {

    musicList.map(async (eMusic, index)=>{

      if(eMusic.type === "made4u"){
        let resp = await fetch(
          'https://academics.newtonschool.co/api/v1/music/album?limit=5&page=2&sort={"release": "-1"}',
          {
            headers: headers,
          }
        );
        let result = await resp.json();
        // console.log(eMusic.filterKey," ", result);
        setMusicData({ filterKey: eMusic.filterKey, payload: result.data});
      }

      if(eMusic.type === "featured"){
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song?limit=5&filter={"featured": "${eMusic.filterKey}"}`,
          {
            headers: headers,
          }
        );
        let result = await resp.json();
        // console.log(eMusic.filterKey," ", result);
        setMusicData({ filterKey: eMusic.filterKey, payload: result.data});
      }

      if(eMusic.type === "mood"){
        // console.log(eMusic.type," && ",eMusic.filterKey);
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song?limit=5&filter={"mood": "${eMusic.filterKey}"}`,
          {
            headers: headers,
          }
        );
        let result = await resp.json();
        // console.log(eMusic.filterKey," ", result);
        setMusicData({ filterKey: eMusic.filterKey, payload: result.data});
      }

      if(eMusic.type === "release"){
        let resp = await fetch(
          `https://academics.newtonschool.co/api/v1/music/album?limit=5&sort={"release": "${eMusic.filterKey}"}`,
          {
            headers: headers,
          }
        );
        let result = await resp.json();
        // console.log(eMusic.filterKey," ", result);
        setMusicData({ filterKey: eMusic.filterKey, payload: result.data});
      }
    })    
  }

  useEffect(()=>{
    login? fetchAllMusic() : null
  },[login])

  // Fetching Artists
  useEffect(() => {
    async function fetchData() {
      let data3 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/artist?limit=5",
        {
          headers: headers,
        }
      );
      let info3 = await data3.json();
      // console.log(info);
      setArtistData(info3);
    }
    fetchData();
  }, []);
  // console.log('artistData', artistData);

  function handlePopRender(){
    setPopSetting(!popSetting);
    
  }
  
  function handleLogin() {
    console.log("Cookie remove");
    handleLoginState()
    setPopSetting(!popSetting);
    navigate("/")
    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return (
    <>
      {/* <div className="max-sm:w-screen w-full h-[calc(100%-64px)] bg-[#121212] overflow-y-scroll " > */}
      <div className={"max-sm:w-screen w-[calc(100%-307px)] h-[calc(100%-64px)] absolute top-[72px] left-0 sm:left-[18.6875rem] bg-[#121212] " + (login ? "max-sm:top-0" : "max-sm:top-[56px]")}>

        {/* Music Containers */}
        {login && (
          <Greeting 
            handlePopRender={handlePopRender}
            popSetting={popSetting}
          />
        )}

        <div className={"max-sm:p-0 pt-2 px-6 flex flex-col gap-4 sm:gap-6 " + (popSetting ? "hidden" : "")}>

          {login && (
          <>  
              {musicList.map((eMusicItem, index)=>{
                  // console.log("eMusicItem  ",eMusicItem)
                return <MusicContainer key={index}  musicList={eMusicItem} />
              })}

              {/* Popular Artist */}
              <section className="mb-4 font-figtree">
                  {/* Title */}
                  <div className="max-sm:mt-6 max-sm:pl-2 max-sm:mb-3 sm:mb-2">
                    <div className="h-[1.875rem] sm:mb-4 flex justify-between">
                      <Link to={"/more-artist"} className="max-w-[80.5938rem] h-[1.875rem] cursor-pointer ">
                        <h2 className="max-w-fit h-[1.4812rem] text-white font-bold text-2xl hover:underline">Popular artists</h2>
                      </Link>
                      <Link to={"/more-artist"} className="hidden sm:block ml-2 w-[3.4375rem] h-[1.875rem]">
                        <span className="w-[3.4375rem] h-[1.875rem] font-bold text-sm hover:underline cursor-pointer text-[#A7A7A7]">Show all</span>
                      </Link>
                    </div>
                  </div>

                  {/* ArtistCard */}
                  <div className="max-sm:h-[12.375rem] sm:h-[calc-[100%-46px]] max-w-fit max-sm:overflow-x-scroll max-sm:no-scrollbar max-sm:overflow-y-hidden max-sm:flex sm:gap-6 md:flex sm:flex-wrap gap-y-3 md:gap-y-6">
                    {artistData.data &&
                      artistData.data.map((each)=>{
                        return <ArtistCard key={each._id} artistObj={each} />
                      })
                    }
                  </div>

              </section>

          </>
          )}

          {!login && (
            <section className="mb-4 font-figtree">

              {/* Title */}
              <div className="max-sm:mt-6 max-sm:pl-2 max-sm:mb-3 sm:mb-2">
                <div className=" h-[1.875rem] sm:mb-4 flex justify-between">
                  <Link to={"/more-artist"} className="max-w-[80.5938rem] h-[1.875rem] cursor-pointer ">
                    <h2 className="max-w-fit h-[1.4812rem] text-white font-bold text-2xl hover:underline">Popular artists</h2>
                  </Link>
                  <Link to={"/more-artist"} className="hidden sm:block ml-2 w-[3.4375rem] h-[1.875rem]">
                    <span className="w-[3.4375rem] h-[1.875rem] font-bold text-sm hover:underline cursor-pointer text-[#A7A7A7]">Show all</span>
                  </Link>
                </div>
              </div>

              {/* ArtistCard */}
              <div className="max-sm:h-[12.375rem] sm:h-[calc-[100%-46px]] max-w-fit max-sm:overflow-x-scroll max-sm:no-scrollbar max-sm:overflow-y-hidden max-sm:flex sm:gap-6 md:flex sm:flex-wrap gap-y-3 md:gap-y-6">
                {artistData.data &&
                  artistData.data.map((each)=>{
                    return <ArtistCard key={each._id} artistObj={each} />
                  })
                }
              </div>

            </section>
          )}

        </div>

        {/* for sm screen- Setting Icon Div popup */}
       {login && (
          <div className={"bg-black z-10 w-full h-full px-10 " + (popSetting ? "" : "hidden")}>

            {/* Profile */}
            <div className="h-12 py-2">
              <span className="font-figtree text-2xl text-white font-bold" onClick={()=> navigate("/stay-tuned")}>Profile</span>
            </div>

            {/* Logout */}
            <div className="h-12 py-2" onClick={handleLogin}>
              <span className="font-figtree text-2xl text-white font-bold">Logout</span>
            </div>

            {/* break */}
            <div className="w-4 h-[3.125rem] flex justify-center items-center">
              <div className="w-[14px] h-[2px] bg-white"></div>
            </div>

            {/* List Items */}
            <div className="w-full font-figtree font-bold text-xl text-white flex flex-col gap-3 ">
              <button className="h-[33px] py-1 flex items-center"><span className=""><Link to={"/premium"} href="">Premium</Link></span></button>
              <button className="h-[33px] py-1 flex items-center"><span className=""><a href="https://support.spotify.com/in-en/">Support</a></span></button>
              <button className="h-[33px] py-1 flex items-center"><span className="https://www.spotify.com/in-en/privacy"><a href="">Privacy</a></span></button>
              <button className="h-[33px] py-1 flex items-center"><span className="https://www.spotify.com/in-en/legal/end-user-agreement/"><a href="">Terms</a></span></button>
            </div>

          </div>
       )}

        <div className={popSetting ? "hidden" : ""}>
          <Footer />
        </div>

      </div>
    </>
  );
}


function Greeting({handlePopRender, popSetting}) {
  const currentTime = new Date().getHours();
  let greeting = '';

  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good morning';
  } else if (currentTime >= 12 && currentTime < 16) {
    greeting = 'Good afternoon';
  } else if (currentTime >= 16 && currentTime < 24){
    greeting = 'Good evening';
  }
  else{
    greeting = 'Sleep';
  }

  return (
    <div className={"sm:hidden h-[72px] max-sm:p-2 px-6 flex items-center justify-between " + (popSetting ? "bg-black" : "")}>
      <h1 className="text-2xl font-bold hover:underline cursor-pointer font-figtree text-white">{popSetting ? "" : greeting}</h1>
      <button className="sm:hidden w-12 h-12 p-3 flex justify-center items-center" onClick={handlePopRender}>
        {popSetting ? <RxCross1 className="stroke-2 stroke-white h-6 w-6 hover:scale-105 " /> :
          <IoSettingsOutline className="stroke-2 stroke-white h-6 w-6 hover:scale-105 " />
        }
      </button>
    </div>
  );
}

function MusicContainer({musicList}){
    // console.log("MusicContainer",musicList);
    let path;
    switch (musicList.filterKey) {
      case "made4u":
        path = "/more-made4u";
        break;
      case "-1":
        path = "/more-new-releases";
        break;
      case "Trending songs":
        path = "/more-trending-songs";
        break;
      case "Soul soother":
        path ="/more-soul-soother";
        break;
      case "Evergreen melodies":
        path ="/more-evergreen-melodies";
        break;
      case "happy":
        path ="/more-happy";
        break;
      case "romantic":
        path ="/more-romantic";
        break;
      case "sad":
        path ="/more-sad";
        break;
      default:
        path ="/more-excited";
        break;
    }

    // useEffect(()=>{

    //   async function fetchMoreMusic(){
        
    //     if(musicList.type === "made4u"){
    //       let resp = await fetch(
    //         `https://academics.newtonschool.co/api/v1/music/album?limit=24&page=${page + 1}&sort={"release": "-1"}`,
    //         {
    //           headers: headers,
    //         }
    //       );
    //       let result = await resp.json();
    //       // console.log(eMusic.filterKey," ", result);
    //       handleMusicContextData({ filterKey: musicList.filterKey, payload: result.data});
    //     }

    //     if(musicList.type === "featured"){
    //       let resp = await fetch(
    //         `https://academics.newtonschool.co/api/v1/music/song?limit=6&page=${page}&filter={"featured": "${musicList.filterKey}"}`,
    //         {
    //           headers: headers,
    //         }
    //       );
    //       let result = await resp.json();
    //       // console.log(eMusic.filterKey," ", result);
    //       handleMusicContextData({ filterKey: musicList.filterKey, payload: result.data});
    //     }

    //     if(musicList.type === "mood"){
    //       let resp = await fetch(
    //         `https://academics.newtonschool.co/api/v1/music/song?limit=6&page=${page}&filter={"mood": "${musicList.filterKey}"}`,
    //         {
    //           headers: headers,
    //         }
    //       );
    //       let result = await resp.json();
    //       // console.log(eMusic.filterKey," ", result);
    //       handleMusicContextData({ filterKey: musicList.filterKey, payload: result.data});
    //     }

    //     if(musicList.type === "release"){
    //       let resp = await fetch(
    //         `https://academics.newtonschool.co/api/v1/music/album?limit=24&page=${page}&sort={"release": "${musicList.filterKey}"}`,
    //         {
    //           headers: headers,
    //         }
    //       );
    //       let result = await resp.json();
    //       // console.log(eMusic.filterKey," ", result);
    //       handleMusicContextData({ filterKey: musicList.filterKey, payload: result.data});
    //     }
    //   }

    //   fetchMoreMusic()


    // },[page])

  return (
      <section className="sm:mb-4 font-figtree">

        {/* Heading */}
        <div className=" max-sm:pl-2  sm:mb-2">
          <div className=" h-[2.875rem] sm:mb-4 flex justify-between items-center text-white">
            <div><Link to={path} ><span className="text-2xl font-bold font-figtree hover:underline cursor-pointer">{musicList.title}</span></Link></div>
            <Link to={path} className="hidden sm:block text-sm font-figtree hover:underline">Show all</Link>
          </div>
        </div>

        {/* MusicCard */}
        <div className="max-sm:h-[13.75rem] sm:h-[calc-[100%-46px]] w-full max-sm:overflow-x-scroll no-scrollbar max-sm:overflow-y-hidden max-sm:flex sm:gap-6 md:flex sm:flex-wrap gap-y-3 md:gap-y-6">
          {musicList.data &&
            musicList.data.map((each) => {
              return (
                <MusicCard
                  key={each._id}
                  musicObj={each} 
                />
            );
          })}
        </div>
      </section>
  )

}
