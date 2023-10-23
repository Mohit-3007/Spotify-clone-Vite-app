import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
useNavigate

export default function StayTuned(){
    const navigate = useNavigate()

    function handleNavigate(){
        navigate("/");
    }

    return (
        <div className="text-white font-figtree w-screen h-screen mt-6">
            <h1 className="font-bold text-4xl mx-auto my-4 text-center tracking-widest">Coming Soon!</h1>
            <h2 className="font-semibold text-2xl mx-auto text-center tracking-wide mb-5">Stay Tuned . . . .</h2>
            <span className="font-semibold text-xl mx-auto flex items-center justify-center cursor-pointer">Go back to 
                <GoHomeFill className="ml-4 w-8 h-8 fill-black stroke-1 stroke-white hover:scale-125 hover:fill-white" onClick={handleNavigate} />
            </span>
        </div>
    )
} 