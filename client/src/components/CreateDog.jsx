import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import styles from "./styles/CreateDog.module.css";

function validate(input) {
    let errors = {};
    if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
        errors.name =
            "Insert first letter in uppercase, only letters and numbers";
    }
    if (!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
        errors.weight_min = "Min value must be a number, comma is not allow";
    }
    if (!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
        errors.weight_max = "Max value must be a number, comma is not allow";
    }
    if (input.weight_max <= input.weight_min) {
        errors.weight_min = "Min value cannot be greater or equal to max value";
    }
    if (!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
        errors.height_min = "Min value must be a number, comma is not allow";
    }
    if (!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
        errors.height_max = "Max value must be a number, comma is not allow";
    }
    if (input.height_max <= input.height_min) {
        errors.height_min = "Min value cannot be greater or equal to max value";
    }
    if (
        input.img &&
        !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img)
    ) {
        errors.img = "Must be an URL or left empty for default image";
    }
    if (input.temperament.length <= 2) {
        errors.temperament = "Requiered at least 3 temperaments";
    }
    if (!input.life_span || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span)) {
        errors.life_span =
            "Life span value must be numbers, comma is not allow";
    }
    return errors;
}

export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    console.log("temperaments", temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        img: "",
        name: "",
        temperament: [],
        weight_max: "",
        weight_min: "",
        height_max: "",
        height_min: "",
        life_span: "",
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(input);
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value],
        });
    }
    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== el),
        });
    }
    const ErroresValidacion=()=>{
        debugger
            if(!input.weight_min) {alert("Min weight must be completed"); return false;}
            if(!input.name) {alert("Name must be completed"); return false;}
            if(!input.weight_max) {alert("Max weight must be completed"); return false;}
            if(!input.height_min) {alert("Min height must be completed"); return false;}
            if(!input.height_max) {alert("Max height must be completed"); return false;}
            if(!input.temperament) {alert("Must have at least 3 temperaments"); return false;}
            if(!input.life_span) {alert("Life span must be completed"); return false;}
            return true;
          }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("input", input);
        if(ErroresValidacion()){
            if (
                Object.keys(errors).length === 0 &&
                input.name !== "" &&
                input.height_min !== "" &&
                input.height_max !== "" &&
                input.weight_min !== "" &&
                input.weight_max !== "" &&
                input.life_time_min !== "" &&
                input.life_time_max !== "" &&
                input.temperament.length !== 0
            )
                dispatch(createDog(input));
            alert("Dog created successfully");
            setInput({
                img: "",
                name: "",
                temperament: [],
                weight_max: "",
                weight_min: "",
                height_max: "",
                height_min: "",
                life_span: "",
            });
            history.push("/home");
        }
        
    }

    return (
        <div>
            <form
                className={styles.contenedor}
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className={styles.titulo}>Create your dog!</h1>
                <div className={styles.image}>
                    <label>Image: </label>
                    <input
                        type="text"
                        value={input.img}
                        name="img"
                        placeholder="Image url..."
                        onChange={(e) => handleChange(e)}
                        className={styles.inputImage && styles.danger}
                    />
                    {errors.img && <p className={styles.error}>{errors.img}</p>}
                </div>

                <div className={styles.name}>
                    <label>Name: </label>
                    <input
                        autoComplete="off"
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder="Complete with a name!"
                        onChange={(e) => handleChange(e)}
                        required
                        className={styles.inputImage && styles.danger}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label
                        className={styles.temperament}
                        htmlFor="temperaments"
                    >
                        {" "}
                        Temperaments:{" "}
                    </label>
                    <select
                        className={styles.inputImage}
                        onChange={(e) => handleSelect(e)}
                    >
                        {temperaments.map((temp) => (
                            <option value={temp.name} key={temp.id}>
                                {temp.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        <li>
                            {input.temperament.map((el) => (
                                <button
                                    type="button"
                                    key={el.id}
                                    className={styles.danger}
                                    onClick={() => handleDelete(el)}
                                >
                                    <li className={styles.li}>{el + ", "}</li>
                                </button>
                            ))}
                        </li>
                    </ul>
                    {errors.temperament && (
                        <p className={styles.error}>{errors.temperament}</p>
                    )}
                </div>

                <div>
                    <label className={styles.weight}>Max weight:</label>
                    <input
                        type="text"
                        value={input.weight}
                        name="weight_max"
                        onChange={(e) => handleChange(e)}
                        placeholder=" max weight"
                        className={styles.inputImage && styles.danger}
                    />
                    Kgs
                    {errors.weight_max && (
                        <p className={styles.error}>{errors.weight_max}</p>
                    )}
                </div>
                <div>
                    <label className={styles.weight}>Min weight:</label>
                    <input
                        type="text"
                        value={input.weight}
                        name="weight_min"
                        onChange={(e) => handleChange(e)}
                        placeholder=" min weight"
                        className={styles.inputImage && styles.danger}
                    />
                    Kgs
                    {errors.weight_min && (
                        <p className={styles.error}>{errors.weight_min}</p>
                    )}
                </div>

                <div>
                    <label className={styles.height}>Max height:</label>
                    <input
                        type="text"
                        value={input.height}
                        name="height_max"
                        onChange={(e) => handleChange(e)}
                        placeholder=" max height"
                        className={styles.inputImage && styles.danger}
                    />
                    {errors.height && (
                        <p className={styles.error}>{errors.height_max}</p>
                    )}
                </div>
                <div>
                    <label className={styles.height}>Min height:</label>
                    <input
                        type="text"
                        value={input.height}
                        name="height_min"
                        onChange={(e) => handleChange(e)}
                        placeholder=" min height"
                        className={styles.inputImage && styles.danger}
                    />
                    {errors.height && (
                        <p className={styles.error}>{errors.height_min}</p>
                    )}
                </div>

                <div>
                    <label className={styles.life_span}>Life span:</label>
                    <input
                        type="text"
                        value={input.life_span}
                        name="life_span"
                        onChange={(e) => handleChange(e)}
                        className={styles.inputImage && styles.danger}
                    />
                    Years
                    {errors.life_span && (
                        <p className={styles.danger && styles.error}>
                            {errors.life_span}
                        </p>
                    )}
                </div>
                {!errors.name &&
                !errors.height_max &&
                !errors.height_min &&
                !errors.weight_max &&
                !errors.weight_min &&
                !errors.life_span ? ( 
                    <button className={styles.boton} type="submit">
                        Create new dog
                    </button>
                ) : (
                    <p className={styles.p}> All fields must be completed </p>
                )}
            </form>
        </div>
    );
}
