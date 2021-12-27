const axios = require('axios');
const {Dog, Temperament} = require('../db');
require('dotenv').config();
const { DB_API_KEY }= process.env

//llamo al endpoint de la api para traerme la info
const dogsApi = async(req, res)=> {
    try{
      const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`)
      const apiInfo = await urlApi.data.map(i =>{
          return {
              id: i.id,
              name: i.name,
              height_max: i.height.metric.split("-")[1] &&  i.height.metric.split("-")[1],
              height_min: i.height.metric.split("-")[0] &&  i.height.metric.split("-")[0],
              weight_max: i.weight.metric.split("-")[1] &&  i.weight.metric.split("-")[1],
              weight_min: i.weight.metric.split("-")[0] &&  i.weight.metric.split("-")[0],
              temperament: i.temperament,
              img: i.image.url,
              life_span: i.life_span
          }
      })
      return apiInfo   
    } catch (error){
      console.log(error);
    }
};
//Info de la base de datos
const dataBInfo = async()=>{
    console.log(dataBInfo)
    return await Dog.findAll({  
        include:{
            model:Temperament,   
            attributes: ['name'], 
            through:{
                atributes:[],
            },
        }
    })
}

//concateno las info
const infoApiDB = async()=>{
    const apiInfo = await dogsApi();
    const dataBIn = await dataBInfo();
    const finalInfo = apiInfo.concat(dataBIn);
    return finalInfo;
}

// const dogsByNames = async (req, res)=>{
//     const { name } = req.params;
//     const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
//     const apiInfo = await urlApi.data.map(d =>{
//         return{
//             id: d.id,
//             name: d.name,
//             height: d.height.metric,
//             weight: d.weight.metric,
//             temperament: d.temperament,
//             life_span: d.life_span,
//             image: d.image.url
//         }
//     })
//     let finDogs = await dataBInfo();
//     const dBFilterName = finDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))

//     const resultInfo = apiInfo.concat(dBFilterName)
//     if (resultInfo.length > 0 ){
//         res.status(200).json(resultInfo)
//     }else{
//         res.json('Dog does not exist');
//     }
    
// }



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
    const { name, height_max,height_min, weight_max,weight_min, temperament, life_span, createdInDb, img} = req.body;

    const newDog = await Dog.create({
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_span,
        createdInDb,
        img
    })
    const Temperamento = await Temperament.findAll({
        where: {name:temperament}
    })
    newDog.addTemperament(Temperamento);
    res.send('The dog has been created successfully');

}

module.exports = {findDogById, findDogs, createDogs}