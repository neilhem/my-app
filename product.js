const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence');

const ProductSchema = new Schema({
	name: String,
  salePrice: Number,
  price: Number,
});

ProductSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Product', ProductSchema);
