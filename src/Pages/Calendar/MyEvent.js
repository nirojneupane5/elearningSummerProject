import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const MyEvent = () => {
    const navigate= useNavigate();

    const[title, setTitle]= useState('');
    const[description, setDescription]= useState('');
    const[event, setEvent]= useState('');
    const[error, setError]= useState('');

    const handleSubmit= async(e) => {
        e.preventDefault();

        const myEvent= {title,description, event};
        console.log(myEvent);
        try{
            const url= `http://localhost:4000/api/addEvent`;
            const response= await fetch(url, {
                method: 'POST',
                body: JSON.stringify(myEvent),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const json= await response.json();
            if(!response.ok){
                const {errors} =json;
                setError(errors.join(', '));
            }
            else{
                setTitle('');
                setDescription('');
                setEvent('');
                setError('');
                navigate('/calendar');
            }

        }
        catch(err){
            setError(err.message);
        }
    }

  return (
    <>
    <div className="container my-3">
    <h2 className='text-center'>Add Event</h2>
        <div className="card">
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
        <textarea className='form-control' style={{width: "500px", height:"200px"}} value={description} onChange={(e) => setDescription(e.target.value)} />
        <label> Event Date </label>
        <input type='date' className='form-control' value={event} onChange={(e) => setEvent(e.target.value)} style={{width:"200px"}} /><br/>
        <button className="btn btn-success"> Add Event </button>
        </form>
        <div>
        </div>
        </div>
        <div className='d-flex justify-content-center'>
        {error && <div className='text-danger'> {error} </div>}
        </div>
        </div>
    </div>
    </>
  )
}

export default MyEvent;
