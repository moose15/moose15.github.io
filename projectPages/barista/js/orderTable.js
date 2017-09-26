"use strict";

var app = app || {};
// Referenced with permission from // http://people.rit.edu/jas2715/450/project1/js/ 
// The table that displays coffee orders
app.OrderTable = {
  
	// Draw variables
	x : 0,
	y : 0,
	width: 225,
	height : 350,
	radius: 20,
	color : "#C499BF",
	maxOrders : 6,
	yOffset : -90,
	spacing : 90,
	score:0,
	
	// Data variables
	orders : [], // treat as a queue
	
	// Adds a new order to board
	addOrder : function(title,image)
	{
		if(this.orders.length < this.maxOrders)
		{
		
			// determine where it is position in regards to the last order.
			var posY = (this.y - this.yOffset) + this.orders.length * this.spacing;

			// make the order
			var order = new app.Order(title, image, this.x, posY);
			
			// add to order array
			this.orders.push(order);
		}
	},
	
	// Remove all orders 
	clearOrders: function()
	{
		this.orders = [];
	},
	
	// Check a cleared tile for a match with any of the orders
	completeOrder : function(n)
	{
		console.log("orders length: "+ this.orders.length);
		console.log("orders: "+ this.orders);
		console.log("n in order table: "+ n);
		for(var i=0; i<this.orders.length; i++)
		{
			// Compare to see if the tiles match the order
			if(this.orders[i].coffeeName==n)
			{
				// Remove from the table
				this.remove(i);
				
				// add to score, drink counter, and the timer
				app.game.drinksMade++;
				app.game.drinkCounter++;
				// console.log("drinkCounter:"+ app.game.drinkCounter);
				app.game.timeInSecs+=5;

				break;
			}
			// else{
			// 	createjs.Sound.play("wrong");
			// }
				// console.log("in order table did not create drink");
				// return 0;
		}
		console.log("drinkCounter:"+ app.game.drinkCounter);
		return 0;
	},

	// remove from orders.
	remove : function(i)
	{
		// At position i, remove 1
		this.orders.splice(i, 1);
		
		
		// Shift order y-position
		for(var j=i; j<this.orders.length; j++)
		{
			this.orders[j].y += this.yOffset;
		}
		// play correct sound
		createjs.Sound.play("correct");
	},
  
	draw : function(ctx)
	{
		// draw each order
		//Draw the three (or less) visible orders
		for(var i=0; i<this.orders.length; i++)
		{
			this.orders[i].draw(ctx);
		}
	}
	
};