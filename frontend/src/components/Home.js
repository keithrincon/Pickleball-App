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

  return (
    <div>
      <h1>Upcoming Matches</h1>
      <div>
        <label htmlFor='skillLevelFilter'>Filter by Skill Level:</label>
        <select
          id='skillLevelFilter'
          value={skillLevelFilter}
          onChange={(e) => setSkillLevelFilter(e.target.value)}
        >
          <option value=''>All</option>
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='advanced'>Advanced</option>
        </select>
      </div>
      {matches.map((match) => (
        <div key={match._id}>
          <h2>{match.type} Match</h2>
          <p>Location: {match.location}</p>
          <p>Date: {new Date(match.dateTime).toLocaleString()}</p>
          <p>Skill Level: {match.skillLevel}</p>
          <p>Players: {match.players.length}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
