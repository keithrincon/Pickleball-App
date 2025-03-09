import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../contexts/SocketContext';

const Home = () => {
  const [matches, setMatches] = useState([]); // State for matches
  const [skillLevelFilter, setSkillLevelFilter] = useState(''); // State for skill level filter
  const socket = useSocket();

  // Fetch matches based on the skill level filter
  const fetchMatches = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/matches`,
        {
          params: { skillLevel: skillLevelFilter }, // Pass skillLevel as a query parameter
        }
      );
      setMatches(res.data);
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to fetch matches');
    }
  };

  // Fetch matches when the component mounts or the filter changes
  useEffect(() => {
    fetchMatches();
  }, [skillLevelFilter]);

  // Listen for real-time match updates
  useEffect(() => {
    if (socket) {
      // Listen for new matches
      socket.on('newMatch', (newMatch) => {
        setMatches((prevMatches) => [newMatch, ...prevMatches]);
      });

      // Listen for match updates (e.g., when a player checks in)
      socket.on('matchUpdated', (updatedMatch) => {
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match._id === updatedMatch._id ? updatedMatch : match
          )
        );
      });

      // Clean up event listeners
      return () => {
        socket.off('newMatch');
        socket.off('matchUpdated');
      };
    }
  }, [socket]);

  // Handle check-in to a match
  const handleCheckIn = async (matchId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/matches/${matchId}/check-in`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to check in');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Upcoming Matches</h1>
      <div className='mb-4'>
        <label htmlFor='skillLevelFilter' className='mr-2'>
          Filter by Skill Level:
        </label>
        <select
          id='skillLevelFilter'
          value={skillLevelFilter}
          onChange={(e) => setSkillLevelFilter(e.target.value)}
          className='p-2 border rounded'
        >
          <option value=''>All</option>
          <option value='1'>Beginner</option>
          <option value='2'>Intermediate</option>
          <option value='3'>Advanced</option>
        </select>
      </div>
      {matches.map((match) => (
        <div key={match._id} className='p-4 border rounded mb-4'>
          <h2 className='text-xl font-semibold'>{match.type} Match</h2>
          <p>Location: {match.location}</p>
          <p>Date: {new Date(match.dateTime).toLocaleString()}</p>
          <p>Skill Level: {match.skillLevel}</p>
          <p>Players: {match.players.length}</p>
          <button
            onClick={() => handleCheckIn(match._id)}
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Check In
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
