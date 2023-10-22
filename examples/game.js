const game = new W3D("sketch", 400, 400, update);
game.onKeyDown = handleKeyDown;
game.onKeyUp = handleKeyUp;

let playerX = game.width / 2;
let playerY = game.height - 50;
let playerSpeed = 5;

let objects = [];
let obstacles = [];
let score = 0;

let leftPressed = false;
let rightPressed = false;

function update() {
    game.clear();
    game.text(`Score: ${score}`, 10, 20, 16, "black");

    if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (rightPressed && playerX < game.width - 20) {
        playerX += playerSpeed;
    }

    if (Math.random() < 0.02) {
        objects.push({ x: Math.random() * game.width, y: 0 });
    }
    if (Math.random() < 0.01) {
        obstacles.push({ x: Math.random() * game.width, y: 0 });
    }

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        obj.y += 2;
        game.circle(10, 10, obj.x, obj.y, "green");
        if (obj.y > game.height) {
            objects.splice(i, 1);
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.y += 3;
        game.rect(obs.x, obs.y, 20, 20, "red");
        if (obs.y > game.height) {
            obstacles.splice(i, 1);
        }

        if (
            playerX < obs.x + 20 &&
            playerX + 20 > obs.x &&
            playerY < obs.y + 20 &&
            playerY + 20 > obs.y
        ) {
            game.text("Game Over", game.width / 2 - 50, game.height / 2, 24, "red");
            game.noLoop();
        }
    }

    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (
            playerX < obj.x + 10 &&
            playerX + 20 > obj.x &&
            playerY < obj.y + 10 &&
            playerY + 20 > obj.y
        ) {
            objects.splice(i, 1);
            score++;
        }
    }

    game.rect(playerX, playerY, 20, 20, "blue");
}

function handleKeyDown(key) {
    if (key === "ArrowLeft") {
        leftPressed = true;
    }
    if (key === "ArrowRight") {
        rightPressed = true;
    }
}

function handleKeyUp(key) {
    if (key === "ArrowLeft") {
        leftPressed = false;
    }
    if (key === "ArrowRight") {
        rightPressed = false;
    }
}

game.start();
