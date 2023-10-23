import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextProvider } from "../ContextProvider/AppContextProvider";
import MusicCard from "../MusicCard";
import Footer from "../Footer";
// import headers from ".../assets/config";

export default function MoreRomantic() {
  const [page, setPage] = useState(1);
  const [songData, setSongData] = useState([]);

  function handleIncPage() {
    setPage((curr)=> curr + 1)
  }

  function handleDecPage() {
    if(page == 1) return
    setPage((curr)=> curr - 1)
  }

  const headers = {
    projectId: "nyiisjkwy2r6",
  };

  useEffect(() => {
    async function fetchData() {
      try{
        let resp = await fetch(
            `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=24&filter={"mood": "romantic"}`,
            {
                headers: headers,
            }
        );
        console.log("response ",resp);
        if(resp.ok === "false"){
          console.error("Error fetching data:");
          throw new Error(`Network error: `);
        }
        let result = await resp.json();
        console.log("More Romantic Songs page ",result);
        setSongData(result);
      }
      catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [page]);

  return (
    <>
      <div className="max-sm:w-screen w-[calc(100%-307px)] h-fit absolute top-0 sm:top-[72px] left-0 sm:left-[18.6875rem] bg-[#121212] ">

        {/* Main Content */}
        <div className="[87.4087rem] pt-2 px-6">
          {/* Title, MusicCards & Pagination */}
          <section className="mb-4">
            {/* Title */}
            <div className="h-[2.875rem] mb-4">
              <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
                <div>
                  <span className="text-2xl font-bold font-figtree">
                  Top Romantic
                  </span>
                </div>
                <Link to={"/"} className="text-sm font-figtree hover:underline">
                  Show less
                </Link>
              </div>
            </div>
            {/* Music Card */}
            <div className="gap-6 flex flex-wrap">
              {songData.data &&
                songData.data.map((each) => {
                  return <MusicCard key={each._id}
                    musicObj={each}
                  />;
                })}
            </div>
            {/* Pagination */}
            <div className=" p-4 w-[100%] mt-5 ">
              <div className="font-figtree text-white text-sm w-[100%] flex justify-center items-center gap-4 mx-auto">
                <span className="mr-3 hover:scale-105" onClick={handleDecPage}>Prev Page</span>
                <span className="mr-3">{page}</span>
                <span className="mr-3 hover:scale-105" onClick={handleIncPage}>Next Page</span>
              </div>
            </div>
          </section> 
        </div>

        {/* Footer */}
        <Footer />

      </div>

      
    </>
  );
}
