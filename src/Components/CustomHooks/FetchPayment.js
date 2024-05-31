import {useState,useEffect} from 'react';

const useFetch=(url)=>{
    
    const[paymentData,setPaymentData]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchPayment=async()=>{
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
                setPaymentData(data)
                setLoading(false);  
            }
        }
        fetchPayment();
    },[url])
    return {loading,paymentData};
}
export default useFetch;