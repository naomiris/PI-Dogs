import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import styles from "./styles/CreateDog.module.css";

export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory();

    const temperaments = useSelector((state) => state.temperaments); //ME TRAIGO EL ESTADO
    // console.log("temperaments", temperaments);

    // const [errors, setErrors] = useState({}); //SETEO UN ESTADO PARA LOS ERRORES

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
        // setErrors(
        //     ErroresValidacion({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     })
        // );
        console.log(input);
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value], // se agrega el temperamento seleccionado al array de temperamentos
        });
    }
    function handleDelete(el) {
       
        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== el), // hago un filtrado para eliminar el temperamento seleccionado del array de temperamentos
        });
    }

    // VALIDACION
    const ErroresValidacion = () => {
        if (
            !input.name ||
            !input.weight_max ||
            !input.weight_min ||
            !input.height_min ||
            !input.height_max ||
            !input.temperament ||
            !input.life_span
        ) {
            alert("All fields must be completed");
            return false;
        }

        return true;
    };

    function handleSubmit(e) {
        e.preventDefault();
        // console.log("input", input);
        if (ErroresValidacion()) {
            dispatch(createDog(input));
            alert("Dog created successfully");
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
            alert("All fields must be completado");
        }
    }

    return (
        <div>
            <form
                className={styles.contenedor}
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className={styles.titulo}>Create your dog!</h1>

                <div className={styles.todo}>
                    {/* IMAGEN */}
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
                    </div>
                   

                    {/* NAME */}
                    <div className={styles.name}>
                        <label>Name: </label>
                        <input
                            autoComplete="off"
                            type="text"
                            value={input.name}
                            name="name"
                            placeholder="Complete with a name!"
                            onChange={(e) => handleChange(e)}
                            className={styles.danger}
                        />

                      </div>
                    {/* WEIGHT */}
                    <div>
                        <label className={styles.weight}>Max weight:</label>
                        <input
                            type="text"
                            value={input.weight}
                            name="weight_max"
                            onChange={(e) => handleChange(e)}
                            placeholder=" kg"
                            className={ styles.danger}
                        />
                    </div>
                    <div>
                        <label className={styles.weight}>Min weight:</label>
                        <input
                            type="text"
                            value={input.weight}
                            name="weight_min"
                            onChange={(e) => handleChange(e)}
                            placeholder=" kg"
                            className={ styles.danger}
                        />
                    </div>

                    {/* HEIGHT */}
                    <div>
                        <label className={styles.height}>Max height:</label>
                        <input
                            type="text"
                            value={input.height}
                            name="height_max"
                            onChange={(e) => handleChange(e)}
                            placeholder=" max height"
                            className={ styles.danger}
                        />
                    </div>
                    <div>
                        <label className={styles.height}>Min height:</label>
                        <input
                            type="text"
                            value={input.height}
                            name="height_min"
                            onChange={(e) => handleChange(e)}
                            placeholder=" min height"
                            className={ styles.danger}
                        />
                    </div>

                    {/* TEMPERAMENTS */}
                    <div>
                        <label
                            className={styles.temperament}
                            htmlFor="temperaments"
                        >
                            Temperaments:{" "}
                        </label>
                        <select
                            className={styles.inputTemp}
                            onChange={(e) => handleSelect(e)}
                        >
                            {temperaments.map((temp) => (
                                <option value={temp.name} key={temp.id}>
                                    {temp.name}
                                </option>
                            ))}
                        </select>
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
                            </li>
                        </ul>
                    </div>

                    {/* LIFE SPAN */}
                    <div>
                        <label className={styles.life_span}>Life span:</label>
                        <input
                            type="text"
                            value={input.life_span}
                            name="life_span"
                            onChange={(e) => handleChange(e)}
                            className={ styles.danger}
                        />
                    </div>
                </div>

                <button
                    
                    className={styles.boton}
                    type="submit"
                >
                    Create new dog
                </button>
            </form>
        </div>
        
    );
}
