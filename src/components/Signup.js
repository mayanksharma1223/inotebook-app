import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import signUpIcon from '../img/user.png'
import signUpImg from '../img/create.svg'



const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials
    const response = await fetch("https://inotebook121.herokuapp.com/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })

    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //save the auth token
      localStorage.setItem('token', json.authToken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success")

    }
    else {
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
    <div className='container row'>
      <div className="col-md-6 col-lg-4 col-sn-12 my-3">
        <div className="text-center">
          <h2 className="my-3">SignUp</h2>
          <img className='loginIcon text-center' src={signUpIcon} alt="icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control shadow-sm" onChange={onChange} placeholder="Enter your name here" name="name" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control shadow-sm" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter your email here" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control shadow-sm" onChange={onChange} minLength={5} required placeholder="Enter the password" name="password" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control shadow-sm" onChange={onChange} minLength={5} required placeholder="Enter the confirm password" name="cpassword" id="cpassword" />
          </div>
          <button disabled={credentials.name.length < 3 || credentials.email.length < 5 || credentials.password.length < 3 || credentials.cpassword.length < 3 || credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary w-100 my-3">SignUp</button>
        </form>
      </div>
      <div className="col-md-6 col-lg-8 col-sn-12 my-3 mt-15">
                <img className="w-100 h-100" src={signUpImg} alt="img" />
            </div>
    </div>
    </div>
  )
}

export default Signup