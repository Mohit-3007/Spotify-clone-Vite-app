import { createContext, useContext, useState, useEffect } from "react";
import headers from "../../assets/config";

const AppContext = createContext(null);
function AppContextProvider({children}){
  const [login, setLogin] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState({});
  const [page, setPage] = useState(1);

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
  },[])

  function handleFavSongId(songId){
    var token;
    function fetchToken(){
      const allCookie = decodeURIComponent(document.cookie).split(";")
      token = allCookie[1].split("=")[1]
    }

    async function addRemoveFavourites(){
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
    }

    // Pagination
    function handleIncPage(){
      setPage((prev)=> prev + 1)
    }

    function handleDecPage(){
      if(page == 1) return
      setPage((prev)=> prev - 1)
    }
  
    const initialValues={
      login: login,
      handleLoginState,
      likedSongIds: likedSongIds,
      handleFavSongId,
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



