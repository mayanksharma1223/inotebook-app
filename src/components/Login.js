import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import loginIcon from '../img/user.png'
import loginImg from '../img/login.svg'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook121.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.showAlert("Logged in Successfully", "success")

        }
        else {
            props.showAlert("Invalid credentials, Login to correct credential or signup to Create an account ", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClickSignup=()=>{
        history.push("/signup")
    }



    return (
        <div className="container">
        <div className='container row'>
            <div className="col-md-6 col-lg-4 col-sn-12 my-3 mt-5">
                <div className="text-center">
                    <h2 className='my-3'>Login</h2>
                    <img className='loginIcon text-center' src={loginIcon} alt="icon" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control shadow-sm" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder='Enter your email here' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control shadow-sm" value={credentials.password} onChange={onChange} id="password" name="password" placeholder='Enter your password here' />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100 my-3" >Login</button>
                    </div>
                </form>
                <div className="text-center">
                        <button onClick={handleClickSignup} type="submit" className="btn btn-primary w-100" >Signup</button>
                    </div>
            </div>
            <div className="col-md-6 col-lg-8 col-sn-12 my-3">
                <img className="w-100 h-100" src={loginImg} alt="img" />
            </div>
        </div>
        </div>

    )
}

export default Login