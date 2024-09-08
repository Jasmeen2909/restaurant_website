import React, { useState, useEffect } from 'react';
import './TableBookingForm.css'; // Add appropriate styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TableBookingForm = () => {
  const [persons, setPersons] = useState('4');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  // const [success, setSuccess] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by fetching data from localStorage
    const savedUser = localStorage.getItem('userdata');
    if (savedUser) {
      setUserData(JSON.parse(savedUser)); // Parse and set the user data
    } else {
      // If no user is logged in, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData) {
      setError('Please log in to make a reservation');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/api/reservation/create', {
        userId: userData._id, // Send userId along with reservation data
        name: userData.username,
        contact: userData.email,
        reservationDate: date,
        reservationTime: time,
        numberOfPeople: persons,
        tableType: persons === '4' ? '4-person' : '6-person',
        message: message || '', // Optional message
      });

      if (response.status === 201) {

        // Show alert and redirect to home page
        alert('Reservation Successful!');
        navigate('/'); // Redirect after clicking OK
      }
    } catch (error) {
      alert('Reservation Failed');
      setError(error.response?.data?.message || 'Unable to create reservation');
    }
  };

  return (
    <div>
      <h1 className='pop_heading'>Book A Table</h1>
      {error && <p className="error-message">{error}</p>}
      {/* {success && <p className="success-message">{success}</p>} */}
      <form onSubmit={handleSubmit} className="table-booking-form">
        <div className="form-row">
          <div className="form-group">
            <label>Persons</label>
            <select
              className="persons-select"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              required
            >
              <option value="4">4 Persons</option>
              <option value="6">6 Persons</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group message-group">
          <label>Message</label>
          <input
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter any special requests or messages here..."
          />
        </div>
        <div className="form-submit">
          <button type="submit">Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default TableBookingForm;
