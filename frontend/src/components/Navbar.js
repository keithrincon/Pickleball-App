import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-blue-500 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white text-xl font-bold'>
          Pickleball App
        </Link>
        <div className='space-x-4'>
          <Link to='/create-match' className='text-white hover:text-gray-200'>
            Create Match
          </Link>
          <Link to='/profile' className='text-white hover:text-gray-200'>
            Profile
          </Link>
          <Link to='/leaderboard' className='text-white hover:text-gray-200'>
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
