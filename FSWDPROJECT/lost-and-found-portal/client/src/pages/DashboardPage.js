import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const DashboardPage = () => {
  const username = 'wahab'; // Replace this with dynamic user info if needed

  return (
    <div className="dashboard">
      <div className="background-effects">
        <div className="blob purple"></div>
        <div className="blob pink"></div>
        <div className="blob blue"></div>
      </div>

      <div className="main-container show">
        <div className="card">
          <h1>Welcome, {username}!</h1>
          <p>Manage your reports and activity below.</p>

          <div className="buttons">
            <Link to="/report-lost" className="btn report">
              📢 Report Lost Item
            </Link>

            <Link to="/report-found" className="btn view">
              🔒 Report Found Item
            </Link>

            <Link to="/" className="btn view">
              🏠 Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
