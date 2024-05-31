import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStar from './Rating/DisplayStar';
import AuthContext from '../Context/AuthContext';
import CarousalImage from './CourseDetails/CarousalImage';

const Home = () => {
  const {isAuthenticated}=useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [ratingInfo, setRatingInfo] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCourses = async () => {
      const url = process.env.REACT_APP_DISPLAY_COURSE;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      }
    };
    fetchCourses();
  }, []);

  const handleView = (id) => {
    navigate(`/courseDetails/${id}`);
  }

  useEffect(() => {
    const fetchReview = async () => {
      const url = "http://localhost:4000/api/displayReview";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingInfo(data);
      }
    };
    fetchReview();
  }, [])

  const handlePurchase=(id)=>{
    navigate(`paymentDetails/${id}`);
  }
  const handleLogin=()=>{
    window.alert("Please login to continue");
  }

  return (
    <>
    <div >
    <div className="container">
      <CarousalImage/>
        <div className="row">
          {courses && courses.map((course) => {
            // Filter ratingInfo for the current course
            const courseRatings = ratingInfo.filter((info) => info.productId === course._id);
            // Calculate average rating for the current course
            const totalRating = courseRatings.reduce((sum, info) => sum + info.rating, 0);

            const averageRating = courseRatings.length > 0 ? totalRating / courseRatings.length : 0;
            
            return (
              <div className="col-md-4" key={course._id}>
                <div className="card my-3 " id='card'>
                  <img src={`${process.env.REACT_APP_COURSEIMAGE}/${course.filename}`} height='200px' width='415px' alt='' />
                  <h6 className='mx-2'>Course Name: {course.name}</h6>
                  <p className='mx-2 text-success'><strong>Course Price: Rs {course.price}</strong></p>
                  <p className='mx-2'>Teacher name:  {course.teacherName}</p>
                  <p className='mx-2'>Duration:  {course.courseDuration}</p>
                  <div className="d-flex">
                  <div key={course._id}>
                    <DisplayStar star={averageRating} />
                  </div>
                  <p className='mx-5'>Reviews: {courseRatings.length}</p>
                  </div>
                  <div className="d-flex">
                  <button className="btn btn-success mx-2 my-2" onClick={() => { handleView(course._id) }} style={{width:'175px'}}>View Course Details</button>
                  {isAuthenticated ?(
                    <button className='my-2' onClick={() => { handlePurchase(course._id) }} style={{width:'150px'}} id='btn-2'>Purchase Course</button>
                  ):(
                    <button className='my-2' style={{width:'150px'}} onClick={handleLogin} id='btn-2'>Purchase Course</button>
                  )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;
