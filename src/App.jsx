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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeToggleProvider } from "./components/ThemeToggleProvider";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeToggleProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/dashboard" element={<DashboardLayoutBasic />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" theme="dark" autoClose={5000} />
      </div>
    </ThemeToggleProvider>
  );
}

export default App;
