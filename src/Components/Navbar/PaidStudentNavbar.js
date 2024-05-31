import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Search from '../../Search/Search';
import AuthContext from '../../Context/AuthContext';
import PaidContext from '../../Context/PaidContext';

const PaidStudentNavbar = () => {
    const {setPaid}=useContext(PaidContext);
    const { userId,firstName, setIsAuthenticated } = useContext(AuthContext);
    const id = userId;
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchItem, setSearchItem] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    //Search
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = { searchItem };
        const url = 'http://localhost:4000/api/search';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(name),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (response.ok) {
            setSearchResult(json);
            console.log(json);
            navigate('/searchResult');
        }
    }
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
          setPaid(false);
          navigate('/');
        }
      }

    return (
        <>
            <div className="nav">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 my-2" id='logo'>
                            <h3> Elearning platform </h3>
                        </div>
                        <div className="col-md-9 my-2">
                            <ul id="list">
                                <li><NavLink to="/"> <i className="fa-solid fa-house"></i>Home </NavLink></li>
                                <li><NavLink to="/about"> About </NavLink></li>
                                <li><NavLink to="/displayToStudent"> View Assignment</NavLink></li>
                                <li><NavLink to="/calendar"><i className="fa-solid fa-calendar-days"></i>Calender</NavLink></li>
                                <li><NavLink to="/personalChat"><i className="fa-brands fa-rocketchat"></i>Chat</NavLink></li>
                                <li>
                                    <form onSubmit={handleSubmit}>
                                        <div className="d-flex">
                                            <input type="text" className='form-control' placeholder='search'
                                                onChange={(e) => setSearchItem(e.target.value)} value={searchItem} />
                                            <button className="btn btn-primary" ><i className="fa-solid fa-magnifying-glass"></i></button>
                                        </div>
                                    </form>
                                </li>
                                <span className="dropdown mx-2">
                                    <button
                                        className='btn btn-dark'
                                        data-bs-toggle="dropdown"
                                        style={{ background: 'none', border: 'none', padding: '0' }}>
                                        <li>
                                             {image &&<img
                                                src={`http://localhost:4000/ProfileUpload/${image}`}
                                                style={{ borderRadius: '50px' }}
                                                height='40px'width='40px'alt=''/>} </li>
                                        <b className='mx-2'>{firstName}</b>
                                    </button>
                                    <div className="dropdown-menu bg-dark" >
                                        <div className="dropdown-item" style={{ backgroundColor: 'black' }}>
                                            <li><NavLink to="/myProfile"> Profile</NavLink></li>
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
                {location.pathname === '/searchResult' && <Search searchResult={searchResult} />}
            </main>
        </>
    )
}

export default PaidStudentNavbar;
