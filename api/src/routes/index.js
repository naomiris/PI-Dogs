const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { findDogById, findDogs, createDogs, dogsByNames } = require('../controllers/dog.controller');
const { dogsTemperament } = require('../controllers/temperament.controller');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', findDogs);
router.get('/:id', findDogById);
router.get('/dogs/:name', dogsByNames);
router.post('/dog', createDogs);

router.get('/temperament', dogsTemperament);

module.exports = router;
