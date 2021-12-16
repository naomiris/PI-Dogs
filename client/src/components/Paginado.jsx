import React from "react";
import styles from './styles/Paginado.module.css';

export default function Paginado ({dogsPerPg, allDogs, paginado}){ // me traigo como props el estado que renderiza cuantos perros quiero por pagina, todos los perror y la constante paginado 
    const pageNumber = []; //va a ser un arreglo de numeros con el resultado del for

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPg); i++){ // voy a tomar el num redondo que resulta de dividir todos lo perro por la cantidad de perros por pagina
        pageNumber.push(i);
    }
    return(
        <nav>
            <div>
            <ul className={styles.paginado}>
                {
                    pageNumber && pageNumber.map(num =>(
                        <li className={styles.number} key={num}>
                        <a href={paginado}onClick={()=> paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
            </div>
        </nav>
    )

}