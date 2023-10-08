import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";


export default function Footer(){

    return (
        <div className="w-[87.4087rem] h-[24.25rem] mt-10 bg-[#121212] mb-[86px]"> 
            <nav className="w-[87.4087rem] h-[24.25rem] px-8 pt-2 pb-10">
                {/*Company Details, Community Details, other usefull links & Social Media Links */}
                <div className="w-[83.5313rem] h-[14.625rem] mt-8 flex">
                    {/*Company Details, Community Details, other usefull links  */}
                    <div className="w-[68.625rem] h-[14.625rem] flex">
                        {/* Company */}
                        <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                            <p className="text-white font-bold text-base">Company</p>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                About
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                Jobs
                                </span>
                            </Link>
                            <Link className=" h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                For the Record
                                </span>
                            </Link>
                            </ul>
                        </div>

                        {/* Community */}
                        <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                            <p className="text-white font-bold text-base">
                                Communities
                            </p>
                            <Link className=" h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                For Artists
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                Developers
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                Adverstising
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                Investors
                                </span>
                            </Link>
                            <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                Vendors
                                </span>
                            </Link>
                            </ul>
                        </div>

                        {/* Usefull Links */}
                        <div className="w-[12.4375rem] h-[12.625rem] mb-8 mr-6">
                            <ul className="font-figtree flex flex-col">
                                <p className="text-white font-bold text-base">
                                    Useful links
                                </p>
                                <Link className="w-[2.8125rem] h-[1.625rem] my-2">
                                    <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                    Support
                                    </span>
                                </Link>
                                <Link className="h-[1.625rem] my-2">
                                    <span className="pb-2 text-[#A7A7A7] text-base font-normal">
                                    Free Mobile App
                                    </span>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    {/* Social Media Links */}
                    <div className="w-[9.5rem] h-[12.125rem] mb-10 flex">
                            <div className="w-[2.5rem] h-[2.5rem] mr-4 ">
                                <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <AiOutlineInstagram className="h-6 w-6 text-white " />
                                </Link>
                            </div>
                            <div className="w-[2.5rem] h-[2.5rem] mr-4">
                                <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <AiOutlineTwitter className="h-5 w-5 text-white"/>
                                </Link>
                            </div>
                            <div className="w-[2.5rem] h-[2.5rem] mr-4">
                                <Link className="w-[2.5rem] h-[2.5rem] bg-[#292929] rounded-[50%] hover:bg-[#a7a7a7] flex justify-center items-center">
                                <FaFacebook className="h-5 w-5 text-white" />
                                </Link>
                            </div>
                    </div>
                </div>

                <div className="w-[83.6063rem] h-[0.0781rem] mb-6 bg-white opacity-10"></div>

                {/*Legal, Cookies & Privacy Center  */}
                <div className="w-[83.5313rem] h-[3.0625rem] flex justify-between pt-4 mb-10">
                    <div className="w-[31.75rem] h-[2.0625rem] flex">
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        Legal
                        </Link>
                    </div>
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        Privacy Center
                        </Link>
                    </div>
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        Privacy Policy
                        </Link>
                    </div>
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        Cookies
                        </Link>
                    </div>
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        About Ads
                        </Link>
                    </div>
                    <div className="h-[2.0625rem] mr-4 flex items-center justify-center">
                        <Link className="h-[1.4063rem] mb-2 text-[#A7A7A7] font-figtree font-normal text-sm">
                        Accessibility
                        </Link>
                    </div>
                    </div>
                    <div className="w-[8.4375rem] h-[1.4063rem]">
                    <div className="w-[8.4375rem] pr-4">
                        <p className="text-[#A7A7A7] font-figtree font-normal text-sm">
                        c 2023 Spotify AB
                        </p>
                    </div>
                    </div>
                </div>

            </nav>
      </div>
    )
}