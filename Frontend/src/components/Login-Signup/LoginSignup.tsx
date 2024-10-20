import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import right_image from '../../assets/right-image.jpg';

export const LoginSignup = () => {
  const [action, setAction] = useState('sign-up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');

  // On component mount, retrieve data from localStorage if it exists
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const { email, username, password } = JSON.parse(savedData);
      setEmail(email || '');
      setUsername(username || '');
      setPassword(password || '');
    }

    // Check if token is saved in localStorage and log it for debugging
    const token = localStorage.getItem('token');
    if (token) {
      console.log('User is already logged in with token');
    }
  }, []);

  // Perform input validation
  const validateForm = () => {
    if (action === 'sign-up') {
      if (!username || !email || !password || !passwordConfirm) {
        alert('Please fill all the fields');
        return false;
      }
      if (password !== passwordConfirm) {
        alert('Passwords do not match');
        return false;
      }
    } else {
      if (!email || !password) {
        alert('Please fill all the fields');
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = action === 'sign-up'
        ? { email, password, name: username, passwordConfirm }
        : { email, password };

      try {
        const endpoint = action === 'sign-up'
          ? 'http://localhost:5000/api/v1/auth/register'
          : 'http://localhost:5000/api/v1/auth/login';

        const response = await axios.post(endpoint, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response.data);

        // Extract token and user data from the response
        const { token, data } = response.data;
        if (token) {
          // Save user data and token in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify({
            email: data.email,
            username: data.name,
            role: data.role,
          }));
        }

        // Clear the form and switch action to 'Login' after successful sign-up
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setUsername('');
        setAction('Login');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Axios Error:', error);
        }
      }
    }
  };

  return (
    <div className='login-signup-container'>
      {/* Left Section: Form */}
      <div className='form-container'>
        <div className="header">
          <div className="text">{action === 'sign-up' ? 'Sign Up' : 'Login'}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {/* Display username input only for Sign Up */}
          {action === 'sign-up' && (
            <div className="input">
              <img src={user_icon} alt="User" />
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <img src={email_icon} alt="Email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="Password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm password input, only for Sign Up */}
          {action === 'sign-up' && (
            <div className="input">
              <img src={password_icon} alt="Confirm Password" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Display forgot password only for Login */}
        {action === 'Login' && (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!</span>
          </div>
        )}

        <div className="submit-container">
          {/* Sign Up button */}
          <button
            className={action === 'sign-up' ? 'submit' : 'submit gray'}
            onClick={(e) => {
              setAction('sign-up'); // Change action
              setTimeout(() => handleSubmit(e), 0); // Handle form submission after action is updated
            }}
          >
            Sign Up
          </button>

          {/* Login button */}
          <button
            className={action === 'Login' ? 'submit' : 'submit gray'}
            onClick={(e) => {
              setAction('Login'); // Change action
              setTimeout(() => handleSubmit(e), 0); // Handle form submission after action is updated
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className='image-container'>
        <img src={right_image} alt="Right Section" />
      </div>
    </div>
  );
};