import React from "react";
import { Link } from "react-router-dom";
import perro from './images/perro.png';
import styles from './styles/NavBar.module.css';

export default function NavBar (){
    return(
      
            <nav >
                <div className={styles.nav}>
                <Link to="/">
                    <div className={styles.home}>
                <img src={perro} id="perrologo" alt="" width='60px' height='30px'/>
                </div>
                </Link>
                <Link to='/home'>
                <h1 className={styles.doggy}>Doggy App</h1>
                </Link>
                <div>
                <Link to='/dog'><h1 className={styles.createdog}>Create your dog</h1></Link>
                </div>
                </div>
            </nav>
     
    )
}