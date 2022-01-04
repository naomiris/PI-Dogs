const axios = require("axios");
const { Temperament } = require("../db");
require("dotenv").config();
const { DB_API_KEY } = process.env;

//Me traigo los temperamentos de la api
//Y logica para busca

const dogsTemperament = async (req, res) => {
    try {
        const temperamentApi = await axios.get(
            `https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`
        );
        //   console.log("temperamentApi",temperamentApi);
        //hago un mapeo de los temperamentos traidos de la api y se guardan en una variable
        const hasTemperament = temperamentApi.data.map((d) =>
            d.temperament ? d.temperament : "Has not temperaments"
        );
        //   console.log(hasTemperament);
        //hastemp es un array con todos los temperamentos
        const splitTemp = hasTemperament.map((t) => t.split(", "));
        // console.log("split", splitTemp);

        let setTemp = new Set(splitTemp.flat()); // el set saca los temperamentos repedidos, y el flat los saca del array
        //  console.log('set',setTemp)
        for (t of setTemp) { // itera por cada temp del array setTemp
            if (t)
                await Temperament.findOrCreate({  //findOrCreate ->chequea si el temperamento existe en la tabla Temperament, si no existe lo crea
                    where: { name: t },
                });
        }
        const temperamentDB = await Temperament.findAll();
        res.status(200).json(temperamentDB);
    } catch (error) {
        res.status(404).send("There are not temperaments found" + error);
    }
};

module.exports = { dogsTemperament };
