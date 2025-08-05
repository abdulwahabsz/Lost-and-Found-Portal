import React, { useState } from 'react';
import './ReportItemPage.css';

const ReportLostItemPage = () => {
  const [form, setForm] = useState({
    itemName: '',
    lastSeenLocation: '',
    dateLost: '',
    description: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/lost-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        alert('Error: ' + data.message);
      } else {
        alert('Lost item reported successfully');
        setForm({ itemName: '', lastSeenLocation: '', dateLost: '', description: '' });
      }
    } catch (error) {
      alert('Server error: ' + error.message);
    }
  };

  return (
    <div className="report-container">
      <h2>Report a Lost Item</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <input name="itemName" placeholder="Item Name" value={form.itemName} onChange={handleChange} required />
        <input name="lastSeenLocation" placeholder="Last Seen Location" value={form.lastSeenLocation} onChange={handleChange} required />
        <input name="dateLost" type="date" value={form.dateLost} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportLostItemPage;
