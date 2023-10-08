import Footer from "../components/Footer";



export default function CardObj() {
  const cardObj = [
    {
      heading: "Podcasts",
      color: "#E13300",
    },
    {
      heading: "Live events near you",
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
      heading: "Hindi",
      color: "#E91429",
    },
    {
      heading: "Punjabi",
      color: "#B02897",
    },
    {
      heading: "Tamil",
      color: "#A56752",
    },
    {
      heading: "Telugu",
      color: "#D84000",
    },
    {
      heading: "Charts",
      color: "#8D67AB",
    },
    {
      heading: "Pop",
      color: "#148A08",
    },
    {
      heading: "Indie",
      color: "#E91429",
    },
    {
      heading: "Trending",
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
      heading: "Decades",
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
      heading: "Chill",
      color: "#D84000",
    },
    {
      heading: "Gaming",
      color: "#E8115B",
    },
    {
      heading: "K-pop",
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
      heading: "Classical",
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
      heading: "Disney",
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
      heading: "Anime",
      color: "#E41D63",
    },
    {
      heading: "TV & Films",
      color: "#AF2896",
    },
    {
      heading: "Punk",
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
      heading: "Alternative",
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
      heading: "Songwriters",
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
      heading: "Summer",
      color: "#27856A",
    },
    {
      heading: "Netflix",
      color: "#EB1E32",
    },
    {
      heading: "Asian Pacific Islander Heritage Month",
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
      heading: "Tastemakers",
      color: "#E8115B",
    },
  ];

  return (
    <>
      {/* w-[87.4087rem] */}
      <div className="w-[87.4087rem] absolute top-[4.5rem] left-[18.6875rem] bg-[#121212]">
        {/* Main Content */}
        <div className="w-[87.4087rem]">
          <div className="w-[87.4087rem] px-6">
            {/*  */}
            <div className="mt-4">
              <div className="mb-4 h-[1.8125rem]">
                <h2 className="text-white font-figtree font-bold text-2xl">
                  Browse all
                </h2>
              </div>
            </div>
            {/*  */}
            <div className="w-full flex flex-wrap gap-5">
              {cardObj.map((card, index) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundColor: card.color }}
                    className="w-[10.8125rem] h-[10.8125rem] rounded-xl py-4 px-3 text-center flex items-center justify-center">
                      
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
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
