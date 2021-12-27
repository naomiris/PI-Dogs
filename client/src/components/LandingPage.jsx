import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";
import logoLanding from './images/logoLanding.png'

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <h2 className={styles.doggy}> Doggy App </h2>
      <Link to="/home">
        <img className={styles.imagen} src={logoLanding} alt="" width='110px' height='150px'/>
      </Link>
    
    </div>
  );
}
