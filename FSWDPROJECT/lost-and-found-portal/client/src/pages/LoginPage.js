import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear message when form data changes
  useEffect(() => {
    setMessage({ text: '', type: '' });
  }, [formData.email, formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRedirectPath = () => {
    // Method 1: Check location state first
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }

    // Method 2: Check URL search params as fallback
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get('redirect') || searchParams.get('from');
    if (redirectTo) {
      return decodeURIComponent(redirectTo);
    }

    // Method 3: Check localStorage for redirectAfterLogin (matches your HomePage)
    const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
    if (redirectAfterLogin) {
      localStorage.removeItem('redirectAfterLogin'); // Clean up
      return redirectAfterLogin;
    }

    // Method 4: Check sessionStorage for stored intended route
    const storedRoute = sessionStorage.getItem('intendedRoute');
    if (storedRoute) {
      sessionStorage.removeItem('intendedRoute'); // Clean up
      return storedRoute;
    }

    // Default fallback
    return '/dashboard';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsAuthenticated(true);

        // Get the intended route using our improved method
        const redirectPath = getRedirectPath();
        console.log('Redirecting to:', redirectPath); // Debug log
        navigate(redirectPath, { replace: true });
      } else {
        throw new Error('No token received');
      }

    } catch (error) {
      let errorMsg = "Login failed. Please try again.";

      if (error.response) {
        if (error.response.status === 401) {
          errorMsg = "Invalid email or password";
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        } else if (error.response.status === 429) {
          errorMsg = "Too many attempts. Please try again later.";
        }
      }

      setMessage({
        text: errorMsg,
        type: 'error',
        details: error.response?.data?.details
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Your Account</h2>

        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
            {message.details && (
              <div className="error-details">{message.details}</div>
            )}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="login-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                placeholder="Enter your password"
                required
                minLength="6"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/register" className="footer-link">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
