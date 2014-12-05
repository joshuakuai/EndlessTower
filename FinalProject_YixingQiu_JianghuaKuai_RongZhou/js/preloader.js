ETGame.Preloader = function (game) {
  this.background = null;
  this.preloadBar = null;
};

ETGame.Preloader.prototype = {

  	preload: function () {
		
	//prepares the game screen
    this.scale.setShowAll();
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();
		
    //  Show the loading progress bar asset we loaded in boot.js
    this.stage.backgroundColor = '#2d2d2d';

    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+30, 'preloaderBar');
	this.preloadBar.anchor.setTo(0.5, 0.5);
    this.add.text(this.world.centerX, this.world.centerY-20, "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.preloadBar);
	
	// Load the main menu background and button assests
	this.load.image('main_menu_background', 'imgs/mainmenu.jpg');
	this.load.image('game_title', 'imgs/game_title.png');
	this.load.atlas('buttons', 'imgs/buttons.png', 'imgs/buttons.json');
	this.load.audio('normal_background_music', ['sounds/normal_background.mp3', 'sounds/normal_background.ogg']);

    //  Here we load the rest of the assets our game needs...
	//  loads the tilemap
    this.load.tilemap('t1', 'tilemap/tower.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.json('levelData', 'tilemap/tower.json');
    this.load.spritesheet('char', 'imgs/char.png', 16, 16);
    this.load.spritesheet('light', 'imgs/lSwitch.png', 16, 16);
    this.load.image('tower_tileset', 'imgs/tower_tileset.png');
    this.load.image('coin', 'imgs/tTime.png');
    this.load.image('clock', 'imgs/sScore.png')
    this.load.audio('tower1', 'sounds/game.mp3');
    this.load.audio('tjump1', 'sounds/jump.mp3');
    this.load.audio('lsound', 'sounds/light.mp3');
  },

  create: function () {
   	this.state.start('MainMenu');
  }
};
