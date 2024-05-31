import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [courseOfTeacher, setCourseOfTeacher] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('middleName', middleName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('image', image);
        formData.append('gender', gender);
        formData.append('courseOfTeacher', courseOfTeacher);
        formData.append('contactNumber', contactNumber);

        const url = process.env.REACT_APP_SIGNUP;
        const response = await fetch(url, {
            method: 'POST',
            body: formData

        });
        const json = await response.json();

        if (!response.ok) {
            const { errors } = json;
            if (errors.includes("Email already exists, Please wait for approval")) {
                setError("Email already exists, Please wait for approval")
            }
            else {
                setError(errors.join(', '));
            }
        }
        else {
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRole('');
            setContactNumber('');
            setCourseOfTeacher('');
            setGender('');
            window.alert("SignUp successful");
            setImage('');
            navigate('/logIn')
        }
    }
    const renderSignUpForm=()=>{
        if(role==='teacher'){
            return(
                <div>
                    <br />
                    <input type="text" placeholder='Course Name' className='form-control' style={{ width: "250px" }} value={courseOfTeacher} onChange={(e) => { setCourseOfTeacher(e.target.value) }} />
                </div>
            )
        }
        return null;
    }
    return (
        <>
        <body style={{margin: 0, padding: 0, overflow: 'hidden',minHeight: '100vh',
        background:'linear-gradient(90deg, rgba(75,124,135,1) 25%, rgba(2,0,36,1) 86%)'}}>
        <div className="container">
                <div className="row justify-content-center">
                    <div className='card my-3' style={{ width: '1000px',background:'linear-gradient(90deg, rgba(75,124,135,1) 25%, rgba(2,0,36,1) 86%)',color:'white' }}>

                        <div className="d-flex justify-content-center">
                            <h2> SignUp Form</h2>
                        </div>

                        <div className='d-flex justify-content-center'>

                            <form onSubmit={handleSubmit}>
                                <div className="d-flex">
                                    <input type="text" placeholder='First Name' className='form-control mx-2' style={{ width: "250px" }} value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                                    <input type="text" placeholder='Middle Name' className='form-control mx-2' style={{ width: "250px" }} value={middleName} onChange={(e) => { setMiddleName(e.target.value) }} />
                                    <input type="text" placeholder='Last Name' className='form-control' style={{ width: "250px" }} value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                </div>
                                <br />
                                <div className="d-flex">
                                    <input type="text" placeholder='Email' className='form-control mx-2' style={{ width: "350px" }} value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
                                    <input type="password" placeholder='Password' className='form-control' style={{ width: "350px" }} value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                                </div>
                                <br />
                                <label><b> Upload Profile: </b></label>
                                <input type="file" className='form-control' style={{ width: "350px" }} onChange={(e) => { setImage(e.target.files[0]) }} /><br />
                                <div className="d-flex">
                                    <input type="text" placeholder='Contact Number' className='form-control' style={{ width: "250px" }} value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
                                    <label className='mx-2 my-2'>Gender</label>
                                    <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'}
                                    onChange={() => setGender('male')} /> <p className='my-2 mx-2'> Male</p>
                                    <input type="radio" id="female"  name="gender" value="female"  checked={gender === 'female'}
                                    onChange={() => setGender('female')}  /> <p className='my-2 mx-2'> Female</p>
                                    <input type="radio" id="others" name="gender"  value="others" checked={gender === 'others'}
                                    onChange={() => setGender('others')}/> <p className='my-2 mx-2'> Others</p>
                                </div>
                                <label> Role </label><br />
                                <select value={role} onChange={(e) => { setRole(e.target.value); }} style={{ width: '300px' }}>
                                    <option value="" disabled>Select Role</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </select><br />
                                {renderSignUpForm()}
                                <div className='d-flex justify-content-center'>
                                    <button className="btn btn-success my-1">SignUp</button>
                                </div>
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

export default SignUp;