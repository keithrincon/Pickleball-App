import React, { useState } from 'react';
import axios from 'axios';

const CreateMatch = () => {
  const [formData, setFormData] = useState({
    type: 'singles',
    location: '',
    dateTime: '',
    skillLevel: 'beginner',
  });

  // Map skill level strings to numbers
  const skillLevelMap = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skillLevel: skillLevelMap[formData.skillLevel], // Convert string to number
      };
      const res = await axios.post(
        'http://localhost:5000/api/matches',
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Include the JWT token
        }
      );
      console.log(res.data); // Handle success (e.g., show a message or redirect)
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to create match');
    }
  };

  return (
    <div>
      <h2>Create Match</h2>
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
