import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const DisplayAllEvent = () => {
    const navigate= useNavigate();
    const[event, setEvent]= useState([]);

    useEffect(() => {
        const fetchEvent= async() => {
          
          try{
            const url=`http://localhost:4000/api/displayAllEvent`;
            const response= await fetch(url);
            const data= await response.json();
    
            if(response.ok){
              setEvent(data);
            }
    
          }
          catch(err){
            console.log(err)
          }
        }
        fetchEvent();
      })

      const handleDelete= async(id) => {
        const url= `http://localhost:4000/api/deleteEvent/${id}`;
        const response= await fetch(url, {
            method: 'DELETE'
        })
        if(response.ok){
            setEvent(prevEvent => prevEvent.filter(event => event._id !== id));
        }
        
      }

      const handleUpdate= async(id) => {
        navigate(`/updateEvent/${id}`)
      }

  return (
    <>
    <div className="container">

    <table className="table">
    <thead style={{backgroundColor:'#39A7FF',color:'white'}}>
        <tr>
        <th scope="col">Date</th>
        <th scope="col">Event</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        {event && event.map((eventData) => (
            <tr key={eventData._id}>
                <td> {new Date(eventData.event).toLocaleDateString()} </td>
                <td> {eventData.title} </td>
                <td> {eventData.description} </td>
                <td>
                    <button className="btn btn-primary" onClick={() => {handleUpdate(eventData._id)}} > Update </button>
                    <button className="btn btn-danger mx-2" onClick={() => {handleDelete(eventData._id)}}> Delete </button>
                </td>
            </tr>
        ))}
    </tbody>
    </table>
    </div>
    </>
  )
}

export default DisplayAllEvent;
