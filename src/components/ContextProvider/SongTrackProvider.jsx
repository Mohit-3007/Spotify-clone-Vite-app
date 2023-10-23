import { createContext, useContext, useState } from "react";

const SongTrackContext = createContext(null);

function SongTrackProvider({children}){
   const [showMusicPlayer, setShowMusicPlayer]  = useState(false);

   function handleShowMusicPlayer(val){
    setShowMusicPlayer(val)
   }

    const obj={
        showMusicPlayer: showMusicPlayer,
        handleShowMusicPlayer,
    }

    // console.log("Inside Song Track Provider  ", artistData);


    return <SongTrackContext.Provider value={obj}>{children}</SongTrackContext.Provider>
}

function useSongTrack(){
    return useContext(SongTrackContext)
}

export { SongTrackProvider, useSongTrack};