import React from 'react'
import aboutImg from "../img/about.svg"
import underline from "../img/underline.png"

export default function About() {

  return (
    <div className="container">
    <div className='container row'>
      <div className="col-md-6 col-lg-5 col-sn-12 my-3">
        <div className="text-center">
          <h2 className='m-0'>About</h2>
          <img className='color-dark w-50' src={underline} alt="" />
        </div>
        <div className="my-3">
          <p className="my-3">
            iNotebook is a notes taking web app wherein you can save your notes and your notes are saved in the cloud so you can access your notes whenever you want and from anywhere by just simply login to your account. Yours notes in the iNotebook are highly safe, only you can access your notes, none else can.
          </p>
          <p>
            <h5>How it made</h5>
            This iNotebook app is completely made using MERN stack. For those who don't know about MERN. MERN is a stack of full stake development which include Mongodb, Express, React and Node. Mongodb is a database for storing the data, Express is application framework of node which helps in managing APIs, middleware and various endpoint , React is a javaScript framework for all frontend work and Node is also a JavaScript framework for all backend work.
          </p>
          <p>
            <h5>How it Works</h5>
            <b>Step 0</b>: When User Create an account in iNotebook. It generate user ID for that user and all the SignUp details get stored in the mongodb cloud database.<br/>
            <b>Step 1</b>: After Successfully Signed up. When user go for Login. this app check the signup detail of that user. If it finds, then It allow User to login and asign a token to that user.<br/>
            <b>Step 2</b>: Now after login, User can create, read, update and delete its notes. These notes are securely stored in the cloud database.<br/>
            <b>Step 3</b>: When User try to access its account from anywhere using their login credentials , this app verify the user via the previously generated token and then give access to its particular notes which they saved earlier.<br/>
            <b>Step 4</b>: In this way, Only the genuine user can access its note, none else can.
          </p>
        </div>
      </div>
      <div className="col-md-6 col-lg-7 col-sn-12 my-3 mt-15">
        <img src={aboutImg} alt="about" className="w-100 h-100" />
      </div>

    </div>
    </div>
  )
}
