import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import styles from "./styles/CreateDog.module.css";
// import perrito from "./images/perrito.jpg";
// import style from "./styles/Modal.module.css";

function validate(input) {
    let errors = {};
    if (!input.name || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)) {
        errors.name =
            "Insert first letter in uppercase";
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
    if (!input.life_span || !/^[A-Za-z0-9\s]+$/.test(input.life_span)) {
        errors.life_span =
            "Life span can be numbers and letters";
    }
    return errors;
}

export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory();

    const temperaments = useSelector((state) => state.temperaments); //ME TRAIGO EL ESTADO 
    // console.log("temperaments", temperaments);

    const [errors, setErrors] = useState({}); //SETEO UN ESTADO PARA LOS ERRORES

    //  Model states

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



  
    function handleChange(e) { //SE MODIFICA MI ESTADO INPUT CON LO QUE ME PASAN POR INPUT EN EL FORM 
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
            temperament: [...input.temperament, e.target.value], // se agrega el temperamento seleccionado al array de temperamentos
        });
    }
    function handleDelete(el) {
        debugger
        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== el), // hago un filtrado para eliminar el temperamento seleccionado del array de temperamentos
        });
    }

    // VALIDACION 
    const ErroresValidacion = () => {
        debugger;
        if(!input.name || !input.weight_max || !input.weight_min || !input.height_min || !input.height_max || !input.temperament || !input.life_span){
            alert("All fields must be completed");
            return false;
        }
       
        return true;
    };
    function handleSubmit(e) {
        debugger
        e.preventDefault();
        // console.log("input", input);
        if (ErroresValidacion()) {
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
            debugger
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
            debugger
            history.push("/home");
        }
    }

    //MODAL
    // const [modal, setModal] = useState(false);

    // const toggleModal = () => {
    //     setModal(!modal);
    // };

    return (
        <div>
            <form
                className={styles.contenedor}
                onSubmit={(e) => handleSubmit(e)} >

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
                    {errors.img && <p className={styles.error}>{errors.img}</p>}
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

                        className={ styles.danger}
                    />
                    {errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    )}
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
                        placeholder=" kg"
                        className={ styles.danger}
                    />
                    {errors.weight_min && (
                        <p className={styles.error}>{errors.weight_min}</p>
                    )}
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
                        className={ styles.danger}
                    />
                    {errors.height && (
                        <p className={styles.error}>{errors.height_min}</p>
                    )}
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
                                    <li className={styles.li}>{el + ", "}</li>
                                </button>
                            ))}
                        </li>
                    </ul>
                    {errors.temperament && (
                        <p className={styles.error}>{errors.temperament}</p>
                    )}
                </div>

                                {/* LIFE SPAN */}
                <div>
                    <label className={styles.life_span}>Life span:</label>
                    <input
                        type="text"
                        value={input.life_span}
                        name="life_span"
                        onChange={(e) => handleChange(e)}
                        className={styles.danger}
                    />
                    {errors.life_span && (
                        <p className={styles.error}>{errors.life_span} </p>
                    )}
                    </div>
                    
                </div>
                {!errors.name &&
                !errors.height_max &&
                !errors.height_min &&
                !errors.weight_max &&
                !errors.weight_min &&
                !errors.life_span ? (
                   
                        <button
                            // onClick={toggleModal}
                            className={styles.boton}
                            type="submit">
                            Create new dog
                        </button> 
                   
                       
                ) : (
                    <p className={styles.p}> All fields must be completed </p>
                )}
            </form>
            {/* <>
                {errors.name &&
                errors.height_max &&
                errors.height_min &&
                errors.weight_max &&
                errors.weight_min &&
                errors.life_span ? null : modal && (
                    <div className={style.modal}>
                        <div className={style.overlay}>
                            <div className={style.content}>
                                <button
                                    className={style.close}
                                    onClick={toggleModal}
                                >
                                    x
                                </button>
                                <img
                                    src={perrito}
                                    alt=""
                                    className={style.img}
                                />
                                <div className={style.modal_textos}>
                                    <h2>Your dog was created successfully!</h2>
                                    <p>
                                        Now go check out your dog at the home
                                        page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </> */}
          
        </div>
    );
}
