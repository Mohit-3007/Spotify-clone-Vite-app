import { useState } from "react";
import { useLoginCredentialProvider } from "./ContextProvider/LoginCredentialProvider";
import { BsSpotify } from "react-icons/bs";

export default function ChangePassword(){
    const [firstName, setFirstName] = useState("");
    const [currPass, setCurrPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repNewPass, setRepNewPass] = useState("");
    const { name } = useLoginCredentialProvider()

    let allCookie = decodeURIComponent(document.cookie).split(";")

    let email = allCookie[0].split("=")[1]
    let token = allCookie[1].split("=")[1]

    console.log(email);

    async function handleChangePass(e){
        e.preventDefault()
        console.log(firstName, "    ",email);
        console.log(currPass,"  ", newPass);


        
        if(newPass === repNewPass){
            console.log("chnage the password");
            
            
            const passChange = await fetch(
                "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                    projectId: "nyiisjkwy2r6",
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    name: name,
                    email: email,
                    passwordCurrent: currPass,
                    password: newPass,
                    appType: "music",
                  }),
                }
              );

              const data = await passChange.json();

              console.log(data, "DATA");

        }
    }

    


    return (
        <div className="w-screen h-screen bg-[#121212] absolute top-0 left-0">

            {/* Logo */}
            <header className="w-screen h-[6.3125rem] p-8 flex">
                <BsSpotify className="text-white w-8 h-8" />
                <span className="w-8 h-9 ml-6 text-xl font-figtree font-bold text-white flex justify-center items-center">Spotify</span>
            </header>
            {/* section */}
            <section className="w-[73.125rem] min-h-[42rem] pb-8 mx-auto bg-[#121212] font-figtree text-white">
                <div className="w-[28.125rem] mx-auto bg-[#121212] flex flex-col">
                    <h1 className="w-[28.125rem] h-[5.5rem] pb-8 font-extrabold flex text-5xl justify-center items-center">Change Passsword</h1>
                    {/* <p className="w-[28.125rem] h-[6rem] pb-6 text-center text-base text-[#6a6a6a]">Enter your <b>Spotify username</b>, or the <b>email address</b> that you used to register. We'll send you an email with your username and a link to reset your password.</p> */}
                    <form className="w-[28.125rem] h-[11rem]" onSubmit={(e)=>handleChangePass(e)}>
                        <div className="w-[28.125rem] h-[6.5rem] pb-6">
                            <div  className="w-[28.125rem] h-[1.75rem] pb-2"><label className="h-[1.25rem] text-sm font-bold">First name</label></div>
                            <input className="w-[28.125rem] h-[3.125rem] p-6 bg-inherit border-2 rounded border-[#878787] cursor-text"
                             type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                        </div>
                        <div className="w-[28.125rem] h-[6.5rem] pb-6">
                            <div  className="w-[28.125rem] h-[1.75rem] pb-2"><label className="h-[1.25rem] text-sm font-bold">Current Password</label></div>
                            <input className="w-[28.125rem] h-[3.125rem] p-6 bg-inherit border-2 rounded border-[#878787] cursor-text"
                             type="text" value={currPass} onChange={(e)=>setCurrPass(e.target.value)} />
                        </div>
                        <div className="w-[28.125rem] h-[6.5rem] pb-6">
                            <div  className="w-[28.125rem] h-[1.75rem] pb-2"><label className="h-[1.25rem] text-sm font-bold">New Password</label></div>
                            <input className="w-[28.125rem] h-[3.125rem] p-6 bg-inherit border-2 rounded border-[#878787] cursor-text"
                             type="text" value={newPass} onChange={(e)=>setNewPass(e.target.value)} />
                        </div>
                        <div className="w-[28.125rem] h-[6.5rem] pb-6">
                            <div  className="w-[28.125rem] h-[1.75rem] pb-2"><label className="h-[1.25rem] text-sm font-bold">Repeat New Password</label></div>
                            <input className="w-[28.125rem] h-[3.125rem] p-6 bg-inherit border-2 rounded border-[#878787] cursor-text"
                             type="text" value={repNewPass} onChange={(e)=>setRepNewPass(e.target.value)} />
                        </div>
                        <div className="w-[28.125rem] h-[4.5rem] pb-6 flex justify-center items-center">
                            <button  className="w-fit h-12 relative" type="submit">
                                <div className="w-fit px-3 h-12 rounded-[31.25rem] bg-[#1ED760] hover:font-bold hover:scale-105 flex justify-center items-center text-black text-sm font-semibold">Set new Password</div>
                                {/* <div className="w-[6.0625rem] h-12 absolute top-0 left-0 rounded-[31.25rem] hover:font-bold hover:scale-125"></div> */}
                            </button>
                        </div>
                    </form>
                    <p className="w-[28.125rem] h-6"></p>
                </div>
            </section>

        </div>
    )
}