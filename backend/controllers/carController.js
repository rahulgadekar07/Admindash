const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  const { name, manufacturingYear, price } = req.body;
  try {
    const car = new Car({ name, manufacturingYear, price });
    await car.save();
    res.status(201).json({ message: 'Car created successfully', car });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, manufacturingYear, price } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(id, { name, manufacturingYear, price }, { new: true });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
