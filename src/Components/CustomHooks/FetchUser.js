import {useState,useEffect} from 'react';

const useFetch=(url)=>{
    
    const[userData,setUserData]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPayment=async()=>{
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
                setUserData(data)
                setLoading(false);  
            }
        }
        fetchPayment();
    },[url])
    return {loading,userData};
}
export default useFetch;