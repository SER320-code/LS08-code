var mongoose = require('mongoose'),
    assert = require('assert');

//recipe module variable
var Recipes = require('./models/recipes-01');

// Connection URL
var url = 'mongodb://localhost:27017/quKitchen';


// Connect using mongoose
mongoose.connect(url);
//open a connection and get a db handler
var db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new recipe
	Recipes.create({
		name : 'pasta',
		description : 'pasta with mushrooms'
	},function(err,recipe){
		if (err) throw err
		console.log('recipe created' + recipe);
		
		var id = recipe._id;
		setTimeout(function(){
			Recipes.findByIdAndUpdate(id,{$set: { description : 'noodles with beef'} }, {new : true})
			.exec(function(err, recipe){
				if (err) throw err;
				console.log("Recipe" + recipe);
				
				db.collection('Recipes').drop(function (){
				db.close();
			});
				
			});
			
		},3000);
		
		
	});	
	
});		
	