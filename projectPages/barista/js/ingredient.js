"use strict";

var app = app || {};

// creates an ingredient object

app.Ingredient = function() {
  	function Ingredient( image, x,y){
	  	this.active =true;
	  	this.x = x;
	  	this.y = y;
	  	this.image = image;
	  	this.width=200;
		this.height=100;

	};

	var d = Ingredient.prototype;

	d.draw=function(ctx){

		if(!this.image){
			ctx.fillRect(this.x, this.y, this.width, this.height);
			console.log("No image");
		}else{
			//if there is an image
			ctx.drawImage(this.image,this.x+63, this.y-10,
			this.width, this.height);
		}
	};
	// remove self.
	d.removeSelf = function(ctx){
		ctx.clearRect(this.x, this.y, this.width, this.height);
	};

	return Ingredient;
}();