import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext'; // Import the SocketProvider
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import CreateMatch from './components/CreateMatch';
import MatchList from './components/MatchList';

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/create-match' element={<CreateMatch />} />
          <Route path='/matches' element={<MatchList />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;
