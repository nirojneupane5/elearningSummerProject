import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';


const Logout = () => {
    const navigate= useNavigate();
    const {setIsAuthenticated}= useContext(AuthContext);

    const handleLogout= () => {
      const confirmed= window.confirm("Are you sure you want to logout ?");
      if(confirmed){
        localStorage.removeItem('token');
        console.log("Logout Successful");
        setIsAuthenticated(false);
        navigate('/');
      }
    }
  return (
    <>
    <div className="container">
    <div className='d-flex justify-content-center'>
    <button className="btn btn-danger" onClick={handleLogout}> Logout </button>
    </div>
    </div>
    </>
    
  )
}

export default Logout;
