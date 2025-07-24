import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "./user/RegisterForm";
import LoginForm from "./user/LoginForm";
import Profile from "./county/ProfilePage";
import Manager from "./manager/ProfilePage";
import HomePage from "./HomePage";
import './tailwind.min.css';
import './globalStyle.css';
import CreateProgram from './programs/CreateProgram';
import CreatSubProgram from './programs/CreateSubProgram';

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/programs" element={<CreateProgram />} />
        <Route path="/subprograms" element={<CreatSubProgram />} />
        <Route path="/manager" element={<Manager />} />
        
      </Routes>
    </Router>
  );
}

export default App;
