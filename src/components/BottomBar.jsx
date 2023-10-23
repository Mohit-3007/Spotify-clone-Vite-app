import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BsHeartFill, BsSpotify, BsSearch } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { AiTwotonePushpin } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";


export default function (){
    const navigate = useNavigate()


    return(
        <div className="w-[100%] h-[4.375rem] fixed bottom-0 left-0 bg-black z-10 flex">
            <div className="w-[25%] h-full flex flex-col justify-center items-center gap-1" onClick={() => navigate("/")}>
                <GoHomeFill className="w-6 h-6 text-white" />
                <span className="text-white text-sm">Home</span>
            </div>
            <div className="w-[25%] h-full flex flex-col justify-center items-center gap-1" onClick={() => navigate("/search")}>
                <BsSearch className="w-5 h-5 text-white" />
                <span className="text-white text-sm">Search</span>
            </div>
            <div className="w-[25%] h-full flex flex-col justify-center items-center gap-1 cursor-pointer" onClick={() => navigate("/stay-tuned")}>
                <BiLibrary className="w-6 h-6 text-white" />
                <span className="text-white text-sm">Your Library</span>
            </div>
            <div className="w-[25%] h-full flex flex-col justify-center items-center gap-1">
                <BsSpotify className="w-6 h-6 text-white" />
                <span className="text-white text-sm">Get app</span>
            </div>
        </div>  
    ) 

}