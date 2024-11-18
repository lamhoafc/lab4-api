const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
  name: String,
  location: String,
});

module.exports = mongoose.model('Distributor', distributorSchema);
