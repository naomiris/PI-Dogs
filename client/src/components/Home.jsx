import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  filterDogsByTemperaments, orderByName
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import styles from "./styles/Home.module.css";


export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs); // me traigo el arreglo del estado del reducer
  
  const [orden, setOrden] = useState('');
  const [currentPg, setCurrentPg] = useState(1); // se guarda la pagina actual, va a ser 1
  const [dogsPerPg, setDogsPerPg] = useState(8); //cuantos perros por pagina
  const indexLastDog = currentPg * dogsPerPg; // 8
  const indexFirstDog = indexLastDog - dogsPerPg; // 0
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog); // me devuelve un arreglo desde el primer perro hasta el ultimo que seria el 6to, esto va a cambiar dependiendo de la pagina en el que este
  
  const temperaments = useSelector((state) => state.temperaments);

  const paginado = (pageNum) => {
    setCurrentPg(pageNum);
  };

  useEffect(
    (e) => {
      dispatch(getAllDogs());
      dispatch(getTemperaments());
    },
    [dispatch]
  );
  function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPg(1);
    setOrden(`Sorted${e.target.value}`)

  }

  function handleFilterTemperament(e) {
    dispatch(filterDogsByTemperaments(e.target.value)); //toma el valor del value
  }

  return (
 
    <div>
       
        <SearchBar />
        <div>
          <label className={styles.temperaments} htmlFor="select">
            Temperaments
          </label>
          <select
            className={styles.temperamento}
            onChange={(e) => handleFilterTemperament(e)}
          >
            {temperaments.map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <select onChange={(e) => handleSort(e)} >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <div className={styles.dogsCard}>
          <Paginado
            dogsPerPg={dogsPerPg}
            allDogs={allDogs.length}
            paginado={paginado}
          />
          <ul className={styles.dogsGrid}>
            {currentDogs?.map((el) => (
              <div key={el.id}>
                <Link to={"/dogs/" + el.id}>
                  <Card
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    weight={el.weight}
                    key={el.id}
                  />
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    
  );
}
