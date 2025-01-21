import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  const { jwtToken, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link to="/signup" className={styles.navLink}>
        Signup
      </Link>
      <Link to="/login" className={styles.navLink}>
        Login
      </Link>
      {jwtToken && (
        <>
          <Link to="/products" className={styles.navLink}>
            Products
          </Link>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
