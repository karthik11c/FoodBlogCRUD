const mongoose = require('mongoose');
const Model = mongoose.model;
const fastFoodSchema = new mongoose.Schema({        
        id: Number,
        category:String,
        recipeName:String,
        image: String,
        price: Number,
        cousine:String,
        countryOrigin:String

},{ collection : 'fastfood' });

const fastfoodModel = mongoose.model('Fastfood',fastFoodSchema);
module.exports = fastfoodModel;