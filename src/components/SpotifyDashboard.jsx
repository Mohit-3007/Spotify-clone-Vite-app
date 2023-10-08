import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import headers from "../assets/config";
import MusicCard from "./MusicCard";
import ArtistCard from "./ArtistCard";
import Footer from "./Footer";



export default function SpotifyDashboard() {
  const [songData, setSongData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  
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
  // console.log("MUSIC LIST   ",musicList);

  //Combine Fetch of Music
  const fetchAllMusic = async () => {

    musicList.map(async (eMusic, index)=>{

      if(eMusic.type === "made4u"){
        let resp = await fetch(
          'https://academics.newtonschool.co/api/v1/music/album?limit=6&page=2&sort={"release": "-1"}',
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
          `https://academics.newtonschool.co/api/v1/music/song?limit=6&filter={"featured": "${eMusic.filterKey}"}`,
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
          `https://academics.newtonschool.co/api/v1/music/song?limit=6&filter={"mood": "${eMusic.filterKey}"}`,
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
          `https://academics.newtonschool.co/api/v1/music/album?limit=6&sort={"release": "${eMusic.filterKey}"}`,
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
    fetchAllMusic()
  },[])

  // // Music
  // useEffect(() => {
  //   async function fetchData() {
  //     let data1 = await fetch(
  //       "https://academics.newtonschool.co/api/v1/music/song?limit=6",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     let info1 = await data1.json();
  //     // console.log(info);
  //     setSongData(info1);
  //   }
  //   fetchData();
  // }, []);

  // Album
  // useEffect(() => {
  //   async function fetchData() {
  //     let data2 = await fetch(
  //       "https://academics.newtonschool.co/api/v1/music/album?limit=6",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     let info2 = await data2.json();
  //     setAlbumData(info2);
  //   }
  //   fetchData();
  // }, []);

  // Artist
  useEffect(() => {
    async function fetchData() {
      let data3 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/artist?limit=6",
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

  return (
    <>
      <div className="w-[87.4087rem] absolute top-[4.5rem] left-[18.6875rem] bg-[#121212]">
        {/* Main Content */}
        <div className="w-[87.4087rem]">
          <div className=" pt-2 px-6 flex flex-col gap-6 mb-40">

            {musicList.map((eMusicItem, index)=>{
                // console.log("eMusicItem  ",eMusicItem)
               return <MusicContainer key={index}  musicList={eMusicItem} />
            })}

             {/* Popular Artist */}
             <section className="w-[84.5313rem] h-[20.5938rem] font-figtree">
                {/* Title */}
                <div className="w-[84.5313rem] h-[2.875rem] mb-2 pl-4">
                  <div className="w-[84.5313rem] h-[1.875rem] mb-4 flex justify-between">
                    <Link to={"/more-artist"} className="w-[80.5938rem] h-[1.875rem] cursor-pointer ">
                      <h2 className="max-w-fit h-[1.4812rem] text-white font-bold text-2xl hover:underline">Popular artists</h2>
                    </Link>
                    <Link to={"/more-artist"} className="ml-2 w-[3.4375rem] h-[1.875rem]">
                      <span className="w-[3.4375rem] h-[1.875rem] font-bold text-sm hover:underline cursor-pointer text-[#A7A7A7]">Show all</span>
                    </Link>
                  </div>
                </div>

                {/* ArtistCard */}
                <div className="w-[84.5313rem] h-[18.4887rem] flex gap-6">
                  {artistData.data &&
                    artistData.data.map((each)=>{
                      return <ArtistCard key={each._id} artistObj={each} />
                    })
                  }
                </div>

            </section>

          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

function MusicContainer({musicList}){
  const { page, handleMusicContextData }= useContextProvider();
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
      <section className="mb-4">

        {/* Heading */}
        <div className="h-[2.875rem] mb-2 pl-0">
          <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
            <div><Link to={path} ><span className="text-2xl font-bold font-figtree hover:underline cursor-pointer">{musicList.title}</span></Link></div>
            <Link to={path} className="text-sm font-figtree hover:underline">Show all</Link>
          </div>
        </div>

        {/* MusicCard */}
        <div className="gap-6 flex flex-wrap">
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
