import React from "react";
import styles from './styles/Card.module.css'

export default function Card ({image, name, temperament, weight}){
    return (
        <div className={styles.container}>
            <div className={styles.card}>
            <h3 className={styles.name}>{name}</h3>
            <img className={styles.img}src={image} alt='img not found' width='200px' height='200px' />
            <h3 className={styles.temp}>{temperament}</h3>
            <h3 className={styles.weight}>weight: {weight}</h3>
            </div>
        </div>
    )
}