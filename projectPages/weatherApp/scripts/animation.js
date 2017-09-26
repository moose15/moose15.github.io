// Author: Katie Pustolski
// Last Edited: 1/5/14
// Project 2: Weather app
// Rich Media Web App Dev. 

// Rain animation based on http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
// and snow animation
// Snow animation based on : http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
// Thunderstorm code based off of : http://creativejs.com/2012/01/day-11-sprite-sheets/
// get the canvas and context
var c = document.getElementById("canvas");
var ctx=c.getContext("2d");

// variables
// set canvas height and width to size of window
c.height = window.innerHeight;
c.width = window.innerWidth;
var W= c.width;
var H = c.height;

var cloudsAnimation=false;
var sunCloudsAnimation=false;
var rainAnimation=false;
var sunBool=false;
var snowAnimation=false;
var thunderBool=false;
var thunderstormAnimation;

// initiate the clickable icons 
function init(){
	clickIcons();
}
/***********************
	RAIN ANIMATION 
************************/
function rain(){

	// stop all animations
	stopAnimations();

	rainAnimation=true;
	var mr=200; //max rain particles
	//array of rain drops
	var drops = [];
	//loop through and creat raindrops. Store into drops
	for(var i = 0; i < mr; i++)
	{
		drops.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: 2, //radius
			d: Math.random()*mr//density
		})
	}


	//draw the rain drops
	function drawRain()
	{
		if(rainAnimation){
			ctx.backgroundColor="#6b92b9"
			ctx.fillStyle = "rgba(57, 82, 114, 0.55)";
			ctx.fillRect(0, 0, c.width, c.height);
			ctx.fillStyle = "#53f1ff";
			ctx.beginPath();
			// based on the x and y the drops (which change in update), animate
			for(var i = 0; i < mr; i++)
			{
				var r = drops[i];
				ctx.moveTo(r.x, r.y);
				ctx.arc(r.x, r.y, r.r, 0, Math.PI*2, true);
			}
			ctx.fill();
			update();
		}
	}

	//Function to move the rain drops
	function update()
	{
		for(var i = 0; i < mr; i++)
		{
			var r = drops[i];
			//Updating X and Y coordinates
			// fall vertically from the top of the screen to the bottom
			r.y += 10;
			r.x += 0;
			
			// when the drops hit the bottom of the page, send them back to the top
			if(r.x > W+5 || r.x < -5 || r.y > H)
			{
				if(i%3 > 0) //66.67% of the drops
				{
					drops[i] = {x: Math.random()*W, y: -10, r: r.r, d: r.d};
				}
			}
		}
		if(rainAnimation){
			window.requestAnimationFrame(drawRain);
		}
	}
	// start rain animation
	//rainAnimation=setInterval(drawRain,33);
	if(rainAnimation){
		window.requestAnimationFrame(drawRain);
	}
}
/***********************
	SNOW ANIMATION 
************************/
function letItSnow(){
	// stop all animations
	stopAnimations();
	snowAnimation=true;
	var mp = 200; //max snow particles
	// create snow particles array
	var particles = [];
	// fill the snow particals array with snowflakes
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*4+1, //radius
			d: Math.random()*mp //density
		})
	}

	//draw the flakes
	function draw()
	{
		if(snowAnimation){
			// clear rect 
			ctx.clearRect(0, 0, W, H);
			// make flakes white
			ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
			ctx.beginPath();
			// based on the x and y the flakes (which change in update), animate
			for(var i = 0; i < mp; i++)
			{
				var p = particles[i];
				ctx.moveTo(p.x, p.y);
				ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
			}
			ctx.fill();
			update();
		}
	}

	// move the snowflakes
	// (comment from tutorial): angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			// (following comments from tutorial:)
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
		if(snowAnimation){
			window.requestAnimationFrame(draw);
		}
	}
	if(snowAnimation){
		window.requestAnimationFrame(draw);
	}
}
/***********************
	SUNNY ANIMATION (BUT NOT REALLY ANIMATION)
************************/

function sunnyDay(){
	//stop all animations
	stopAnimations();
	// clear the canvas
	ctx.clearRect(0, 0, W, H);
	// load sun image to canvas
	var img = new Image();
	img.src="images/sun.png";
	
	img.onload=function(){
		ctx.drawImage(img,W/3,H/22);

	};

}

/***********************
	CLOUDY ANIMATION 
************************/
function cloudyDay(){
	// stop all animations
	stopAnimations();
	cloudsAnimation=true;
	// set variables
	var speed = 1;
	var clouds = [];
	var mc = 50; // max number of clouds
	var cloudImg= new Image();
	cloudImg.src="images/cloud.png";

	cloudImg.onload=function(){
		// fill cloud array
		for(var i = 0; i < mc; i++)
		{
			var cloud = {
				x: Math.random()*W-20, //x-coordinate
				y: Math.random()*H, //y-coordinate
				img: "images/cloud.png"
			};

			clouds[i] = cloud;
			
		}
		// start clouds animation 
		if(cloudsAnimation){
			window.requestAnimationFrame(draw);
		}
	}
	// fill cloud array
	for(var i = 0; i < mc; i++)
	{
		var cloud = {
			x: Math.random()*W-20, //x-coordinate
			y: Math.random()*H, //y-coordinate
			img: "images/cloud.png"
		};

		clouds[i] = cloud;
		
	}
	//Lets draw the clouds
	function draw()
	{
		if(cloudsAnimation){
			// clear canvas
			ctx.clearRect(0, 0, W, H);
			// draw clouds onto screen
			for(var i = 0; i< mc ;i++){
				var c = clouds[i];

				// the x and y of each cloud will change (changes in update())
				ctx.drawImage(cloudImg,c.x,c.y);

				
			}

			update();
		}
		
	}
	function update()
	{

		for(var i = 0; i <mc; i++)
		{
			var c = clouds[i];
			// set speed of clouds
			c.x +=speed;

			if(c.x > W+5 || c.x < -5 || c.y > H)
			{
				//If the flake is exiting from the right
				if(c.x>W)
				{
					//Enter from the left at random Y
					c.x = 0-190;
					c.y = Math.random()*H;
				}
			}
		}	
		if(cloudsAnimation){
			window.requestAnimationFrame(draw);
		}
	}
}
/***********************
	THUNDERSTORM ANIMATION 
************************/

function thunderstorm(){
	// stop all animations
	stopAnimations();
	thunderBool=true;
	ctx.clearRect(0, 0, W, H);
	rainAnimation=false;
	// variabbles
	var xpos=0;
	var ypos=0;
	var index=0;
	var numFrames=24;
	var frameW= 1000;
	var frameH = 1000;
	var imageWidth=11997;

	// load lightning sprite sheet
	var lightning = new Image();
	lightning.src ="images/lightningSprite.png";
	lightning.onload=function(){
		// play animation (sprite sheet)
		thunderstormAnimation=setInterval(loop,1000/15);

	}
	// loop through sprite sheet
	function loop(){
		if(thunderBool){

				ctx.fillStyle = "rgba(57, 82, 114, 0.2)";
				ctx.fillRect(W/2,0,frameH,frameW);
				ctx.drawImage(lightning,xpos,ypos,frameW,frameH,W/2,0,frameW,frameH);
				xpos +=frameW;
				index+=1;

				if(index>=numFrames){
					xpos=0;
					ypos=0;
					index=0;
				}
		        else if (xpos + frameW > imageWidth){
		            xpos =0;
		            ypos += frameW;
		        }
		        ctx.fill();
		}
	}
	rain();

}
// stop all animation on the canvas to switch animations
function stopAnimations(){
	ctx.clearRect(0, 0, W, H);
	cloudsAnimation=false;
	rainAnimation=false;
	snowAnimation=false;
	sunBool=false;
	clearInterval(thunderstormAnimation);
}
// clickable icons 
// for user to see each animation the project offers
function clickIcons(){
	$("#sunny").click(function(){

		sunnyDay();	
	});
	$("#cloudy").click(function(){

		cloudyDay();
	});
	$("#snowing").click(function(){

		letItSnow();
	});
	$("#raining").click(function(){

		rain();
	});
	$("#storming").click(function(){

		thunderstorm();
	});

	// allows user to open the google map by clicking the map icon
	var mapOpen=true;

	$("#googleMap").click(function(){
		if(mapOpen)
		{
			$("#map").fadeTo("slow",1);
			mapOpen=false;
		}
		else{
			$("#map").fadeTo("slow",0);
			mapOpen=true;
		}
	});
}
// load init when the window loads
window.onload=init;