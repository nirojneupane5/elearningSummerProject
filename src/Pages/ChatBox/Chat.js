import React, { useState, useEffect, useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import './Chat.css'

const Chat = () => {
  const {setIsAuthenticated, name}= useContext(AuthContext);

  const[user, setUser]= useState('');
  const[message, setMessage]= useState('');
  const[displayMessages, setDisplayMessages]= useState('');
  const[error, setError]= useState('');
  

  const handleSubmit= async(e) => {
    e.preventDefault();

    const msg= {user, message};
    const url="http://localhost:4000/api/addMessage";
    const response= await fetch(url, {
      method: 'POST',
      body: JSON.stringify(msg),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const json= await response.json();

    if(!response.ok){
      setError(json.error);
    }
    else{
      setUser('');
      setMessage('');
            
    }
  }

  useEffect(() => {
    const fetchAllMessage= async() => {
      const url= "http://localhost:4000/api/displayMessage";
      const response= await fetch(url);
      const data= await response.json();

      if(response.ok){
        setDisplayMessages(data);
        setIsAuthenticated(true);
        setUser(name);
      }
      else{
        setError(data.error);
      }
    }
    fetchAllMessage();
  });

  return (
    <>
    <div className="container my-2">
    <div className="d-flex justify-content-center">
    <div className="card" >
    <div className="chat-window">
    {displayMessages && displayMessages.map((display) => (
        <div className="row" key={display._id}> 
          {display.user === name ? (
            <>
            <div className="col-md-12" style={{textAlign:"right"}}>
              <span className='chat-user-sender mx-1'>{display.user}</span>
              <span className='chat-message-sender'>{display.message}</span>
            </div>
            </>
            ) : (
              <>
              <div className="col-md-12">
              <span className='chat-user-receiver mx-1'>{display.user}</span>
              <span className='chat-message-receiver'>{display.message}</span>
              </div>
              </>
            )}

        </div> 
      ))}
      <form onSubmit= {handleSubmit}>
      <div className='d-flex'>
      <input type="text" className='form-control' style={{width:'500px'}} placeholder='Message' value={message} onChange={(e) => {setMessage(e.target.value)}} /><br/>
      <button className="btn btn-primary mx-2">Send</button>
      </div>
    </form>
    {error && <div> {error} </div>}
    </div>
    </div>
    </div>
    </div>
    </>
  )
  
}


export default Chat;
