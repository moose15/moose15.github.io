//Katie Pustolski
// Experimental TOpics
// game 3

"use strict";

var canvas;
var ctx;

var content;
var content_style;
//variables
var dragging;
var lineWidth;
var strokeStyle;

var DEFAULT_LINE_WIDTH= 5;

var DEFAULT_STROKE_STYLE = '#ff8800';
var mouse;
var mouse = {x: 0, y: 0};
var sketch;
var sketch_style;
var sketch2;
var sketch_style2;

var destinationCanvas;
var destinationCtx;

var destinationCanvas2;
var destinationCtx2;

var colorPicked;
var thumbImg;
function init(){
	canvas= document.querySelector('#canvas');
	ctx = canvas.getContext('2d');

	destinationCanvas = document.querySelector("#destCanvas");
	//get the destination context
	destinationCtx = destinationCanvas.getContext('2d');

	destinationCanvas2 = document.querySelector("#destCanvas2");
	//get the destination context
	destinationCtx2 = destinationCanvas2.getContext('2d');

	//$('#colorpickerHolder').ColorPicker({flat: true});

//Color Picker code-------------------

$('.color-box').colpick({
	colorScheme:'dark',
	layout:'rgbhex',
	color:'ff8800',
	onSubmit:function(hsb,hex,rgb,el) {
		$(el).css('background-color', '#'+hex);
		$(el).colpickHide();

		colorPicked = "#"+hex + "";

	}
});
$('.color-box').css('background-color','#ff8800');
// --------------------------
	sketch = document.querySelector('.draw');
	sketch_style = getComputedStyle(sketch);

	sketch2 = document.querySelector('.draw2');
	sketch_style2 = getComputedStyle(sketch2);

	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));

	destCanvas.width = parseInt(sketch_style2.getPropertyValue('width'));
	destCanvas.height = parseInt(sketch_style2.getPropertyValue('height'));

	destCanvas2.width = parseInt(sketch_style.getPropertyValue('width'));
	destCanvas2.height = parseInt(sketch_style.getPropertyValue('height'));
	
	dragging=false;
	ctx.lineWidth = DEFAULT_LINE_WIDTH;
	ctx.strokeStyle= DEFAULT_STROKE_STYLE;
	colorPicked= DEFAULT_STROKE_STYLE;
	ctx.lineCap ="round";
	ctx.lineJoin = "round";
// mouse events
	canvas.onmousedown = mouseDown;
	canvas.onmousemove = mouseMove;
	canvas.onmouseup = mouseUp;
	canvas.onmouseout = mouseOut;

	document.getElementById("submit").addEventListener("click", function(){
    	//copy the data
		destinationCtx.drawImage(canvas, 0, 0);
		destinationCtx2.drawImage(canvas, 0, 0);
		thumbImg=document.getElementById("thumbs_up");

		$(thumbImg).fadeIn("slow");

	});
}
function update(){

}
function mouseDown(e){
	dragging= true;
	var mouse = getMouse(e);

	ctx.beginPath();
	ctx.moveTo(mouse.x,mouse.y);
}

function mouseMove(e){
	var mouse = getMouse(e);

	if(dragging){
		ctx.lineTo(mouse.x,mouse.y);
		console.log(colorPicked);
		ctx.strokeStyle=colorPicked;
		ctx.stroke();
	}

}

function mouseOut(e){
	dragging=false;
	ctx.closePath();

}

function mouseUp(e){
	dragging=false;
	ctx.closePath();
}

function getMouse(e){
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY- e.target.offsetTop;

	return mouse;
}
window.onload=init;