/* eslint-disable no-unused-vars */
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
    const dispatch = useDispatch(); // HOOK

    const allDogs = useSelector((state) => state.dogs);
    console.log(allDogs);

    const temperaments = useSelector((state) => state.temperaments);

    const dogsBreed = useSelector((state) => state.dogsBreed);
    console.log("breed", dogsBreed);

    // PAGINADO
    const [orden, setOrden] = useState("");
    const [currentPg, setCurrentPg] = useState(1); //  la pagina actual, va a ser 1
    const [dogsPerPg, setDogsPerPg] = useState(8);
    const numberOfLastDog = currentPg * dogsPerPg; // 8
    const numberOfFirstDog = numberOfLastDog - dogsPerPg; // 0
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
    // console.log("aca", currentDogs);

    //PAGINA ACTUAL
    const paginado = (pageNum) => {
        setCurrentPg(pageNum); // el paginado va a ir seteando la pagina en el numero que yo vaya apretando
    };

    //ComponentDidMount
    useEffect(
        (e) => {
            dispatch(getAllDogs());
            dispatch(getTemperaments());
        },
        [dispatch]
    );

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs());
        window.location.reload();
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPg(1);
        setOrden(`Sorted${e.target.value}`);
    }

    function handleFilterTemperament(e) {
        dispatch(filterDogsByTemperaments(e.target.value));
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
        <>
            <div className={styles.burbuja}>
                <div className={styles.sortsfilterdiv}>
                <label htmlFor="select" className={styles.sorting}>
                <select
                    className={styles.ordenAlpha}
                    onChange={(e) => handleSort(e)}
                >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                </label>
                <label htmlFor="select" className={styles.sorting}>
                <select
                    htmlFor="select"
                    className={styles.weight}
                    onChange={(e) => handleSortByWeight(e)}
                >
                    <option value="ascWeight"> weight ↑</option>
                    <option value="descWeight"> weight ↓</option>
                </select>
                </label>
                <button
                    className={styles.button}
                    onClick={(e) => {
                        handleClick(e);
                    }}
                >
                    Reload dogs
                </button>
                </div>
                    <div className={styles.sortsfilterdiv}>
                <select
                    htmlFor="select"
                    className={styles.select }
                    onChange={(e) => handleFilterTemperament(e)}
                >
                    <option value="Temperaments">Temperaments</option>
                    {temperaments.map((temp) => (
                        <option value={temp.name} key={temp.id}>
                            {temp.name}
                        </option>
                    ))}
                </select>

                <select
                    className={styles.select}
                    onChange={(e) => handleFilterbyDbApi(e)}
                >
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Existing">Existing</option>
                </select>
                </div>
            <div className={styles.divsearch}>
            <SearchBar />
            </div>
            </div>

              
            <Paginado // son las props que necesita el componente paginado
                dogsPerPg={dogsPerPg}
                allDogs={allDogs.length}
                paginado={paginado}
            />
            {/* Renderizado de las cards */}
            <div className={styles.dogsCard}>
                <ul className={styles.dogsGrid}>
                    {currentDogs.length > 0 ? (
                        currentDogs.map((el) => (
                            <div key={el.id}>
                                <Link to={"/dogs/" + el.id}>
                                    <Card
                                        name={el.name}
                                        img={el.img}
                                        temperament={el.temperament}
                                        weight={
                                            el?.weight_min +
                                            "-" +
                                            el?.weight_max
                                        }
                                        key={el.id}
                                    />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className={styles.loading}></div>
                    )}
                </ul>
            </div>
        </>
    );
}
