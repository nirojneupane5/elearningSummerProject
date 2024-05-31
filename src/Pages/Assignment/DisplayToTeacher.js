import React, {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';


const DisplayToTeacher = () => {
    const navigate= useNavigate();
    const[display, setDisplay]= useState([]);
    
    
    useEffect(() => {
        const fetchAssignment= async() => {
            try{
                const url=`http://localhost:4000/api/displayToTeacher`;
                const response= await fetch(url);
                const data= await response.json();

                if(response.ok){
                    setDisplay(data);
                    
                }
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAssignment();
    })

    const handleClick= (id) => {
        navigate(`/viewPDF/${id}`)
    }

    const handleRemark= (id, subject) => {
        navigate(`/remarks/${id}/${subject}`)
    }
    
  return (
    <>
    <div className="container">
    <table className="table table-hover ">
    <thead style={{backgroundColor:'#9400FF',color:'white'}}>
    <tr>
      <th scope="col">FName</th>
      <th scope="col">LName</th>
      <th scope="col">Subject</th>
      <th scope="col">Assignment</th>
      <th scope="col">Status</th>
      <th scope="col">Add remark</th>
    </tr>
    </thead>
    <tbody>
        {display && display.map((displays) =>  (
            <tr key={displays._id}>
            <td> {displays.firstName} </td>
            <td> {displays.lastName} </td>
            <td> {displays.subject} </td>
            <td> {displays.status} </td>
            <td> 
            <button className="btn btn-primary"onClick={() => handleClick(displays.filename)} >View Assignment </button>
            </td>
            <td>
                {displays.status!=='checked'?(
                    <button className="btn btn-primary mx-2"onClick={() => handleRemark(displays._id, displays.subject)} > Add Remarks </button>
                ):(
                    <div>
                        <h6>Already checked</h6>
                    </div>
                )}
              
            </td>
          </tr>
        ))}
    </tbody>
    </table>
    </div>
    </>
  )
}

export default DisplayToTeacher;
