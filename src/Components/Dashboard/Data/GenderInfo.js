import React, { useEffect, useState } from 'react';
import GenderGraph from './GenderGraph';
import StudentBar from './StudentChart';
import { FaUserCheck,FaMoneyCheckDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { FcRating } from "react-icons/fc";



const GenderInfo = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const [paidStudent, setPaidStudent] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [review, setReview] = useState(0);
  //Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      const url = 'http://localhost:4000/api/displayAllUser';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const maleCounts = data.filter((item) => item.gender === 'male' && item.role === 'student').length;
          const femaleCounts = data.filter((item) => item.gender === 'female' && item.role === 'student').length;
          const otherCounts = data.filter((item) => item.gender === 'others' && item.role === 'student').length;
          const teacherCounts = data.filter((item) => item.role === 'teacher').length;
          setMaleCount(maleCounts);
          setFemaleCount(femaleCounts);
          setOthersCount(otherCounts);
          setTeacherCount(teacherCounts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);
  //Fetch paid student
  useEffect(() => {
    const fetchUser = async () => {
      const url = 'http://localhost:4000/api/displayPayment';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          const studentCount = data.filter((item) => item.status === 'success').length;
          const totalPrice=data.reduce((acc,product)=>acc+product.price,0);
          setPayment(totalPrice);
          setPaidStudent(studentCount);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);

  //Display course
  useEffect(() => {
    const fetchUser = async () => {
      const url = 'http://localhost:4000/api/displayCourse';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();


          setCourseCount(data.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);

  //Rating
  useEffect(() => {
    const fetchUser = async () => {
      const url = 'http://localhost:4000/api/displayReview';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();


          setReview(data.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);

  const genderCounts = {
    male: maleCount,
    female: femaleCount,
    othersCount: othersCount, // Use othersCount here
  };

  const studentDetails = {
    paidStudent: paidStudent,
    unpaidStudent: maleCount + femaleCount + othersCount - paidStudent
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-5" style={{ width: '28%' }}>
            <GenderGraph genderCounts={genderCounts} />
          </div>
          <div className="col-md-6">
            <StudentBar studentDetails={studentDetails} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex">
              <div className="card my-2 mx-2" style={{
                width: '350px', height: '75px', textAlign: 'center',
                backgroundColor: '#FFB000', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '40px', color: 'white'
              }}>
                <span ><FaUserCheck />Enroll Student:{paidStudent}</span>
              </div>
              <div className="card my-2 mx-2" style={{
                width: '350px', height: '75px', textAlign: 'center',
                background: '#279EFF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '50px', color: 'white'
              }}>
                <span ><FaUserTie />Teacher: {teacherCount}</span>
              </div>
              <div className="card my-2 " style={{
                width: '350px', height: '75px', textAlign: 'center',
                background: '#C70039', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '50px', color: 'white'
              }}>
                <span ><BiBook /> Course: {courseCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex">
            <div className="card my-2 mx-4 " style={{
                width: '500px', height: '75px', textAlign: 'center',
                background: 'linear-gradient(90deg, rgba(30,217,8,1) 45%, rgba(20,22,1,1) 88%)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '50px', color: 'white'
              }}>
                <span ><FaMoneyCheckDollar/>Revenue:Rs {payment}</span>
              </div>
              <div className="card my-2 " style={{
                width: '500px', height: '75px', textAlign: 'center',
                background: '#0D1282', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '50px', color: 'white'
              }}>
                <span ><FcRating/>Course Rating: {review}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default GenderInfo;