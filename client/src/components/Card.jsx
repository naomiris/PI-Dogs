import React from "react";
import styles from './styles/Card.module.css'

export default function Card ({img, name, temperament, weight}){
    // console.log("img", img)
    // console.log("weight", )
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h3 className={styles.name}>{name}</h3>
            <img className={styles.img}src={img} alt='img not found' width='200px' height='200px' />
            <h3 className={styles.temp}>{temperament}</h3>
            <br/>
            {/* <h3 className={styles.weight}>weight: {weight_min}{weight_max}</h3> */}
            <h5 className={styles.weight} >Weight: {weight}</h5>
            </div>
        </div>
    )
}