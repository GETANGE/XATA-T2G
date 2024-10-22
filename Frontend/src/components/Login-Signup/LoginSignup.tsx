import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import right_image from '../../assets/right-image.jpg';
import { useNavigate } from 'react-router-dom';

export const LoginSignup = () => {
  const [action, setAction] = useState('sign-up'); // Initial mode: sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const { email, username, password } = JSON.parse(savedData);
        setEmail(email || '');
        setUsername(username || '');
        setPassword(password || '');
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      const userRole = JSON.parse(localStorage.getItem('userData') || '{}').role;
      if (userRole === 'admin') {
        navigate('/Dashboard');
      } else {
        console.log('User is already logged in with token');
      }
    }
  }, [navigate]);

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
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Response:', response.data);

        const { token, data } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userData', JSON.stringify({
            id: data.xata_id,
            email: data.email,
            username: data.name,
            role: data.role,
          }));

          if (data.role === 'admin') {
            navigate('/Dashboard');
          } else {
            navigate('/team-dashboard');
          }
        }

        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setUsername('');
        setAction('Login');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios Error:', error.response?.data?.message || error.message);
        } else {
          console.error('Unknown Error:', error);
        }
      }
    }
  };

  return (
    <div className='login-signup-container'>
      <div className='form-container'>
        <div className="header">
          <div className="text">{action === 'sign-up' ? 'Sign Up' : 'Login'}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
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

        {action === 'Login' && (
          <div className="forgot-password">
            Forgot Password? <span>Click Here!</span>
          </div>
        )}

        <div className="submit-container">
          <button className="submit" onClick={handleSubmit}>
            {action === 'sign-up' ? 'Sign Up' : 'Login'}
          </button>

          {/* Button to toggle between Sign Up and Login */}
          <button className="toggle-action" onClick={() => setAction(action === 'sign-up' ? 'Login' : 'sign-up')}>
            {action === 'sign-up' ? 'Switch to Login' : 'Switch to Sign Up'}
          </button>
        </div>
      </div>

      <div className='image-container'>
        <img src={right_image} alt="Right Section" />
      </div>
    </div>
  );
};
