import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dogDetail } from "../actions";
import { useParams } from "react-router";

export default function Detail(props){
    console.log("props",props);
    const dispatch = useDispatch();
    const { id } = useParams()

    const dogDetalle = useSelector((state)=> state.dogsDetail)
    console.log('dogdetalle',dogDetalle)
    useEffect(()=>{
        dispatch(dogDetail(id));
    },[dispatch])


    return(

        <>
        {
            dogDetalle.length >0 ?
            <div>
                <h1>I'm {dogDetalle[0].name}</h1>
                <img src={dogDetalle[0].image} alt='img not found' width='200px' height='200px'/>
                <h2>Temperaments:{dogDetalle[0].temperament}</h2>
            </div> : <p>Loading...</p>
        }
        {/* <Link to='/home'>
            <button>Home</button>
        </Link> */}

        </>
    )
}