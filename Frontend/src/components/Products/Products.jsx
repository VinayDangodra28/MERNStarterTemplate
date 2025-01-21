import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { jwtToken } = useAuth();

  useEffect(() => {
    if (!jwtToken) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products", {
          headers: { Authorization: jwtToken },
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching products");
      }
    };

    fetchProducts();
  }, [jwtToken]);

  return (
    <div className={styles.productsContainer}>
      <h2>Products</h2>
      {products.length > 0 ? (
        <ul className={styles.productList}>
          {products.map((product, index) => (
            <li key={index} className={styles.productItem}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
