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
	"BACK_SPACE":8,
	"ENTER":13
};
// load images
app.IMAGES = {
    mugImage: "images2/mug.png",
    espressoImage: "images2/espresso.png",
    chocolateImage: "images2/chocolate.png",
    caramelImage: "images2/caramel.png",
    waterImage: "images2/water.png",
    steamedMilkImage: "images2/steamedMilk.png",
    whiskeyImage: "images2/whiskey.png",
    whippedCreamImage: "images2/whippedcream.png",
    milkFoamImage: "images2/milkFoam.png",

    //drink images
    espressoDrinkImage: "images2/espressoDrink.PNG",
    americanoImage: "images2/americano.PNG",
    breveImage: "images2/breve.PNG",
    cappuccinoImage: "images2/cappuccino.PNG",
    doubleshotImage: "images2/doubleshot.PNG",
    caramelMacchiatoImage: "images2/caramelMacchiato.PNG",
    espressoConPannaImage: "images2/espressoConPanna.PNG",
    espressoMacchiatoImage: "images2/espressoMacchiato.PNG",
    flatWhiteImage: "images2/flatWhite.PNG",
    irishImage: "images2/irish.PNG",
    latteImage: "images2/latte.PNG",
    mochaImage: "images2/mocha.PNG",
	// https://c1.staticflickr.com/5/4051/4528472655_7eb7e9aae1_z.jpg
	corkboardImage: "images2/corkboard.png",
    bgImage: "images2/background2.png",
    titleImage: "images2/title.png",
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
			'js/order.js',
			'js/orderTable.js',
			'js/drinkCreator.js',
			'js/game.js',
			'js/ingredient.js',
			
			app.IMAGES['mugImage'], // ignore console error
			app.IMAGES['espressoImage'], // ignore console error
			app.IMAGES['chocolateImage'], // ignore console error
			app.IMAGES['caramelImage'], // ignore console error
			app.IMAGES['waterImage'], // ignore console error
			app.IMAGES['steamedMilkImage'], // ignore console error
			app.IMAGES['whiskeyImage'], // ignore console error
			app.IMAGES['whippedCreamImage'], // ignore console error
			app.IMAGES['milkFoamImage'], // ignore console error

			app.IMAGES['espressoDrinkImage'], // ignore console error
			app.IMAGES['americanoImage'], // ignore console error
			app.IMAGES['breveImage'], // ignore console error
			app.IMAGES['cappuccinoImage'], // ignore console error
			app.IMAGES['doubleshotImage'], // ignore console error
			app.IMAGES['caramelMacchiatoImage'], // ignore console error
			app.IMAGES['espressoConPannaImage'], // ignore console error
			app.IMAGES['espressoMacchiatoImage'], // ignore console error
			app.IMAGES['flatWhiteImage'], // ignore console error
			app.IMAGES['irishImage'], // ignore console error
			app.IMAGES['latteImage'], // ignore console error
			app.IMAGES['mochaImage'], // ignore console error

			app.IMAGES['corkboardImage'],
			app.IMAGES['titleImage'],
			app.IMAGES['bgImage'] // ignore console error
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

				app.game.update();
			};
			
			window.onfocus = function(){
				app.paused = false;
				cancelAnimationFrame(app.animationID);
				// start the animation back up
				app.game.startSoundtrack();
				app.game.dt=1/60;
				app.game.update();
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
			createjs.Sound.alternateExtensions = ["mp3"];
			createjs.Sound.registerSound({id:"background",src:"sounds/Park Bench.mp3"});
			createjs.Sound.registerSound({id:"wrong",src:"sounds/BasketballRim.mp3"});
			createjs.Sound.registerSound({id:"correct",src:"sounds/Ding Sound Effect.mp3"});
			
			createjs.Sound.addEventListener("fileload",handleFileLoad);

			function handleFileLoad(e){
				// console.log("Preloaded Sound:", e.id,e.src);
				if(e.src == "sounds/Park Bench.mp3") app.game.startSoundtrack();

			}
			// start game
			app.game.init();
		} // end complete
		
	} // end object
); // end Modernizr.load
