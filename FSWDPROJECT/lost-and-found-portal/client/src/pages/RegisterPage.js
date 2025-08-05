import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    department: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showMessage = (msg, type = 'error') => {
    setMessage(msg);
    setMessageType(type);
  };

  const clearMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();

    // Trim all form data
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      studentId: formData.studentId.trim(),
      department: formData.department.trim(),
      phoneNumber: formData.phoneNumber.trim()
    };

    // Basic validation
    if (!userData.name || !userData.email || !userData.password || 
        !userData.studentId || !userData.department || !userData.phoneNumber) {
      showMessage('Please fill in all required fields.');
      return;
    }

    if (userData.password.length < 6) {
      showMessage('Password must be at least 6 characters long.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      showMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        showMessage(data.message, 'success');
        setFormData({
          name: '',
          email: '',
          password: '',
          studentId: '',
          department: '',
          phoneNumber: ''
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      

      {/* Main Content */}
      <div className="container">
        <h1>Register</h1>
        
        {message && (
          <div className={`message ${messageType}-message`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <small className={`password-hint ${
              formData.password.length > 0 && formData.password.length < 6 
                ? 'error' 
                : formData.password.length >= 6 
                ? 'success' 
                : ''
            }`}>
              {formData.password.length > 0 && formData.password.length < 6
                ? 'Password too short (minimum 6 characters)'
                : formData.password.length >= 6
                ? 'Password length is good'
                : 'Minimum 6 characters'
              }
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID <span className="required">*</span></label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department <span className="required">*</span></label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
              <option value="Arts & Sciences">Arts & Sciences</option>
              <option value="Education">Education</option>
              <option value="Architecture">Architecture</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="register-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;