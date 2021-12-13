import React from "react";

export default function Paginado ({dogsPerPg, allDogs, paginado}){ // me traigo como props el estado que renderiza cuantos perros quiero por pagina, todos los perror y la constante paginado 
    const pageNumber = []; //va a ser un arreglo de numeros con el resultado del for

    for(let i=0; i<=Math.ceil(allDogs/dogsPerPg); i++){ // voy a tomar el num redondo que resulta de dividir todos lo perro por la cantidad de perros por pagina
        pageNumber.push(i + 1);
    }
    return(
        <nav>
            <ul className='paginado'>
                {
                    pageNumber && pageNumber.map(num =>(
                        <li className='number'key={num}>
                        <a onClick={()=> paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}