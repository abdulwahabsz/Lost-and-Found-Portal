import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = ({ isAuthenticated }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProtectedAction = (route) => {
    console.log('🔍 Navigating to:', route);
    navigate(route);
  };

  return (
    <div className="homepage">
      {/* Mouse follower - now static since we removed mouse tracking */}
      <div className="mouse-follower" />

      {/* Background effects */}
      <div className="background-effects">
        <div className="blob purple"></div>
        <div className="blob pink"></div>
        <div className="blob blue"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={`main-container ${isVisible ? "show" : ""}`}>
        <div className="icon">
          <svg className="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="card">
          <h1>Welcome to the Lost & Found Portal</h1>
          <p>
            Report lost items, search for found belongings, or help someone
            recover theirs.
            <span>Your community, your belongings.</span>
          </p>

          <div className="buttons">
            <button
              className="btn report"
              onClick={() => handleProtectedAction("/report-lost")}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Report Lost Item
            </button>
                                     
            <button
              className="btn view"
              onClick={() => handleProtectedAction("/report-found")}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Report Found Item
            </button>
             
            <button
              className="btn itemlist"
              onClick={() => handleProtectedAction("/item-list")}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              View Item List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;