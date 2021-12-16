const axios = require('axios');
const {Temperament} = require('../db');
require('dotenv').config();
const { DB_API_KEY }= process.env

const dogsTemperament = async (req, res)=>{
    try{
      const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`);
      console.log(temperamentApi);
      const hasTemperament = temperamentApi.data.map(d => d.temperament? d.temperament: "Has not temperaments" );
      const splitTemp = hasTemperament.map(t => t.split(', '))
      console.log(splitTemp);

     let setTemp = new Set (splitTemp.flat()); // el set saca los temperamentos repedidos, y el flat los saca del array 
     for (t of setTemp) {if (t) await Temperament.findOrCreate({
         where: {name : t }})
     }
      const temperamentDB = await Temperament.findAll();
      res.status(200).json(temperamentDB);
    }catch(error){
        res.status(404).send('There are not temperaments found' + error);
    }
}

module.exports = {dogsTemperament}