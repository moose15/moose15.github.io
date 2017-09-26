//Code for the particles
// from this tutorial:
// http://thecodeplayer.com/walkthrough/canvas-fireworks-tutorial

"use strict";
app.Particles = function(){

	function Particles(x,y, particleArray) {
		// ivars
		this.h=20;//color hue
		this.x = x;
		this.y = y;
		this.part = particleArray;
		//track the part coordinates of each particle to create trail effect, increase the coordinate count to create more prominent trails
		this.coordinates=[];
		this.coordinateCount =10;
		while(this.coordinateCount--){
			this.coordinates.push([this.x, this.y]);
		}
		// set a random angle in all possible directions, in radians
		this.angle = app.utilities.getRandom( 0, Math.PI * 2 );
		this.speed = app.utilities.getRandom( 1, 10 );
		// friction will slow the particle down
		this.friction = 0.95;
		// gravity will be applied and pull the particle down
		this.gravity = 1;
		// set the hue to a random number +-20 of the overall hue variable
		this.hue = app.utilities.getRandom( this.h - 20, this.h + 20 );
		this.brightness = app.utilities.getRandom( 50, 70 );
		this.alpha = 1;
		// set how fast the particle fades out
		this.decay = app.utilities.getRandom( 0.015, 0.03 );
	};

	var p = Particles.prototype;
	//particle draw method
	p.draw = function(ctx) {
		ctx. beginPath();
		// move to the last tracked coordinates in the set, then draw a line to the current x and y
		ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
		ctx.lineTo( this.x, this.y );
		ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
		ctx.stroke();
	};
	// particle update function
	p.update = function(index) {
		// remove last item in coordinates array
		this.coordinates.pop();
		// add current coordinates to the start of the array
		this.coordinates.unshift( [ this.x, this.y ] );
		// slow down the particle
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos( this.angle ) * this.speed;
		this.y += Math.sin( this.angle ) * this.speed + this.gravity;
		// fade out the particle
		this.alpha -= this.decay;
		
		if( this.alpha <= this.decay ) {
			this.part.splice( index, 1 );
		}
	};
	return Particles;
}();