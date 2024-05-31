import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider= ({children}) => {
    const[isAuthenticated, setIsAuthenticated]= useState(false);
    const[error, setError]= useState('');
    const[role, setRole]= useState('');
    const[firstName, setFirstName]= useState('');
    const[lastName, setLastName]= useState('');
    const[userId, setUserid]= useState('');
    const[email, setEmail]= useState('');
    
    useEffect(() => {
        const protectedAccess= async() => {
            try{
                const token= localStorage.getItem("token");
                const url= "http://localhost:4000/api/checkLogin";
                const response= await fetch(url, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
            const data= await response.json();
            if(response.ok){
                setIsAuthenticated(true);
                setRole(data.userRole);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setUserid(data.userId);
                setEmail(data.email);
            }
            else{
                setIsAuthenticated(false);
            }

            }
            catch(error){
                setError(error.message);
            }
        }  
        protectedAccess();      
    }, [isAuthenticated]);

    return(
        <AuthContext.Provider value={{isAuthenticated, error, firstName,lastName, role, setIsAuthenticated, userId, email}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;