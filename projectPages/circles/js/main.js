// particle code from this fireworks tutorial: 
//http://thecodeplayer.com/walkthrough/canvas-fireworks-tutorial

// from fireworks tutorial:
// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

// end code from fireworks tutorial

"use strict";

// CONSTANTS
var START_RADIUS = 25;
var MAX_SPEED = 50;
var NUM_CIRCLES_START = 25;

//declare some global variables
var canvas,ctx;
// var x,y,radius,xSpeed,ySpeed,fillStyle;

var circles=[];
var paused=false;
var animationID;

//full screen dimentions
var cw= window.innerWidth;
var ch=window.innerHeight;

var CANVAS_WIDTH = cw;
var CANVAS_HEIGHT = window.innerHeight;

var game_state_spawn = 0;

//fire works array
var fireworks =[];

//for particles
var particles = [];

//starting hue
var hue=120;
var counter=0;
// one new variable
var numCircles = NUM_CIRCLES_START;

window.onload = init;

function init(){
	console.log("init called");
	// set up canvas
	canvas= document.querySelector("canvas");
	ctx = canvas.getContext("2d");

	canvas.height = CANVAS_HEIGHT;
	canvas.width = CANVAS_WIDTH;

	canvas.onmousedown = doMouseDown;
	console.log("circles=" + circles);
	circles = makeCircles(numCircles);


	
	update();

}

//update() will soon be called 60 times a second
function update(){
	//move circles
	for(var i=0;i<circles.length;i++) {
		var c = circles[i];
		//move circles
		c.x+=c.xSpeed/60;
		c.y+=c.ySpeed/60;

		//did circles leave the screen?
		if(circleHitLeftRight(c.x,c.y,c.radius)) c.xSpeed *=-1;
		if(circleHitTopBottom(c.x,c.y,c.radius)) c.ySpeed *=-1;

	}//end move circles

	// increase color hue
	hue += 0.5;

	// used to spawn new circles after the initial bunch explode
	counter ++;
	if(counter >=200){
		game_state_spawn=0;
		counter=0;
	}
	if(circles.length<numCircles && game_state_spawn==0){
		game_state_spawn = 1;
		addCircles(1);
	}


	// the following is from the fireworks tutorial:

	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	// ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = '#171717';
	ctx.fillRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	// ctx.globalCompositeOperation = 'lighter';

	// loop over each particle, draw it, update it
		var i = particles.length;
		while( i-- ) {
			particles[ i ].draw();
			particles[ i ].update( i );
		}
	// end code from tutorial
	//draw circles
	for(var i=0;i<circles.length;i++){
		var c = circles[i];
		//draw circle
		ctx.beginPath();
		ctx.arc(c.x,c.y,c.radius,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fillStyle = c.fillStyle;
		ctx.fill();

	}//end draw circles
	drawText("Katie Pustolski",50,CANVAS_HEIGHT-100,70,'white');
	//this calls the update() function 60 fps
	animationID=requestAnimationFrame(update);

}
// function created to help respawn circles
function addCircles(num){
	for(var i=0; i<num; i++){

			var c = {};
			c.x = getRandom(START_RADIUS*2,CANVAS_WIDTH-START_RADIUS*2);
			c.y = getRandom(START_RADIUS*2,CANVAS_HEIGHT-START_RADIUS*2);

			c.radius = START_RADIUS;
			c.xSpeed = getRandom(-MAX_SPEED,MAX_SPEED);
			c.ySpeed = getRandom(-MAX_SPEED,MAX_SPEED);
			// c.xSpeed = MAX_SPEED;
			// c.ySpeed = MAX_SPEED;
			c.fillStyle=getRandomColor();
			circles.push(c);
	}
}
function doMouseDown(e){

	var mouse = getMouse(e);
	console.log("(mouse.x,mouse.y)="+ mouse.x + " , "+ mouse.y);
	//looping through circles array backwards, why?
	for(var i = 0 ; i<circles.length; i++){
		var c = circles[i];
		if(pointInsideCircle(mouse.x,mouse.y,c)){
			circleClicked(c,mouse);
			if(c.remove){
				console.log("circle: " + c + "was removed");
            	circles.splice(i,1);
            }
			break; //just wnat to click one circle
		}
	}
}
function circleClicked(circle, mouse){
	// circle.fillStyle = "red";
	createParticles( mouse.x, mouse.y );
	circle.remove =true;
	// circle.xSpeed = circle.ySpeed=0;
}
//using distance squared here why?
//I is for instance
function pointInsideCircle(x,y,I){
	var dx = x-I.x;
	var dy = y-I.y;

	return dx*dx + dy*dy <= I.radius * I.radius;
}
function makeCircles(num){
	var array = [];
	for(var i=0; i<num; i++){
		var c = {};
		c.x = getRandom(START_RADIUS*2,CANVAS_WIDTH-START_RADIUS*2);
		c.y = getRandom(START_RADIUS*2,CANVAS_HEIGHT-START_RADIUS*2);

		c.radius = START_RADIUS;
		c.xSpeed = getRandom(-MAX_SPEED,MAX_SPEED);
		c.ySpeed = getRandom(-MAX_SPEED,MAX_SPEED);
		// c.xSpeed = MAX_SPEED;
		// c.ySpeed = MAX_SPEED;
		c.fillStyle=getRandomColor();

		array.push(c);

	}
	return array;
}
function circleHitLeftRight(x,y,radius){
	if(x<radius || x>CANVAS_WIDTH-radius) return true;
}
function circleHitTopBottom(x,y,radius){
	if(y<radius || y>CANVAS_HEIGHT-radius) return true;
}