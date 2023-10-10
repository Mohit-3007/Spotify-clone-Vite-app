import { createContext, useContext, useState, useEffect } from "react";
import headers from "../../assets/config";


const AppContext = createContext(null);

function AppContextProvider({children}){
    // For Login State
    const [login, setLogin] = useState(false);

    // For Favourites
    const [likedSongIds, setLikedSongIds] = useState({});

    // For Pagination
    const [page, setPage] = useState(1);


    // console.log("First Cookie Fetch inside Context Providet   ",decodeURIComponent(document.cookie));
    function handleLoginState(){
      setLogin(!login)
    }
    
    useEffect(()=>{
      if(decodeURIComponent(document.cookie)){

        setLogin(true);
        const allCookie = decodeURIComponent(document.cookie).split(";")
        var token = allCookie[1].split("=")[1]
        fetchFavourites(token);
      }
      
    },[login])

    function handleFavSongId(songId){
      var token;
      function fetchToken(){
        const allCookie = decodeURIComponent(document.cookie).split(";")
        token = allCookie[1].split("=")[1]
      }

      async function addRemoveFavourites(){
        // console.log("TOKEN TOKEN ", token);
        const updateFavourites = await fetch(
            "https://academics.newtonschool.co/api/v1/music/favorites/like",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                projectId: "nyiisjkwy2r6",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                songId: songId
              }),
            }
          );
          const result = await updateFavourites.json();
          console.log("addRemoveFav :- ", result.message );
          fetchFavourites(token);
      } 

      fetchToken()
      addRemoveFavourites()
    }
 
    async function fetchFavourites(token){

        let resp =  await fetch(
            "https://academics.newtonschool.co/api/v1/music/favorites/like",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                projectId: "nyiisjkwy2r6",
              }
            }
          );
        let result = await resp.json();
        setLikedSongIds(result.data);
        // console.log("Fetch Favourites Result ",result);
    }

    // console.log("Liked Songs Ids data ",likedSongIds)
    
    // Context For Fetching More Music    
    const [musicContextList, setMusicContextList] = useState([
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
    
    function handleMusicContextData({filterKey, payload}){
      let updatedMusicList = musicContextList.map((eMusic)=>{
        if(eMusic.filterKey === filterKey) eMusic.data = payload;
        return eMusic;
      })
      setMusicContextList(updatedMusicList)
    }

    // Pagination
    function handleIncPage(){
      setPage((prev)=> prev + 1)
    }

    function handleDecPage(){
      if(page == 1) return
      setPage((prev)=> prev - 1)
    }
  
    // console.log("Music Context List   ",musicContextList);



    
    const initialValues={
        login: login,
        handleLoginState,
        likedSongIds: likedSongIds,
        // setLikedSongIds,
        handleFavSongId,
        // fetchFavourites,
        musicContextList: musicContextList,
        handleMusicContextData,
        page: page,
        handleIncPage,
        handleDecPage,
    }

    return <AppContext.Provider value={initialValues}>{children}</AppContext.Provider>

}

function useContextProvider(){
    const contextProvider = useContext(AppContext);
    return contextProvider;
}

export { AppContextProvider, useContextProvider };



