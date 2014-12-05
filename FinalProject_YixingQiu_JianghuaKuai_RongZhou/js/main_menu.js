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
		soundButton.setFrames('sound_on2.png', 'sound_on1.png', 'sound_on2.png');
	}else{
		normalBackgroundMusic.stop();
		soundButton.setFrames('sound_off2.png', 'sound_off1.png', 'sound_off2.png');
	}
}


ETGame.MainMenu.prototype = {

  preload: function () {
  },

  create: function () {
	// Background and title
	this.add.sprite(0, 0, 'main_menu_background');
	this.add.sprite(this.world.centerX-125,this.world.centerY-200, 'game_title');
	
	//Buttons
	startButton = this.add.button(0, 0, 'buttons', this.startGame, this, 'start2.png', 'start1.png', 'start2.png');
	soundButton = this.add.button(this.world.centerX, this.world.centerY+130, 'buttons', this.soundButtonTapped, this, 'sound_on2.png', 'sound_on1.png', 'sound_on2.png');
		
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