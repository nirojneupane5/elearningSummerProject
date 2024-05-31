import React,{useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import { NavLink, Outlet,useNavigate } from 'react-router-dom';
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { BiSolidBookAdd} from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";


const AdminNavbar = () => {
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
            <div className="nav">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" id='logo'>
                            <h1> Elearning Platform</h1>
                        </div>
                        <div className="col-md-8">
                            <ul id="list">
                                <li><NavLink to="/"> Home <AiFillHome/> </NavLink></li>
                                <li><NavLink to="/about"> About </NavLink></li>
                                <li><NavLink to="/addCourse"><BiSolidBookAdd/> Add Course </NavLink></li>
                                <li><NavLink to="/addEvent"><BsFillCalendarPlusFill/> Add Event</NavLink></li>
                                <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default AdminNavbar;
