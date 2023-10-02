import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MusicCard from "./MusicCard";
import AlbumCard from "./AlbumCard";





export default function SpotifyDashboard({DataFromMusicCard}) {
  const [songData, setSongData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  // const navigate = useNavigate();

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  useEffect(() => {
    async function fetchData() {
      let data1 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/song?limit=6",
        {
          headers: headers,
        }
      );
      let info1 = await data1.json();
      // console.log(info);
      setSongData(info1);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let data2 = await fetch(
        "https://academics.newtonschool.co/api/v1/music/album?limit=6",
        {
          headers: headers,
        }
      );
      let info2 = await data2.json();
      setAlbumData(info2);
    }
    fetchData();
  }, []);

  // console.log('albumData', albumData);
  // console.log('songData', songData);

  

  return (
    <>
      <div className="w-[87.4087rem] absolute top-[4.5rem] left-[18.6875rem] bg-[#121212]">
        <div className="pt-2">
          <div className="px-6">

            {/* Featured Music */}
            <section className="mb-4">
              <div className="h-[2.875rem]">
                <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
                  <div><span className="text-2xl font-bold font-figtree">Featured Music!</span></div>
                  <Link to={"/featured"} className="text-sm font-figtree">Show all</Link>
                </div>
              </div>
              {/* MusicCard */}
              <div className="gap-6 flex flex-wrap">
                {songData.data &&
                  songData.data.map((each) => {
                    return (
                      <MusicCard
                        key={each._id}
                        musicObj={each}
                        DataFromMusicCard={DataFromMusicCard}
                        // play={play}
                        // stop={stop}
                      />
                  );
                })}
              </div>
            </section>

            {/* Albums */}
            <section className="mb-4">
              <div className="h-[2.875rem]">
                <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
                  <div><span className="text-2xl font-bold font-figtree">Albums</span></div>
                  <Link to={"/morealbums"} className="text-sm font-figtree">Show all</Link>
                </div>
              </div>
              {/* AlbumCard */}
              <div className="gap-6 flex flex-wrap">
                {albumData.data &&
                  albumData.data.map((each) => {
                  return (
                    <AlbumCard key={each._id} albumObj={each} />
                  );
                })}
              </div>
            </section>

            

          </div>
        </div>
      </div>
    </>
  );
}
