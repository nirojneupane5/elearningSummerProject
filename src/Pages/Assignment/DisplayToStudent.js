import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DisplayToStudent = () => {
    const navigate= useNavigate();
    const{ firstName,lastName, setIsAuthenticated, userId}= useContext(AuthContext);
    const[submittedData,setSubmittedData]=useState([]);
    const[ file, setFile]= useState(null);
    const[ assignment, setAssignment]= useState([]);
    const[ error, setError]= useState('');

    const updateAssignmentStatus = (assignments) => {
      const currentDate = new Date();
      const updatedAssignments = assignments.map((assignment) => {
        const deadlineDate = new Date(assignment.deadline);
        if (currentDate > deadlineDate) {
          return { ...assignment, status: 'Expired' };
        }return assignment;
      });
      return updatedAssignments;
    };
    useEffect(() => {
        const fetchAssignment= async() => {
            try{
                const url= `http://localhost:4000/api/displayToStudent`;
                const response= await fetch(url);
                if(!response.ok){
                    setError('Unable to fetch assignment');
                }
                
                const data= await response.json();
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const assignmentsWithStatus = updateAssignmentStatus(data);
                setAssignment(assignmentsWithStatus);
                
                }
            catch(err){
                console.log(err);
            }
        }
        fetchAssignment();
    })
    //Fetch submitted assignment
    useEffect(() => {
      const fetchAssignment= async() => {
          try{
              const url= `http://localhost:4000/api/displayToTeacher`;
              const response= await fetch(url);
              if(!response.ok){
                  setError('Unable to fetch assignment');
              }
              
              const data= await response.json(); 
             
                setSubmittedData(data);
              

              }
          catch(err){
              console.log(err);
          }
      }
      fetchAssignment();
  })

    const handleClick= async(e,assignmentId,subject) => {
        e.preventDefault();
      
        const formData= new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('studentID', userId);
        formData.append('subject', subject);
        formData.append('assignmentId', assignmentId);
        formData.append('file', file);

        try{
            const url= `http://localhost:4000/api/submitAssignment`;
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
                setFile(null);
                setIsAuthenticated(true);
                navigate('/');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleView= (id) =>{
        navigate(`/viewQuestion/${id}`)
    }

    const formatDateTime = (dateTimeString) => {
        const deadlineDate = new Date(dateTimeString);
        const formattedDate = deadlineDate.toLocaleDateString();
        const formattedTime = deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${formattedDate} ${formattedTime}`;
      };
    
  const handleSlider =() => {
    navigate('/assignmentStatus')
  }
  const submitData=(id)=>{
    const dataInfo=!!submittedData.some((info)=>info.assignmentId===id && info.studentID===userId);
    if(dataInfo){
      return dataInfo;
    }
  }
  return (
    <>
    <div className="container">
      <button className="btn btn-primary" onClick={handleSlider}>Submitted Assignment</button>
      {assignment && assignment.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Instruction</th>
              <th>Deadline</th>
              <th>Task</th>
              <th>Upload your work</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignment.map((assignments) => (
              <tr key={assignments._id}>
                <td>{assignments.title}</td>
                <td>{assignments.subject}</td>
                <td>{assignments.description}</td>
                <td className='text-danger'>{formatDateTime(assignments.deadline)}</td>
                <td>
                  
                    <button className="btn btn-primary" style={{ width: '100px' }} onClick={() => handleView(assignments.filename)}>View Question </button>
                  
                </td>
                <td>
                 {submitData(assignments._id)?(
                  <b className='text-success'>Already submitted</b>
                 ):(
                  <div>
                    <label className='my-2'></label>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                 )}
                  </td>
                  <td>
                  {assignments.status==='Expired'?(
                 <b className='text-danger'>Already expired</b>
               ): submitData(assignments._id)?(
                <b className='text-success'>Already submitted</b>
               ):(
                <button
                 className="btn btn-primary my-2"
                 style={{ width: '100px' }}
                 onClick={(e) => handleClick(e,assignments._id,assignments.subject)} >
                 Submit
               </button>
               )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div className='text-danger'>{error}</div>}
    </div>
  </>
  )
}

export default DisplayToStudent;