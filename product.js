const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductSchema = new Schema({
  id: Number,
	name: String,
  salePrice: Number,
  price: Number,
});

module.exports = mongoose.model('Product', ProductSchema);
