import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions/index";
import styles from "./styles/SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import swal from 'sweetalert';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); 

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
            swal("Insert a correct name to search");
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
                value={name}
            ></input>
        </div>
    );
}
