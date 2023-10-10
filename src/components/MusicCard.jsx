import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useMusic } from "./ContextProvider/MusicProvider";
import { useSongTrack } from "./ContextProvider/SongTrackProvider";



export default function MusicCard( {musicObj} ) {
  const [hover, setHover] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const { musicId, musicDispatch } = useMusic();
  const { handleSetSongData } = useSongTrack();


  useEffect(()=>{
    if(musicObj.release){
      setIsImage(!isImage);
    }
  },[])
  
  function handleHoverState() {
    setHover(!hover);
    // console.log("hover Active");
}

const handleIconClick = (event) => {
  event.preventDefault(); 
  // console.log("Prevent Default");
  musicDispatch({ type: "setMusicId", payload: musicObj._id })
};

function handleDataTransfer(){
  handleSetSongData(musicObj)
}

  return (
      <Link
        key={musicObj?._id}
        className={"w-[12.8125rem] h-[18.4375rem] p-4 rounded-2xl shadow-xl relative transition-all duration-800 "
         + (hover ? "bg-[#282828]" : "bg-[#171717]")}
        onMouseEnter={handleHoverState}
        onMouseLeave={handleHoverState}
        to={"/songtrack"}
        // state={{ musicDataObj: musicObj}}
        onClick={handleDataTransfer}  
      >
        {/*  */}
        <div className={"w-[10.8125rem] h-[10.8125rem]  mb-4 " + (hover ? "shadow-xl shadow-[#171717]" : "shadow-xl shadow-[#282828]")}>
          <img className="rounded-md" src={isImage ? musicObj?.image : musicObj?.thumbnail} />
        </div>

        {hover && (
          <div className={"w-12 h-12 bg-[#1ED760] rounded-[50%] absolute top-[141px] right-4 " +
              (hover ? "-translate-y-3" : "-translate-y-0")}
            onClick={handleIconClick}>
            <button className="w-12 h-12 flex justify-center items-center">
              <span>
                {" "}
                <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />{" "}
              </span>
            </button>
          </div>
        )}

        <div className="w-[10.8125rem] h-[4.6563rem] truncate flex flex-col justify-between">

          <Link className="w-[10.8125rem] h-[1.875rem] text-base text-white font-figtree pb-1 font-bold  ">
            {musicObj?.title}
          </Link>
          <div className="w-[10.8125rem] h-[2.8125rem] text-sm text-[#A7A7A7] flex">
            {musicObj?.artist?.map((each, index)=>{
              return (
                <Link className="w-[10.8125rem] h-[2.8125rem] flex">
                  {index !=0 && <span className=" w-2 h-4 items-start">,</span>}
                  <span className="hover:underline">{each.name}</span>
                </Link>
              )
            })}
          </div>

        </div>
      </Link> 
  );
}
