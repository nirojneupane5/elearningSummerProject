import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TeacherProfile = () => {
    const navigate= useNavigate();
    const{setIsAuthenticated, userId}= useContext(AuthContext);
    const[userInfo, setUserInfo]= useState([]);

    //Display User Info
    useEffect(() => {
        const fetchUserInfo= async() => {
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
        fetchUserInfo();
      },[setIsAuthenticated]);

      const handleUpdate= (id) => {
        navigate(`/updateProfile/${id}`)      
      };

  return (
    <>
    <div className="container">
        {userInfo && userInfo.map((userData) => userData._id === userId?(
            <div className='card' key={userData._id}>
                <img src={`http://localhost:4000/ProfileUpload/${userData.filename}`} style={{borderRadius:'200px'}} height='100px' width='100px' alt='' />
                <h3> Username: {userData.username} </h3>
                <h3> Email: <i>{userData.email}</i> </h3>
                <button className="btn btn-primary" style={{width: '200px'}} onClick={() => handleUpdate(userData._id)}> Update Profile</button>
            </div>
        ):null)}
    </div>
    </>
  )
}

export default TeacherProfile;
   
