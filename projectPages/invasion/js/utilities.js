// utilities.js
// dependencies: none
"use strict";
var app = app || {};

app.utilities = function(){

	/*
	Function Name: clamp(val, min, max)
	Return Value: returns a value that is constrained between min and max (inclusive) 
	*/
	function clamp(val, min, max){
		return Math.max(min, Math.min(max, val));
	}
	
	
	/*
		Function Name: getRandom(min, max)
		Return Value: a floating point random number between min and max
	*/
	function getRandom(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	
	/*
		Function Name: getRandomInt(min, max)
		Return Value: a random integer between min and max
	*/
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	// Function Name: getMouse(e)
	// returns mouse position in local coordinate system of element
	function getMouse(e){
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		return mouse;
	}
	
		// returns a random color of alpha 1.0
	// http://paulirish.com/2009/random-hex-color-code-snippets/
	function getRandomColor(){
		// for hsla
		this.hue = getRandom( hue - 20, hue + 20 );
		this.brightness = getRandom( 50, 80 );
		this.alpha = 1;
		//for RGBA
		var red = Math.round(Math.random()*200+55);
		var green = Math.round(Math.random()*200+55);
		var blue=Math.round(Math.random()*200+55);
		var alpha=0.5;
		// var color='rgb('+red+','+green+','+blue+')  ';
		// OR	if you want to change alpha
		// var color='rgba('+red+','+green+','+blue+',0.50)'; // 0.50
		var color='hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';

		return color;
	}

	return{
		clamp : clamp,
		getRandom : getRandom,
		getRandomInt : getRandomInt,
		getMouse : getMouse
	};
}();
