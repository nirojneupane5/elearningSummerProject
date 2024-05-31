import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateEvent = () => {
    const{id} = useParams();
    const navigate= useNavigate();

    const[title, setTitle]= useState('');
    const[event, setEvent]= useState('');
    const[description, setDescription]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchEvent= async() => {
            const url= `http://localhost:4000/api/displaySingleEvent/${id}`;
            const response= await fetch(url);
                        
            if(!response.ok){
                setError('Unable to fetch');

            }
            const data= await response.json();
            
                setTitle(data.title);
                setDescription(data.description);
                setEvent(new Date(data.event).toISOString().substring(0,10));
            
            
            console.log(data);
            
            
        }
        fetchEvent();
    },[id])

    const handleSubmit= async(e) => {
        e.preventDefault();

        const eventData= {title, description, event};
        const url= `http://localhost:4000/api/updateEvent/${id}`;
        const response= await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json();
        if(!response.ok){
            setError(json.error)
        }
        else{
            setTitle('');
            setEvent('');
            setDescription('');
            navigate('/displayAllEvent');
        }
    }

  return (
    <>
    <div className="container my-3">
    <h2 className='text-center'>Update Event</h2>
        <div className="d-flex justify-content-center">
        
        <form onSubmit={handleSubmit}>
        <label>Title </label><br/>
        <select style={{width:"200px"}} value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="" disabled> Select Option </option>      
            <option value="Holiday"> Holiday </option>
            <option value="ECA"> ECA </option>
            <option value="Exam"> Exam </option>
        </select><br/>
        <label className='my-2'> Description</label>
        <textarea className='form-control' style={{width: "300px", height:"200px"}} value={description} onChange={(e) => setDescription(e.target.value)} />
        <label> Event Date </label>
        <input type='date' className='form-control' value={event} onChange={(e) => setEvent(e.target.value)} style={{width:"200px"}} /><br/>
        <button className="btn btn-success"> Update </button>
        </form>

        <div>
            {error && <div> {error} </div>}
        </div>
        </div>
    </div>
    
    </>
  )
}

export default UpdateEvent;
