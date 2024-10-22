import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState(["ROLE_CUSTOMER"]);
  const [mobile, setMobileNumber] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const history = useNavigate(); // Get the history object for redirection

  const roleOptions = [
    { value: "ROLE_CUSTOMER", label: "User" },
    { value: "ROLE_ADMIN", label: "Admin" },
  ];
  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!fullName || !email || !password || !confirmPassword || !mobile) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        throw new Error("Passwords do not match");
      }
      const formattedRoles = roles.map((role) => ({ roleName: role }));
      console.log("formatted roles" + JSON.stringify(formattedRoles, null, 2));

      const response = await axios.post("http://localhost:8080/auth/signup", {
        fullName,
        email,
        password,

        mobile,
        userRoles: [
          { role: { roleName: "ROLE_CUSTOMER" } },
          { role: { roleName: "ROLE_ADMIN" } },
        ],
      });
      // Handle successful signup
      console.log(response.data);
      toast.success("Successfully Registration complete");
      history("/dashboard");
    } catch (error) {
      // Handle signup error

      toast.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Box
        sx={{
          borderRadius: 1,
          padding: 4,
          boxShadow: 3,
          width: 400,
          backgroundColor: "white",
        }}
      >
        <h2 className="mb-4 text-center">Sign Up Page</h2>

        {error && <p className="text-danger">{error}</p>}

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="fullName"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="Role"
            value={roles}
            onChange={(e) =>
              setRoles(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            SelectProps={{
              multiple: true,
            }}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <div className="text-center mt-3">
          <p>
            Already Register? <a href="/">Login</a>
          </p>
        </div>
      </Box>
    </div>
  );
}

export default SignupPage;
