import React,{useContext,useState,useEffect} from 'react';
import { NavLink, Outlet,useNavigate } from 'react-router-dom';
import { BsFillClipboardPlusFill } from "react-icons/bs";
import AuthContext from '../../Context/AuthContext';
const TeacherNavbar = () => {
  const navigate=useNavigate();
  const { userId,firstName, setIsAuthenticated } = useContext(AuthContext);
  const id=userId;
  const[image,setImage]=useState(null);
  //Display User Info
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const url = `http://localhost:4000/api/displaySingleUser/${id}`;
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setImage(data.filename);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    fetchUser();
}, [setIsAuthenticated, id]);
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
            <div className="col-md-6 my-4" id='logo'>
              <h4 id='teacherHeading'> ELearning platform</h4>
            </div>
            <div className="col-md-6 my-3">
              <ul id="list">
                <li><NavLink to="/"> Home </NavLink></li>
                <li><NavLink to="/about"> About </NavLink></li>
                <li><NavLink to="/personalChat">Chat</NavLink></li>
                <li><NavLink to="/createAssignment"> <BsFillClipboardPlusFill/>Create Assignment</NavLink></li>
                <span className="dropdown mx-2">
                                    <button
                                        className='btn btn-dark'
                                        data-bs-toggle="dropdown"
                                        style={{ background: 'none', border: 'none', padding: '0' }}>
                                        <li>
                                            {image && <img
                                                src={`http://localhost:4000/ProfileUpload/${image}`}
                                                style={{ borderRadius: '50px' }}
                                                height='40px'width='40px'alt=''/>}
                                                <b className=' mx-2'>{firstName}</b>
                                                 </li>      
                                    </button>
                                    <div className="dropdown-menu bg-dark" >
                                        <div className="dropdown-item" style={{ backgroundColor: 'black' }}>
                                            <li><NavLink to="/teacherProfile"> Profile</NavLink></li>
                                        </div>
                                        <div className="dropdown-item" style={{ backgroundColor: 'black' }}>
                                            <li><button className="btn btn-dark"onClick={handleLogout} >Logout</button></li>
                                        </div>
                                    </div>
                                </span>
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
export default TeacherNavbar;
