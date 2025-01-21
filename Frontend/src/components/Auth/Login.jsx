import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Form.module.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      login(response.data.jwtToken);
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
