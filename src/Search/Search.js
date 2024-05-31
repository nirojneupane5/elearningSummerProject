import React from 'react';
import {useNavigate} from 'react-router-dom';

 const Search = ({searchResult}) => {
  const navigate=useNavigate();
  const handleClick=(id)=>{
    navigate(`/courseDetails/${id}`)
  }
  return (
    <div className="container">
      <div className="row">
          {searchResult && searchResult.map((course) => (
            <div className="col-md-4" key={course._id}>
              <div className='card'>
              <img src={`http://localhost:4000/CourseImage/${course.filename}`} width="415px" height="300px" alt="" />
                <h3>Course Name: {course.name}</h3>
                <h3 className='text-success'>price: {course.price}</h3>
                <button onClick={()=>{handleClick(course._id)}} id='btn-2'>View course details</button>
                </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default Search;
