const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  quantity: { type: Number, required: true, min: 0 }, 
  price: { type: Number, required: true, min: 0 }, 
  image: String,
  distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
});

module.exports = mongoose.model('Fruits', fruitSchema);