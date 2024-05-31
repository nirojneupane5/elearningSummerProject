import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewQuestion = () => {
    const navigate= useNavigate();
    const {id}= useParams();
    const urlPDF=`http://localhost:4000/QuestionUpload/${id}`;
    
    const handleClick= () => {
        navigate('/displayToStudent')
    }
  return (
    <>
    <div className="container">
        <div className="pdf-container">
            <iframe src={urlPDF} title="PDF VIEWER" width="100%" height="625px" />
        </div>
        <button className="btn btn-primary" onClick={handleClick}> Go Back </button>
    </div>
    </>
  )
}

export default ViewQuestion;
