import { useState } from "react";
import { Link } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";

export default function MusicCard({ musicObj, DataFromMusicCard }) {
  const [showPlayer, setShowPlayer] = useState(false);
  // console.log(musicObj, "MUSIC");

  function sendDataToParent() {
    DataFromMusicCard(musicObj);
    // play()
  }

  function handlePlayerIcon() {
    // console.log("mouse enter");
    setShowPlayer(!showPlayer);
  }
  //   console.log(showPlayer, "showplayer");

  return (
    <>
      <Link
        key={musicObj._id}
        className="w-[12.8125rem] h-[18.4375rem] p-4 bg-[#171717] rounded-2xl shadow-xl relative transition-all duration-1000"
        onMouseEnter={handlePlayerIcon}
        onMouseLeave={handlePlayerIcon}
        to={"/songtrack"}
        state={{ musicDataObj: musicObj }}
      >
        <div className="w-[10.8125rem] h-[10.8125rem] mb-4">
          <img src={musicObj.thumbnail} />
        </div>
        {showPlayer && (
          <div
            className={
              "w-12 h-12 bg-[#1ED760] rounded-[50%] absolute top-[141px] right-4 " +
              (showPlayer ? "-translate-y-3" : "-translate-y-0")
            }
          >
            <button
              className="w-12 h-12 flex justify-center items-center"
              onClick={sendDataToParent}
            >
              <span>
                {" "}
                <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />{" "}
              </span>
            </button>
          </div>
        )}
        <div className="w-[10.8125rem] h-[4.6563rem]">
          <a className="h-[1.875rem] text-base text-white font-figtree pb-1 font-bold">
            {musicObj.title}
          </a>
          <div className="h-[2.8125rem] text-sm text-[#A7A7A7]"></div>
        </div>
      </Link>
    </>
  );
}
