import React from "react";
import { Link } from "react-router-dom";
import styles from './styles/NavBar.module.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PetsIcon from '@mui/icons-material/Pets';

export default function NavBar (){
    return(
      
            <nav >
                <div className={styles.nav}>
                <Link to="/">
                    <div className={styles.home}>
                <PetsIcon fontSize="large" className={styles.paw}/>
                </div>
                </Link>
                <Link to='/home'>
                <h1 className={styles.doggy}>Doggy App</h1>
                </Link>
                <div>
                <Link to='/dog'><AddCircleIcon fontSize="large" className={styles.add}/></Link>
                </div>
                </div>
            </nav>
     
    )
}