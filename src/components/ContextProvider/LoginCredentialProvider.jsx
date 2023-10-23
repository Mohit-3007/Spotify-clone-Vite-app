import { createContext, useContext, useState, useEffect } from "react";

const LoginCredentialContext = createContext(null);

function LoginCredentialProvider({children}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    function handleEmail(value){
        console.log("handler");
        setEmail(value);
    }

    function handlePassword(value){
        console.log("handler");
        setPassword(value);
    }

    function handleName(value){
        console.log("handler");
        setName(value);
    }

    const initialValues={
        email: email,
        handleEmail,
        password: password,
        handlePassword,
        name: name,
        handleName,
    }


    return <LoginCredentialContext.Provider value={initialValues}>{children}</LoginCredentialContext.Provider>

}

function useLoginCredentialProvider(){
    const useContextProvider = useContext(LoginCredentialContext);
    return useContextProvider;
}

export { LoginCredentialProvider, useLoginCredentialProvider }