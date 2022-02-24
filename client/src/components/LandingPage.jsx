import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LandingPage.module.css";
import PetsIcon from '@mui/icons-material/Pets';

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <h2 className={styles.doggy}> Doggy App </h2>
      <Link to="/home">
        <PetsIcon
        sx={{ fontSize: 100 }}
        className={styles.patita}
        />
      </Link>
    
    </div>
  );
}
