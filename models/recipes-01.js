var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	name : { 
			type : String,
			required: true,
			unique : true
			},
	description : {
			type : String,
			required : true
	}
},
	{ timestamps : true 
			
	});

var Recipes = mongoose.model('Recipe', recipeSchema);

module.exports = Recipes;