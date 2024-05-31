import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Remarks = () => {
  const navigate= useNavigate();
  const{id, subject}=useParams();
  const[studentID,setStudentId]=useState('');
  
  const[feedback, setFeedback]= useState('');
  const[mark, setMark]= useState('');
  const[error, setError]= useState('');

  useEffect(() => {
    const fetchAssignment= async() => {
        try{
            const url=`http://localhost:4000/api/displaySubmittedAssignment/${id}`;
            const response= await fetch(url);
            const data= await response.json();
            if(response.ok){
                setStudentId(data.studentID);
                
            }
        }
        catch(err){
            console.log(err);
        }
    }
    fetchAssignment();
},[id])

  const handleSubmit= async(e) => {
    e.preventDefault();
   
    const remark= {studentID, feedback,subject, mark };    

    try{
      const url= `http://localhost:4000/api/addRemark`;
      const response= await fetch(url, {
        method: 'POST',
        body: JSON.stringify(remark),
        headers:{
          'Content-Type': 'application/json'
        }
      })
        const json= await response.json();
        if(!response.ok){
          const {errors} =json;
          setError(errors.join(', '));
        }
        else{
          setFeedback('');
          setMark('');
          const status = 'checked';
      const niroj = { status };
      const updateUrl = `http://localhost:4000/api/updateSubmittedAssignment/${id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        body: JSON.stringify(niroj),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const updateJson = await updateResponse.json();
      if (!updateResponse.ok) {
        setError(updateJson.error);
      } else {
        navigate('/displayToTeacher');
      }
        }
    }
    catch(err){
      console.log(err);
    }
    
  }

  return (
    <>
    <div className="container">
      <h2>Add Remark</h2>
      <form onSubmit={handleSubmit}>
      <textarea className='form-control my-2' placeholder='Feedback' style={{width:"400px"}} value={feedback} onChange={(e) => setFeedback(e.target.value)} rows='10' cols='40' >
      </textarea>
      <label> Role </label><br />
       <select value={mark} onChange={(e) => { setMark(e.target.value); }} style={{ width: '300px' }}>
        <option value="" disabled>Select Grade</option>
         <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="F">F</option>
          </select><br />
      <button className="btn btn-primary"> Add </button>
      </form>
    
        {error && <div className='text-danger'> {error} </div>}
     
    </div>
    </>
  )
}

export default Remarks;
