import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate= useNavigate('');
    const {id}= useParams();

    const[firstName, setFirstname]= useState('');
    const[lastName, setLastname]= useState('');
    const[image, setImage]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchUser= async() => {
            try{
                const url= `http://localhost:4000/api/displaySingleUser/${id}`;
                const response= await fetch(url);

                if(!response.ok){
                    setError( 'Unable to fetch user');
                }
                const data= await response.json();
                setFirstname(data.firstName);
                setLastname(data.lastName);
                setImage(data.filename);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    //update user profile
    const handleSubmit= async(e) => {
        e.preventDefault();
        const formData= new FormData();

        formData.append('username', firstName);
        formData.append('email', lastName);
        if(image) {
            formData.append('image', image);
        }
        
        const url= `http://localhost:4000/api/updateUser/${id}`;
        const response= await fetch(url, {
            method: 'PATCH',
            body: formData
        })
        const json= await response.json();
        if(!response.ok){
            setError(json.error);
        }
        else{
            setFirstname('');
            setLastname('');
            navigate('/myProfile');
        }
    }
  return (
    <>
    <div className="container my-3">
    <div className='d-flex justify-content-center'>
        
            <h4 className='text-center'>Update your Information</h4>
    </div>
    <div className="d-flex justify-content-center">
    <form  onSubmit={handleSubmit}>
    <label> Fistname </label>
    <input type='text'  className='form-control' value={firstName} onChange={(e) => setFirstname(e.target.value)} />
    <label > Lastname </label>
    <input type='text'  className='form-control' value={lastName} onChange={(e) => setLastname(e.target.value)} />
    <label >Profile Picture</label>
    <input type='file' className='form-control' onChange={(e) => setImage(e.target.files[0])}/>
    <div className='d-flex justify-content-center'>
    <button className="btn btn-success my-1"> Update </button>
    </div>
    </form>
    <div>
        {error && <div className='text-danger'> {error} </div>}
    </div>
    </div>
    </div>
    </>
  )
}

export default UpdateProfile;
