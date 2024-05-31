import { useState, useEffect,useContext} from "react";
import PaidContext from "./PaidContext";
import AuthContext from "./AuthContext";

const PaidContextProvider= ({children}) => {
    const {userId,setIsAuthenticated}=useContext(AuthContext);
    const[status,setStatus]=useState('');
    const [paid, setPaid] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(()=>{
        const fetchPayment=async()=>{
            const url='http://localhost:4000/api/displayPayment';
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
                setIsAuthenticated(true);
                const userPayment=data.find(item=>item.userId===userId && item.status==='success');
                if(userPayment){
                    setStatus(userPayment.status);
                    setPaid(true)
                }
            }
        }
        fetchPayment();
    },[userId,setIsAuthenticated])

    

    return(
        <PaidContext.Provider  value={{status,setLoginStatus,loginStatus,paid,setPaid}}>
            {children}
        </PaidContext.Provider>
    )
}

export default PaidContextProvider;