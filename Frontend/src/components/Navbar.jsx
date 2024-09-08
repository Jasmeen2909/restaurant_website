import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import TableBookingForm from './TableBookingForm';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by fetching user data from localStorage
    const savedUser = localStorage.getItem('userdata');
    if (savedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userdata'); // Remove user data from localStorage
    setIsAuthenticated(false); // Set user as unauthenticated
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="nav_main">
      <div className="left_lg">
        <p className="name">EasyDine.</p>
      </div>

      <div className="nav_links">
        <Link to="/" className="links">Home</Link>
        <Link to="/order" className="links">Order</Link>
        <Link to="/about" className="links">About</Link>
        <Link to="/contact" className="links">Contact</Link>
        {isAuthenticated ? (
          <Link to="/" onClick={handleLogout} className="links">Logout</Link>
        ) : (
          <Link to="/login" className="links">Login</Link>
        )}
      </div>

      <div className="right_btn">
        <button onClick={handleToggleForm}>BOOK A TABLE</button>
      </div>

      {/* Conditionally render the overlay and form */}
      {showForm && (
        <div className="overlay" onClick={closeForm}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <TableBookingForm />
            <button onClick={closeForm} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
