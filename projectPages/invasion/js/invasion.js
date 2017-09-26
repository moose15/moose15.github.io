// invasion.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.invasion = {
	// CONSTANTs
	WIDTH : 635, 
	HEIGHT: 740,
	
	//game states
	GAME_STATE_TITLE:0,
	GAME_STATE_GAME:1,
	GAME_STATE_END: 2,

	score : 0,
	canvas : undefined,
	ctx :  undefined,
	btn: undefined,
	term:undefined,
	dt: 1/60.0, // "delta time"
	enemies:[],
	textV:undefined,
	animationID:undefined,
	paused:false,
	numberUntilSuperShout:10,
	gameState:0,
	//for particles
	particles : [],
	//images
	enemyImage:undefined,
	bgImage:undefined,
	logoImage:undefined,

	lives:9,
	updateRate:0,
	superShout:0,
	superShoutActive5:false,
	enemyProbablilityPerSecond:0.2,

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

		//set canvas width and height
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;

		//initialize enemy image
		var e = new Image();
		e.src = app.IMAGES['enemyImage'];
		this.enemyImage = e;
		//initialize background image
		var b = new Image();
		b.src = app.IMAGES['bgImage'];
		this.bgImage = b;
		//initialize logo image
		var l = new Image();
		l.src = app.IMAGES['logoImage'];
		this.logoImage = l;
		//update
		this.update();
		// when mouse clicks on canvas, call doMousedown method
		this.canvas.onmousedown = this.doMousedown;

	},
	// reset function for reseting the game
	reset:function(){
		this.score=0;
		this.superShout = 0;
		this.updateRate=0;
		this.numberUntilSuperShout=20;
		this.enemyProbablilityPerSecond=0.2;
		this.superShoutActive=false;
		this.lives=9;
		this.enemies=[];
		this.gameState = this.GAME_STATE_TITLE;
	},
	// update function
	update: function(){
    	this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
    	//draw background image
    	this.ctx.drawImage(this.bgImage,0,0);

    	// when the player types in 'play', change the game state and start the game
    	if(this.gameState == this.GAME_STATE_TITLE  && this.textV.value =="play"){
    		this.textV.value ="";
    		this.gameState = this.GAME_STATE_GAME;
    	}
    	//drawHUD
		this.drawHUD(this.ctx);
    	// if the game state is equal to game, create game
    	if(this.gameState == this.GAME_STATE_GAME){
			if(app.paused){
				this.ctx.save();
				this.ctx.globalAlpha = 0.5;
				this.drawPauseScreen(this.ctx);
				this.ctx.restore();
				return;
			}

			// increase enemyProbabilityPerSecond everytime the updateRate variable hits 10
			// or every ten kills the player gets, update the spawn rate
			if(this.updateRate==10){
				this.enemyProbablilityPerSecond+= 0.05;
				this.updateRate=0;
			}
			// if the player loses all lives, figure out highscores and end game
			if(this.lives <=0){
				this.sortHighScores();
				this.gameState = this.GAME_STATE_END;
			}
			//move sprites
			this.moveSprites();
			//draw sprites and change global alpha
			this.ctx.globalAlpha = 1.0;
			this.drawSprites();

			// find enemy
			this.findEnemy();
			// super shout
			this.superShoutF();
		}

		app.animationID = requestAnimationFrame(this.update.bind(this));
	},

	// draws the pause screen
	drawPauseScreen: function(ctx){
		ctx.save();
		app.draw.rect(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		app.draw.text(this.ctx, "PAUSED", this.WIDTH/2, this.HEIGHT/2, 60, "black");
		ctx.restore();
	},
	//draws the HUD
	drawHUD:function(ctx){
		// If the gamestate game state game, draw lives and score 
		if(this.gameState == this.GAME_STATE_GAME){
			this.drawText(ctx,"Score: "+ this.score,this.WIDTH-110,35,18,"white");
			this.drawText(ctx,"Lives: "+ this.lives,45,35,18,"white");
			// if player only has 3 lives left, make the Lives label red
			if(this.lives<=3){
				this.drawText(ctx,"Lives: "+ this.lives,45,35,18,"red");
			}
			//set the fill style to white to make sure paused screen stays white
			ctx.fillStyle="white";
			
			// alert the player that they can super shout
			if(this.superShoutActive){
				this.drawText(ctx,"SUPER SHOUT!",this.WIDTH/3-35,45,40,"white");
				this.drawText(ctx,"PRESS SPACE",this.WIDTH/2-50,70,16,"white");
			}
		}
		// if it is the title screen, draw title screen
		if(this.gameState==this.GAME_STATE_TITLE ){
			ctx.save();
			ctx.drawImage(this.logoImage,this.WIDTH/35,this.HEIGHT/4);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.drawText(ctx,"Created by", this.WIDTH/2, this.HEIGHT/2-20, 13, "white");
			this.drawText(ctx, "Katie Pustolski", this.WIDTH / 2, this.HEIGHT / 2 , 13, "#e0e0e0");
			this.drawText(ctx, "Oh no! Vikings are invading your homeland. ", this.WIDTH / 2, this.HEIGHT / 2 + 50, 15, "#e0e0e0");
			this.drawText(ctx, "Type in the word above a Viking's head to stop their advance. ", this.WIDTH / 2, this.HEIGHT / 2 + 75, 15, "#e0e0e0");
			this.drawText(ctx, "Hold them off as long as you can! ", this.WIDTH / 2, this.HEIGHT / 2 + 100, 15, "#e0e0e0");
			this.drawText(ctx,"Type 'play' into the text box to start", this.WIDTH/2, this.HEIGHT/2+175, 24, "white");
			ctx.restore();
		}
		// if it is the end game screen
		// this screen includes locally stored scores
		if(this.gameState==this.GAME_STATE_END ){
			ctx.save();
			this.ctx.globalAlpha = 0.9;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.drawText(ctx,"You killed "+ this.score + " vikings.", this.WIDTH/2, 50, 34, "White");
			this.drawText(ctx,"Your High Scores:", this.WIDTH/2, 150, 30,"white");
			this.drawText(ctx,"1:  " + this.hSOne, this.WIDTH/2, 200, 20,"#e0e0e0");
			this.drawText(ctx,"2:  " + this.hSTwo, this.WIDTH/2, 250, 20, "#e0e0e0");
			this.drawText(ctx,"3:  " + this.hSThree, this.WIDTH/2,300, 20,"#e0e0e0");
			this.drawText(ctx,"Click screen to play again. ", this.WIDTH/2 , this.HEIGHT/2 , 24, "white");

			ctx.restore();
		}
	},
	// this game only requires enemy movement from the top of the screen to the bottom
	moveSprites: function(){
		//Enemies

		for(var i=0; i < this.enemies.length; i++){
			this.enemies[i].update(this.dt);
		};

		// array.filter() returns a new array with only active enemies
		this.enemies = this.enemies.filter(function(enemy) {
			return enemy.active;
		});

		if(Math.random() < this.enemyProbablilityPerSecond/60) {
			this.enemies.push(new app.Enemy(this.enemyImage,this.WIDTH,this.HEIGHT));
		} 

	},
	// super shout is a special attack where the player presses the space bar, and clears the screen of any vikings
	// this does not score the player any points, but rather helps with getting rid of some pesky enemies
	superShoutF: function(){

		if(this.superShout==this.numberUntilSuperShout){
			this.superShoutActive=true;
		}

		// create particle effect for each enemy if supershout is activated
		if(this.superShoutActive && app.keydown[app.KEYBOARD.KEY_SPACE]){
			for(var i =0; i<this.enemies.length;i++){

				this.createParticles(this.enemies[i].x,this.enemies[i].y);

			}

			this.enemies=[];
			this.superShout=0;
			//createjs.Sound.play("superShout");
			this.superShoutActive=false;
			// make it harder to get the next super shout 
			this.numberUntilSuperShout+=8;
			this.textV.value="";
		}
		// if(app.keydown[app.KEYBOARD.BACK_SPACE]){
		// 	this.textV.value = "";
		// }
	},
	//draw sprites
	drawSprites:function(){
		// draw enemies
		for(var i=0; i < this.enemies.length; i++){
			this.enemies[i].draw(this.ctx);
		};

		// the following is from the fireworks tutorial: http://thecodeplayer.com/walkthrough/canvas-fireworks-tutorial
		// loop over each particle, draw it, update it
		var i = this.particles.length;
		while( i-- ) {
			this.particles[ i ].draw(this.ctx);
			this.particles[ i ].update( i );
		}
		// end code from tutorial
	},
	// function that finds if the value in the text box matches the value of a viking
	findEnemy: function(){
		// loop through enemy array
		for(var i=0; i < this.enemies.length; i++){
			// if the value of the text box is equal to an enemy's word,
			// delete the enemy from the array, add a score, erase textbox
			//break out of loop.
			if(this.textV.value == this.enemies[i].randomWord){
				//create explosion effect
				this.createParticles(this.enemies[i].x,this.enemies[i].y);

				this.enemies.splice(i,1);
				//increase various variables
				this.score++;
				this.superShout++;
				this.updateRate++;

				this.textV.value="";
				//createjs.Sound.play("explosion");
				break;
			}
			// if the enemy hits the edge of the screen,
			// delete off array
			if(this.enemies[i].y>=this.HEIGHT+50){

				this.enemies.splice(i,1);
				// decrease spawn rate 
				this.enemyProbablilityPerSecond=0.3;
				// take away life
				this.lives -= 1;
				break;
			}

		};
	},
	//draw text method
	drawText : function(ctx, string, x, y, size, col) {
		ctx.font = 'bold '+size+'px Tahoma';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
	},
	// create particle group/explosion
	// this is also from the fireworks tutorial :http://thecodeplayer.com/walkthrough/canvas-fireworks-tutorial
	createParticles:function( x, y) {
		// increase the particle count for a bigger explosion
		var particleCount = 30;
		while( particleCount-- ) {
			this.particles.push( new app.Particles( x, y,this.particles ) );
		}
	},
	// used to control game states
	doMousedown:function(e){

		if(app.invasion.gameState==app.invasion.GAME_STATE_END){
			app.invasion.reset();
			return;
		}
	},
	// soundtrack realted method
	startSoundtrack: function(){
	//	createjs.Sound.stop();
		//createjs.Sound.play("background",{loop:-1, volume:0.2});
	},
	// helps sort high scores
	sortHighScores:function(){
		
		if(this.score > this.hSOne){
			this.hSThree = this.hSTwo;
			this.hSTwo = this.hSOne;
			this.hSOne = this.score;
		}
		else if(this.score > this.hSTwo && this.score < this.hSOne){
			this.hSThree=this.hSTwo;
			this.hSTwo = this.score;
		}
		else if(this.score > this.hSThree && this.score < this.hSTwo){
			this.hSThree = this.score;
		}
		 if (this.hSOne ==null || this.hSTwo==null || this.hSThree==null){
			this.hSThree = 0;
			this.hSTwo = 0;
			this.hSOne = this.score;
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

window.onload=app.invasion.init();