import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsHeartFill, BsSpotify, BsSearch } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";



export default function CardObj() {
  const navigate = useNavigate();
  const [ showSearchBox,  setShowSearchBox ] = useState(false)

  const cardObj = [
    {
      heading: "Love",
      color: "#E13300",
    },
    {
      heading: "Soul",
      color: "#7358FF",
    },
    {
      heading: "Made for you",
      color: "#1E3264",
    },
    {
      heading: "New releases",
      color: "#E8115B",
    },
    {
      heading: "Party",
      color: "#E91429",
    },
    {
      heading: "Evergreen",
      color: "#B02897",
    },
    {
      heading: "Rock",
      color: "#A56752",
    },
    {
      heading: "Trending",
      color: "#D84000",
    },
    {
      heading: "Sad",
      color: "#8D67AB",
    },
    {
      heading: "Artist",
      color: "#148A08",
    },
    {
      heading: "Charts",
      color: "#E91429",
    },
    {
      heading: "Telegu",
      color: "#B02897",
    },
    {
      heading: "Love",
      color: "#E61E32",
    },
    {
      heading: "Discover",
      color: "#8D67AB",
    },
    {
      heading: "Mood",
      color: "#E1118C",
    },
    {
      heading: "Party",
      color: "#537AA1",
    },
    {
      heading: "Devotional",
      color: "#C39687",
    },
    {
      heading: "Evergreen",
      color: "#BA5D07",
    },
    {
      heading: "Hip-Hop",
      color: "#BC5900",
    },
    {
      heading: "Dance / Electronic",
      color: "#D84000",
    },
    {
      heading: "Student",
      color: "#AF2896",
    },
    {
      heading: "New releases",
      color: "#D84000",
    },
    {
      heading: "Gaming",
      color: "#E8115B",
    },
    {
      heading: "Sad",
      color: "#148A08",
    },
    {
      heading: "Workout",
      color: "#777777",
    },
    {
      heading: "RADAR",
      color: "#777777",
    },
    {
      heading: "EQUAL",
      color: "#056952",
    },
    {
      heading: "Fresh Finds",
      color: "#FF0090",
    },
    {
      heading: "Rock",
      color: "#E91429",
    },
    {
      heading: "Sleep",
      color: "#1E3264",
    },
    {
      heading: "Indian Classical",
      color: "#7D4B32",
    },
    {
      heading: "Instrumental",
      color: "#537AA1",
    },
    {
      heading: "Spotify Singles",
      color: "#777777",
    },
    {
      heading: "At Home",
      color: "#5179A1",
    },
    {
      heading: "Country",
      color: "#D84000",
    },
    {
      heading: "R&B",
      color: "#DC148C",
    },
    {
      heading: "Metal",
      color: "#E91429",
    },
    {
      heading: "Jazz",
      color: "#767676",
    },
    {
      heading: "Rock",
      color: "#7D4B32",
    },
    {
      heading: "Folk & Acoustic",
      color: "#BC5900",
    },
    {
      heading: "Focus",
      color: "#503750",
    },
    {
      heading: "Trending",
      color: "#0D72EA",
    },
    {
      heading: "Soul",
      color: "#DC148C",
    },
    {
      heading: "Children & Family",
      color: "#8D67AB",
    },
    {
      heading: "Made for you",
      color: "#E41D63",
    },
    {
      heading: "TV & Films",
      color: "#AF2896",
    },
    {
      heading: "Evergreen",
      color: "#1E3264",
    },
    {
      heading: "Ambient",
      color: "#477D95",
    },
    {
      heading: "Blues",
      color: "#B06239",
    },
    {
      heading: "Cooking & Dining",
      color: "#BA5D07",
    },
    {
      heading: "Artist",
      color: "#E81328",
    },
    {
      heading: "Wellness",
      color: "#A56752",
    },
    {
      heading: "Travel",
      color: "#0D72ED",
    },
    {
      heading: "Caribbean",
      color: "#0D73EC",
    },
    {
      heading: "Afro",
      color: "#D84000",
    },
    {
      heading: "Soul",
      color: "#8C1932",
    },
    {
      heading: "Nature & Noise",
      color: "#477D95",
    },
    {
      heading: "Funk & Disco",
      color: "#E61E32",
    },
    {
      heading: "League of Legends",
      color: "#148A08",
    },
    {
      heading: "Love",
      color: "#27856A",
    },
    {
      heading: "Netflix",
      color: "#EB1E32",
    },
    {
      heading: "Party",
      color: "#F59B23",
    },
    {
      heading: "GLOW",
      color: "#0D73EC",
    },
    {
      heading: "Music + Talk",
      color: "#FF4632",
    },
    {
      heading: "Latin",
      color: "#E1118C",
    },
    {
      heading: "Rock",
      color: "#E8115B",
    },
  ];

  function handleCardClick({cardName}){
    console.log(cardName, " handleCardClick");

    switch (cardName) {
      case "Made for you":
        navigate("/more-made4u")
        break;
      case "New releases":
        navigate("/more-new-releases")
        break;
      case "Trending":
        navigate("/more-trending-songs")
        break;
      case "Soul":
        navigate("/more-soul-soother")
        break;
      case "Evergreen":
        navigate("/more-evergreen-melodies")
        break;
      case "Party":
        navigate("/more-happy")
        break;
      case "Love":
        navigate("/more-romantic")
        break;
      case "Rock":
        navigate("/more-excited")
        break;
      case "Sad":
        navigate("/more-sad")
        break;
      case "Artist":
        navigate("/more-artist")
        break;
      default:
        navigate("/stay-tuned")
    }
  }

  return (
    <>
      {/* w-[87.4087rem] */}
      <div className="max-sm:w-screen w-[calc(100%-307px)] h-fit absolute top-0 sm:top-[4.5rem] left-0 sm:left-[18.6875rem] bg-[#121212]">

        {/* Main Content */}
        <div className="w-[100%] px-4 sm:px-6">

          {/* sm:screen Search Heading */}
          <h1 className="sm:hidden w-[100%] h-8 mt-8 mb-4 font-figtree font-bold text-3xl text-white">Search</h1>

          {/* sm:screen Search Bar */}
          <button className="sm:hidden w-full h-11 px-4 bg-white font-semibold text-sm text-black rounded-sm
            flex items-center cursor-pointer" onClick={()=> setShowSearchBox(true)}>
            <BsSearch className="w-[22px] h-[22px] text-black mr-2 stroke-[0.5]" />What do you want to listen to?
          </button>

          {/* Browse all */}
          <div className="mt-5 sm:mt-4">
            <div className="mb-6 sm:mb-4 h-[1.8125rem]">
              <h2 className="text-white font-figtree font-bold text-base sm:text-2xl">
                Browse all
              </h2>
            </div>
          </div>
          
          {/* Cards Map Function */}
          <div className="w-[100%] flex justify-between flex-wrap gap-4 sm:gap-5">
            {cardObj.map((card, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: card.color }}
                  className="w-[46.24%] sm:w-[10.8125rem] h-[92px] sm:h-[10.8125rem] rounded-xl sm:py-4 sm:px-3 text-center flex items-center justify-center"
                  onClick={() => handleCardClick({ cardName: card.heading }) }
                  >        
                    <span
                      className="text-white font-figtree
                            text-2xl font-semibold">
                      {card.heading}
                    </span>
                </div>
              );

            })}
          </div>

        </div>

        {/* sm:screen Search Page rendered on Click */}
        <div className={"w-[100%] h-full fixed top-0 left-0 sm:hidden z-10 bg-[#121212] " + (showSearchBox ? "block" : "hidden")} >
          {/* Search Input */}
          <div className="w-full h-[4.5rem] p-3 flex items-center">
            {/* back arrow */}
            <button className="w-12 h-12 p-2 flex justify-center items-center cursor-pointer" onClick={()=> setShowSearchBox(false)}>
              <IoArrowBack className="w-9 h-9 text-white" />
            </button>
            {/* search input box */}
            <div className="w-[calc(100%-48px)] h-[38px] bg-white rounded-sm flex relative">
               <BsSearch className="absolute top-[11px] left-3 w-5 h-5 text-[#4b4848] mr-2 stroke-[0.5]" />
              <input type="text" placeholder="What do you want to listen to?" className="w-full h-full px-10 py-2 placeholder:text-[#717070]" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
