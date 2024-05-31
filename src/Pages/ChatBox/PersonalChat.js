import React, {useState, useContext, useEffect,useRef} from 'react';
import '../ChatBox/PersonalChat.css';
import AuthContext from '../../Context/AuthContext';
import CryptoJS from 'crypto-js';

const PersonalChat = () => {
    const{userId, firstName,lastName, role, setIsAuthenticated}= useContext(AuthContext);
    const[userData, setUserData]= useState([]);
    const[receiverUsername, setReceiverUsername]=useState('');
    const[receiverID, setReceiverID]=useState('');
    const[message, setMessage]= useState('');
    const[payment, setPayment]= useState([]);
    const[userMessage, setUserMessage]= useState([]);
    const chatContainerRef = useRef(null);
  
    const senderID= userId;
    

    useEffect(() => {
        const fetchUser= async() => {
            const url= `http://localhost:4000/api/displayAllUser`;
            const response= await fetch(url);

            if(!response.ok){
                console.log('Unable to fetch user')
            }
            const data= await response.json();
            if(response.ok){
                setUserData(data);
            }
        }
        fetchUser();
    },[]);

    const encryptMessage = (message) => {
        // Replace 'YOUR_SECRET_KEY' with a strong secret key for encryption
        const secretKey = 'mynameisnirojneupane';
        return CryptoJS.AES.encrypt(message, secretKey).toString();
      };

      const decryptMessage = (encryptedMessage) => {
        // Replace 'YOUR_SECRET_KEY' with the same secret key used for encryption
        const secretKey = 'mynameisnirojneupane';
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      };

    const sendMessage= async(e) =>{
        e.preventDefault();
        const encryptedMessage = encryptMessage(message);
        const userMessageData= {firstName,lastName,message: encryptedMessage, senderID, receiverID};
        const url=`http://localhost:4000/api/addPersonalChat`;
        
        const response= await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userMessageData),
            headers:{
            'Content-Type': 'application/json'
        }
        })
        const json= await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        else{
            setIsAuthenticated(true);
            setMessage('');
            setUserMessage([...userMessage, userMessageData]);
            scrollChatToBottom();
        }
    }

    useEffect(()=>{
        const fetchmesaage=async()=>{
            const url=`http://localhost:4000/api/displayPersonalChat`;
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){  
                scrollChatToBottom();  
                setUserMessage(data);
            }
        }
        fetchmesaage();
        const interval=setInterval(fetchmesaage,5000);
        return()=>{
            clearInterval(interval)
        }
    },[])
    const handleInfo= (info) => {
        setReceiverUsername(info.firstName);
        setReceiverID(info._id);
    }

    const handleGroup=()=>{
        setReceiverID("");
    }
    const scrollChatToBottom = () => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      };

    
   // Fetch payments
   useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = `http://localhost:4000/api/displayPayment`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
          setPayment(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPayments();
  }, []);

  const filteredUserData = userData.filter((info) => {
    if (role === 'teacher' && payment.some((item) => item.teacherId === userId)) {
      return info.role === 'student' && payment.some((item)=>item.userId===info._id);
    } else if(role==='student' && payment.some((item) => item.userId === userId)) {
      return info.role === 'teacher'  && payment.some((item) => item.teacherId === info._id);
    }
    else{
        return null;
    }
  });
  
  return (
    <>
    <div className="container my-1" id='chat-app'>
        <div className="row">
            <div className="col-md-2" id='sidebar'>
                <button className="btn btn-primary my-2" style={{ width: '150px' }} onClick={handleGroup}>Group Message</button>
            {filteredUserData.map((info) => (
              <div className="my-2" key={info._id}>
                <button className="btn btn-primary" onClick={() => handleInfo(info)} style={{ width: '150px' }}>
                  {info.firstName}
                </button>
              </div>
            ))}

        </div>
         <div className="col-md-10">
            <div className="row" id='top-chat'>
            <div className="col-md-12 text-center">
                {receiverID?(
                    <h1>{receiverUsername}</h1>
                ):(
                    <h1>Group Chat</h1>
                )}
            </div>
            </div>

        <div className="row" id='middle-chat'>
        <div className="col-md-12" style={{ maxHeight: '425px', overflowY: 'auto' }}  ref={chatContainerRef}>
                {userMessage && userMessage.map((userMsg)=>userMsg.receiverID===receiverID  && userMsg.senderID===senderID?(
                   
                    <div key={userMsg._id} style={{textAlign:'right'}}>
                        <span className='sender'>{userMsg.firstName}</span>
                        <span className='sender'>{decryptMessage(userMsg.message)}</span>
                    </div>
                ):userMsg.receiverID===senderID && receiverID!=="" && userMsg.senderID===receiverID?(
                    <div key={userMsg._id} style={{textAlign:'left'}}>
                        <span className='receiver'>{userMsg.firstName}</span>
                        <span className='receiver'>{decryptMessage(userMsg.message)}</span>
                    </div>
                ):userMsg.receiverID==="" && userMsg.receiverID===receiverID?(
                    <div key={userMsg._id} style={{textAlign:'left'}}>
                        <span className='receiver-group'>{userMsg.firstName}</span>
                        <span className='receiver-group'>{decryptMessage(userMsg.message)}</span>
                    </div>
                ):null)}
          </div>
        </div>

        <div className="row" id='bottom-chat'>
            <div className="col-md-12">
                <form className='d-flex justify-content-center' onSubmit={sendMessage}>
                <input type='text' className='form-control'  placeholder='Message' style={{width:'500px', height:'50px'}}
                value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="btn btn-primary mx-1" style={{width:'60px', height:'50px'}} >Send</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default PersonalChat;