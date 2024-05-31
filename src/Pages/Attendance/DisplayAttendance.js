import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayAttendance = () => {
    const navigate= useNavigate();
    const[displayAttendance, setDisplayAttendance]= useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const url = process.env.REACT_APP_DISPLAY_ALLATTENDANCE;
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setDisplayAttendance(data);
            }
        }      
        fetchAttendance();
      }, []);

      const handleDelete= async(_id) => {
        const url= `${process.env.REACT_APP_DELETE_ATTENDANCE}/${_id}`;
        const response= await fetch(url, {
          method: 'DELETE'
        })
        if(response.ok){
          setDisplayAttendance(prevAttendance => prevAttendance.filter(attendances => attendances._id !== _id));
        }
      }

      const handleUpdate= (_id) => {
        navigate(`/updateAttendance/${_id}`)                
      }

  return (
    <>
    <div className="container">
    <table className="table">
  <thead>
    <tr>
      <th scope="col"> Firstname</th>
      <th scope="col"> Lastname</th>
      <th scope="col"> Email</th>
      <th scope="col"> Attendance</th>
      <th scope="col"> Action</th>
    </tr>
  </thead>
  <tbody>
    {displayAttendance && displayAttendance.map((info) => (
        <tr key={info._id}>
        <td> {info.firstname}</td>
        <td> {info.lastname}</td>
        <td> {info.email}</td>
        <td> {info.attendance}</td>
        <td>
          <button className="btn btn-primary" onClick={() => handleUpdate(info._id)}> Update</button>
          <button className="btn btn-danger mx-2" onClick={() => handleDelete(info._id)}> Delete</button>
        </td>
      </tr>
    ))}
    
    </tbody>
  </table>
    </div>
    </>
  )
}

export default DisplayAttendance;
