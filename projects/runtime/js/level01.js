var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
        }
        function createBird(x, y) {
            var hitZoneSize = 5;
            var birdHitZone = game.createObstacle(hitZoneSize);
            birdHitZone.x = x;
            birdHitZone.y = y;
            game.addGameItem(birdHitzone);
            var birdImg = draw.bitmap("img/Bird.png");
            birdHitZone.addChild(birdImg);
            birdImg.x = -5
            birdImg.y = -5
        }
        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY - y;
            game.addGameItem(enemy);
            enemy.velocityX -= 2.5;
            enemy.onPlayerCollision = function playerCollision() {
                game.changeIntegrity(-10)
            };
            enemy.onProjectileCollision = function projectileCollision() {
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }

        // CREATION OF OBSTICALS 
        for (var i = 1000; i < 15000; i += 500) {
            var posNum = Math.floor(Math.random() * 2);
            var height;
            if (posNum === 1) {
                height = 350;
            } else {
                height = 250;
            }
            createSawBlade(i, height);
        }
        for (var i = 1500; i < 15000; i += 500) {
            createEnemy(i, 50);
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}