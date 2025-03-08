import React, { useState } from 'react';
import axios from 'axios';

const CheckInButton = ({ matchId, userId }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleCheckIn = async () => {
    if (!userId) {
      setError('User ID is required.'); // Validate userId
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/matches/${matchId}/check-in`,
        { userId }
      );
      console.log(res.data); // Handle success
      // Optionally, trigger a callback or refresh the parent component
      window.location.reload(); // Refresh the page to update the UI
    } catch (err) {
      console.error(err.response?.data?.error || 'Failed to check in');
      setError(err.response?.data?.error || 'Failed to check in'); // Display error to the user
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <button onClick={handleCheckIn} disabled={!userId || isLoading}>
        {isLoading ? 'Checking In...' : 'Check In'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {/* Display error message */}
    </div>
  );
};

export default CheckInButton;
