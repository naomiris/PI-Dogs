import React from "react";
import styles from './styles/Paginado.module.css';


export default function Paginado ({dogsPerPg, allDogs, paginado}){ // me traigo como props el estado que renderiza cuantos perros quiero por pagina, todos los perros y la constante paginado 
    const pageNumber = []; 

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPg); i++){ 
        pageNumber.push(i);
    }
    return(
        <nav>
            <div>
            <ul className={styles.paginado}>
                {
                   pageNumber?.map(num =>(
                        <li className={styles.number} key={num}>
                        <a href={paginado} onClick={()=> paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
            </div>
        </nav>
    )

}
