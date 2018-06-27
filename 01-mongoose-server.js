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
	var newRecipe = Recipes({
		name : 'noodles',
		description : 'noodles with mushrooms'
	});	
	
    // save the Recipe
		newRecipe.save(function(err){
			assert.equal(err,null);
			console.log('Recipes created');
        // get all the Recipes
		Recipes.find({},function(err,recipes){
			// object of all the Recipes
			assert.equal(err,null);
			console.log(recipes);
			
			db.collection('Recipes').drop(function (){
				db.close();
			});
		});	
            
		});
				
});



