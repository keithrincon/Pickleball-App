import React, { useState } from 'react';

const MatchFilter = ({ onFilter }) => {
  const [skillLevel, setSkillLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(skillLevel);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
      >
        <option value=''>All Levels</option>
        <option value='beginner'>Beginner</option>
        <option value='intermediate'>Intermediate</option>
        <option value='advanced'>Advanced</option>
      </select>
      <button type='submit'>Filter</button>
    </form>
  );
};

export default MatchFilter;
