ETGame.MainMenu = function (game) {

};

var startButton;
var optionButton;
var soundButton;

//Background control
var isSoundOn = true;
var normalBackgroundMusic;

function changeSoundSetting() {
	isSoundOn = !isSoundOn;
	
	//Change the button texture and stop background music
	if(isSoundOn){
		normalBackgroundMusic.play('',0,1,true);
		soundButton.setFrames('restart_button2.png', 'restart_button2.png', 'restart_button2.png');
	}else{
		normalBackgroundMusic.stop();
		soundButton.setFrames('restart_button1.png', 'restart_button1.png', 'restart_button1.png');
	}
}

ETGame.MainMenu.prototype = {

  preload: function () {
  },

  create: function () {
	// Background and title
	this.add.sprite(0, 0, 'main_menu_background');
	
	//Buttons
	startButton = this.add.button(83, 205, 'buttons', this.startGame, this, 'start_button2.png', 'start_button1.png', 'start_button2.png');
	startButton.scale.x = 0.3;
	startButton.scale.y = 0.3;
	
	soundButton = this.add.button(226, 0, 'buttons', this.soundButtonTapped, this, 'restart_button2.png', 'restart_button2.png', 'restart_button2.png');
	soundButton.scale.x = 0.3;
	soundButton.scale.y = 0.3;
	
	//Play the background music
	normalBackgroundMusic = this.add.audio('normal_background_music',1,true);
	if(isSoundOn){
		normalBackgroundMusic.play('',0,1,true);
	}
  },
  
  startGame: function () {
	  // start the game
	  normalBackgroundMusic.stop();
	  this.state.start('MainGame');
  },
  
  actionOnClick: function() {
	  this.startGame();
  },
  
  soundButtonTapped: function() {
	  changeSoundSetting();
  }
};