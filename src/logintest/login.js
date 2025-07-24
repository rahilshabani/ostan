import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setAuthenticated }) {
  const [form, setForm] = useState({ username: '', password: '', remember: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://rahilshabani.pythonanywhere.com//logintest/login/', form, { withCredentials: true });
      setAuthenticated(true);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <label>
        <input type="checkbox" name="remember" onChange={handleChange} />
        Remember Me
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
