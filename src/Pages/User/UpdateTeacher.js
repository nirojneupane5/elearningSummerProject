import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTeacher = () => {
    const navigate= useNavigate('');
    const {id}= useParams();

    const[courseId, setCourseId]= useState('');
    const[courses, setCourses]= useState([]);
    const[error, setError]= useState('');

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

    useEffect(() => {
        const fetchUser= async() => {
            try{
                const url= `${process.env.REACT_APP_DISPLAY_SINGLEUSER}/${id}`;
                const response= await fetch(url);

                if(!response.ok){
                    setError( 'Unable to fetch user');
                }
                const data= await response.json();
                setCourseId(data.courseId);
    
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    const handleSubmit= async(e) => {
        e.preventDefault();
        const user= {courseId};
        const url= `${process.env.REACT_APP_UPDATE_USER}/${id}`;
        const response= await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers:{
                'Content-type': 'application/json'
            }
        })
        const json= await response.json();
        if(!response.ok){
            const {errors} =json;
                setError(errors.join(', '));
        }
        else{
            console.log(json);
            setCourseId('');
            navigate('/');
        }
    }
  return (
    <>
    <div className="container my-3">
        <div className="d-flex justify-content-center">
        <h6>Add or update courseId</h6>
        </div>
    <div className='d-flex justify-content-center'>
    <form onSubmit={handleSubmit}>
    <select value={courseId} onChange={(e)=>{setCourseId(e.target.value)}}>
    <option value="" disabled>Select Course</option>
        {courses && courses.map((info)=>(
            <option key={info._id} value={info._id}>{info.name}</option>
        ))}
    </select>
    
    <div className='d-flex justify-content-center'>
    <button className="btn btn-success my-1"> Update CourseId</button>
    </div>

    </form>
    
    </div>
    <div className='d-flex justify-content-center'>
    {error && <div className='text-danger'> {error} </div>}
    </div>
    </div>
    </>
  )
}

export default UpdateTeacher;
