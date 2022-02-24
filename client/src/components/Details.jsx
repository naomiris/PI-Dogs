import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dogDetail, getClean } from "../actions";
import { useParams } from "react-router";
import styles from "./styles/Detail.module.css";

export default function Detail(props) {
    console.log("props", props);
    const dispatch = useDispatch();
    const { id } = useParams();

    const dogDetalle = useSelector((state) => state.dogsDetail);
    console.log("dogdetalle", dogDetalle);
    useEffect(() => {
        dispatch(dogDetail(id));
        return () => {dispatch(getClean())}
    }, [dispatch, id]);

    return (
        <>
                {dogDetalle.length > 0 ? (
                    <div className={styles.container}>
                            <Link to="/home">
                    <button className={styles.button}>Back Home</button>
                </Link>
                        <div className={styles.name}>
                            <h1>I'm {dogDetalle[0].name}</h1>
                            </div>
                            <img
                                src={
                                    dogDetalle[0]?.img? dogDetalle[0]?.img : dogDetalle[0]?.image
                                }
                                alt="img not found"
                                width="350px"
                                height="350px"
                            />
                            <div className={styles.cont}>
                        <div className={styles.temp}>
                            <span>
                                My temperaments are:{" "}
                                {dogDetalle[0].temperament
                                    ? dogDetalle[0].temperament
                                    : dogDetalle[0]?.Temperaments?.map((el) => {
                                          return <span>{el.name + ", "}</span>;
                                      })}
                            </span>
                        </div>
                        <div>
                            <span>
                            height : {dogDetalle[0].height_min + '-'+ dogDetalle[0].height_max} 
                            </span>
                        </div>
                        <div>
                            <span>
                            weight : {dogDetalle[0].weight_min + '-'+ dogDetalle[0].weight_max} kgs
                            </span>
                        </div>
                        <div>
                            <span>
                            Life span : {dogDetalle[0].life_span}
                            </span>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className={styles.loading}></div>
                    )}
                
        </>
    );
}
