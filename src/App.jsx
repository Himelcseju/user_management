import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./components/Loginpage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import UserprofileUpdate from "./components/user_profile/UserprofileUpdate";
import Report from "./components/report/Report";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeToggleProvider } from "./components/ThemeToggleProvider";
import "./App.css";
import Leagues from "./components/leagues/Leagues";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeToggleProvider>
      <div className="App">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Dashboard Layout with Nested Routes */}

            <Route path="/dashboard" element={<DashboardLayoutBasic />}>
              <Route index element={<Dashboard />} />
              <Route path="user_update" element={<UserprofileUpdate />} />
              <Route path="report" element={<Report />} />
              <Route path="leagues" element={<Leagues />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer position="top-right" theme="dark" autoClose={4000} />
      </div>
    </ThemeToggleProvider>
  );
}

export default App;
