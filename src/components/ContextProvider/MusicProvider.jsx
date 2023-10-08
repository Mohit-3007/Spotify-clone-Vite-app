import { createContext, useContext, useReducer } from "react";

const MusicContext = createContext(null);

export const MusicProvider = ({children}) => {
    const initialState = {
        musicPlayer: "inactive",
        musicStatus: "pause",
        musicId: null,
    }

    function reducer(state, action) {
        switch(action.type){
            case "play":
                return {...state, musicStatus: "play"}
            case "pause":
                return {...state, musicStatus: "pause"}
            case "stop":
                return {...initialState}
            case "setMusicId":
                return {...state, musicId: action.payload, musicPlayer: "active"};
            default:
                return { ... state };
        }
    }

    const [musicState, musicDispatch] = useReducer(reducer, initialState);

    console.log("MUSIC PROVIDER musicState.musicId", musicState.musicId);

    let obj={
        musicPlayer: musicState.musicPlayer,
        musicStatus: musicState.musicStatus,
        musicId: musicState.musicId,
        musicDispatch,
    }

    return <MusicContext.Provider value={obj}>{children}</MusicContext.Provider>

    
}

export function useMusic(){
    return useContext(MusicContext);
}