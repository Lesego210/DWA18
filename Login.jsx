// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('yvonne.mathole.ym@gmail.com');
  const [password, setPassword] = useState('Lethabo@22');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement your authentication logic here
    // For simplicity, assuming login is always successful
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
