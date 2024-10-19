import React, {useState} from 'react';
import './LoginSignup.css';

import user_icon  from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import right_image from '../../assets/right-image.jpg';  


export const LoginSignup = () => {
    const [action, setAction] = useState('sign-up');
    
  return (
    <div className='login-signup-container'>
      {/* Left Section: Form */}
      <div className='form-container'>
        <div className="header">
          <div className="text">{action}</div>  
          <div className="underline"></div>
        </div>      

        <div className="inputs">
          {action === "Login" ? <div></div> :  
          <div className="input">
            <img src={user_icon} alt="User" />
            <input type="text" placeholder="Name"/>
          </div>}

          <div className="input">
            <img src={email_icon} alt="Email" />
            <input type="email" placeholder='Email Id' />
          </div>
          <div className="input">
            <img src={password_icon} alt="Password" />
            <input type="password" placeholder="Password" />
          </div>
        </div>

        {action === "Sign Up" ? <div></div> : 
          <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}

        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} 
               onClick={() => { setAction("Sign Up") }}>
            Sign Up
          </div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} 
               onClick={() => { setAction("Login") }}>
            Login
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className='image-container'>
        <img src={right_image} alt="Right Section" />
      </div>
    </div>
     
  )
}
