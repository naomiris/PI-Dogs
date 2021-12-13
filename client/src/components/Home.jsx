import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs } from "../actions/index.js";
import { Link } from 'react-router-dom';
import Cards from "./Cards.jsx";
import Paginado from "./Paginado.jsx";


export default function Home (){
    const dispatch = useDispatch();  

    const allDogs = useSelector ((state)=> state.dogs) // me traigo el arreglo del estado del reducer
    
    const [currentPg, setCurrentPg] = useState(1) // se guarda la pagina actual, va a ser 1
    const [dogsPerPg, setDogsPerPg] = useState(8) //cuantos perros por pagina
    const indexLastDog = currentPg * dogsPerPg // 8
    const indexFirstDog = indexLastDog - dogsPerPg // 0
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog)// me devuelve un arreglo desde el primer perro hasta el ultimo que seria el 6to, esto va a cambiar dependiendo de la pagina en el que este

    const paginado = (pageNum) =>{ //
        setCurrentPg(pageNum);
    }

    useEffect ((e)=>{
        dispatch(getAllDogs());
    },[dispatch])
    

return(
    <div>
        <Link to = '/dog'>Create Dog</Link>
        <div>
            <select>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <Paginado
            dogsPerPg={dogsPerPg}
            allDogs={allDogs.length}
            paginado={paginado}
            />

            {currentDogs?.map(el =>
                 (
                       <div>
                        <Link to={'/dogs/' + el.id}>
                          <Cards
                            name={el.name}
                            image={el.image}
                            temperament={el.temperament}
                            weight={el.weight}
                            key={el.id}
                          />
                        </Link>
                        </div>
                      
                    )
                )
            }
        </div>

    </div>
)
}