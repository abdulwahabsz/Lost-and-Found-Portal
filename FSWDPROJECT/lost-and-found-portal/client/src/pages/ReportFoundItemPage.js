import React, { useState } from 'react';
import './ReportItemPage.css';

const ReportFoundItemPage = () => {
  const [form, setForm] = useState({ 
    item: '', 
    location: '', 
    date: '', 
    description: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (message) setMessage('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Make API call to your backend
      const response = await fetch('http://localhost:5000/api/found-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success - data stored in database
        setMessage('✅ Found item reported successfully!');
        console.log('Success:', data);
        
        // Reset form after successful submission
        setForm({ item: '', location: '', date: '', description: '' });
      } else {
        // Error from backend
        setError(data.message || 'Failed to report item. Please try again.');
        console.error('Backend error:', data);
      }
    } catch (err) {
      // Network or other errors
      setError('❌ Network error. Please check your connection and try again.');
      console.error('Network error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h2>Report a Found Item</h2>
      
      {/* Success Message */}
      {message && (
        <div className="success-message" style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          border: '1px solid #c3e6cb'
        }}>
          {message}
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="error-message" style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="report-form">
        <input 
          name="item" 
          placeholder="Item Name" 
          value={form.item} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        
        <input 
          name="location" 
          placeholder="Found Location" 
          value={form.location} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        
        <input 
          name="date" 
          type="date" 
          value={form.date} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        
        <textarea 
          name="description" 
          placeholder="Description" 
          value={form.description} 
          onChange={handleChange}
          disabled={loading}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ReportFoundItemPage;