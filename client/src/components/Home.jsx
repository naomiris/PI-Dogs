import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllDogs,
    getTemperaments,
    filterDogsByTemperaments,
    orderByName,
    filterByDbApi,
    orderByWeight,
} from "../actions/index.js";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import styles from "./styles/Home.module.css";

export default function Home() {
    const dispatch = useDispatch(); // HOOK que reemplaza mapDispatchToProps, creo una instancia de la funcion 
 
//  ME TRAIGO LOS ESTADOS GLOBALES QUE SE NECESITAN EN ESTE COMPONENTE
    const allDogs = useSelector((state) => state.dogs); // me traigo el arreglo del estado del reducer
    console.log(allDogs);
    
    const temperaments = useSelector((state) => state.temperaments);


// PAGINADO
    const [orden, setOrden] = useState("");
    const [currentPg, setCurrentPg] = useState(1); // me guarda en un estado local la pagina actual, va a ser 1
    const [dogsPerPg, setDogsPerPg] = useState(8); // me guardo en un estado local cuantos perros por pagina
    const numberOfLastDog = currentPg * dogsPerPg; // 8
    const numberOfFirstDog = numberOfLastDog - dogsPerPg; // 0
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog); // me devuelve un arreglo desde el primer perro hasta el ultimo que seria el 6to en la primera pag, esto va a cambiar dependiendo de la pagina en el que este
    //slice: de un arreglo toma una porcion de ese arreglo dependiendo de lo que se le pasa por paramentro
    // console.log("aca", currentDogs);

//PAGINA ACTUAL
    const paginado = (pageNum) => {
        setCurrentPg(pageNum); // el paginado va a ir seteando la pagina en el numero que yo vaya apretando
    };


    
    //ComponentDidMount
    useEffect(
        (e) => {
            //me traigo los perros y los temperamentos cuando el componente se monta
            dispatch(getAllDogs());
            dispatch(getTemperaments());
        },
        [dispatch]
    );

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs()); //vuleve a cargar los perros cuando hace el click
        window.location.reload(); // recargar la pagina
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPg(1);
        setOrden(`Sorted${e.target.value}`);
    }

    function handleFilterTemperament(e) {
        dispatch(filterDogsByTemperaments(e.target.value)); //el e.target.value va a ser el valor del value{temp.name}
    }

    function handleFilterbyDbApi(e) {
        dispatch(filterByDbApi(e.target.value));
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPg(1);
        setOrden(`Sorted${e.target.value}`);
    }

    return (
        <div>
            <SearchBar />
            <div className={styles.conteButton}>
                <button
                    className={styles.button}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                >
                    Reload dogs
                </button>
            </div>

            <div className={styles.contenedor}>
                <select
                    htmlFor="select"
                    className={styles.temperamento}
                    onChange={(e) => handleFilterTemperament(e)}
                >
                    <option value="Temperaments">Temperaments</option>
                    {temperaments.map((temp) => (
                        <option value={temp.name} key={temp.id}>
                            {temp.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.conteAll}>
                <select
                    className={styles.all}
                    onChange={(e) => handleFilterbyDbApi(e)}
                >
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Existing">Existing</option>
                </select>
            </div>
            <div className={styles.contweight}>
                <select
                    htmlFor="select"
                    className={styles.weight}
                    onChange={(e) => handleSortByWeight(e)}
                >
                    <option value="ascWeight"> weight ↑</option>
                    <option value="descWeight"> weight ↓</option>
                </select>
            </div>

            <div className={styles.contenedor2}>
                <label htmlFor="select"> </label>
                <select
                    className={styles.orden}
                    onChange={(e) => handleSort(e)}
                >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <Paginado // son las props que necesita el componente paginado
                dogsPerPg={dogsPerPg} //le paso el estado local
                allDogs={allDogs.length} //si tiene algo el arreglo de alldogs
                paginado={paginado}
            />
            <div className={styles.dogsCard}>
                <ul className={styles.dogsGrid}>
                    {currentDogs?.map((el) => (
                        <div key={el.id}>
                            <Link to={"/dogs/" + el.id}>
                                <Card
                                    name={el.name}
                                    img={el.img}
                                    temperament={el.temperament}
                                    weight={
                                        el?.weight_min + "-" + el?.weight_max
                                    }
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
