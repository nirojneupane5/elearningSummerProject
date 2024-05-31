import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';


const PaymentDetails = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [image, setImage] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const { userId, firstName, lastName, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const url = `http://localhost:4000/api/displayCourse/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Unable to fetch course");
        }
        const data = await response.json();
        setCourseName(data.name);
        setPrice(data.price);
        setTeacherId(data.teacherId);
        setImage(data.filename);
        setTeacherName(data.teacherName);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchCourse();
  }, [id])

  const handlePayment = async () => {
    setIsAuthenticated(true);
    const status = 'pending';
    const courseId = id
    const info = { userId, status, firstName, lastName, courseId, courseName, price, teacherId };
    const url = 'http://localhost:4000/api/addPaymentRecord';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      navigate('/khalti')
    }
  };
  

  return (
    <>

      <div className="container">
        <div className="card my-2" id='card' style={{width:'500px'}}>
        <img
            src={`http://localhost:4000/CourseImage/${image}`}
            height='200px' width='395px' 
            alt=""
            className="course-image"
          />
          <div className='mx-2'>
          <h5>Course name: {courseName}</h5>
          <p><strong>price Rs:{price}</strong></p>
          <p><strong>Teacher name:{teacherName}</strong></p>
          </div>
          <div style={{ textAlign: 'right', paddingRight: '20px' }}>
          <button className="btn btn-success my-2" onClick={handlePayment} style={{ width: '200px' }}>
            Proceed to payment
          </button>
          
        </div>
        </div>
        
      </div>

    </>

  );
};
export default PaymentDetails;
