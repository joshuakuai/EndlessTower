ETGame.MainGame = function(game) {

};

var player;
var map;
var layer;
var levelJson;
var lights;
var coin;
var coins;
var clock;
var clocks;
var score;
var heights;
var ex_score;
var score_text;
var timer;
var timer_text;
var time_count;
var style;

var gameover;
var return_text;
var overflag = 0;

var flowers;

ETGame.MainGame.prototype = {

	preload : function() {
	},

	create : function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		map = this.add.tilemap('t1');
		map.addTilesetImage('tower_tileset', 'tower_tileset');

		// setting up all the layers
		layerA = map.createLayer('Background');
		layerA.resizeWorld();
		map.setLayer(layerA);

		layerC = map.createLayer('Collision');
		layerC.resizeWorld();
		map.setLayer(layerC);

		layerB = map.createLayer('DarkLayer1');
		layerB.resizeWorld();
		map.setLayer(layerB);

		layerD = map.createLayer('DarkLayer2');
		layerD.resizeWorld();
		map.setLayer(layerD);

		layerE = map.createLayer('DarkLayer3');
		layerE.resizeWorld();
		map.setLayer(layerE);

		layerF = map.createLayer('DarkLayer4');
		layerF.resizeWorld();
		map.setLayer(layerF);

		layerG = map.createLayer('DarkLayer5');
		layerG.resizeWorld();
		map.setLayer(layerG);

		layerH = map.createLayer('DarkLayer6');
		layerH.resizeWorld();
		map.setLayer(layerH);

		layerI = map.createLayer('DarkLayer7');
		layerI.resizeWorld();
		map.setLayer(layerI);

		layerJ = map.createLayer('DarkLayer8');
		layerJ.resizeWorld();
		map.setLayer(layerJ);

		layerK = map.createLayer('DarkLayer9');
		layerK.resizeWorld();
		map.setLayer(layerK);

		layerL = map.createLayer('DarkLayer10');
		layerL.resizeWorld();
		map.setLayer(layerL);

		layerM = map.createLayer('DarkLayer11');
		layerM.resizeWorld();
		map.setLayer(layerM);

		layerN = map.createLayer('DarkLayer12');
		layerN.resizeWorld();
		map.setLayer(layerN);

		lights = this.add.group();
		lights.enableBody = true;
		this.loadSwitches();

		map.setCollisionBetween(1, 100, true, layerC);

		player = this.add.sprite(this.world.width / 2, this.world.height - 52,
				'char');

		this.physics.arcade.enable(player);
		player.body.gravity.y = 500;
		player.body.collideWorldBounds = true;

		music = this.add.audio('tower1');

		// set the anchor to the middle
		player.anchor.setTo(.5, 1);

		// ANIMATIONS:
		player.animations.add('idle', [ 0 ], 5, true);
		player.animations.add('run', [ 1, 2, 3 ], 7, true);
		player.animations.add('jump', [ 0 ], 5, true);

		// init coins
		coins = this.add.group();
		for ( var i = 0; i < 20; i++) {
			coin = coins.create(rnd(56, 184), rnd(368, 1300), "coin");
			this.physics.enable(coin, Phaser.Physics.ARCADE);
		}
		for ( var i = 0; i < 25; i++) {
			coin = coins.create(rnd(56, 184), rnd(1300, 2300), "coin");
			this.physics.enable(coin, Phaser.Physics.ARCADE);
		}
		for ( var i = 0; i < 25; i++) {
			coin = coins.create(rnd(56, 184), rnd(2300, 3248), "coin");
			this.physics.enable(coin, Phaser.Physics.ARCADE);
		}

		// init clocks
		clocks = this.add.group();
		clock = clocks.create(rnd(56, 184), rnd(368, 624), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(624, 880), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(880, 1136), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(1136, 1392), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(1392, 1648), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(1648, 1904), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(1904, 2106), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(2106, 2416), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(2416, 2672), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);
		clock = clocks.create(rnd(56, 184), rnd(2672, 2928), "clock");
		this.physics.enable(clock, Phaser.Physics.ARCADE);

		cursors = this.input.keyboard.createCursorKeys();

		// init timer and score
		timer = 15;
		time_count = 0;
		heights = Math.ceil((this.world.height - player.y - 48) / 10);
		ex_score = 0;
		score = heights + ex_score;
		style = {
			font : "10px Verdana",
			fill : "#ffffff",
			align : "center"
		};
		score_text = this.add.text(2, player.y - 200, "Score\n" + score, style);
		timer_text = this.add.text(225, player.y - 200, "Time\n" + timer + "s",
				style);

		music.play('', 0, 1, true);

		tjump1 = this.add.audio('tjump1');
		lsound = this.add.audio('lsound');
		coin_sound = this.add.audio('coin_sound');
		clock_sound = this.add.audio('clock_sound');
		over_sound1 = this.add.audio('gameover1');
		over_sound2 = this.add.audio('gameover2');

		flowers = this.add.emitter(0, 0, 100);
		flowers.makeParticles('flower');
		flowers.gravity = 200;
	},

	update : function() {

		if (overflag == 0) {
			//location of timer and score
			  if(player.y>3232){
				  score_text.y = 3312-195;
				  timer_text.y = 3312-195;
			  }
			  else{
				  score_text.y = player.y-115;
				  timer_text.y = player.y-115;
			  }
			  
			// hitting coins or clocks
			  for(var i=0; i<coins.length; i++){
				  this.physics.arcade.overlap(player, coins.getAt(i), this.catchCoin, null, this);
			    }
				for(var i=0; i<clocks.length; i++){
					this.physics.arcade.overlap(player, clocks.getAt(i), this.catchClock, null, this);
				}
		
				// calculate score accoding to heights and coins
				  if(heights < Math.ceil((this.world.height-player.y-48)/10)){
					  heights = Math.ceil((this.world.height-player.y-48)/10);
				  }
				  score = heights + ex_score;
				  score_text.text = "Score\n"+score;
				  
		
			// calculate time
			time_count += 1;
			if(time_count == 60){
				time_count = 0;
				timer -= 1;
			}
			timer_text.text = "Time\n"+timer+"s";
			
			//gameover
			if(timer == 0){
				
				music.stop();
		    	over_sound1.play();
		    	over_sound2.play();
		    	gameover = this.add.sprite(60, player.y-50, 'gameover');
		    	return_text = this.add.text(50,player.y+30, "Click to return to main menu!", style);
		    	player.destroy();
		    	overflag = 1;
		    }
			  
			player.body.velocity.x = 0;
			// set the player to collide with the collision layer
			this.physics.arcade.collide(player, layerC);

			// keyboard movement
			if (cursors.left.isDown) {
				player.body.velocity.x = -50;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 50;
			}
			if (cursors.up.isDown && this.touchingGround(player)) {
				player.body.velocity.y = -185;
			}

			this.physics.arcade.collide(player, lights, this.hitSwitch);

			if (cursors.left.isDown) {
				player.body.velocity.x = -50;
				this.flipSprite(player); // call the 'flipSprite' function to
											// face the player left
				// if the player is touching the ground
				if (this.touchingGround(player)) {
					player.animations.play('run');
				}
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 50;
				this.defaultSprite(player); // call the 'defaultSprite'
											// function, to face the player
											// right
				// if the player is touching the ground
				if (this.touchingGround(player)) {
					player.animations.play('run');
				}
				// if the player is not hitting left of right
			} else if (this.touchingGround(player)) {
				player.animations.play('idle');
			}

			// jump
			if (cursors.up.isDown && this.touchingGround(player)) {
				player.body.velocity.y = -185;
				tjump1.play();
				player.animations.play('jump');
			}

			this.camera.y = player.y - 256 / 2;

		}
	},

	render : function() {
	},

	
	
	// hittng coin
	catchCoin : function(player, coin){
		coin_sound.play();
		coin.kill();
		ex_score += 5;
		flowers.x = coin.x;
	    flowers.y = coin.y;
	    flowers.start(true, 2000, null, 10);
		
	},

	catchClock : function(player, clock){

		clock_sound.play();
		clock.kill();
		timer += 20;
		
	},

	loadSwitches : function() {
		levelJson = this.cache.getJSON('levelData');
		for ( var i = 0; i < levelJson["layers"].length; i++) {

			if (levelJson["layers"][i].name == "lights") {
				var switchList = levelJson.layers[i].objects;

				for ( var j = 0; j < switchList.length; j++) {
					var light = lights.create(switchList[j].x, switchList[j].y,
							'light');
					light.anchor.setTo(0, 1);
					light.switchNumber = switchList[j].properties.switchNumber;
					light.body.setSize(16, 18, 0, 2);
					light.body.immovable = true;
				}
			}
		}
	},

	// turn on lights
	hitSwitch : function(player, light) {

		if (player.body.touching.up) {
			if (light.switchNumber == 1) {
				killLayer(layerB);
				lsound.play();
			}

			else if (light.switchNumber == 2) {
				killLayer(layerD);
				lsound.play();
			}

			else if (light.switchNumber == 3) {
				killLayer(layerE);
				lsound.play();
			}

			else if (light.switchNumber == 4) {
				killLayer(layerF);
				lsound.play();
			}

			else if (light.switchNumber == 5) {
				killLayer(layerG);
				lsound.play();
			}

			else if (light.switchNumber == 6) {
				killLayer(layerH);
				lsound.play();
			}

			else if (light.switchNumber == 7) {
				killLayer(layerI);
				lsound.play();
			}

			else if (light.switchNumber == 8) {
				killLayer(layerJ);
				lsound.play();
			}

			else if (light.switchNumber == 9) {
				killLayer(layerK);
				lsound.play();
			}

			else if (light.switchNumber == 10) {
				killLayer(layerL);
				lsound.play();
			}

			else if (light.switchNumber == 11) {
				killLayer(layerM);
				lsound.play();
			}

			else if (light.switchNumber == 12) {
				killLayer(layerN);
				lsound.play();
			}
		}
	},

	
	// check to see if a sprite is touching anything below it, like the tilemap
	// or another sprite
	touchingGround : function(sprite) {
		return (sprite.body.blocked.down || sprite.body.touching.down);
	},

	// face a sprite in it's default direction
	defaultSprite : function(sprite) {
		sprite.scale.x = 1;
	},

	// face a sprite in it's flipped direction
	flipSprite : function(sprite) {
		sprite.scale.x = -1;
	}
};

function killLayer(layer) {
	layer.kill();
}

function rnd(start, end){
    return Math.floor(Math.random() * (end - start) + start);
}