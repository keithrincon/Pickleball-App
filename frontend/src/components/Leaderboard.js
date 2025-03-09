import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/leaderboard`
        );
        setLeaderboard(res.data);
      } catch (err) {
        console.error(
          err.response?.data?.error || 'Failed to fetch leaderboard'
        );
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Leaderboard</h1>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='p-2'>Rank</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Matches Won</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user._id} className='border-b'>
              <td className='p-2'>{index + 1}</td>
              <td className='p-2'>{user.name}</td>
              <td className='p-2'>{user.matchesWon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
