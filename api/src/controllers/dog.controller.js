const axios = require('axios');
const { response } = require('express');
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
              //hago un parseInt para que me traiga los nuemeros enteros y no como un string 
              height_max: parseInt(i?.height?.metric?.split("-")[1]), 
              height_min: parseInt(i?.height?.metric?.split("-")[0]),
              weight_max: parseInt(i?.weight?.metric?.split("-")[1]),
              weight_min: parseInt(i?.weight?.metric?.split("-")[0]),
              temperament: i.temperament,
              img: i.image.url,
              life_span: i.life_span,
            
          }
      })
      return apiInfo   
    } catch (error){
      console.log(error);
    }
};

// const dogsApi = () => {
//     axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`)
//     .then((response)=> {
//         console.log(response.data)
//         const data = response.data.map(i => {
//             return {
//                 id: i.id,
//                 name: i.name,
//                 //hago un parseInt para que me traiga los nuemeros enteros y no como un string 
//                 height_max: parseInt(i?.height?.metric?.split("-")[1]), 
//                 height_min: parseInt(i?.height?.metric?.split("-")[0]),
//                 weight_max: parseInt(i?.weight?.metric?.split("-")[1]),
//                 weight_min: parseInt(i?.weight?.metric?.split("-")[0]),
//                 temperament: i.temperament,
//                 img: i.image.url,
//                 life_span: i.life_span,
              
//             }
//         })
//         return data;
//     })
//     .catch((error)=> console.error(error));
// }



//Info de la base de datos
const dataBInfo = async()=>{
    // console.log(dataBInfo)
    //que me encuentre todos los perros incluyendo el modelo de los temperamentos donde el atributo sea name mediante los atributos... => hago relacion entre los perros y los temperamentos
    return await Dog.findAll({  
        include:{  
            model:Temperament,   
            attributes: ['name'], 
            through:{
                atributes:[], // tomo lo que queda en el arreglo atributes
            },
        }
    })
}

//concateno las info
const infoApiDB = async()=>{
    const apiInfo = await dogsApi();
    const dataBIn = await dataBInfo();
    const infoMap = await dataBIn.map((el)=> {
        return { 
        id: el.id,
        name: el.name.charAt(0).toUpperCase()+el.name.slice(1).toLowerCase(),
        height_min: el.height_min,
        height_max: el.height_max,
        weight_min: el.weight_min,
        weight_max: el.weight_max,
        life_span: el.life_span,
        img: el.img ? el.img : "https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=940&quality=45&auto=format&fit=max&dpr=2&s=7e721515d367091c62d877ebd2529731",
        temperament: el.Temperaments.map(el=>el.name).join(', '),
        createdInDb: el.createdInDb
      }
    })
    const finalInfo = apiInfo.concat(infoMap);
    return finalInfo;
   
}

// Logica para ruta ('/dogs')
const findDogs = (req, res)=>{
    const { name } = req.query;
    infoApiDB()
    .then((response)=> {
        if(name){ //si hay un nombre filtro el array donde tengo todos los nombres de los perros buscando el nombre que me pasen por query. pasandolos a ambos a minuscala 
            let dogName = response.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length? res.status(200).send(dogName) : res.status(404).send('Dog could not be found');
        }else{
            res.status(200).send(response) // si no me pasan un nombre por query entonces que me devuelva todos los perros
        }
    })
    .catch((error)=> console.error(error));
    
}


//Logica de ruta ('/dogs:id') para buscar perros por id que pasan por params
const findDogById = async(req, res)=>{
    const { id } = req.params;
    const allDogs = await infoApiDB();
    // console.log('alldogs',allDogs);
       if(id){ 
        let dogId = await allDogs.filter(d => d.id == id);
         dogId.length? res.status(200).json(dogId): res.status(404).send('Dog could not be found');
     } 

}
 
//Logica para ruta ('/dog') crear perros 
const createDogs = async(req, res)=>{
    const { name, height_max,height_min, weight_max,weight_min, temperament, life_span, createdInDb,img} = req.body;

    const newDog = await Dog.create({
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_span,
        createdInDb,
        img,
    
    })
    // Busca el temperamento pasaado por body en la tabla de Temperamentos en la base de datos
    const Temperamento = await Temperament.findAll({
        where: {name:temperament}
    })
    //se añade el temperamento al perro creado 
    newDog.addTemperament(Temperamento);
    res.send('The dog has been created successfully');

}


// ELIMINAR PERROS 
const deleteDogs = async (req, res) =>{
    const { deletename } = req.params;
    const dog = await Dog.destroy({
        where: {name: deletename }
    })
    res.status(200).json({msg: `Dog ${deletename} has been deleted successfully`})
     
}



module.exports = {findDogById, findDogs, createDogs, deleteDogs,}