import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile({ setAuthenticated }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://rahilshabani.pythonanywhere.com//logintest/profile/', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setAuthenticated(false));
  }, []);

  const logout = () => {
    axios.post('https://rahilshabani.pythonanywhere.com//logintest/logout/', {}, { withCredentials: true })
      .then(() => setAuthenticated(false));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <p>Welcome, {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
