"use strict";

// creates an order
app.Order = function (){
	function Order(title, image,x,y){
		this.x = x;
		this.y = y;
		this.width=125;
		this.height=115;
		this.image = image;
		this.coffeeName = title;
	};

	var o = Order.prototype;

	o.draw=function(ctx){
		// create name for order table
		text(ctx,this.coffeeName,this.x+120,this.y+40,17,"white");
		if(!this.image){
			ctx.fillStyle="purple";
			ctx.fillRect(this.x, this.y+21, this.width, this.height);
			ctx.fillStyle="blue";
		}else{
			//if there is an image
			ctx.drawImage(this.image,this.x, this.y-25,
			this.width, this.height);
		}
	};
	function text(ctx, string, x, y, size, col) {
		ctx.font = 'bold '+size+'px Tahoma';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
		ctx.fillStyle="blue";
	}

	return Order;
}();