import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import choirLogo from '../figs/choir.png';
import axios from '../api/axiosInstance'; // Ensure axiosInstance is correctly set up

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Treasurer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', {
        username,
        password
      });

      if (response.data.success) {
        console.log('Login successful:', response.data.message);
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
        setError(response.data.message || 'Invalid credentials or role.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.message || 'Server error. Please try again later.');
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        {/* Left side with logo */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            backgroundColor: '#007E94',
            minHeight: '100vh',
          }}
        >
          <div className="text-center" style={{ marginBottom: '80px' }}>
            <h1
              style={{
                fontSize: '4rem',
                fontWeight: '300',
                letterSpacing: '4px',
                marginBottom: '80px',
              }}
            >
              CHOIR MANAGEMENT
            </h1>
            <div>
              <img
                src={choirLogo}
                alt="Choir Logo"
                style={{
                  width: '300px',
                  marginTop: '20px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login to your Account</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label text-muted">CHOOSE YOUR ROLE</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Treasurer">Treasurer</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted">USER NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn text-white w-100 py-2"
                  style={{
                    borderRadius: '8px',
                    backgroundColor: '#007E94',
                  }}
                >
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;