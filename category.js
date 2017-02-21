const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence');

const CategorySchema = new Schema({
	name: String,
});

CategorySchema.plugin(AutoIncrement, {inc_field: 'category_id'});

module.exports = mongoose.model('Category', CategorySchema);
