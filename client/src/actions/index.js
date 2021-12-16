import axios from "axios";

export function getAllDogs() {
  return async function (dispatch) {
    const jsonInfo = await axios.get("http://localhost:3005/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: jsonInfo.data,
    });
  };
}
export function getDogsName(name) {
  return async function (dispatch) {
    try {
      var dogsByName = await axios.get(
        "http://localhost:3005/dogs?name=" + name
      );
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: dogsByName.data,
      });
    } catch (error) {
      console.log("name does not exist in data base, create a dog" + error);
    }
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    const temperamentos = await axios.get("http://localhost:3005/temperaments");
    console.log("temp", temperamentos);
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temperamentos.data,
    });
  };
}
export function filterDogsByTemperaments(payload) {
  console.log("payloadd", payload);
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function createDog(payload){
    return async function (dispatch){
        const data = await axios.post("http://localhost:3005/dog", payload);
        console.log(data);
        return data;
    }
}
export function dogDetail (id){
  return async function (dispatch){
    try{
      const dataId = await axios.get("http://localhost:3005/dogs/" + id)
      console.log('id',dataId);
      return dispatch({
        type: "DOG_DETAIL",
        payload: dataId.data
      })
    }catch(error){
      console.log(error);
    }
  }
}
