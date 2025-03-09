import React, { useState } from 'react';
import axios from 'axios';

const CreateMatch = () => {
  const [formData, setFormData] = useState({
    type: 'singles',
    location: '',
    dateTime: '',
    skillLevel: 'beginner',
  });
  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.location || !formData.dateTime) {
      setMessage('Location and date/time are required');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/matches`, // Use environment variable for API URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      setMessage('Match created successfully!');
      console.log(res.data); // Handle success (e.g., redirect or clear the form)
      setFormData({
        type: 'singles',
        location: '',
        dateTime: '',
        skillLevel: 'beginner',
      }); // Reset the form
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create match');
      console.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Create Match</h2>
      {message && <p>{message}</p>} {/* Display success/error messages */}
      <form onSubmit={handleSubmit}>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value='singles'>Singles</option>
          <option value='doubles'>Doubles</option>
        </select>
        <input
          type='text'
          placeholder='Location'
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
        <input
          type='datetime-local'
          value={formData.dateTime}
          onChange={(e) =>
            setFormData({ ...formData, dateTime: e.target.value })
          }
          required
        />
        <select
          value={formData.skillLevel}
          onChange={(e) =>
            setFormData({ ...formData, skillLevel: e.target.value })
          }
        >
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='advanced'>Advanced</option>
        </select>
        <button type='submit'>Create Match</button>
      </form>
    </div>
  );
};

export default CreateMatch;
