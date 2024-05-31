import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

const MyCalendar = () => {
  const[date, setDate]= useState(new Date());
  const[event, setEvent]= useState([]);

  useEffect(() => {
    const fetchEvent= async() => {
      
      try{
        const url=`http://localhost:4000/api/displayAllEvent`;
        const response= await fetch(url);
        const data= await response.json();

        if(response.ok){
          const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          const filteredEvents = data.filter((eventData) => {
            const eventDate = new Date(eventData.event);
            return eventDate >= currentDate;

          });
          filteredEvents.sort((a,b) => new Date(a.event) - new Date(b.event));
          setEvent(filteredEvents);
        }

      }
      catch(err){
        console.log(err)
      }
    }
    fetchEvent();
  })

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (date.getDay() === 0) {
        const eventForDate = event.find((eventData) => {
          const eventDate = new Date(eventData.event);
          return (
            eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
          );
        });
  
        if (eventForDate) {
          if(eventForDate.title==='Holiday'){
            return 'holiday'
          }
          else if(eventForDate.title==='ECA'){
            return 'eca'
          }
          else if(eventForDate.title==='Exam'){
            return 'exam'
          }
          
        } else {
          return 'sunday';
        }
      }
  
      const eventForDate= event.find((eventData) => {
        const eventDate= new Date(eventData.event);
    
        return(
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      })
    
        if(eventForDate && eventForDate.title === 'Holiday'){
          return 'holiday';
        }

        else if(eventForDate && eventForDate.title === 'Exam'){
          return 'exam';
        }

        else if(eventForDate && eventForDate.title === 'ECA'){
          return 'eca';
        }
      
      }
      return null;
    }
    


  const getEventColor=(option) => {
    if(option === "Holiday"){
      return 'red'
    }
    else if(option === "Exam"){
      return 'blue'
    }
    else if(option === "ECA"){
      return 'green'
    }
    else{
      return 'black';
    }
  }

  return (
    <>
    <div className="container">
      <div className="d-flex justify-content-center">
      <Calendar value={date} onChange={setDate} calendarType='US' tileClassName= {tileClassName} showNeighboringMonth={false} />
      </div>
    <h2 className='text-center my-3'> Upcoming Events </h2>
      <table className="table">
        <thead>
        <tr>
          <th scope="col"> Date </th>
          <th scope="col"> Event </th>
          <th scope="col"> Description </th>
        </tr>
      </thead>
      <tbody>
        {event && event.map((eventData) => (
          <tr key={eventData._id}>
            <td style={{color: getEventColor(eventData.title)}}> {new Date(eventData.event).toLocaleDateString()} </td>
            <td style={{color: getEventColor(eventData.title)}}> {eventData.title} </td>
            <td style={{color: getEventColor(eventData.title)}}> {eventData.description} </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>

    </>
  )
}

export default MyCalendar;
