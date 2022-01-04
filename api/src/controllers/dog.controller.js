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
              life_span: i.life_span
          }
      })
      return apiInfo   
    } catch (error){
      console.log(error);
    }
};

// const dogsApi = () => {
//     try{
//          return axios(`https://api.thedogapi.com/v1/breeds?apikey=${DB_API_KEY}`)
//         .then((response)=> console.log(response))
//         // .then(data =>{
//         //  const apiInfo =  data.map(i =>{
//         //      console.log(apiInfo)
//         //         return {
//         //             id: i.id,
//         //             name: i.name,
//         //             //hago un parseInt para que me traiga los nuemeros enteros y no como un string 
//         //             height_max: parseInt(i?.height?.metric?.split("-")[1]), 
//         //             height_min: parseInt(i?.height?.metric?.split("-")[0]),
//         //             weight_max: parseInt(i?.weight?.metric?.split("-")[1]),
//         //             weight_min: parseInt(i?.weight?.metric?.split("-")[0]),
//         //             temperament: i.temperament,
//         //             img: i.image.url,
//         //             life_span: i.life_span
//         //         }
//         //     })
//         //     return apiInfo;
//         // })
      
//     }catch(error){
//         console.log(error);
//     }
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
        //hago un mapeo de la info de la base de datos para que me lo traiga con los nombres que yo quiero 
        return { 
        id: el.id,
        name: el.name.charAt(0).toUpperCase()+el.name.slice(1).toLowerCase(),
        height_min: el.height_min,
        height_max: el.height_max,
        weight_min: el.weight_min,
        weight_max: el.weight_max,
        life_span: el.life_span,
        img: el.img,
        temperament: el.Temperaments.map(el=>el.name).join(', '),
        //Temperaments = [{},{},{}] con el map me los traigo a todos en un array separando por una , y espacio
        createdInDb: el.createdInDb
      }
    })
    const finalInfo = apiInfo.concat(infoMap);
    return finalInfo;
   
}

// const dogsByNames = async (req, res)=>{
//     const { nameDog } = req.params;
//     const urlApi= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${nameDog}`)
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
//     const dBFilterName = finDogs.filter(d => d.nameDog.toLowerCase().includes(nameDog.toLowerCase()));

//     const resultInfo = apiInfo.concat(dBFilterName)
//     if (resultInfo.length > 0 ){
//         res.status(200).json(resultInfo)
//     }else{
//         res.json('Dog does not exist');
//     }
    
// }


// Logica para ruta ('/dogs') me traigo todos los perros, de la api y base de datos 
// Y logica para ruta buscar perros por nombre(query)
const findDogs = async(req, res)=>{
    const { name } = req.query;
    const allDogs = await infoApiDB();
    if(name){ //si hay un nombre filtro el array donde tengo todos los nombres de los perros buscando el nombre que me pasen por query. pasandolos a ambos a minuscala 
        let dogName = await allDogs.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length? res.status(200).send(dogName) : res.status(404).send('Dog could not be found');
    }else{
        res.status(200).send(allDogs) // si no me pasan un nombre por query entonces que me devuelva todos los perros
    }
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
 
//Logica para ruta ('/dog') crear perros -> se crean en la base de datos
const createDogs = async(req, res)=>{
    const { name, height_max,height_min, weight_max,weight_min, temperament, life_span, createdInDb} = req.body;

    const newDog = await Dog.create({
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_span,
        createdInDb,
    
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








const findOrigin = async(req, res) => {
    const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY }`);
    const breed = url.data.map(o => {
    return {
        breed_group: o.breed_group ? o.breed_group : "Se desconoce su breed group, es un marciano",
        name: o.name ? o.name : "este pobre perro no lo quiere nadie"
    }
})
  const { breed_group } = req.params;
  if (breed) {
      const breedFiltered = await breed.filter(o => o.breed_group.toLowerCase().includes(breed_group.toLowerCase()));
      breedFiltered.length? res.status(200).json(breedFiltered): res.status(404).send('No se pudo encontrar el breed group');
  }

}






module.exports = {findDogById, findDogs, createDogs, findOrigin, deleteDogs,}