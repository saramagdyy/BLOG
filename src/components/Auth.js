import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { login, signup } = useAuth(); // Assuming you have a signup function in your AuthContext
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login({ username, password });
    } else {
      await signup({ username, password }); // Call the signup function
    }
    navigate('/'); // Redirect to home after successful login/signup
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">{isLogin ? 'Login' : 'Signup'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-4">{isLogin ? 'Switch to Signup' : 'Switch to Login'}</button>
    </form>
  );
};

export default Auth;
