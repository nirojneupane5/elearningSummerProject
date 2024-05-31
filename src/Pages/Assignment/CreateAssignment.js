import React, {useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';


 const CreateAssignment = () => {
    const {userId,setIsAuthenticated}=useContext(AuthContext);
    const navigate= useNavigate();

    const[title, setTitle]= useState('');
    const[description, setDescription]= useState('');
    const[subject, setSubject]= useState('');
    const[deadline, setDeadline]= useState('');
    const[file, setFile]= useState('');
    const[error, setError]= useState('');
   
    
    const handleSubmit= async(e) => {
        e.preventDefault();
        setIsAuthenticated(true);
        const currentDate = new Date().toISOString().split('T')[0];
         if (deadline < currentDate) {
            setError('Assignment deadline must be today or a future date.');
             return;
            }

        const teacherId=userId;
        const formData= new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('deadline', deadline);
        formData.append('teacherId', teacherId);
        try{
            const url= `http://localhost:4000/api/createAssignment`;
            const response= await fetch(url, {
                method: 'POST',
                body: formData
            })
            const json= await response.json();
            if(!response.ok){
                const {errors} =json;
                setError(errors.join(', '));
            }
            else{
                setTitle('');
                setSubject('');
                setDescription('');
                setDeadline('');
                setFile('');
                navigate('/displayAssignmentTeacher');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
  return (
    <>
    <div className="container my-3">
        <h2 className="d-flex justify-content-center" > Create Assignment</h2>
        <div className="card">
        <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
            <input type="text" placeholder='Title' className='form-control mx-2 my-2' style={{width:"350px"}} value={title} onChange={(e) => {setTitle(e.target.value)}} /><br/>
            <input type="text" placeholder='Subject' className='form-control my-2' style={{width:"350px"}} value={subject} onChange={(e) => {setSubject(e.target.value)}} /><br/>
            </div>
            <br />
            <textarea className='form-control' placeholder='Description' style={{width: "600px", height:"200px"}} value={description} onChange={(e) => {setDescription(e.target.value)}}>
            </textarea>
            <label><b> Set Deadline </b></label><br/>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br/>
            <br />
            <label><b> Upload PDF </b></label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} /><br />        
            <div className='d-flex justify-content-center'>
            <button className="btn btn-success my-2">Create Assignment</button>
            </div>
            
    </form>
    </div>
    <div className="d-flex justify-content-center">
        {error && <div className='text-danger'> {error} </div>}
    </div>
        </div>
    </div>
    </>
  )
}
export default CreateAssignment;
   