import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate} from 'react-router-dom';

const MyProfile = () => {
  const navigate= useNavigate('');
    const{setIsAuthenticated, userId, email}= useContext(AuthContext);
    const[userInfo, setUserInfo]= useState('');
    const[displayRemark, setDisplayRemark]= useState([]);
    const[displayAttendance, setDisplayAttendance]= useState('');

    //Display User Info
    useEffect(() => {
      const fetchUser= async() => {
        try{
            const url= `http://localhost:4000/api/displayAllUser`;
            const response= await fetch(url);
            const data= await response.json();
            
            if(response.ok){
                setIsAuthenticated(true);
                setUserInfo(data);                
            }
        }
        catch(err){
            console.log(err);
        }
      }
      fetchUser();
    },[setIsAuthenticated]);


    //Display Remark
    useEffect(() => {
      const fetchRemark= async() => {
        try{
            const url= `http://localhost:4000/api/displayRemark`;
            const response= await fetch(url);
            const data= await response.json();
            
            if(response.ok){
                setIsAuthenticated(true);
                setDisplayRemark(data);                
            }
        }
        catch(err){
            console.log(err);
        }
      }
      fetchRemark();
    },[setIsAuthenticated]);

    const handleUpdate= (id) => {
      navigate(`/updateProfile/${id}`)      
    };

    //Display Attendance
    useEffect(() => {
      const fetchRemark= async() => {
        try{
            const url= `http://localhost:4000/api/displayAllAttendance`;
            const response= await fetch(url);
            const data= await response.json();
            
            if(response.ok){
                setIsAuthenticated(true);
                setDisplayAttendance(data);              
            }
        }
        catch(err){
            console.log(err);
        }
      }
      fetchRemark();
    },[setIsAuthenticated]);

    const handleGradeColor=(grade)=>{
      if(grade==='F'){
        return {color:'red'}
      }else{
        return {}
      }
    }

  return (
    <>
    <div className="container">
      {userInfo && userInfo.map((userData) => userData._id === userId ? (
        <div className="card" key={userData._id}>
          <img src={`http://localhost:4000/ProfileUpload/${userData.filename}`} style={{borderRadius:'200px'}} height='100px' width='100px' alt='' />
          <h3> Username: {userData.username}</h3>
          <h3> Email: <i>{userData.email}</i> </h3>
          <button className="btn btn-primary" style={{width: '200px'}} onClick={() => handleUpdate(userData._id)}> Update Profile</button>
        </div>
      ):null )}
      <div className='attendance'>
        {displayAttendance && displayAttendance.map((userAttendance) => userAttendance.email === email?(
          <h2 key={userAttendance._id}>
          Total Present Days: {userAttendance.attendance}
          </h2>
        ):null)}
      </div>
      <div className='d-flex justify-content-center'>
        <h2>Your Assignment Remarks</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Feedback</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          {displayRemark && displayRemark.map((yourRemark) =>
            yourRemark.studentID === userId ? (
              <tr key={yourRemark._id} style={handleGradeColor(yourRemark.mark)}>
                <td>{yourRemark.subject}</td>
                <td>{yourRemark.feedback}</td>
                <td>{yourRemark.mark}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
    </>
  )
}


export default MyProfile;

