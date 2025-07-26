// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./user/LoginForm";
// import Profile from "./county/ProfilePage";
// import Manager from "./manager/ProfilePage";
// import HomePage from "./HomePage";
// import './tailwind.min.css';
// import './globalStyle.css';


// import PrivateRoute from "./routes/PrivateRoute";

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginForm />} />

//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />

//         <Route path="/manager" element={<Manager />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginForm from "./user/LoginForm";
import Profile from "./county/ProfilePage";
import Manager from "./manager/ProfilePage";
import HomePage from "./HomePage";

import './tailwind.min.css';
import './globalStyle.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = هنوز چک نشده

  useEffect(() => {
    const accessToken =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    setIsAuthenticated(!!accessToken); // تبدیل به true یا false
  }, []);

  if (isAuthenticated === null) {
    // هنوز در حال بررسی هستیم
    return <div className="text-center p-8">در حال بارگذاری...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/manager"
          element={
            isAuthenticated ? <Manager /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
