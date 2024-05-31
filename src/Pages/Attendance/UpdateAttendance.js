import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAttendance = () => {
    const {id}= useParams();
    const navigate= useNavigate();

    const[firstname, setFirstname]= useState('');
    const[lastname, setLastname]= useState('');
    const[email, setEmail]= useState('');
    const[attendance, setAttendance]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            const url = `${process.env.REACT_APP_DISPLAY_SINGLEATTENDANCE}/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setFirstname(data.firstname);
              setLastname(data.lastname);
              setEmail(data.email);
              setAttendance(data.attendance);
            }
        }      
        fetchAttendance();
      }, [id]);

      const handleSubmit = async(e) => {
        e.preventDefault();
        const userData= {firstname, lastname, email, attendance};
        const url= `${process.env.REACT_APP_UPDATE_ATTENDANCE}/${id}`;
        const response= await fetch(url, {
            method: 'PATCH',
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
        <h2> Update Attendance</h2>
        </div>
    
        <div className='d-flex justify-content-center'>
        
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='First Name' className='form-control' style={{width:"350px"}} value={firstname} onChange={(e) => {setFirstname(e.target.value)}} /><br/>
            <input type="text" placeholder='Last Name' className='form-control' style={{width:"350px"}} value={lastname} onChange={(e) => {setLastname(e.target.value)}} /><br/>
            <input type="text" placeholder='Email' className='form-control' style={{width:"350px"}} value={email} onChange={(e) => {setEmail(e.target.value)}} /><br/>
            <input type="text" placeholder='Attendance' className='form-control' style={{width:"350px"}} value={attendance} onChange={(e) => {setAttendance(e.target.value)}} /><br/>
            
            <div className='d-flex justify-content-center'>
            <button className="btn btn-success my-1">Update </button>
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

export default UpdateAttendance;
