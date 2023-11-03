import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";


export default function ArtistCard({ artistObj }){
    const [hover, setHover] = useState(false);
    // console.log("Inside ArtistCard ", artistObj)
    const { login } = useContextProvider()
    const [path, setPath] = useState()
    const { musicId, musicDispatch } = useMusic();

    useEffect(()=>{
        if(login){
            setPath("/artist-track")
        }
        else{
            setPath("")
        }
    })


    function handleMouseOver() {
        setHover(true);
        // console.log("hover True");
    }

    function handleMouseLeave() {
        setHover(false);
        // console.log("hover false");
    }

    const handleIconClick = (event) => {
        event.preventDefault(); 
        // console.log("event clicked")
        musicDispatch({ type: "setMusicId", payload: artistObj?.songs[0] })
      };
      

    
    return(
        <Link
        // h-[17.7125rem]
            key={artistObj._id}
            className={"w-[168px] max-sm:h-[198px] sm:w-[47.30%] min-[800px]:w-[29.61%] min-[1000px]:w-[21.85%] min-[1310px]:w-[17.93%] 3xl:w-[14.91%] max-sm:ml-2 p-2 sm:p-4 rounded-xl shadow-xl relative transition-all duration-1000 " 
            + (hover ? "bg-[#282828]" : "bg-[#171717]")}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            to={path}
            state={{id: artistObj._id}}
        >
            <div className="w-[152px] max-sm:h-[152px] sm:w-full ">

                {/* Image */}  {/* h-[calc-(100%-62px)] */}
                <div className="w-full sm:mb-4 relative">
                    <div className="w-full h-full  ">
                        <img className={"rounded-[50%] max-sm:shadow-md shadow-xl " + (hover ? "shadow-[#171717]" : "shadow-[#282828]")}  src={artistObj.image} />
                    </div>         
                    {hover && (
                        <div className={"w-[27%] h-[27%] bg-[#1ED760] rounded-[50%] flex items-center justify-center absolute top-[81.5%] right-4 " +
                            (hover ? "-translate-y-3" : "-translate-y-0")}
                            onClick={handleIconClick}>
                            <button className="w-[50%] h-[50%] flex justify-center items-center">
                                <span><TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" /></span>
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Artist Name */}
                <div className="w-full sm:h-[3.875rem] flex flex-col">
                    <a className="sm:h-[1.5769rem] text-sm sm:text-base text-white font-figtree sm:pb-1 font-bold truncate flex items-center">
                        {artistObj.name}
                    </a>
                    <div className="h-[1.25rem] text-xs sm:text-sm text-[#A7A7A7]"><span className="flex items-center">Artist</span></div>
                </div>

            </div>
        </Link>
    )
}