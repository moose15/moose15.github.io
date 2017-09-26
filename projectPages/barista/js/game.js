// game.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};
app.game = {
	// CONSTANTs
	WIDTH : 1100, 
	HEIGHT: 750,
	
	//game states
	GAME_STATE_TITLE:0,
	GAME_STATE_GAME:1,
	GAME_STATE_END: 2,
	GAME_STATE_ROUND_OVER: 3,
	GAME_STATE_DEFAULT:4,

	NUM_DRINKS_END:10,


	secondsToNextOrder:500,
	score : 0,
	drinksMade:0,
	canvas : undefined,
	ctx :  undefined,
	btn: undefined,
	term:undefined,
	animationID:undefined,
	paused:false,
	gameState:0,
	timer: 100,
	totalSeconds:undefined,
	drinks:[],
	ti:undefined,

	//buttons
	espressoBtn:undefined,
	chocolateBtn:undefined,
	steamedMilkBtn:undefined,
	doneBtn:undefined,
	playBtn:undefined,


	max:5,
	//created drink vars
	createdIngredient:[],

	ordersToMake:1,
	
	// list of drinks
	espresso:undefined,
	espressoMacchiato:undefined,
	espressoConPanna: undefined,
	breve:undefined,
	latte:undefined,
	flatWhite:undefined,
	americano:undefined,
	mocha:undefined,
	cappuccino:undefined,
	irish:undefined,
	caramelMacchiato:undefined,
	doubleShot:undefined,
	
	orderTimer:undefined,
	secondsToNewOrder: 10,

	//for timer
	timeInSecs:30,
	flooredTimer:undefined,
	dt:1/120,
	drinkCounter:0,

	//images
	mugImage:undefined,
	espressoImage:undefined,
	chocolateImage: undefined,
    caramelImage:undefined,
    waterImage: undefined,
    steamedMilkImage: undefined,
    whiskeyImage:undefined ,
    whippedCreamImage: undefined,
    milkFoamImage:undefined, 
    bgImage:undefined,

    //drink images
    espressoDrinkImage: undefined,
    americanoImage: undefined,
    breveImage: undefined,
    cappuccinoImage: undefined,
    doubleshotImage: undefined,
    caramelMacchiatoImage: undefined,
    espressoConPannaImage: undefined,
    espressoMacchiatoImage: undefined,
    flatWhiteImage: undefined,
    irishImage: undefined,
    latteImage: undefined,
    mochaImage: undefined,
    corkboardImage: undefined,
    titleImage: undefined,
	//for storing high scores
	hSOne:localStorage.getItem("highScoreOne"),
	hSTwo:localStorage.getItem("highScoreTwo"),
	hSThree:localStorage.getItem("highScoreThree"),

	//init function
	init : function() {
		this.canvas = document.querySelector('#canvas');
		// the canvas context enables us to 
		// interact with the canvas api
		this.ctx = this.canvas.getContext('2d');
		this.textV =document.getElementById("killTerm");
		this.bg = document.getElementById("background");

		//initialize buttons
		this.doneBtn = document.getElementById("done");
		this.espressoBtn = document.getElementById("espresso");
		this.chocolateBtn = document.getElementById("chocolate");
		this.steamedMilkBtn = document.getElementById("steamedMilk");
		this.milkFoamBtn = document.getElementById("milkFoam");
		this.whiskeyBtn = document.getElementById("whiskey");
		this.waterBtn = document.getElementById("water");
		this.caramelBtn = document.getElementById("caramel");
		this.whippedCreamBtn = document.getElementById("whippedCream");
		this.playBtn = document.getElementById("play");
		this.playAgainBtn = document.getElementById("playAgain");
		//set canvas width and height
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;

		// this game has a lot of images.
		// load all images (25)
		var m = new Image();
		m.src = app.IMAGES['mugImage'];
		this.mugImage = m;

		var e = new Image();
		e.src = app.IMAGES['espressoImage'];
		this.espressoImage = e;

		var c = new Image();
		c.src = app.IMAGES['chocolateImage'];
		this.chocolateImage = c;

		var cara = new Image();
		cara.src = app.IMAGES['caramelImage'];
		this.caramelImage = cara;

		var w = new Image();
		w.src = app.IMAGES['waterImage'];
		this.waterImage = w;

		var st = new Image();
		st.src = app.IMAGES['steamedMilkImage'];
		this.steamedMilkImage = st;

		var wisk = new Image();
		wisk.src = app.IMAGES['whiskeyImage'];
		this.whiskeyImage = wisk;

		var whip = new Image();
		whip.src = app.IMAGES['whippedCreamImage'];
		this.whippedCreamImage = whip;

		var mF = new Image();
		mF.src = app.IMAGES['milkFoamImage'];
		this.milkFoamImage = mF;

		var eD = new Image();
		eD.src = app.IMAGES['espressoDrinkImage'];
		this.espressoDrinkImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['americanoImage'];
		this.americanoImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['breveImage'];
		this.breveImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['cappuccinoImage'];
		this.cappuccinoImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['doubleshotImage'];
		this.doubleshotImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['caramelMacchiatoImage'];
		this.caramelMacchiatoImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['espressoConPannaImage'];
		this.espressoConPannaImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['espressoMacchiatoImage'];
		this.espressoMacchiatoImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['flatWhiteImage'];
		this.flatWhiteImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['latteImage'];
		this.latteImage = eD;

		var eD = new Image();
		eD.src = app.IMAGES['irishImage'];
		this.irishImage = eD;
		
		var eD = new Image();
		eD.src = app.IMAGES['mochaImage'];
		this.mochaImage = eD;

		var back = new Image();
		back.src = app.IMAGES['bgImage'];
		this.bgImage = back;

		var cork = new Image();
		cork.src = app.IMAGES['corkboardImage'];
		this.corkboardImage = cork;

		var t = new Image();
		t.src = app.IMAGES['titleImage'];
		this.titleImage = t;

		this.buttons();
		this.createDrinks();

		//update
		this.update();
		this.canvas.onmousedown = this.doMousedown;

	},

	// update function
	update: function(){
		// clear screen
		this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
		//draw background image
		this.ctx.drawImage(this.bgImage,0,0);
		// show and hide buttons depending on the gamestate
		this.showAndHideBtns();
		if(this.gameState == this.GAME_STATE_TITLE){
			// don't do anything
		}
		//draw HUD
		this.drawHUD(this.ctx);
		// during the game...
		if(this.gameState == this.GAME_STATE_GAME){

			//draw mug and order board
			this.ctx.drawImage(this.mugImage,this.WIDTH/2-100,this.HEIGHT/2-150);
			this.ctx.drawImage(this.corkboardImage,0,70);

			// draw images
			this.drawSprites();
			// start timer
			this.timer -=1;
			this.startTimer();
			
			if(this.timer == 0){
				this.pickRandomDrink();
				this.timer = this.secondsToNextOrder;
				console.log("This.timer"+this.timer);
			}
			// paused screen
			if(app.paused){
				this.ctx.save();
				this.ctx.globalAlpha = 0.5;
				this.drawPauseScreen(this.ctx);
				this.ctx.restore();
				return;
			}
			// control speed at which orders are created
			if(this.drinkCounter==10){
				this.secondsToNextOrder-=20;
				this.drinkCounter=0;
				console.log("seonds to next order"+this.secondsToNextOrder);
			}
			// lose conditions
			if( this.flooredTimer ==0 || app.OrderTable.orders.length==app.OrderTable.maxOrders){
				this.sortHighScores();
				this.gameState = this.GAME_STATE_END;
			}
		}

		app.animationID = requestAnimationFrame(this.update.bind(this));
	},
	//reset function for reseting the game
	resetGame:function(){

		//reset variables
		this.score=0;
		this.timeInSecs=0;
		this.timeInSecs +=30;
		this.dt=1/120;
		this.drinksMade=0;
		this.drinkCounter=0;
		this.flooredTimer=undefined;
		app.OrderTable.orders.length=0;
		this.secondsToNextOrder=500;
		// this.createdIngredient=[];
		// app.CreateDrink.completeDrink(this.ctx);
		this.gameState = this.GAME_STATE_TITLE;
	},
	// buttons function
	buttons:function(){
		// button stuff
		this.espressoBtn.onclick = function(){
			// if espresso button is clicked and there are less then the max of ingredients in a drink,
			// add the ingredient, and push string onto the createdingredient array
			// do this for every ingredient
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.espressoImage);
				app.game.createdIngredient.push("espresso");
			}

		};
		this.chocolateBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.chocolateImage);
				app.game.createdIngredient.push("chocolate");
			}

		};
		this.waterBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.waterImage);
				app.game.createdIngredient.push("water");
			}

		};
		this.caramelBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.caramelImage);
				app.game.createdIngredient.push("caramel");
			}

		};
		this.steamedMilkBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.steamedMilkImage);
				app.game.createdIngredient.push("steamed milk");
			}

		};
		this.milkFoamBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.milkFoamImage);
				app.game.createdIngredient.push("milk foam");
			}

		};
		this.whiskeyBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.whiskeyImage);
				app.game.createdIngredient.push("whiskey");
			}

		};
		this.whippedCreamBtn.onclick = function(){
			if(app.game.createdIngredient.length<app.game.max){
				app.game.addIngredient(app.game.whippedCreamImage);
				app.game.createdIngredient.push("whipped cream");
			}
		};
		// determine if the drink was on the order list
		this.doneBtn.onclick = function(){

			app.game.doneDrink(app.game.createdIngredient);
			console.log("Done hit");
			console.log("createdIngredient: length"+app.game.createdIngredient.length);
			console.log("Created ingredient array:"+app.game.createdIngredient);
		};
		// play game 
		this.playBtn.onclick = function(){
			app.game.gameState = app.game.GAME_STATE_GAME;
			console.log("app.game.gameState "+ app.game.gameState);

		};
		// re-play game and reset variables
		this.playAgainBtn.onclick = function(){
			app.game.resetGame();
		}

	},

	//timer function
	startTimer:function(){
		this.timeInSecs -= this.dt;
		this.flooredTimer= Math.floor(this.timeInSecs);
		if(this.flooredTimer == 0){
			this.dt=0;

		} 
		this.drawText(this.ctx,this.flooredTimer, this.WIDTH/2,40,30, "#6b4e3b");
	},

	//featuers 12 different drinks
	createDrinks:function(){
		
		// Create drinks and determine which ingredients go into each drink
		// each drink has a title, image, and ingredients
		//mocha
		this.mocha = this.createCoffeeRecipe("mocha",this.mochaImage, "espresso", "chocolate", "steamed milk","milk foam", null);
		this.drinks.push(this.mocha);
		//cappuccino
		this.cappuccino = this.createCoffeeRecipe("cappuccino",this.cappuccinoImage, "espresso", "steamed milk","steamed milk", "milk foam");
		this.drinks.push(this.cappuccino);
		//irish
		this.irish = this.createCoffeeRecipe("irish",this.irishImage,"espresso", "whiskey","whiskey", "whipped cream");
		this.drinks.push(this.irish);
		//espresso
		this.espresso = this.createCoffeeRecipe("espresso",this.espressoDrinkImage,"espresso");
		this.drinks.push(this.espresso);
		//espresso Macchiato
		this.espressoMacchiato = this.createCoffeeRecipe("espresso macchiato",this.espressoMacchiatoImage,"espresso","milk foam");
		this.drinks.push(this.espressoMacchiato);
		//esspresso con panna
		this.espressoConPanna = this.createCoffeeRecipe("espresso con panna",this.espressoConPannaImage,"espresso","whipped cream");
		this.drinks.push(this.espressoConPanna);
		//breve
		this.breve = this.createCoffeeRecipe("breve",this.breveImage,"espresso","steamed milk","steamed milk","whipped cream");
		this.drinks.push(this.breve);
		//latte
		this.latte = this.createCoffeeRecipe("latte",this.latteImage,"espresso","steamed milk","steamed milk","steamed milk","milk foam");
		this.drinks.push(this.latte);
		//flat whitesnipping
		this.flatWhite = this.createCoffeeRecipe("flat white",this.flatWhiteImage,"espresso","steamed milk","steamed milk","steamed milk");
		this.drinks.push(this.flatWhite);
		//americano
		this.americano = this.createCoffeeRecipe("americano",this.americanoImage,"espresso","water","water","water");
		this.drinks.push(this.americano);
		//caramel macchiato
		this.caramelMacchiato = this.createCoffeeRecipe("caramel macchiato",this.caramelMacchiatoImage,"espresso","caramel","steamed milk","steamed milk","milk foam");
		this.drinks.push(this.caramelMacchiato);
		// double shot
		this.doubleShot = this.createCoffeeRecipe("double shot",this.doubleshotImage,"espresso","espresso");
		this.drinks.push(this.doubleShot);

	
	},
	// add ingredient
	addIngredient:function(color){
		app.CreateDrink.addIngredient(color, null);
	},
	// remove ingredient from the canvas
	removeIngredentsFromCanvas:function(array){
		this.createdIngredient=[];
		app.CreateDrink.completeDrink(this.ctx);
	},
	// When the order up button is clicked, determine if the user created a drink in the order list
	// there is no penalty if the user makes a drink correctly that's not on the list or if the user doesn't 
	//use the right ingredients.
	doneDrink:function(array){
		
		this.removeIngredentsFromCanvas(array);
		// if the drink ingredients match the ingredients used by the user, determine which kind of drink was created
		if(array[0] == this.mocha.ingredient1 && array[1] ==  this.mocha.ingredient2 && array[2]==this.mocha.ingredient3 && array[3] == this.mocha.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("mocha");

		}
		else if(array[0] == this.cappuccino.ingredient1 && array[1] ==  this.cappuccino.ingredient2 && array[2]==this.cappuccino.ingredient3 && array[3] == this.cappuccino.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("cappuccino");

		}
		else if(array[0] == this.irish.ingredient1 && array[1] ==  this.irish.ingredient2 && array[2]==this.irish.ingredient3 && array[3] == this.irish.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("irish");

		}
		else if(array[0] == this.espresso.ingredient1 && array[1] ==  null && array[2]==null && array[3] == null && array[4]==null){

			app.OrderTable.completeOrder("espresso");

		}
		else if(array[0] == this.espressoMacchiato.ingredient1 && array[1] ==  this.espressoMacchiato.ingredient2 && array[2]==null && array[3] == null && array[4]==null){

			app.OrderTable.completeOrder("espresso macchiato");

		}
		else if(array[0] == this.espressoConPanna.ingredient1 && array[1] ==  this.espressoConPanna.ingredient2 && array[2]==null && array[3] == null && array[4]==null){

			app.OrderTable.completeOrder("espresso con panna");

		}
		else if(array[0] == this.breve.ingredient1 && array[1] ==  this.breve.ingredient2 && array[2]==this.breve.ingredient3 && array[3] == this.breve.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("breve");

		}
		else if(array[0] == this.latte.ingredient1 && array[1] ==  this.latte.ingredient2 && array[2]==this.latte.ingredient3 && array[3] == this.latte.ingredient4 && array[4]==this.latte.ingredient5){

			app.OrderTable.completeOrder("latte");

		}
		else if(array[0] == this.flatWhite.ingredient1 && array[1] ==  this.flatWhite.ingredient2 && array[2]==this.flatWhite.ingredient3 && array[3] == this.flatWhite.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("flat white");

		}
		else if(array[0] == this.americano.ingredient1 && array[1] ==  this.americano.ingredient2 && array[2]==this.americano.ingredient3 && array[3] == this.americano.ingredient4 && array[4]==null){

			app.OrderTable.completeOrder("americano");

		}
		else if(array[0] == this.caramelMacchiato.ingredient1 && array[1] ==  this.caramelMacchiato.ingredient2 && array[2]==this.caramelMacchiato.ingredient3 && array[3] == this.caramelMacchiato.ingredient4 && array[4]==this.caramelMacchiato.ingredient5){

			app.OrderTable.completeOrder("caramel macchiato");

		}
		else if(array[0] == this.doubleShot.ingredient1 && array[1] ==  this.doubleShot.ingredient2 && array[2]==null && array[3] == null  && array[4]==null){
			app.OrderTable.completeOrder("double shot");
		}
		else{
			// console.log("You didn't create any fancy drink. Try again.");
			//play wrong sound when no drink is created at all
			// if a drink was created but was not on the order list, there will be now sound
			createjs.Sound.play("wrong");
		}
	},
 // pick a random drink and add it to the table
	pickRandomDrink: function(){
		var ran = Math.floor(Math.random()*this.drinks.length);
		var randomDrink = this.drinks[ran];

		return app.OrderTable.addOrder(randomDrink.coffeeName, randomDrink.coffeeImage);
	},
	// draw  table and drinks
	drawSprites: function(){
		// draw order station
		app.OrderTable.draw(this.ctx);
		app.CreateDrink.draw(this.ctx);
	},

	// each drink is an object with a name, image, and several ingredients
	createCoffeeRecipe: function(name,image,ingre1,ingre2,ingre3,ingre4,ingre5){
		var drink ={
			coffeeName: name,
			coffeeImage:image,
			ingredient1:ingre1,
			ingredient2:ingre2,
			ingredient3:ingre3,
			ingredient4:ingre4,
			ingredient5:ingre5
		};
		return drink;
	},

	// draws the pause screen
	drawPauseScreen: function(ctx){
		ctx.save();
		ctx.clearRect(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.drawText(this.ctx, "PAUSED", this.WIDTH/2, this.HEIGHT/2, 60, "black");
		ctx.restore();
	},

	//determines which buttons show and hide based on the game state variable
	showAndHideBtns:function(){
		//if its the title screen
		if(this.gameState == this.GAME_STATE_TITLE){
			this.playBtn.className = "showbutton";

			this.doneBtn.className = "hidebutton";
			this.espressoBtn.className = "hidebutton";
			this.chocolateBtn .className = "hidebutton";
			this.milkFoamBtn .className = "hidebutton";
			this.whiskeyBtn .className = "hidebutton";
			this.whippedCreamBtn .className = "hidebutton";
			this.steamedMilkBtn .className = "hidebutton";
			this.playAgainBtn.className = "hidebutton";
			this.caramelBtn .className = "hidebutton";
			this.waterBtn.className = "hidebutton";

		}
		else if (this.gameState == this.GAME_STATE_GAME){

			this.doneBtn.className = "showbutton";
			this.espressoBtn.className = "showbutton";
			this.chocolateBtn .className = "showbutton";
			this.milkFoamBtn .className = "showbutton";
			this.whiskeyBtn .className = "showbutton";
			this.whippedCreamBtn .className = "showbutton";
			this.steamedMilkBtn .className = "showbutton";
			this.caramelBtn .className = "showbutton";
			this.waterBtn.className = "showbutton";

			this.playBtn.className = "hidebutton";
			this.playAgainBtn.className = "hidebutton";
		}
		else if(this.gameState==this.GAME_STATE_END){
			this.playAgainBtn.className = "showbutton";

			this.doneBtn.className = "hidebutton";
			this.espressoBtn.className = "hidebutton";
			this.chocolateBtn .className = "hidebutton";
			this.milkFoamBtn .className = "hidebutton";
			this.whiskeyBtn .className = "hidebutton";
			this.whippedCreamBtn .className = "hidebutton";
			this.steamedMilkBtn .className = "hidebutton";
			this.playBtn.className = "hidebutton";
			this.caramelBtn .className = "hidebutton";
			this.waterBtn.className = "hidebutton";
		}
		else if(this.gameState==this.GAME_STATE_ROUND_OVER){
			this.playAgainBtn.className = "hidebutton";

			this.doneBtn.className = "hidebutton";
			this.espressoBtn.className = "hidebutton";
			this.chocolateBtn .className = "hidebutton";
			this.milkFoamBtn .className = "hidebutton";
			this.whiskeyBtn .className = "hidebutton";
			this.whippedCreamBtn .className = "hidebutton";
			this.steamedMilkBtn .className = "hidebutton";
			this.playBtn.className = "hidebutton";
			this.caramelBtn .className = "hidebutton";
			this.waterBtn.className = "hidebutton";
		}

	},

	//draws the HUD
	drawHUD:function(ctx){
		if(this.gameState == this.GAME_STATE_GAME){
			// draw the score
			this.drawText(ctx,"Drinks Made: "+ this.drinksMade ,20,35,20,"#6b4e3b");
		}
		if(this.gameState == this.GAME_STATE_TITLE){
			// draw the title image
			this.ctx.drawImage(this.titleImage,180,this.HEIGHT/2-300);
			// draw author text
			this.drawText(ctx,"by", this.WIDTH/2-20, this.HEIGHT/2-50, 25, "#6b4e3b");
			this.drawText(ctx,"Katie Pustolski", this.WIDTH/2-95, this.HEIGHT/2, 25, "#6b4e3b");
			// create breif instructions
			this.drawText(ctx,"Make as many drinks as you can before the timer runs out.", 170, this.HEIGHT/2+100, 25, "#6b4e3b");
			this.drawText(ctx,"Also, If too many orders are unfilled, you'll get fired!", 205, this.HEIGHT/2+150, 25, "#6b4e3b");

		}
		// // if it is the end game screen
		// // this screen includes locally stored scores
		if(this.gameState==this.GAME_STATE_END ){
			ctx.save();
			this.ctx.globalAlpha = 0.9;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.drawText(ctx,"You're FIRED!", this.WIDTH/2, 50, 34, "#6b4e3b");
			this.drawText(ctx,"You made "+ this.drinksMade + " drinks.", this.WIDTH/2, 100, 25, "#6b4e3b");
			this.drawText(ctx,"Your High Scores:", this.WIDTH/2, 200, 30,"#6b4e3b");
			this.drawText(ctx,"1:  " + this.hSOne, this.WIDTH/2, 250, 20,"#6b4e3b");
			this.drawText(ctx,"2:  " + this.hSTwo, this.WIDTH/2, 300, 20, "#6b4e3b");
			this.drawText(ctx,"3:  " + this.hSThree, this.WIDTH/2,350, 20,"#6b4e3b");

			ctx.restore();
		}
	},
	
	
	//draw text method
	drawText : function(ctx, string, x, y, size, col) {
		ctx.font = 'bold '+size+'px Tahoma';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
	},
	
	// soundtrack realted method
	startSoundtrack: function(){
		createjs.Sound.stop();
		createjs.Sound.play("background",{loop:-1, volume:0.2});
	},
	// helps sort high scores
	sortHighScores:function(){

		if(this.drinksMade > this.hSOne){
			this.hSThree = this.hSTwo;
			this.hSTwo = this.hSOne;
			this.hSOne = this.drinksMade;
		}
		else if(this.drinksMade > this.hSTwo && this.drinksMade < this.hSOne){
			this.hSThree=this.hSTwo;
			this.hSTwo = this.drinksMade;
		}
		else if(this.drinksMade > this.hSThree && this.drinksMade < this.hSTwo){
			this.hSThree = this.drinksMade;
		}
		 if (this.hSOne ==null || this.hSTwo==null || this.hSThree==null){
			this.hSThree = 0;
			this.hSTwo = 0;
			this.hSOne = 0;
		}

		if(typeof(Storage)!=="undefined")
		{
		 	// Code for localStorage/sessionStorage.
		 	//store scores locally
		 	localStorage.highScoreOne = this.hSOne;
		 	localStorage.highScoreTwo = this.hSTwo;
		 	localStorage.highScoreThree = this.hSThree;

		}
	}
	
	
};

window.onload=app.game.init();