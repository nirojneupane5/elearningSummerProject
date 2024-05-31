import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const ViewPDF = () => {
    const navigate= useNavigate();
    const {id}= useParams();
    const urlPDF= `http://localhost:4000/AssignmentUpload/${id}`;

    const handleClick =() => {
        navigate('/displayToTeacher')
    }

  return (
    <>
    <div className="container">
        <iframe src={urlPDF} title='PDF VIEWER' width="100%" height="675px" />
    </div>
    <button className="btn btn-primary" onClick={handleClick}> Go Back </button>
    </>
  )
}

export default ViewPDF;
