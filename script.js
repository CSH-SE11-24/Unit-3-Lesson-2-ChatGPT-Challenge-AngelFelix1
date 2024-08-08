const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5
};

const player = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 8,
    dy: 0
};

const opponent = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 8
};

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, 'white');

    // Draw the player and opponent paddles
    drawRect(player.x, player.y, player.width, player.height, 'yellow');
    drawRect(opponent.x, opponent.y, opponent.width, opponent.height, 'yellow');
}

function update() {
    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision with top/bottom walls
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    // Collision with player paddle
    if (
        ball.x - ball.radius <= player.x + player.width &&
        ball.y >= player.y &&
        ball.y <= player.y + player.height
    ) {
        ball.dx = -ball.dx;
    }

    // Collision with opponent paddle
    if (
        ball.x + ball.radius >= opponent.x &&
        ball.y >= opponent.y &&
        ball.y <= opponent.y + opponent.height
    ) {
        ball.dx = -ball.dx;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
