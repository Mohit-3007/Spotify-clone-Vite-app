import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MusicCard from "./MusicCard";

export default function FeaturedMusic({DataFromMusicCard}) {
  const [songData, setSongData] = useState([]);
  const [page, setPage] = useState(1);

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  function handleIncPage() {
    setPage((curr)=> curr + 1)
  }

  function handleDecPage() {
    if(page == 1) return
    setPage((curr)=> curr - 1)
  }

  useEffect(() => {
    async function fetchData() {
      let data1 = await fetch(
        `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=24`,
        {
          headers: headers,
        }
      );
      let info1 = await data1.json();
      // console.log(info);
      setSongData(info1);
    }
    fetchData();
  }, [page]);

  return (
    <>
      <div className="w-[87.4087rem] absolute top-[4.5rem] left-[18.6875rem] bg-[#121212] ring-op">
        <div className="pt-2">
          <div className="px-6">
            {/* Featured Music */}
            <section className="mb-4">
              <div className="h-[2.875rem]">
                <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
                  <div>
                    <span className="text-2xl font-bold font-figtree">
                      Featured Music!
                    </span>
                  </div>
                  <Link to={"/"} className="text-sm font-figtree">
                    Show less
                  </Link>
                </div>
              </div>
              <div className="gap-6 flex flex-wrap">
                {songData.data &&
                  songData.data.map((each) => {
                    return <MusicCard key={each._id}
                      musicObj={each}
                      DataFromMusicCard={DataFromMusicCard}
                    />;
                  })}
              </div>
              <section className=" p-4 w-[87.4087rem} mb-40 ">
                <div className="font-figtree text-white text-sm w-[87.4087rem] flex justify-center items-center gap-4 mx-auto">
                  <span className="mr-3" onClick={handleDecPage}>Prev Page</span>
                  <span className="mr-3">{page}</span>
                  <span className="mr-3" onClick={handleIncPage}>Next Page</span>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
