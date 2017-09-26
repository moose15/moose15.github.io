"use strict";

var app = app || {};

// creates the user's drink
// if the user hits the espresso button, this class helps add espresso to the mug.
// Referenced with permission from // http://people.rit.edu/jas2715/450/project1/js/ 
app.CreateDrink={
	// Draw variables
	x : 400,
	y : 425,
	width: 225,
	height : 350,
	color : "#C499BF",
	maxIngredients : 5,
	yOffset : 10,
	spacing : -33,
	
	// Data variables
	ingredients : [], // treat as a queue

// adds a new ingredient
	addIngredient : function(image)
	{
		if(this.ingredients.length<this.maxIngredients){
			// Set the drawing data...	
			var posY = (this.y - this.yOffset) + this.ingredients.length * this.spacing;

			var ingredient = new app.Ingredient(image,this.x,posY);
			this.ingredients.push(ingredient);
		}
		else{
			this.ingredients.length=this.maxIngredients;
		}
		
	},
	
	// Remove all ingredients (for game over)
	clearIngredients: function()
	{
		this.ingredients = [];
	},
	// when the user hits the order up button, remove the ingredients in the mug from the screen
	completeDrink : function(ctx)
	{

		for(var i=0; i<this.ingredients.length; i++)
		{
				this.ingredients[i].removeSelf(ctx);

		}
		this.ingredients=[];
		console.log("_________________________________");
		console.log("length of ingredients: "+ this.ingredients.length);
		return 0;
	},
	//remove ingredients
	remove : function(i)
	{
		// At position i, remove 1
		this.ingredients.splice(i, 1);
	
	},
	//draw orders.
	draw : function(ctx)
	{

		for(var i=0; i<this.ingredients.length; i++)
		{
			this.ingredients[i].draw(ctx);
		}
	}
	
};