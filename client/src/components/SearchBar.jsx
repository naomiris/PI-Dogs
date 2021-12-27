import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions/index";
import styles from './styles/SearchBar.module.css';
import { AiOutlineSearch } from "react-icons/ai";


export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        
        console.log(name);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(name !==''){
            dispatch(getDogsName(name));
            setName('')
        }
        else{
            alert("Insert a correct name to search")
        }
    }

    return (
    //     <div className={styles.contenedor}>
    //         <input
    //         type="text"
    //         placeholder="Search dogs..." className={styles.search}
    //         onChange= {handleInputChange}
    //         value={name}
    //         />
    //         <button type='submit'onClick={handleSubmit} className={styles.button}>Search</button>
    //     </div>
    // )
    <div className={styles.search_box}>
    <button className={styles.btn_search} onClick={handleSubmit} type='submit'> <AiOutlineSearch/></button>
    <input type="text" className={styles.input_search} placeholder="Search dog..."  onChange= {handleInputChange}></input>

</div>
)
}