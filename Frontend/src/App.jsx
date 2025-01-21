import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Products from "./components/Products/Products";
import { AuthProvider } from "./context/AuthContext";
import styles from "./styles/App.module.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.App}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
