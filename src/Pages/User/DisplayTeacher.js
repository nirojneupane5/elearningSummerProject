import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FcOk } from "react-icons/fc";
import { FaTimesCircle } from "react-icons/fa";
 const DisplayTeacher = () => {
  const navigate=useNavigate();
    const[userDetails,setUserDetails]=useState([]);
    useEffect(()=>{
        const fetchPayment=async()=>{
          const url='http://localhost:4000/api/displayAllUser';
            const response=await fetch(url);
            const data=await response.json();
            if(response.ok){
            const userInfo=data.filter((item)=>item.role==='teacher');
            if(userInfo){
                setUserDetails(userInfo);
            }
            }
        }
        fetchPayment();
    },[])
    
    const handleDelete= async(_id) => {
      try{
          const url= `${process.env.REACT_APP_DELETE_USER}/${_id}`;
          const response= await fetch(url, {
              method: 'DELETE'
          })

          if(response.ok){
              setUserDetails(prevUser => prevUser.filter(user => user._id !== _id));
          }
      }
  catch(error){
          console.log(error);
  }
  }

  const handleUpdate=async(id)=>{
    navigate(`updateTeacher/${id}`)
  }
    
    
  return (
    <div className="container">
    <table className="table">
    <thead style={{backgroundColor:'#000000',color:'white'}}>
        <tr>
        <th scope="col">TeacherId</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Course</th>
        <th scope="col">Status</th>
        <th scope="col">Contact</th>
        <th scope="col">Action</th>
        </tr>
    </thead>
    {userDetails && userDetails.map((users,index) => (
        <tbody key={users._id} style={{backgroundColor:index%2===0?'#f2f2f2':'#ffffff'}}>
        <tr>
            <td> {users._id} </td>
            <td> {users.firstName} </td>
            <td> {users.lastName} </td>
            <td> {users.courseOfTeacher} </td>
            <td> {users.courseId  ?(<><FcOk/>Teaching</>):(<><FaTimesCircle/>Not Teaching</>)} </td>
            <td> {users.contactNumber} </td>
            <td>
            <button className="btn btn-danger mx-2" onClick={()=>{handleDelete(users._id)}}>Delete</button>
              <button className="btn btn-primary" onClick={()=>{handleUpdate(users._id)}}>Update</button>
            </td>
         </tr> 
        </tbody>
    ))}
    </table>

    </div>
  )
}
export default DisplayTeacher;