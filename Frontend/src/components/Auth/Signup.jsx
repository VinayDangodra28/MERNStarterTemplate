import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Form.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", formData);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className={styles.inputField}
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className={styles.button}>
          Signup
        </button>
      </form>
    </div>
  );
}
