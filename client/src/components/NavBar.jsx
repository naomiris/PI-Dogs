import React from "react";
import { Link } from "react-router-dom";
import perrologo from './images/perrologo.png'
import styles from './styles/NavBar.module.css'

export default function NavBar (){
    return(
        <nav className={styles.nav}>
            <Link to="/dog">Create Dog</Link>
            <Link to='/home'>
            <div>
                <img src={perrologo} id="perrologo" alt="" width="30" height="30"/>
            </div>
            </Link>
        </nav>
    )
    
}