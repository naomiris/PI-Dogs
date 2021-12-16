import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../actions/index";


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
        <div>
            <input
            type="text"
            placeholder="Search dogs..."
            onChange= {handleInputChange}
            value={name}
            />
            <button type='submit'onClick={handleSubmit}>Search</button>
        </div>
    )
}