import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
  const[name, setName]= useState('');
  const[description, setDescription]= useState('');
  const[price, setPrice]= useState('');
  const[courseDuration, setCourseDuration]= useState('');
  const[error, setError]= useState('');

  const {id}= useParams();
  const navigate= useNavigate();

  useEffect( () => {
    const fetchCourse= async() => {
      try{
        const url= `${process.env.REACT_APP_DISPLAY_COURSE}/${id}`;
        const response= await fetch(url);

        if(!response.ok){
          throw new Error("Unable to fetch course");
        }
        const data= await response.json();
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCourseDuration(data.courseDuration);
      }
      catch(error){
        setError(error.message);
      }
    }
    fetchCourse();
  },[id])

  const handleSubmit= async(e) => {
    e.preventDefault();
    const course= {name, description, price,courseDuration};
    const url= `${process.env.REACT_APP_UPDATE_COURSE}/${id}`;
    const response= await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(course),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const json= await response.json();
    if(!response.ok){
      setError(json.error);
    }
    else{
      setName('');
      setDescription('');
      setPrice('');
      setCourseDuration('');
      navigate('/displayCourse');
    }
  }

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br/>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} /><br/>
        <label>Description:</label><br/>
       <textarea  style={{height:'300px',width:'500px'}} value={description} onChange={(e) => {setDescription(e.target.value)}} ></textarea><br />
        <label>Price:</label><br/>
        <input type="text" value={price} onChange={(e) => {setPrice(e.target.value)}} /><br/>
        <label>Course Duration</label><br/>
        <input type="text" value={courseDuration} onChange={(e) => {setCourseDuration(e.target.value)}} /><br/>
        <button className="btn btn-primary my-2"> Update </button>
      </form>
      {error && <div> {error} </div>}
    </div>
    </>
  )
}

export default UpdateCourse;
