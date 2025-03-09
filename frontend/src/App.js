import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext'; // Import the SocketProvider
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import CreateMatch from './components/CreateMatch';
import MatchList from './components/MatchList';
import Profile from './components/Profile'; // New
import Leaderboard from './components/Leaderboard'; // New
import Chat from './components/Chat'; // New
import Navbar from './components/Navbar'; // New

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Navbar /> {/* Add the Navbar */}
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/create-match' element={<CreateMatch />} />
          <Route path='/matches' element={<MatchList />} />
          <Route path='/profile' element={<Profile />} /> {/* New */}
          <Route path='/leaderboard' element={<Leaderboard />} /> {/* New */}
          <Route path='/chat/:matchId' element={<Chat />} /> {/* New */}
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;
