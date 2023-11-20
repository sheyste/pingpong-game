// Selecting the Canvas
let canvas = document.getElementById("table");
let context = canvas.getContext('2d'); // Change 'draw' to 'context' or another name

// Creating Objects
const userBar = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "white"
};

const cpuBar = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "white"
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velInXDir: 5,
    velInYDir: 5,
    speed: 7,
    color: "green"
};

const separator = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "white"
};


// Keyboard Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let upPressed = false;
let downPressed = false;

function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}


// Draw Functions
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawSeparator() {
    drawRect(separator.x, separator.y, separator.width, separator.height, separator.color);
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText(userBar.score + " - " + cpuBar.score, canvas.width / 2 - 30, 30);
}

// Draw Game Function
function drawGame() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawRect(userBar.x, userBar.y, userBar.width, userBar.height, userBar.color);
    drawRect(cpuBar.x, cpuBar.y, cpuBar.width, cpuBar.height, cpuBar.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawSeparator();
    drawScore();
}

// Update Function
function update() {
    // Move user bar with keyboard input
    if (upPressed && userBar.y > 0) {
        userBar.y -= 6;
    } else if (downPressed && userBar.y < canvas.height - userBar.height) {
        userBar.y += 6;
    }

    // Ball movement
    ball.x += ball.velInXDir;
    ball.y += ball.velInYDir;

    // CPU bar movement
    if (cpuBar.y < ball.y - cpuBar.height / 2) {
        cpuBar.y += ball.speed / 2;
    } else {
        cpuBar.y -= ball.speed / 2;
    }

    // Ball collisions with walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velInYDir = -ball.velInYDir;
    }

    // Ball collisions with bars
    if (
        (ball.x - ball.radius < userBar.x + userBar.width && ball.y > userBar.y && ball.y < userBar.y + userBar.height) ||
        (ball.x + ball.radius > cpuBar.x && ball.y > cpuBar.y && ball.y < cpuBar.y + cpuBar.height)
    ) {
        ball.velInXDir = -ball.velInXDir;
    }

    // Update scores
    if (ball.x - ball.radius < 0) {
        cpuBar.score++;
        reset();
    } else if (ball.x + ball.radius > canvas.width) {
        userBar.score++;
        reset();
    }
}

function reset() {
    userBar.y = (canvas.height - userBar.height) / 2;
    cpuBar.y = (canvas.height - cpuBar.height) / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

// Helper Function
function draw() {
    // Clear the canvas
    draw.clearRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawRect(userBar.x, userBar.y, userBar.width, userBar.height, userBar.color);
    drawRect(cpuBar.x, cpuBar.y, cpuBar.width, cpuBar.height, cpuBar.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawSeparator();
    drawScore();
}

// Callback function
function gameLoop() {
    update();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
