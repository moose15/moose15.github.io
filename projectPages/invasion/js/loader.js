/*
loader.js
variable app is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the bubbles game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// CONSTANTS
app.KEYBOARD = {
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"BACK_SPACE":8
};
// load images
app.IMAGES = {
    enemyImage: "images/head.png",
    bgImage: "images/background_dark.png",
    logoImage: "images/logo.png",
 };


// properties of app that will be accessed by the blastem.js module
app.animationID = undefined;
app.paused = false;

// app.keydown array to keep track of which keys are down
// this is called a "key daemon"
// blastem.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
app.keydown = [];

// the Modernizr object is from the modernizr.custom.js file
Modernizr.load(
	{ 
		// load all of these files
		load : [
			'js/polyfills.js',
			'js/utilities.js',
			'js/invasion.js',
			'js/draw.js',
			'js/enemy.js',
			'js/particles.js',
			app.IMAGES['enemyImage'], // ignore console error
			app.IMAGES['bgImage'], // ignore console error
			app.IMAGES['logoImage'], // ignore console error
		],
		
		// when the loading is complete, this function will be called
		complete: function(){
			
			// set up event handlers
			window.onblur = function(){
				app.paused = true;
				cancelAnimationFrame(app.animationID);
				app.keydown = []; // clear key daemon
				// call update() so that our paused screen gets drawn
				createjs.Sound.stop();
				app.invasion.update();
			};
			
			window.onfocus = function(){
				app.paused = false;
				cancelAnimationFrame(app.animationID);
				// start the animation back up
				//app.invasion.startSoundtrack();
				app.invasion.update();
			};
			
			// event listeners
			window.addEventListener("keydown",function(e){

				app.keydown[e.keyCode] = true;
			});
				
			window.addEventListener("keyup",function(e){

				app.keydown[e.keyCode] = false;
			});

			window.addEventListener('touchstart', function(e){
				e.preventDefault();
				app.keydown[app.KEYBOARD.KEY_SPACE]=true;
			},false);

			window.addEventListener('touchend', function(e){
				e.preventDefault();
				app.keydown[app.KEYBOARD.KEY_SPACE]=false;
			},false);
			
			// //start loading sounds
			// createjs.Sound.alternateExtensions = ["mp3"];
			// //createjs.Sound.registerSound({id:"background",src:"sounds/vikingsAttack.mp3"});
			// createjs.Sound.registerSound({id:"explosion",src:"sounds/BottleCork.mp3"});
			// createjs.Sound.registerSound({id:"superShout",src:"sounds/animal_roar2.mp3"});
			
			// createjs.Sound.addEventListener("fileload",handleFileLoad);

			function handleFileLoad(e){
				// console.log("Preloaded Sound:", e.id,e.src);
			//if(e.src == "sounds/vikingsAttack.mp3") app.invasion.startSoundtrack();

			}
			// start game
			app.invasion.init();
		} // end complete
		
	} // end object
); // end Modernizr.load
