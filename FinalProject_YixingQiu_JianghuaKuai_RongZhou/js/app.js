window.onload = function() {

  //  Inject the game into gameContainer
  var game = new Phaser.Game(256, 256, Phaser.AUTO, 'gameContainer');

  //  Add three different states for game 
  game.state.add('Boot', ETGame.Boot);
  game.state.add('Preloader', ETGame.Preloader);
  game.state.add('MainMenu', ETGame.MainMenu);
  game.state.add('MainGame', ETGame.MainGame);

  //  Start from Boot
  game.state.start('Boot');
  
};