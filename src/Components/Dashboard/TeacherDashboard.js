import React,{useState} from 'react'
import './AdminDashboard.css';
import AssignmentDisplayTeacher from '../../Pages/Assignment/AssignmentDisplayTeacher';
import MyCalendar from '../../Pages/Calendar/MyCalendar';
import DisplayToTeacher from '../../Pages/Assignment/DisplayToTeacher';
import { RiBookReadFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { BsFillClipboardPlusFill } from "react-icons/bs";
const TeacherDashbaord = () => {
  const[categoryData,setCategoryData]=useState('')

  const handleClick=(category)=>{
    setCategoryData(category);
  }
  return (
    <div className="container-fluid" id='main'>
        <div className="row">
        <div className="col-md-2 align-item-center" id='admin-sidebar'>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Assignment')}>
          <BsFillClipboardPlusFill/>Assignment</button>
        <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('SubmittedAssignment')}>
          <RiBookReadFill/> Submitted Assignment</button>
          <button className="btn btn-primary  w-100 border-0" id='admin-button'onClick={()=>handleClick('Calender')}>
          <SlCalender/> Calender</button>
        </div>
        <div className="col-md-10" id='body'>
          {categoryData && (
            <>
            <div>{categoryData==='Assignment' && <AssignmentDisplayTeacher/>}</div>
            <div>{categoryData==='SubmittedAssignment' && <DisplayToTeacher/>}</div>
            <div>{categoryData==='Calender' && <MyCalendar/>}</div>
            </>
          )}
        </div>
        </div>
    </div>
  )
}
export default TeacherDashbaord;