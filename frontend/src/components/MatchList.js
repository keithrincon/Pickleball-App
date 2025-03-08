import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchFilter from './MatchFilter';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/matches');
        setMatches(res.data);
        setFilteredMatches(res.data); // Initialize filtered matches
      } catch (err) {
        console.error(err.response?.data?.error || 'Failed to fetch matches');
      }
    };
    fetchMatches();
  }, []);

  const handleFilter = (skillLevel) => {
    if (!skillLevel) {
      setFilteredMatches(matches); // Show all matches
    } else {
      const filtered = matches.filter(
        (match) => match.skillLevel === skillLevel
      );
      setFilteredMatches(filtered);
    }
  };

  return (
    <div>
      <h2>Upcoming Matches</h2>
      <MatchFilter onFilter={handleFilter} />
      {filteredMatches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul>
          {filteredMatches.map((match) => (
            <li key={match._id}>
              <h3>{match.type} Match</h3>
              <p>Location: {match.location}</p>
              <p>Date: {new Date(match.dateTime).toLocaleString()}</p>
              <p>Skill Level: {match.skillLevel}</p>
              <p>Players: {match.players.length}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchList;
