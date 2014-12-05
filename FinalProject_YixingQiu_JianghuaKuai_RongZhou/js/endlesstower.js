
var game = new Phaser.Game(256, 256, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

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
var score_text;
var timer;
var timer_text;


  function preload () {
    
    //prepares the game screen
    game.scale.setShowAll();
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();

    //loads the tilemap
    game.load.tilemap('t1', 'tilemap/tower.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.json('levelData', 'tilemap/tower.json');


    game.load.spritesheet('char', 'imgs/char.png', 16, 16);

    game.load.spritesheet('light', 'imgs/lSwitch.png', 16, 16);

    game.load.image('tower_tileset', 'imgs/tower_tileset.png');
    game.load.image('coin', 'imgs/tTime.png');
    game.load.image('clock', 'imgs/sScore.png')

    game.load.audio('tower1', 'sounds/game.mp3');

    game.load.audio('tjump1', 'sounds/jump.mp3');

    game.load.audio('lsound', 'sounds/light.mp3');

  }

  function create () {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('t1');
    map.addTilesetImage('tower_tileset', 'tower_tileset');
  
    //setting up all the layers
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

    lights = game.add.group();
    lights.enableBody = true;

    loadSwitches();

    map.setCollisionBetween(1, 100, true, layerC);


    player = game.add.sprite(game.world.width/2, game.world.height -40, 'char');
    
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    music = game.add.audio('tower1');

    //set the anchor to the middle
    player.anchor.setTo(.5, 1);
    
    //ANIMATIONS:
    player.animations.add('idle', [0], 5, true);
    player.animations.add('run', [1, 2, 3], 7, true);
    player.animations.add('jump', [0], 5, true);
    
    // coins
	coins = game.add.group();
	coin = coins.create(112, 3280, "coin");
	game.physics.enable(coin, Phaser.Physics.ARCADE);
	  
	// clocks
	clocks = game.add.group();
	clock = clocks.create(152, 3280, "clock");
	game.physics.enable(clock, Phaser.Physics.ARCADE);
	  
    cursors = game.input.keyboard.createCursorKeys();

    music.play('', 0, 1, true);

    tjump1 = game.add.audio('tjump1');
    lsound = game.add.audio('lsound');

  }

  function update(){


    player.body.velocity.x = 0;
    //set the player to collide with the collision layer
    game.physics.arcade.collide(player, layerC);

    //keyboard movement
    if(cursors.left.isDown){
      player.body.velocity.x = -50;
    }
    else if(cursors.right.isDown){
      player.body.velocity.x = 50;
    }
    if(cursors.up.isDown && touchingGround(player)){
      player.body.velocity.y = -185;
    }

    game.physics.arcade.collide(player, lights, hitSwitch);
   
    if (cursors.left.isDown){
        player.body.velocity.x = -50;
        flipSprite(player);  //call the 'flipSprite' function to face the player left
        //if the player is touching the ground
        if(touchingGround(player)){
          player.animations.play('run');
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 50;
        defaultSprite(player); //call the 'defaultSprite' function, to face the player right
        //if the player is touching the ground
        if(touchingGround(player)){
          player.animations.play('run');
        }
    //if the player is not hitting left of right
    } else if(touchingGround(player)){
        player.animations.play('idle');
    }
    
    //  jump
    if (cursors.up.isDown && touchingGround(player))
    {
        player.body.velocity.y = -185;
        tjump1.play();
        player.animations.play('jump');
    }

    game.camera.y = player.y - game.height/2;

      }



    function render(){


  }

function killLayer(layer){
    layer.kill();
  }

function loadSwitches(){
  levelJson = game.cache.getJSON('levelData');
  for(var i = 0; i < levelJson["layers"].length; i++){
        
        if( levelJson["layers"][i].name == "lights"){
          var switchList = levelJson.layers[i].objects;

          for(var j = 0; j < switchList.length; j++){
            var light = lights.create(switchList[j].x, switchList[j].y, 'light');
            light.anchor.setTo(0, 1);

            light.switchNumber = switchList[j].properties.switchNumber;


            light.body.setSize(16, 18, 0, 2);
            light.body.immovable = true;

          }

        }

  }

}


  //turn on lights
  function hitSwitch(player, light){
	  
     if(player.body.touching.up){
        if(light.switchNumber == 1){
          killLayer(layerB);
          lsound.play();
          }

        else if(light.switchNumber == 2){
          killLayer(layerD);
          lsound.play();
        }

        else if(light.switchNumber == 3){
          killLayer(layerE);
          lsound.play();
        }

        else if(light.switchNumber == 4){
          killLayer(layerF);
          lsound.play();
        }

        else if(light.switchNumber == 5){
          killLayer(layerG);
          lsound.play();
        }

        else if(light.switchNumber == 6){
          killLayer(layerH);
          lsound.play();
        }

        else if(light.switchNumber == 7){
          killLayer(layerI);
          lsound.play();
        }
        
        else if(light.switchNumber == 8){
            killLayer(layerJ);
            lsound.play();
          }
        
        else if(light.switchNumber == 9){
            killLayer(layerK);
            lsound.play();
          }
        
        else if(light.switchNumber == 10){
            killLayer(layerL);
            lsound.play();
          }
        
        else if(light.switchNumber == 11){
            killLayer(layerM);
            lsound.play();
          }
        
        else if(light.switchNumber == 12){
            killLayer(layerN);
            lsound.play();
          }

      }
}
     
    //check to see if a sprite is touching anything below it, like the tilemap or another sprite
  function touchingGround(sprite){
    return (sprite.body.blocked.down || sprite.body.touching.down);
  }

  //face a sprite in it's default direction
  function defaultSprite(sprite){
    sprite.scale.x = 1; 
  }

  //face a sprite in it's flipped direction
  function flipSprite(sprite){
    sprite.scale.x = -1; 
  }

