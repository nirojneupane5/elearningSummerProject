import React, { useEffect, useState } from 'react';

const AdminApproval = () => {

  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const fetchPendingUser = async () => {
      const url = 'http://localhost:4000/api/displayPendingUser';
      const response = await fetch(url);
      const data = await response.json();
      if (response.json) {
        setPendingData(data);
      }
    }
    fetchPendingUser()
  })

  const handleApprove = async (_id) => {
    try {
      const userData = pendingData.find(info => info._id === _id);
      const url = 'http://localhost:4000/api/signUp';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error)
      }
      else {
        console.log('User signUp')
      }
    } catch (error) {
      console.log(error)
    }
    const url = `http://localhost:4000/api/deleteAcceptedUser/${_id}`
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (response.ok) {
      setPendingData(prevUser => prevUser.filter(user => user._id !== _id));
    }
  }
  const handleReject = async (_id) => {
    try {
      const userData = pendingData.find(info => info._id === _id);
      const url = 'http://localhost:4000/api/addRejectedUser';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }

      })
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error)
      }
      else {
        console.log('User rejected')
      }
      
    } catch (error) {
      console.log(error)
    }
    const url = `http://localhost:4000/api/deleteRejectedUser/${_id}`
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (response.ok) {
      setPendingData(prevUser => prevUser.filter(user => user._id !== _id));
    }
  }
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {pendingData && pendingData.map((info) => (
          <tbody key={info._id}>
            <tr>
              <td> {info.firstName} </td>
              <td> {info.lastName} </td>
              <td> {info.email} </td>
              <td> {info.role} </td>
              <td>
                <button className="btn btn-success" onClick={() => handleApprove(info._id)}>Approve</button>
                <button className="btn btn-danger mx-2" onClick={() => handleReject(info._id)}>Reject</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

    </div>
  )
}
export default AdminApproval;
