import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useMusic } from "./ContextProvider/MusicProvider";
import "../App.css";

export default function MusicCard( {musicObj} ) {
  const [hover, setHover] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const { musicId, musicDispatch } = useMusic();

  useEffect(()=>{
    if(musicObj.release){
      setIsImage(true);
    }
  },[])
  
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
  if(isImage){
    musicDispatch({ type: "setMusicId", payload: musicObj?.songs[0]?._id })
  }else{
    musicDispatch({ type: "setMusicId", payload: musicObj?._id })
  }
  
};

  return ( 
      <Link
        key={musicObj?._id}
        // max-[1500px]:w-[17.93%]
        className={"max-sm:w-[168px] max-sm:h-[220px] sm:w-[47.30%] min-[800px]:w-[29.61%] min-[1000px]:w-[21.85%] min-[1310px]:w-[17.93%] 3xl:w-[14.91%] max-sm:ml-2 p-2 sm:p-4 rounded-xl shadow-xl relative transition-all duration-800 "
         + (hover ? "bg-[#282828]" : "bg-[#171717]")}
         onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        to={"/songtrack"}
        state={{data: musicObj._id +"&"+ isImage}}  
      >
        <div className="w-[152px] max-sm:h-[152px] sm:w-full">

          <div className="w-full sm:mb-4 relative">
            {/* Image w-[10.8125rem] */}
            <div className={"w-full sm:mb-4 sm:shadow-xl " + (hover ? "shadow-[#171717]" : "shadow-[#282828]")}>
              <img className="rounded-md" src={isImage ? musicObj?.image : musicObj?.thumbnail} />
            </div>

            {hover && (
              <div className={"w-[27%] h-[27%] bg-[#1ED760] rounded-[50%] flex items-center justify-center absolute top-[81.5%] right-4 " +
                  (hover ? "-translate-y-3" : "-translate-y-0")}
                onClick={handleIconClick}>
                <button className="w-[50%] h-[50%] flex justify-center items-center">
                  <span>
                    {" "}
                    <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />{" "}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="w-full h-11 sm:h-[4.6563rem] max-sm:mt-2 sm:truncate flex flex-col justify-between">

            <Link className="w-full sm:h-[1.875rem] text-base text-white font-figtree sm:pb-1 font-bold  ">
              {musicObj?.title}
            </Link>
            
            <div className="max-sm:hidden sm:block w-full h-[2.8125rem] text-sm text-[#A7A7A7] flex">
              {musicObj?.artist?.map((each, index)=>{
                // console.log("each._Id each._Id each._Id ", each)
                return (
                  <Link className="w-full h-[2.8125rem] flex"
                  to="/artist-track"
                  state={{id: each._id}}>
                    {index !=0 && <span className=" w-2 h-4 items-start">,</span>}
                    <span className="hover:underline">{each.name}</span>
                  </Link>
                )
              })}
            </div>

          </div>

        </div>

      </Link> 
  );
}
