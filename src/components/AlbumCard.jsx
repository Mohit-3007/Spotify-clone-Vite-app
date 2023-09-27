import { useState } from "react";
import { Link } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";


export default function AlbumCard({ albumObj }) {
  const [showPlayer, setShowPlayer] = useState(false);

  //   console.log(albumObj, "ALBUM");

  function handlePlayerIcon() {
    // console.log("mouse enter");
    setShowPlayer(!showPlayer);
  }
  //   console.log(showPlayer, "showplayer");

  return (
    <>
      <Link
        key={albumObj._id}
        className="w-[12.8125rem] h-[18.4375rem] p-4 bg-[#171717] rounded-2xl shadow-xl relative"
        onMouseEnter={handlePlayerIcon}
        onMouseLeave={handlePlayerIcon}
        to={"/artistsongs"}
        state={{albumObj: albumObj}}
      >
        <div className="w-[10.8125rem] h-[10.8125rem] mb-4">
          <img src={albumObj.image} />
        </div>
        {showPlayer && (
          <div className="w-12 h-12 bg-[#1ED760] rounded-[50%] absolute top-[141px] right-4 hover: -translate-y-3">
            <button className="w-12 h-12 flex justify-center items-center">
              <span>
                {" "}
                <TbPlayerPlayFilled className="h-[22px] w-[22px]" />{" "}
              </span>
            </button>
          </div>
        )}
        <div className="w-[10.8125rem] h-[4.6563rem]">
          <a className="h-[1.875rem] text-base text-white font-figtree pb-1 font-bold">
            {albumObj.title}
          </a>
          <div className="h-[2.8125rem] text-sm text-[#A7A7A7]"></div>
        </div>
      </Link>
    </>
  );
}
