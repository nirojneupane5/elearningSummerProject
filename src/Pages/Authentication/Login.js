import React , { useState, useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import PaidContext from '../../Context/PaidContext';


const Login = () => {
    const {setIsAuthenticated}= useContext(AuthContext);
    const {setLoginStatus}=useContext(PaidContext);
    const navigate= useNavigate();

    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[error, setError]= useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData={email, password};
        
        const url= process.env.REACT_APP_LOGIN;
        const response= await fetch(url,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json();
        if(!response.ok)
        {
            setError(json.msg);
        }
        else{
            localStorage.setItem('token', json.accessToken);
            setEmail('');
            setPassword('');
            window.alert("Login successful");
            navigate('/');
            setIsAuthenticated(true);
            setLoginStatus(true);
        }
    }
    
    const handleClick= () => {
        navigate('/signUp')
    };
  return (
    <>
    <body style={{margin: 0, padding: 0, overflow: 'hidden',minHeight: '100vh',
        background:'linear-gradient(90deg, rgba(75,124,135,1) 25%, rgba(2,0,36,1) 86%)'}}>
    <div className="container">
    <div className="row justify-content-center">
            <div className="card my-2" style={{width: '400px',color:'white',background:'linear-gradient(90deg, rgba(75,124,135,1) 25%, rgba(2,0,36,1) 86%)'}}>
            
            <div className='d-flex justify-content-center'>
            <h2>Login Form</h2>
            </div>
            
            <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Email' className='form-control' style={{width:"350px"}} value={email} onChange={(e) => {setEmail(e.target.value)}} /><br/>
            <input type="password" placeholder='Password' className='form-control' style={{width:"350px"}} value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
            
            <div className='d-flex justify-content-center'>
            <button className="btn btn-primary my-2">Log In</button> <br/>
            </div>
            <hr />
            
            <div className='d-flex justify-content-center'>
            <button className="btn btn-success" onClick={handleClick}> Create new account</button>
            </div>
            <hr />
            </form>
            </div>
            
        <div className='d-flex justify-content-center'> 
            {error && <div > {error} </div>}
            </div>
        </div>
            
        </div>
    </div>
    </body>
    
    </>
  )
}
export default Login;
