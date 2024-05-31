import React,{useState} from 'react'
import './AdminDashboard.css';
import DisplayTeacher from '../../Pages/User/DisplayTeacher';
import AdminPaymentView from '../../Pages/Payment/AdminPaymentView';
import DisplayStudent from '../../Pages/User/DisplayStudent';
import AdminApproval from '../../Pages/Authentication/AdminApproval';
import MyCalendar from '../../Pages/Calendar/MyCalendar';
import DisplayAllEvent from '../../Pages/Calendar/DisplayAllEvent';
import DisplayCourse from '../../Pages/Course/DisplayCourse';
import AdminHome from './AdminHome';
import { FaUserGraduate } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { BiSolidCalendar,BiSolidBook } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";

const AdminDashboard = () => {
  const[categoryData,setCategoryData]=useState('Home')

  const handleClick=(category)=>{
    setCategoryData(category);
  }
  return (
    <div className="container-fluid" id='main'>
        <div className="row">
        <div className="col-md-2 align-item-center" id='admin-sidebar'>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Home')}>
         <BsFillInfoCircleFill/> Info</button>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Approval')}>
          <FcApproval/> Approve User</button>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('EnrolledStudent')}>
          <FaUserGraduate/> Enrolled Student</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Student')}>
          <i className="fa-solid fa-people-group fa-lg"></i> View Student</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Teacher')}>
          <i className="fa-solid fa-users"></i> View Teacher</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Calender')}>
          <SlCalender/> Calender</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Event')}>
          <BiSolidCalendar/> Event</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Course')}>
          <BiSolidBook/> Course</button>
        </div>
        <div className="col-md-10" id='body'>
          {categoryData && (
            <>
            <div>{categoryData==='Home' && <AdminHome/>}</div>
            <div>{categoryData==='Teacher' && <DisplayTeacher/>}</div>
            <div>{categoryData==='EnrolledStudent' && <AdminPaymentView/>}</div>
            <div>{categoryData==='Student' && <DisplayStudent/>}</div>
            <div>{categoryData==='Approval' && <AdminApproval/>}</div>
            <div>{categoryData==='Calender' && <MyCalendar/>}</div>
            <div>{categoryData==='Event' && <DisplayAllEvent/>}</div>
            <div>{categoryData==='Course' && <DisplayCourse/>}</div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}
export default AdminDashboard;