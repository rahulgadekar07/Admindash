const express = require('express');
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const router = express.Router();

router.post('/', createCar);
router.get('/getCars', getCars);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
