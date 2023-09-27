import { Router, Route } from "react-router-dom";



export default function Content() {

    function serachData() {
        
    }
    
    return (
        <>
            <div className="w-[1403.5392px] h-96 bg-[#4d4a4a] absolute right-2 top-20 flex justify-center items-center">

                <button onClick={()=>serachData()} className="text-white text-lg p-3 text-center font-semibold
                 font-figtree border-solid border-white border-2 rounded-2xl hover:scale-110">Search Data</button>
            </div>
        </>
    )
}

