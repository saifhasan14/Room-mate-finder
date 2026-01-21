import { useContext, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({
      username: "",
      email: "",
      password: "",
    });

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Validation checks
    let errors = {};

    if (username.length < 4) {
      errors.username = "Username must be at least 6 characters long.";
    }

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (password.length < 4 || password.length > 15) {
      errors.password = "Password must be between 4 and 15 characters.";
    }

    // If there are any validation errors, update the state and return early
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
          />
          {validationErrors.username && <span>{validationErrors.username}</span>}
          <input
            name="email"
            type="text"
            placeholder="Email"
          />
          {validationErrors.email && <span>{validationErrors.email}</span>}
          <input
            name="password"
            type="password"
            placeholder="Password"
          />
          {validationErrors.password && <span>{validationErrors.password}</span>}
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
