import { createContext, useContext, useState } from "react";

const SongTrackContext = createContext(null);

function SongTrackProvider({children}){
    const [ songData, setSongData ] = useState();

    function handleSetSongData(val){
        setSongData(val)
    }

    const obj={
        songData: songData,
        handleSetSongData,
    }


    return <SongTrackContext.Provider value={obj}>{children}</SongTrackContext.Provider>
}

function useSongTrack(){
    return useContext(SongTrackContext)
}

export { SongTrackProvider, useSongTrack};