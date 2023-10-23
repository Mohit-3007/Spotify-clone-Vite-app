import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";


export default function Footer(){

    return (
        // h-[24.25rem]
        <div className="max-w-[87.4087rem]  bg-[#121212] mb-[86px]"> 
            <nav className="max-w-[87.4087rem] px-4 sm:px-8 pt-2 pb-10">

                {/*Company Details, Community Details, other usefull links & Social Media Links */}
                {/* h-[14.625rem] */}
                <div className="sm:max-w-[83.5313rem] sm:w-full  mt-8 sm:flex sm:justify-between sm:pr-[84.5px]">

                    {/* h-[14.625rem] */}
                    {/*Company Details, Community Details, other usefull links  */}
                    <div className="max-w-[68.625rem] flex flex-wrap">
                        {/* Company */}
                        <div className="w-[12.4375rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                            <p className="text-white font-bold text-base">Company</p>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                            to={"https://www.spotify.com/in-en/about-us/contact/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                About
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2 "
                            to={"https://www.lifeatspotify.com/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                Jobs
                                </span>
                            </Link>
                            <Link className=" h-[1.625rem] my-2 "
                            to={"https://newsroom.spotify.com/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                For the Record
                                </span>
                            </Link>
                            </ul>
                        </div>

                        {/* Community */}
                        <div className="w-[12.4375rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                            <p className="text-white font-bold text-base">
                                Communities
                            </p>
                            <Link className=" h-[1.625rem] my-2"
                            to={"https://artists.spotify.com/home"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                For Artists
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                            to={"https://developer.spotify.com/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                Developers
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                            to={"https://ads.spotify.com/en-IN/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                Adverstising
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                            to={"https://investors.spotify.com/home/default.aspx"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                Investors
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                            to={"https://spotifyforvendors.com/"}>
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                Vendors
                                </span>
                            </Link>
                            </ul>
                        </div>

                        {/* Usefull Links */}
                        <div className="w-[12.4375rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                                <p className="text-white font-bold text-base">
                                    Useful links
                                </p>
                                <Link className="w-[2.8125rem] h-[1.625rem] my-2"
                                to={"https://support.spotify.com/in-en/"}>
                                    <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                    Support
                                    </span>
                                </Link>
                                <Link className="h-[1.625rem] my-2"
                                to={"https://www.spotify.com/in-en/free/"}>
                                    <span className="pb-2 text-[#A7A7A7] text-base font-normal hover:underline hover:text-white">
                                    Free Mobile App
                                    </span>
                                </Link>
                            </ul>
                        </div>

                    </div>
                    
                    {/* Social Media Links */}
                    {/* h-[12.125rem] w-[9.5rem] */}
                    <div className="w-full sm:w-[9.5rem] mb-10 flex">
                            <div className="w-[2.5rem] h-[2.5rem] mr-4 ">
                                <Link to={"https://www.instagram.com/spotify/"} target="_blank" className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <AiOutlineInstagram className="h-6 w-6 text-white " />
                                </Link>
                            </div>
                            <div className="w-[2.5rem] h-[2.5rem] mr-4">
                                <Link to={"https://twitter.com/spotify"} target="_blank" className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <AiOutlineTwitter className="h-5 w-5 text-white"/>
                                </Link>
                            </div>
                            <div className="w-[2.5rem] h-[2.5rem] mr-4">
                                <Link to={"https://www.facebook.com/Spotify"} target="_blank" className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <FaFacebook className="h-5 w-5 text-white" />
                                </Link>
                            </div>
                    </div>

                </div>

                <div className="max-w-[83.6063rem] h-[0.0781rem] mb-6 bg-white opacity-10"></div>

                {/*Legal, Cookies & Privacy Center  */}
                <div className=" flex justify-between pt-4 mb-10">

                    {/* Footer Links */}
                    <div className="flex flex-wrap">

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/legal/end-user-agreement/"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white">
                            Legal
                            </Link>
                        </div>

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/privacy"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white">
                            Privacy Center
                            </Link>
                        </div>

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/legal/privacy-policy/"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white">
                            Privacy Policy
                            </Link>
                        </div>

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/legal/cookies-policy/"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white">
                            Cookies
                            </Link>
                        </div>

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/legal/privacy-policy/#s3"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white"> 
                            About Ads
                            </Link>
                        </div>

                        <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                            <Link to={"https://www.spotify.com/in-en/accessibility"} className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm hover:underline hover:text-white">
                            Accessibility
                            </Link>
                        </div>

                    </div>

                    {/* Copy Right */}
                    <div className="w-[8.4375rem] h-[1.4063rem]">
                        <div className="w-[8.4375rem] pr-4">
                            <p className="text-[#A7A7A7] font-figtree font-normal text-sm">
                            &#169; 2023 Spotify AB
                            </p>
                        </div>
                    </div>

                </div>

            </nav>
      </div>
    )
}