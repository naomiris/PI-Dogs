import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, createDog } from "../actions";
import NavBar from "./NavBar";

export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    image: "",
    name: "",
    temperament: [],
    weight: "",
    height: "",
    life_span: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
      setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        console.log(input)
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
  function handleSubmit(e) {
    e.preventDefault();
    console.log("input",input);
    dispatch(createDog(input));
    alert("Dog created successfully");
    setInput({
      image: "",
      name: "",
      temperament: [],
      weight: "",
      height: "",
      life_span: "",
    });
    history.push("/home");
  }

  return (
    <div>
    <NavBar/>
      <h1>Create your dog!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            autoComplete="off"
            type="text"
            value={input.name}
            name="name"
            placeholder="Complete with a name!"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="temperaments"> Temperaments:</label>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          <ul>
            <li >
              {input.temperament.map((el) => (
                <button type="button" key={el.id} onClick={() => handleDelete(el)}>
                  {el + " , "}
                </button>
              ))}
            </li>
          </ul>
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>height:</label>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Life span:</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Create new dog</button>
      </form>
    </div>
  );
}
