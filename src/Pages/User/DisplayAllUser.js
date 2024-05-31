import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayAllUser = () => { 
    const navigate= useNavigate(); 
    const[user, setUser]= useState([]);
        
    useEffect(() => {
        const fetchUser= async() => {
            try{
                const url= process.env.REACT_APP_DISPLAY_ALLUSER;
                const response= await fetch(url);
                const data= await response.json();

                if(response.ok){
                    setUser(data);
                }
            }
            catch(err){
                console.log(err);
            }
            
        }
        fetchUser();
    }, []);

    const handleDelete= async(_id) => {
        try{
            const url= `${process.env.REACT_APP_DELETE_USER}/${_id}`;
            const response= await fetch(url, {
                method: 'DELETE'
            })

            if(response.ok){
                setUser(prevUser => prevUser.filter(user => user._id !== _id));
            }
        }
    catch(error){
            console.log(error);
    }
    }
   
    const handleEdit= (id) => {
        navigate(`/editUser/${id}`);
    }

  return (
    <>
    <div className="container">
    <table className="table">
    <thead>
        <tr>
        <th scope="col">id</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Action</th>
        </tr>
    </thead>
    {user && user.map((users) => (
        <tbody key={users._id}>
        <tr>
            <td> {users._id} </td>
            <td> {users.username} </td>
            <td> {users.email} </td>
            <td> {users.role} </td>
            <td>
                <button className="btn btn-primary" onClick={() => handleEdit(users._id)}>Edit</button>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(users._id)}>Delete</button>
            </td>
         </tr> 
        </tbody>
    ))}
    </table>
    </div>
    </>
  )
}

export default DisplayAllUser;


