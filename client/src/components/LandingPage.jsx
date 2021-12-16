import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <h2> Doggy App </h2>
      <Link to="/home">
        <button>Welcome</button>
      </Link>
    
    </div>
  );
}
