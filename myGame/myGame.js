/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player1;
var player2;
var cursors;
var left;
var right;
var up;
var coins;
var score1 = 0;
var score2 = 0;
var scoreText1;
var scoreText2;
var hitPlayers;
var time = 20;
var timetext;
var gameOver;
var finalScores;


function timer (){
    game.add.sprite(0, 0, "black");
}
setTimeout(timer, 21000);

function gameOver ()
    {
       gameOver.text = game.add.text(315, 225, "Game Over", { fontSize: "40px", fill: "#ff0000"});
    }
setTimeout(gameOver, 22000);
function finalScores ()
    {
       if (score1 > score2)
       {
           finalScores.text = game.add.text(300, 300, "Player 1 Wins!", { fontSize: "40px", fill: "#ff0000"});
       }
       else if (score2 > score1)
       {
           finalScores.text = game.add.text(300, 300, "Player 2 Wins!", { fontSize: "40px", fill: "#ff0000"});
       }
       if (score1 == score2)
       {
           finalScores.text = game.add.text(360, 300, "Tie?", { fontSize: "40px", fill: "#ff0000"});
       }
    }
setTimeout(finalScores, 23000);

function preload() {
    
    game.load.image('sky', 'assests/sky.png');
    game.load.image('coin', 'assests/coin.png');
    game.load.image('ground', 'assests/platform.png');
    game.load.image('star', 'assests/star.png');
    game.load.image('black', 'assests/Black.jpg');
    game.load.spritesheet('dude', 'assests/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assests/baddie.png', 32, 32);
    
}



function create() {
   
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, "sky");
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, "ground");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(200, 115, "ground");
    ledge.body.immovable = true;
    ledge = platforms.create(500, 325, "ground");
    ledge.body.immovable = true;
    ledge = platforms.create(-125, 325, "ground");
    ledge.body.immovable = true;
    player1 = game.add.sprite(32, game.world.height - 250, "dude");
    game.physics.arcade.enable(player1);
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 500;
    player1.body.collideWorldBounds = true;
    player1.animations.add("left", [0, 1, 2, 3], 10, true);
    player1.animations.add("right", [5, 6, 7, 8], 10, true);
    player2 = game.add.sprite(728, game.world.height - 250, "baddie");
    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 500;
    player2.body.collideWorldBounds = true;
    player2.animations.add("left", [0, 1], 10, true);
    player2.animations.add("right", [2, 3], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    coins = game.add.group();
    coins.enableBody = true;
    for (var i = 0; i < 13; i++)
    {
        var coin = coins.create(i * 65, 0, "coin");
        coin.body.gravity.y = 200;
        coin.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText1 = game.add.text(16, 16, "Player 1 Score: 0", { fontSize: "32px", fill: "#000"});
    scoreText2 = game.add.text(525, 16, "Player 2 Score: 0", { fontSize: "32px", fill: "#000"});
    timetext = game.add.text(375, 16, time, { fontSize: "32px", fill: "#000"});
    function time2 ()
    {
        time -= 1;
    }
    
    setInterval(time2, 1000);
    
    
}

function update() {

    var hitPlatform = game.physics.arcade.collide(player1, platforms);
    hitPlatform = game.physics.arcade.collide(player2, platforms);
    hitPlayers = game.physics.arcade.collide(player1, player2);
    hitPlayers = game.physics.arcade.collide(player2, player1);
    player1.body.velocity.x = 0;
    player2.body.velocity.x = 0;
    
   if (cursors.left.isDown)
    {
        player2.body.velocity.x = -175;
        player2.animations.play("left");
    }
    else if (cursors.right.isDown)
    {
        player2.body.velocity.x = 175;
        player2.animations.play("right");
    }
    else
    {
        player2.animations.stop();
    }
    
    if (cursors.up.isDown && player2.body.touching.down && hitPlatform)
    {
        player2.body.velocity.y = -500.5354;
    }
    
    if (left.isDown)
    {
        player1.body.velocity.x = -175;
        player1.animations.play("left");
    }
    else if (right.isDown)
    {
        player1.body.velocity.x = 175;
        player1.animations.play("right");
    }
    else
    {
        player1.animations.stop();
        player1.frame = 4;
    }
    
    if (up.isDown && player1.body.touching.down && hitPlatform)
    {
        player1.body.velocity.y = -500.5354;
    }

    game.physics.arcade.collide(coins, platforms);
    game.physics.arcade.overlap(player1, coins, collectstar, null, this);
    game.physics.arcade.overlap(player2, coins, collectstar2, null, this);
    scoreText1.text = "Player 1 Score: " + score1;
    scoreText2.text = "Player 2 Score: " + score2;
    timetext.text = time;

}

function collectstar (player1, coin)
{
    coin.kill();
    score1 += 1;
    
}

function collectstar2 (player2, coin)
{
    coin.kill();
    score2 += 1;
}