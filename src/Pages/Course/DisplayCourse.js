import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayCourse = () => {
    const navigate= useNavigate();
    const[courses, setCourses]= useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const url = process.env.REACT_APP_DISPLAY_COURSE;
            const response = await fetch(url);
            const data = await response.json();
            if(response.ok){
              setCourses(data)
            }
        }      
        fetchCourses();
      }, []);

      const handleDelete= async(_id) => {
        const url= `${process.env.REACT_APP_DELETE_COURSE}/${_id}`;
        const response= await fetch(url, {
          method: 'DELETE'
        })
        if(response.ok){
          setCourses(prevCourses => prevCourses.filter(course => course._id !== _id));
        }
        
      }

      const handleUpdate= (_id) => {
        navigate(`/updateCourse/${_id}`)                
      }
      const handleClick= (_id) => {
        navigate(`/courseDetails/${_id}`)                
      }

  return (
    <>
    <div className="container">
        <div className="row">
            {courses && courses.map((course) => (
                <div className="col-md-4" key={course._id}>
                    <div className="card my-3">
                      <img src={`${process.env.REACT_APP_COURSEIMAGE}/${course.filename}`} height='300px' width='394px' alt=''  />
                        <h3>Course Name: {course.name}</h3>
                        <p>Course Price: {course.price}</p>
                        <div>
                        <button className="btn btn-danger" onClick={() => {handleDelete(course._id)}}> Delete</button>
                        <button className="btn btn-primary mx-3" onClick={() => {handleUpdate(course._id)}}> Update</button>
                        <button className="btn btn-primary mx-3" onClick={() => {handleClick(course._id)}}> View course</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default DisplayCourse;
