import React, {useState, useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
const AssignmentDisplayTeacher = () => {
  const navigate= useNavigate();
  const[assignmentData, setAssignmentData]= useState([]);
  const {userId,setIsAuthenticated}=useContext(AuthContext);
  useEffect(() => {
    const fetchAssignment= async() => {
      try{
        const url= `http://localhost:4000/api/displayToStudent`;
        const response= await fetch(url);
        const data= await response.json();
        if(response.ok){
          setAssignmentData(data);
          setIsAuthenticated(true);
        }

      }
      catch(err){
        console.log(err)
      }
    }
    fetchAssignment();
  },[setIsAuthenticated])

  const handleClick= (id) =>{
    navigate(`/updateAssignment/${id}`)
  }

  const handleDelete= async(_id) => {  
    const url= `http://localhost:4000/api/deleteAssignment/${_id}`;
    const response= await fetch(url, {
      method: 'DELETE'
    })
    if(response.ok){
      setAssignmentData(prevAssignment => prevAssignment.filter(data => data._id !== _id))
    }

  }
  // Function to format the date and time in 12-hour format
const formatDateTime = (dateTimeString) => {
  const deadlineDate = new Date(dateTimeString);
  const formattedDate = deadlineDate.toLocaleDateString();
  const formattedTime = deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${formattedDate} ${formattedTime}`;
};

  return (
    <>
    <div className="container">
      <div className="row">
        
          {assignmentData && assignmentData.map((assignments) =>assignments.teacherId===userId? (
            <div className="card" key={assignments._id}>
              
              <h2> <b> Title: {assignments.title}</b></h2>
              <p> Description: {assignments.description} </p>
              <p>Time:  {formatDateTime(assignments.deadline)} </p>
              
              <div className="d-flex">
              <button className="btn btn-primary" onClick={() => handleClick(assignments._id)} style={{width:"250px"}}> Update </button>
              <button className="btn btn-danger mx-2" onClick={() => handleDelete(assignments._id)} style={{width:"250px"}}> Delete </button>
              </div>
            </div>

          ):null)}
        </div>
      </div>
    
    </>
  )
}

export default AssignmentDisplayTeacher;
