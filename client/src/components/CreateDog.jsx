import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import styles from "./styles/CreateDog.module.css";
import swal from "sweetalert";

export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory();

    const temperaments = useSelector((state) => state.temperaments);
    // console.log("temperaments", temperaments);

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

    //Component did Mount
    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e) {
        //SE MODIFICA MI ESTADO INPUT CON LO QUE ME PASAN POR INPUT EN EL FORM
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            ErroresValidacion({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(input);
    }

    function handleSelect(e) {
        if (input.temperament.includes(e.target.value)) {
            return null;
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value], //set
            });
        }
    }
    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== el),
        });
    }

    // VALIDACION
    const ErroresValidacion = () => {
        let errors = {};
        if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
            errors.name = "Insert first letter in uppercase";
        }
        if (
            !input.weight_min ||
            !input.weight_min > 1 ||
            !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)
        ) {
            errors.weight_min =
                "Min value must be a number greater than 1, comma is not allow";
        }
        if (!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
            errors.weight_max =
                "Max value must be a number  greater than 1, comma is not allow";
        }
        if (input.weight_max <= input.weight_min) {
            errors.weight_min =
                "Min value cannot be greater or equal to max value";
        }
        if (!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
            errors.height_min =
                "Min value must be a number greater than 1, comma is not allow";
        }
        if (!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
            errors.height_max =
                "Max value must be a number greater than 1, comma is not allow";
        }
        if (input.height_max <= input.height_min) {
            errors.height_min =
                "Min value cannot be greater or equal to max value";
        }
        if (
            input.img &&
            /[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(
                input.img
            )
        ) {
            errors.img = "Must be an URL or left empty for default image";
        }
        if (input.temperament.length < 2) {
            errors.temperament = "Requiered at least 3 temperaments";
        }
        if (!input.life_span || !/^[A-Za-z0-9\s]+$/.test(input.life_span)) {
            errors.life_span = "Life span can be numbers and letters";
        }
        return errors;
    };

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("input", input);
        if (ErroresValidacion()) {
            dispatch(createDog(input));
            swal({
                title: "Dog Created Successfully",
                text: "check out your dog in the home page",
                icon: "success",
                button: "Aceptar",
            });
            debugger;
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
            debugger;
            history.push("/home");
        } else {
            swal({
                title: "Complete all fields",
                icon: "warning",
                button: "Aceptar",
            });
        }
    }

    return (
        <>
            <form
                className={styles.contenedor}
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className={styles.titulo}>Create your dog!</h1>

                {/* IMAGEN */}
                <div className={styles.inputdiv}>
                    <input
                        type="text"
                        value={input.img}
                        name="img"
                        placeholder="Image url..."
                        onChange={(e) => handleChange(e)}
                        className={styles.inputImage}
                    />
                    {errors.img && <p className={styles.error}>{errors.img}</p>}
                </div>

                {/* NAME */}
                <div className={styles.inputdiv}>
                    <input
                        autoComplete="off"
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder="Complete with a name!"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
                </div>
                {/* WEIGHT */}
                <div className={styles.inputdivhalf}>
                    <div>
                    <input
                        type="text"
                        value={input.weight}
                        name="weight_max"
                        onChange={(e) => handleChange(e)}
                        placeholder=" kg"
                    />
                    <input
                        type="text"
                        value={input.weight}
                        name="weight_min"
                        onChange={(e) => handleChange(e)}
                        placeholder=" kg"
                    />
                    </div>
                    {errors.weight_min && (
                        <p className={styles.error}>{errors.weight_min}</p>
                    )}
                    {errors.weight_max && (
                        <p className={styles.error}>{errors.weight_max}</p>
                    )}
                </div>

                {/* HEIGHT */}
                <div className={styles.inputdivhalf}>
                    <div>
                    <input
                        type="text"
                        value={input.height}
                        name="height_max"
                        onChange={(e) => handleChange(e)}
                        placeholder=" max height"
                    />

                    <input
                        type="text"
                        value={input.height}
                        name="height_min"
                        onChange={(e) => handleChange(e)}
                        placeholder=" min height"
                    />
                    </div>
                    {errors.height_min && (
                        <p className={styles.error}>{errors.height_min}</p>
                    )}
                    {errors.height_max && (
                        <p className={styles.error}>{errors.height_max}</p>
                    )}
                </div>
                {/* TEMPERAMENTS */}
                <div className={styles.inputdiv}>
                    <select
                        className={styles.inputTemp}
                        onChange={(e) => handleSelect(e)}
                    >
                        <option value="">-Choose three or more-</option>
                        {temperaments.map((temp) => (
                            <option value={temp.name} key={temp.id}>
                                {temp.name}
                            </option>
                        ))}
                    </select>
                    <div className={styles.inputDiv}>
                        <ul className={styles.ul}>
                            <li>
                                {/* muestra los temperamentos seleccionados */}
                                {input.temperament.map((el) => (
                                    <button
                                    type="button"
                                    key={el.id}
                                    className={styles.danger}
                                    onClick={() => handleDelete(el)}
                                    >
                                    
                                        <li className={styles.li}>
                                            {el + ", "}
                                        </li>
                                    </button>
                                ))}
                                {errors.temperament && (
                                    <p className={styles.error}>
                                        {errors.temperament}
                                    </p>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* LIFE SPAN */}
                <div className={styles.inputdiv}>
                    <input
                        placeholder="life span"
                        type="text"
                        value={input.life_span}
                        name="life_span"
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.life_span && (
                        <p className={styles.error}>{errors.life_span}</p>
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
        </>
    );
}
