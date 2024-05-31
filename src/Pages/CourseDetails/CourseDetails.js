import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Star from '../Rating/Star';
import AuthContext from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DisplayStar from '../Rating/DisplayStar';

const CourseDetails = () => {
  const navigate=useNavigate();
  const { firstName } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [duration, setDuration] = useState('');
  const [ratingData, setRatingData] = useState([]);
  const { id } = useParams();
  const productId = id;

   // Define the fetchRating function
   const fetchRating = async () => {
    try {
      const url = 'http://localhost:4000/api/displayReview';
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingData(data);
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching rating:', error);
    }
  };
  useEffect(()=>{
    fetchRating();
  })

  useEffect(() => {
    const fetchCourse = async () => {
      const url = `http://localhost:4000/api/displayCourse/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.filename);
        setDuration(data.courseDuration);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchReview = async () => {
      const url = "http://localhost:4000/api/displayReview";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRatingInfo(data);
      }
    };
    fetchReview();
  }, [])
  const [ratingInfo, setRatingInfo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { productId, rating, comment, firstName };
    const url = 'http://localhost:4000/api/addReview';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setRating(0);
      setComment('');
      fetchRating();
    }
  };

 

  const handleClick=()=>{
    navigate(`/paymentDetails/${id}`)
  }

  const courseRatings = ratingInfo.filter((info) => info.productId === id);
            // Calculate average rating for the current course
  const totalRating = courseRatings.reduce((sum, info) => sum + info.rating, 0);

  const averageRating = courseRatings.length > 0 ? totalRating / courseRatings.length : 0;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <h4 className="mb-3">Course Details</h4>
          <img  src={`http://localhost:4000/CourseImage/${image}`}  height='300px' width='400px'  alt="" />
          </div>
          <div className="col-md-6" style={{marginTop:'50px'}}>
          <b>Course name:</b> {name} <br />
          <p style={{color:'blue'}}> <strong >Price: Rs {price}</strong> </p>
          <div className="d-flex">
          <DisplayStar star={averageRating} />
          <p className='mx-5'>Reviews: {courseRatings.length}</p>
          </div>
          <button className=" mx-2" id='btn-2' style={{height:'40px'}} onClick={handleClick}>Purchase Course</button>
          </div>
           <div style={{textAlign:'justify',textJustify:'inner-word'}} >
           <b>Description:</b> {description}
           </div>
            
           <p> <strong>Course Duration: </strong>{duration}</p>
            {error && <div className="error">{error}</div>}
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Leave a Review</h4>
          <form onSubmit={handleSubmit}>
            <div className="rating">
              <p>Rating:</p>
              <Star stars={rating} onStarClick={setRating} />
            </div>
            <textarea
              placeholder="Review"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-primary mt-2">Submit Review</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Comments</h4>
          <div className="comments">
            {ratingData.map((info) => info.productId===id? (
              <div key={info._id} className="comment">
                <div className='d-flex'>
                <div className='text-primary'> <b>{info.firstName}</b></div>
                <div > : {info.comment}</div>
                </div>
              </div>
            ):null)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
