const axios = require('axios');
const {Dog, Temperament} = require('../db');
require('dotenv').config();
const { DB_API_KEY }= process.env

const dogsApi = async(req, res)=> {
    try{
      const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`)
      const apiInfo = await urlApi.data.map(i =>{
          return {
              id: i.id,
              name: i.name,
              height: i.height.metric,
              weight: i.weight.metric,
              temperament: i.temperament,
              image: i.image.url,
          }
      })
      return apiInfo   
    } catch (error){
      console.log(error);
    }
};

const dataBInfo = async()=>{
    return await Dog.findAll({
        include:{
            model:Temperament,
            atributes: ['name'],
            through:{
                atributes:[],
            },
        }
    })
}

const dogsByNames = async (req, res)=>{
    const { name } = req.params;
    const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    const apiInfo = await urlApi.data.map(d =>{
        return{
            id: d.id,
            name: d.name,
            height: d.height.metric,
            weight: d.weight.metric,
            temperament: d.temperament,
            life_span: d.life_span,
            image: d.image.url
        }
    })
    let finDogs = await dataBInfo();
    const dBFilterName = finDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))

    const resultInfo = apiInfo.concat(dBFilterName)
    if (resultInfo.length > 0 ){
        res.status(200).json(resultInfo)
    }else{
        res.json('Dog does not exist');
    }
    
}

const infoApiDB = async()=>{
    const apiInfo = await dogsApi();
    const dataBIn = await dataBInfo();
    const finalInfo = apiInfo.concat(dataBIn);
    return finalInfo;
}


const findDogs = async(req, res)=>{
    const { name } = req.query;
    const allDogs = await infoApiDB();
    if(name){
        let dogName = await allDogs.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length? res.status(200).send(dogName) : res.status(404).send('Dog could not be found');
    }else{
        res.status(200).send(allDogs)
    }
}

const findDogById = async(req, res)=>{
    const { id } = req.params;
    const allDogs = await infoApiDB();
       if(id){
        let dogId = await allDogs.filter(d => d.id == id);
         dogId.length? res.status(200).json(dogId): res.status(404).send('Dog could not be found');
     } 

}

const createDogs = async(req, res)=>{
    const { name, height, weight, temperament, life_span, image} = req.body;

    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image
    })
    const Temperamento = await Temperament.findAll({
        where: {name:temperament}
    })
    newDog.addTemperament(Temperamento);
    res.send('The dog has been created successfully');

}

module.exports = {findDogById, findDogs, createDogs, dogsByNames}