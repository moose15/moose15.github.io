"use strict";
app.Enemy = function(){

function Enemy(image,canvasWidth,canvasHeight) {
		// ivars
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.active = true;
		this.age = Math.floor(Math.random() * 128);
		this.color = "#A2B";
		this.x = this.canvasWidth / 4 + Math.random() *
		this.canvasWidth / 2;
		this.y = 0;
		this.xVelocity = 0;
		this.yVelocity = Math.random()*0.5;
		this.image = image;
		this.width = 50;
		this.height = 60;

		// creates an array full of words
		this.words = ["viking","thor","loki", "odin", "fenrir", "yggdrasil","freyr", "valhalla","freyja", "ship", "shield", "valkyrie","ragnar","bjorn","lagertha", "halfdan","sigurd","ubbe","aslaug"];
		// helps pick a random word
		this.rand= Math.floor(Math.random() * this.words.length);
		this.randomWord=undefined;
	};

	var p = Enemy.prototype;
 	//enemy draw function
	p.draw = function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;
		// pick random word
		this.randomWord = this.words[this.rand];

		if(!this.image){
			//if no image
			text(ctx,this.randomWord,this.x-10,this.y-30,30,this.color);
			ctx.fillRect(this.x - halfW, this.y - halfH,
			this.width, this.height);
		} else{
			//if there is an image
			// genereate a random word as well as the image
			text(ctx,this.randomWord,this.x-(this.width/2),this.y-28,20,"white");
			ctx.drawImage(this.image,this.x - halfW, this.y - halfH,
			this.width, this.height);
		}
	};
	//enemy update function
	p.update = function(dt) {
		// make the enemies travel down screen
		if(this.yVelocity<=0.1){
			this.yVelocity=0.3;
		}
		this.x += this.xVelocity;
		this.y += this.yVelocity;
		this.age++;
		this.active = this.active;
	};
	// enemy text function
	function text(ctx, string, x, y, size, col) {
		ctx.font = 'bold '+size+'px Calibri';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
	};
	return Enemy;
}();