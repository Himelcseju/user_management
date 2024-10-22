import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter both username and password.");
        return;
      }
      console.log({ email, password }); // Log the values of username and password (username, password);
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      console.log("Login successful:", response.data.message);
      toast.success(response.data.message);
      history("/dashboard");
    } catch (error) {
      toast.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fade-in">
      <div
        className="border rounded-lg p-4"
        style={{
          width: "500px",
          height: "auto",
          backgroundColor: "#f8f9fa",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <form>
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remeberMEcheckbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="form2Example31"
                ></label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
            onClick={handleLogin}
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <a href="/signup">Register</a>
            </p>
            <p>or sign up with:</p>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1 icon-button"
              style={{ color: "#3b5998" }} // Facebook Blue
            >
              <i className="fab fa-facebook-f"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1 icon-button"
              style={{ color: "#db4437" }}
            >
              <i className="fab fa-google"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1 icon-button"
              style={{ color: "#1da1f2" }} // Twitter Blue
            >
              <i className="fab fa-twitter"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1 icon-button"
              style={{ color: "#333" }} // GitHub Black
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
