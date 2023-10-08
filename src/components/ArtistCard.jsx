import { useState } from "react";
import { Link } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";

export default function ArtistCard({ artistObj }){
    const [hover, setHover] = useState(false);
    // console.log("Inside ArtistCard ", artistObj)

    function handleHoverState() {
        setHover(!hover);
        // console.log("hover Active");
    }

    return(
        <Link
            key={artistObj._id}
            className={"w-[12.8125rem] h-[17.7125rem] p-4 relative rounded-2xl shadow-xl transition-all duration-1000 "
            + (hover ? "bg-[#282828]" : "bg-[#171717]")}
            // to={"/songtrack"}
            // state={{ musicDataObj: musicObj }}
        >
            <div className="w-[10.8125rem] h-[15.6875rem]">

                {/* Image */}
                <div className="w-[10.8125rem] h-[10.8125rem] mb-4 relative">

                    <div className="w-[10.8125rem] h-[10.8125rem] ">
                        <img className={"rounded-[50%] " + (hover ? "shadow-xl shadow-[#171717]" : "shadow-xl shadow-[#282828]")}  src={artistObj.image} />
                    </div>
                    
                    {hover && (
                        <div
                            className={
                            "w-12 h-12 bg-[#1ED760] rounded-[50%] absolute top-[141px] right-4 " +
                            (hover ? "-translate-y-3" : "-translate-y-0")
                            }
                        >
                            <button
                            className="w-12 h-12 flex justify-center items-center"
                            // onClick={sendDataToParent}
                            >
                            <span>
                                {" "}
                                <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />{" "}
                            </span>
                            </button>
                        </div>
                    )}

                </div>
                
                {/* Artist Name */}
                <div className="w-[10.8125rem] h-[3.875rem] flex flex-col justify-between">
                    <a className="h-[1.875rem] text-base text-white font-figtree pb-1 font-bold">
                        {artistObj.name}
                    </a>
                    <div className="h-[1.4rem] text-sm text-[#A7A7A7]"><span className="flex items-center">Artist</span></div>
                </div>

                {/* for Hover */}
                <div className="w-[12.8125rem] h-[17.7125rem] absolute top-0 left-0 rounded-2xl "
                    onMouseOver={handleHoverState}
                    onMouseLeave={handleHoverState}
                ></div>

            </div>
        </Link>
    )
}