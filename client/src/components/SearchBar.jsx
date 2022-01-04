import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions/index";
import styles from "./styles/SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); //estado local el cual va a ir tomando los valores del e.target.value(lo que se escribe en el input) con la funcion handlechange

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }


    function handleSubmit(e) {
        debugger
        e.preventDefault();
        if (name !== "") {
            dispatch(getDogsName(name));
            setName("");
        } else {
            alert("Insert a correct name to search");
        }
    }

    return (
        <div className={styles.search_box}>
            <button
                className={styles.btn_search}
                onClick={handleSubmit}
                type="submit"
            >
                {" "}
                <AiOutlineSearch />
            </button>
            <input
                type="text"
                className={styles.input_search}
                placeholder="Search dog..."
                onChange={handleInputChange}
            ></input>
        </div>
    );
}
