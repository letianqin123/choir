import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Placeholder for the Login page
import TreasurerPage from './pages/TreasurerPage'; // Placeholder for Treasurer
import SecretaryPage from './pages/SecretaryPage'; // Placeholder for Secretary
import AdminPage from './pages/AdminPage'; // Placeholder for Admin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/treasurer" element={<TreasurerPage />} />
        <Route path="/secretary" element={<SecretaryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
