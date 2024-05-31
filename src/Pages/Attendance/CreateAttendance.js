import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const CreateAttendance = () => {
        const navigate= useNavigate();
    
        const[firstname, setFirstname]= useState('');
        const[lastname, setLastname]= useState('');
        const[email, setEmail]= useState('');
        const[attendance, setAttendance]= useState('');
        const[error, setError]= useState('');
    
        const handleSubmit = async(e) => {
            e.preventDefault();
            const userData= {firstname, lastname, email, attendance};
            const  url= process.env.REACT_APP_CREATE_ATTENDANCE;
            const response= await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const json= await response.json();
    
            if(!response.ok){
                setError(json.error);
            }
            else{
                setFirstname('');
                setLastname('');
                setEmail('');
                setAttendance('');
                navigate('/displayAttendance');
            }
        }
        
  return (
    <>
    <div className="container">
        <div className="row justify-content-center">
        <div className='card my-3' style={{width: '400px' }}>
        
        <div className="d-flex justify-content-center">
        <h2> Create Attendance</h2>
        </div>
    
        <div className='d-flex justify-content-center'>
        
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='First Name' className='form-control' style={{width:"350px"}} value={firstname} onChange={(e) => {setFirstname(e.target.value)}} /><br/>
            <input type="text" placeholder='Last Name' className='form-control' style={{width:"350px"}} value={lastname} onChange={(e) => {setLastname(e.target.value)}} /><br/>
            <input type="text" placeholder='Email' className='form-control' style={{width:"350px"}} value={email} onChange={(e) => {setEmail(e.target.value)}} /><br/>
            <input type="text" placeholder='Attendance' className='form-control' style={{width:"350px"}} value={attendance} onChange={(e) => {setAttendance(e.target.value)}} /><br/>
            
            <div className='d-flex justify-content-center'>
            <button className="btn btn-success my-1">Create Attendance</button>
            </div>
            
        </form>
        </div>
        <div className='d-flex justify-content-center'>
        {error && <div className='text-danger'> {error} </div>}
        </div>
    </div>
    
        </div>
    </div>
    </>
    )
}

export default CreateAttendance ;