//utilities
// helper methods

function getRandom(min,max){
	return Math.random()*(max-min)+min;
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
//returns position in loccal coordinate system of element
function getMouse(e){
	var mouse = {}//make an object
	mouse.x = e.pageX-e.target.offsetLeft;
	mouse.y = e.pageY -e.target.offsetTop;
	return mouse;
}
function drawText(string, x, y, size, color) {
	ctx.font = 'bold '+size+'px Verenda';
	ctx.fillStyle = color;
	ctx.fillText(string, x, y);
}