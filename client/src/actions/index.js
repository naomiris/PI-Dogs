import axios from 'axios';

export function getAllDogs (){
    return async function(dispatch){
        const jsonInfo = await axios.get('http://localhost:3005/dogs');
        console.log(jsonInfo);
        return dispatch ({
            type: 'GET_DOGS',
            payload: jsonInfo.data
        })
    }
}

