import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      console.log(res.data); // { token: 'your_jwt_token' }

      // Save the token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed'); // Set error message
      console.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
