const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { findDogById, findDogs, createDogs, findOrigin, } = require('../controllers/dog.controller');
const { dogsTemperament } = require('../controllers/temperament.controller');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', findDogs);
router.get('/dogs/:id', findDogById);
// router.get('/dogsByname/:name', dogsByNames);
router.get('/temperaments', dogsTemperament);
router.post('/dog', createDogs);
router.get('/dogBreed/:breed_group', findOrigin);
router.delete('/dogDelete/:deletename')


module.exports = router;
