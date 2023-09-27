import { useParams, useLocation } from "react-router-dom";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { CiSearch } from 'react-icons/ci';
import Navbar from "./Navbar";
import CardObj from "../assets/CardObj";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function SearchPage() {

    // const params = useParams();

    // console.log(params , 'params');

    // const location = useLocation();

    // console.log(location);
    
    return (
        <>
        <Sidebar />
        <Navbar />
        <CardObj /> 
        <Footer />
     
        </>
    )
}