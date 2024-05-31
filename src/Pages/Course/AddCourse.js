import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const navigate= useNavigate();
    const[name, setName]= useState('');
    const[description, setDescription]= useState('');
    const[price, setPrice]= useState('');
    const[image, setImage]= useState('');
    const[teacherId, setTeacherId]= useState('');
    const[teacherName, setTeacherName]= useState('');
    const[courseDuration, setCourseDuration]= useState('');
    const[error, setError]= useState('');
    const [teacherDetails,setTeacherDetails]=useState([]);

    useEffect(()=>{
        const fetchTeacher=async()=>{
          const url='http://localhost:4000/api/displayAllUser';
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
            const userInfo=data.filter((item)=>item.role==='teacher');
            if(userInfo){
                setTeacherDetails(userInfo);
            }
            }
        }
        fetchTeacher();
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData= new FormData();

        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('teacherId', teacherId);
        formData.append('teacherName', teacherName);
        formData.append('courseDuration', courseDuration);
        
        const url= process.env.REACT_APP_ADD_COURSE;
        const response= await fetch(url,{
            method: 'POST',
            body: formData
            
        });
        const json= await response.json();
        if(!response.ok){
            const {errors} =json;
            setError(errors.join(', '));
        }
        else{
            setName('');
            setDescription('');
            setPrice('');
            setImage('');
            setTeacherId('');
            setTeacherName('');
            setCourseDuration('');
            navigate('/displayCourse');
        }
    }

    const findTeacherId=(e)=>{
        const selectedTeacherName = e.target.value;
        setTeacherName(selectedTeacherName);
        const selectTeacher=teacherDetails.find((info)=>{
            return  (info.firstName + ' ' + info.lastName) === selectedTeacherName;
        })
        if(selectTeacher){
            setTeacherId(selectTeacher._id);
            
        }
    }
  return (
    <>
    <div className="container">
        <div className="d-flex justify-content-center">
        <h5> Add Course: </h5>
        </div>
        <div className="card " >
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
            <input type="text" placeholder='course name' className='form-control my-2 mx-5' style={{ width: "250px" }} value={name} onChange={(e) => {setName(e.target.value)}} /><br/>
            <input type="text" placeholder='course price' className='form-control my-2 ' style={{ width: "250px" }} value={price} onChange={(e) => {setPrice(e.target.value)}} /><br/>
            </div>
            <br />
            <textarea  placeholder='course description' style={{width: "600px", height:"200px"}} className='form-control'value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea><br />
            <div className="d-flex">
            
            
            <select  value={teacherName}     onChange={findTeacherId}          
            style={{ width: '400px' }} >
              <option value="" disabled>Select Teacher</option>
              {teacherDetails && teacherDetails.map((info)=>(
                <option key={info._id} value={info.firstName+ " "+ info.lastName}>{info.firstName + " "+info.lastName} ({info.courseOfTeacher})</option>
              ))}
            </select>
           
            <input type="text"  placeholder='teacherId' className='form-control mx-2' style={{ width: "300px" }}  value={teacherId}/><br/>
            </div>
            <br />
            <input type="text"  placeholder='Course Duration' className='form-control mx-2' style={{ width: "250px" }}  value={courseDuration} onChange={(e) => {setCourseDuration(e.target.value)}} /><br/>
            <label>Course Image </label><br/>
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}} /><br/>
            <button className="btn btn-success my-3"> Add Course</button>
        </form>
        </div>
        </div>
        {error && <div className='text-danger'> {error} </div>}
    </div>
    </>
  )
}

export default AddCourse;
