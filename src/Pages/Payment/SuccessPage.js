import React,{useEffect,useState,useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import {useNavigate}from 'react-router-dom';

const SuccessPage = () => {
  const navigate=useNavigate();
  const {userId,setIsAuthenticated}=useContext(AuthContext);
  const[id,setId]=useState('');
  const[name,setName]=useState('');
  const[lname,setLName]=useState('');
  const[course,setCourse]=useState('');
  const[price,setPrice]=useState('');

  
  useEffect(()=>{
    const url=`http://localhost:4000/api/displayPayment`;
    const displayPayment=async()=>{
      const response=await fetch(url)
      const data=await response.json();
      if(response.ok){
        setIsAuthenticated(true);
        const userPayment = data.find(item => item.userId === userId && item.status === 'pending');
          if(userPayment){
            setId(userPayment._id);
            setName(userPayment.firstName);
            setLName(userPayment.lastName);
            setCourse(userPayment.courseName);
            setPrice(userPayment.price);
          }
      }
    }
    displayPayment();
  },[setIsAuthenticated,userId]);
  

  useEffect(()=>{
    if(id){
      const status="success";
      const ansa ={status};
    const updatePayment=async()=>{
      const url=`http://localhost:4000/api/updatePayment/${id}`;
      const response=await fetch(url,{
        method:'PATCH',
        body:JSON.stringify(ansa),
        headers:{
          'Content-Type':'application/json'
        }  
      })
      const json=await response.json();
      if(response.ok){
        console.log('Payment successful',json);
      }
    }
    updatePayment();

    }
  },[id, userId])

  const homePage=()=>{
    navigate('/');
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
    <h1>Payment Successful</h1>
    <button className="btn btn-primary" onClick={homePage}>Home page</button>
    
    <div className="card" style={{border:'2px solid black'}}>
        <div className="border-top-2"></div>
          <div className="row">
            <div className="col mx-2"><b>Bill no: {id}</b></div>
            <div className="col" style={{ textAlign: 'right', marginRight:'100px' }}>
            <b>Date: {currentDate}</b>
            </div>
          </div>
          <div className="row">
            <div className="col  text-center">
              <b>EduTech Solution</b><br />
              <b>Suryabinayak, Bhakatapur</b>
            </div>
          </div>
          <div className="row"  style={{borderBottom:'2px solid black'}}>
            <div className="col mx-2">
              <b> Student Name: {name} {lname} </b><br />
              <b> Course Name: {course} </b><br />
              
            </div>
          </div>
          <div className="row">

          <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>SN</b><br />
              
          </div>
          <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>Particulars</b><br />
              
          </div>
          <div className="col text-center">
              <b>Amount(Rs): </b><br />
              
          </div>
          </div>

          <div className="row" style={{borderTop:'2px solid black'}}>

          <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>1</b><br />
              
          </div>
          <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>Student Fee</b><br />
              
          </div>
          <div className="col text-center">
              <b>{price} </b><br />
              
          </div>
          </div>

         <div>
         <div className="row" style={{borderTop:'2px solid black'}}>
         
         <div className="col" style={{ textAlign: 'right', marginRight:'165px' }} >
              <b>Grand Total:Rs {price}  </b>
            </div>
          </div>
         </div>
        </div>

    </>
  );
};

export default SuccessPage;