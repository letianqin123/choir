import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Treasurer'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Mocked users for testing
    const mockUsers = {
      Treasurer: { username: 'treasurer', password: 'treasurer123' },
      Secretary: { username: 'secretary', password: 'secretary123' },
      Admin: { username: 'admin', password: 'admin123' },
    };
  
    const user = mockUsers[role];
  
    if (user && user.username === username && user.password === password) {
      switch (role) {
        case 'Treasurer':
          navigate('/treasurer');
          break;
        case 'Secretary':
          navigate('/secretary');
          break;
        case 'Admin':
          navigate('/admin');
          break;
        default:
          setError('Invalid role.');
      }
    } else {
      setError('Invalid credentials or role.');
    }
    };
    // Mock ends



  // Don't delete. Will be used once backend is implemented.
  /*
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Placeholder endpoint for now
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
        role,
      });

      if (response.data.success) {
        switch (role) {
          case 'Treasurer':
            navigate('/treasurer');
            break;
          case 'Secretary':
            navigate('/secretary');
            break;
          case 'Admin':
            navigate('/admin');
            break;
          default:
            setError('Invalid role.');
        }
      } else {
        setError('Invalid credentials or role.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  */


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Treasurer">Treasurer</option>
            <option value="Secretary">Secretary</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;