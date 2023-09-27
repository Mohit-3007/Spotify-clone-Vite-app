import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlbumCard from "./AlbumCard";

export default function MoreAlbums() {
  const [albumData, setAlbumData] = useState([]);
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
      let data2 = await fetch(
        `https://academics.newtonschool.co/api/v1/music/album?page=${page}&limit=24`,
        {
          headers: headers,
        }
      );
      let info2 = await data2.json();
      setAlbumData(info2);
    }
    fetchData();
  }, [page]);

  return (
    <>
      <div className="w-[87.4087rem] absolute top-[4.5rem] left-[18.6875rem] bg-[#121212] ring-op">
        <div className="pt-2">
          <div className="px-6">
            {/* Albums */}
            <section className="mb-4">
              <div className="h-[2.875rem]">
                <div className=" h-[2.875rem] mb-4 flex justify-between items-center text-white">
                  <div>
                    <span className="text-2xl font-bold font-figtree">
                      Albums
                    </span>
                  </div>
                  <Link to={"/"} className="text-sm font-figtree">
                    Show less
                  </Link>
                </div>
              </div>
              <div className="gap-6 flex flex-wrap">
                {albumData.data &&
                  albumData.data.map((each) => {
                    return (
                        <AlbumCard key={each._id} albumObj={each} />
                    );
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
