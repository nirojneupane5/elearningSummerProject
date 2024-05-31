import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const AssignmentStatus = () => {
  const navigate= useNavigate();

  const {setIsAuthenticated, userId}= useContext(AuthContext);

  const[display, setDisplay]= useState([]);

  useEffect(() => {
    const fetchAssignment= async() => {
        try{
            const url=`http://localhost:4000/api/displayToTeacher`;
            const response= await fetch(url);
            const data= await response.json();

            if(response.ok){
              setIsAuthenticated(true);
              setDisplay(data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    fetchAssignment();
})

  const handleSlider= () => {
    navigate('/displayToStudent')
  }
  const handleClick= (id) => {
    navigate(`/viewPDF/${id}`)
}
  return (
    <>
    <div className="container">
    <button className="btn btn-primary" onClick={handleSlider}> Unsubmitted Assignment </button>
    <table className="table">
    <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Status</th>
      <th scope="col">Filename</th>
    </tr>
    </thead>
    <tbody>
    {display && display.map((info) =>info.studentID === userId ?(
      <tr key={info._id}>
        <td>{info.subject}</td>
        <td>{info.status}</td>
        <td><button className="btn btn-primary"onClick={() => handleClick(info.filename)} >View Assignment </button></td>
      </tr>
    ):null)}
    </tbody>
    </table>
    </div>
    </>
  )
}

export  default AssignmentStatus;