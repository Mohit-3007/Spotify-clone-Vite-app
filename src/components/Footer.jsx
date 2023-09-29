import { useState } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";

export default function Footer({ musicCardData }) {
  // const [play, { stop }] = useSound(musicCardData?.audio_url);

  console.log("Foooter", musicCardData);
  // function playMusic() {
  //   console.log("playmusic");
  //   play();
  // }

  return (
    <>
      <div className="w-[105.7188rem] h-[4.1563rem] mt-2 fixed bottom-2 right-2 left-2 bg-black">
        <footer>
          <button
            className="w-[4rem] h-[1rem]  mx-[5rem] bg-[#A7A7A7] text-black font-figtree font-semibold
                     text-base flex justify-center items-center p-3"
            onClick={() => playMusic()}
          >
            Play
          </button>
          <button
            className="w-[4rem] h-[1rem]  mx-[5rem] bg-[#A7A7A7] text-black font-figtree font-semibold
                     text-base flex justify-center items-center p-3"
            onClick={() => stop()}
          >
            Stop
          </button>
        </footer>
      </div>
      <div className="w-[105.7188rem] h-2 fixed bottom-0 right-2 left-2 bg-black"></div>
    </>
  );
}
