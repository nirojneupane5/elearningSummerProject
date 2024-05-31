import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAssignment = () => {
    const navigate= useNavigate();
    const {id}= useParams();

    const[title, setTitle]= useState('');
    const[description, setDescription]= useState('');
    const[deadline, setDeadline]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchAssignment= async() => {
          try{
            const url= `http://localhost:4000/api/displaySingleAssignment/${id}`
            const response= await fetch(url);
            const data= await response.json();
            if(response.ok){
                setTitle(data.title);
                setDescription(data.description);

                const formattedDeadline = new Date(data.deadline).toISOString().slice(0, 16);
                setDeadline(formattedDeadline);
            }
          }
          catch(err){
            console.log(err)
          }
        }
        fetchAssignment();
      },[id])

      const handleSubmit= async(e) => {
        e.preventDefault();

        const assignment= {title, description, deadline};
        const url= `http://localhost:4000/api/updateAssignment/${id}`;
        const response= await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(assignment),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json();
        if(!response.ok){
            setError(json.error)
        }
        else{
            setTitle('');
            setDescription('');
            setDeadline('');
            navigate('/displayAssignmentTeacher')
        } 
      }

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <label> Title</label><br/>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
            <label> Description</label><br/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br/>
            <label> Deadline</label><br/>
            <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br/>
            <button className="btn btn-primary my-2"> Update </button>
        </form>
        <div>
            {error && <div> {error} </div>}
        </div>
    </div>
    
  )
}

export default UpdateAssignment;

