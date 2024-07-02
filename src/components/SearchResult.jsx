import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { TbPlayerPlayFilled } from "react-icons/tb";
import headers from "../assets/config";

const SearchResult = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const { searchedData, setSearchedData } = useContextProvider();
  const [songBoxhover, setSongBoxHover] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [moreSongs, setMoreSongs] = useState({});
  const [artistsObj, setArtistsObj] = useState({});
  const buttonArray = [
    "All",
    "Songs",
    "Artist",
    "Albums",
    "Playlist",
    "Podcast & Shows",
    "Profiles",
  ];

  useEffect(() => {
    if (searchedData?.length > 0 && searchedData?.release) {
      setIsImage(true);
    }
    console.log("search result data ", searchedData);
  }, [searchedData]);

  useEffect(() => {
    if (searchedData?.length > 0) {
      searchMoreSongs();
    }
  }, [searchedData]);

  useEffect(() => {
    if (Object.keys(moreSongs).length > 0) {
      const artistsObj = moreSongs?.artists.reduce((acc, curr) => {
        acc[curr._id] = curr?.name;
        return acc;
      }, {});
      setArtistsObj(artistsObj);
    }
  }, [moreSongs]);

  async function searchMoreSongs() {
    try {
      const reqOptions = {
        method: "GET",
        headers,
      };
      const url = `https://academics.newtonschool.co/api/v1/music/album/${searchedData[0]?.album}`;
      const resp = await fetch(url, reqOptions);
      if (resp.ok) {
        const res = await resp.json();
        setMoreSongs(res?.data);
      } else {
        throw new Error("Some Error occured while fetching more Songs.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectedButton(idx) {
    setSelectedButton(idx);
  }

  function handleMouseOver() {
    setSongBoxHover(true);
  }

  function handleMouseLeave() {
    setSongBoxHover(false);
  }

  const handleIconClick = (event) => {
    event.preventDefault();
    // musicDispatch({ type: "setMusicId", payload: artistObj?.songs[0] });
  };

  console.log("show more songs data ", moreSongs);

  return (
    <div
      className="max-sm:w-screen w-[calc(100%-307px)] absolute top-0 sm:top-[4.5rem]
        left-0 sm:left-[18.6875rem] bg-[#121212] font-figtree "
    >
      {/* List Items nav */}
      <div className="w-[calc(100%-307px)] h-8 fixed top-16 sm:top-[72px] pt-2 box-content ">
        <div className="w-full h-full px-4">
          <div className="h-full flex">
            {buttonArray &&
              buttonArray.map((each, idx) => {
                return (
                  <SongFilterButton
                    key={idx}
                    idx={idx}
                    data={each}
                    selectedButton={selectedButton}
                    handleSelectedButton={handleSelectedButton}
                  />
                );
              })}
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="w-full pl-4 pr-1 h-[calc(100vh-160px)] overflow-y-scroll mt-10 ">
        <div className="w-full h-[1700px] mt-6 grid min-w-[180px] gap-x-3 gap-y-8 auto-rows-min grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
          {/* Top songs */}
          <section className="h-[273px] col-span-2 relative">
            {/* container heading */}
            <div className="w-full h-[46px]">
              <div className="w-full h-[34px]">
                <h3 className="text-white text-xl font-semibold">Top Result</h3>
              </div>
            </div>
            {/* searched song */}
            <Link
              className="w-full h-[calc(100%-46px)] bg-[#181818] hover:bg-[rgb(40,40,40)] duration-300
              rounded-md flex flex-col gap-5"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              to={"/songtrack"}
              state={{ data: searchedData?._id + "&" + isImage }}
            >
              <div className="w-full h-full p-5 ">
                {/* img */}
                <div className="w-full h-[92px]">
                  {searchedData.length > 0 && (
                    <img
                      className="w-[92px] h-full shadow-md shadow-[#211f1fda]"
                      src={searchedData[0]?.thumbnail}
                      alt="Song thumnbnail"
                    />
                  )}
                </div>
                {/* title/song */}
                <div className="w-full h-[63px]">
                  <Link className="h-11">
                    <div className="text-4xl font-bold text-white pb-1">
                      {searchedData.length > 0 && searchedData[0]?.title}
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <span className="text-sm mr-1 text-[#9A9A9A] font-semibold">
                      Song .
                    </span>
                    <span className="flex">
                      {searchedData.length > 0 &&
                        searchedData[0]?.artist.map((e, idx) => {
                          return (
                            <Link
                              key={idx}
                              className="text-white font-semibold text-sm hover:underline"
                              to={"/artist-track"}
                              state={{ id: e?._id }}
                            >
                              {idx != 0 ? ", " + e?.name : e?.name}
                            </Link>
                          );
                        })}
                    </span>
                  </div>
                </div>
                {/* hover music player */}
                <div
                  className={
                    "w-12 h-12 absolute bottom-0 right-4 " +
                    (songBoxhover ? "" : "invisible")
                  }
                >
                  <div
                    className={
                      "w-12 h-12 bg-[#1ED760] shadow-2xl shadow-[#181818] rounded-full flex items-center justify-center duration-300 ease-in " +
                      (songBoxhover ? "-translate-y-6" : "-translate-y-0")
                    }
                    onClick={handleIconClick}
                  >
                    <button className="w-[50%] h-[50%] flex justify-center items-center">
                      <span>
                        <TbPlayerPlayFilled className="h-[1.375rem] w-[1.375rem]" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
          {/* All songs */}
          <section className="h-fit col-span-3 font-figtree">
            {/* container heading */}
            <div className="w-full h-[46px]">
              <div className="w-full h-[34px]">
                <h3 className="text-white text-xl font-semibold">Songs</h3>
              </div>
            </div>
            {/* songs list */}
            <div className="w-full h-[calc(100%-46px)] flex flex-col gap-5">
              <div className="w-full h-full">
                {/*  */}
                {Object.keys(moreSongs).length > 0 &&
                  moreSongs?.songs?.map((data, idx) => {
                    return (
                      <MoreSongs
                        key={idx}
                        data={data}
                        artistsObj={artistsObj}
                      />
                    );
                  })}
              </div>
            </div>
          </section>

          <section className="h-48 col-span-full"></section>
        </div>

        {/* footer */}
        <div className="w-full h-[365px] bg-gradient-to-b from-teal-400 to-teal-950"></div>
      </div>

      {/* </main> */}
    </div>
  );
};

function SongFilterButton({ idx, data, selectedButton, handleSelectedButton }) {
  return (
    <button key={idx} className="mr-2">
      <span
        onClick={() => handleSelectedButton(idx)}
        className={
          "px-3 py-1 rounded-full " +
          (selectedButton === idx
            ? "bg-white text-black"
            : "bg-[#272727] text-white hover:bg-[rgb(55,55,55)]")
        }
      >
        {data}
      </span>
    </button>
  );
}

function MoreSongs({ idx, data, artistsObj }) {
  const [audioDuration, setAudioDuration] = useState(null);

  useEffect(() => {
    const audio = new Audio(`${data?.audio_url}`);
    const setDuration = () => {
      const duration = Math.ceil(audio.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      const durationString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setAudioDuration(durationString);
    };
    audio.addEventListener("loadedmetadata", setDuration);
    return () => {
      audio.removeEventListener("loadedmetadata", setDuration);
    };
  }, [data]);

  return (
    <div key={idx} className="w-full h-[56px]">
      <div className="w-full h-full hover:bg-[rgb(42,42,42)] rounded-md border border-transparent px-4 flex justify-between">
        {/* song details */}
        <div className="w-fit h-full flex">
          {/* img */}
          <div className="w-10 h-10 -ml-2 mr-3">
            <img
              className="w-full h-full"
              src={data?.thumbnail}
              alt="song Image"
            />
          </div>
          {/* title and singer */}
          <div className="w-fit">
            <Link className="text-lg text-white font-semibold ">
              {data?.title}
            </Link>
            <div className="flex">
              {data?.artist?.map((each, idx) => {
                return (
                  <Link
                    key={idx}
                    className="text-sm text-[#9A9A9A] font-semibold hover:underline"
                  >
                    {idx != 0 ? ", " + artistsObj[each] : artistsObj[each]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {/* song time */}
        <div className="w-[120px] h-full flex justify-end items-center">
          <div className="w-fit h-5 pr-3 mr-4 text-[#A7A7A7] text-sm">
            {audioDuration?.length > 0 && audioDuration}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
