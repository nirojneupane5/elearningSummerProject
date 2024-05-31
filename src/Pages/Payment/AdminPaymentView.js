import React,{useState,useEffect} from 'react'
import useFetch from '../../Components/CustomHooks/FetchPayment';

 const AdminPaymentView = () => {
  const [enrolledStudnet,setEnrolledStudent]=useState([]);
    const {paymentData,loading}=useFetch("http://localhost:4000/api/displayPayment");
    useEffect(() => {
      if (!loading) {
        const userPayment = paymentData.filter((item) => item.status === 'success');
        setEnrolledStudent(userPayment);
      }
    }, [paymentData, loading]);
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div className="container">
      <table className="table">
        <thead style={{backgroundColor:'#000000',color:'white'}}>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Course Enrolled</th>
            <th scope="col">Price</th>
            <th scope="col">Payment Status</th>
          </tr>
        </thead>
        {enrolledStudnet && enrolledStudnet.map((info,index) => (
          <tbody key={info._id} style={{backgroundColor:index%2===0?'#f2f2f2':'#ffffff'}}>
            <tr>
              <td> {info.firstName} </td>
              <td> {info.lastName} </td>
              <td> {info.courseName} </td>
              <td> {info.price} </td>
              <td> {info.status} </td> 
            </tr>
          </tbody>
        ))}
      </table>

    </div>
  )
}
export default AdminPaymentView;