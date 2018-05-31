var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var score = document.getElementById('score1');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var velX;
var velY;
var p1 = document.getElementById('1 player');
var p2 = document.getElementById('2 players');
var count = 0;
var p1u;
var p1d;
var p2u;
var p2d;
var bg;
var b1image = document.getElementById("StartGame");
var bg;
var p1Score = document.getElementById('p1score');
var ball = {
    x: width / 2,
    y: height / 2,
    vx: 5,
    vy: 2,
    radius: 15,
    color: 'rgb(26, 26, 26)',
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

var brick = {
    x: 20,
    y: height / 2 - 60,
    vy: 15,
    draw() {
        var img = new Image();
        img.src = 'https://i.pinimg.com/736x/7d/73/82/7d73826098eaeeeef24203ce3da6bf92.jpg';
        ctx.drawImage(img, this.x, this.y, 20, 120);
    }
}
var brick2 = {
    x: window.innerWidth - 40,
    y: height / 2 - 60,
    vy: 15,
    color: "rgb(38, 38, 38)",
    draw() {
        var img = new Image();
        img.src = 'https://i.pinimg.com/736x/7d/73/82/7d73826098eaeeeef24203ce3da6bf92.jpg';
        ctx.drawImage(img, this.x, this.y, 20, 120);
    }
}
window.onkeydown = function (e) {
    if (e.keyCode === 87) {
        p1u = true;

    } else if (e.keyCode === 83) {
        p1d = true;

    }
    if (e.keyCode === 38) {
        p2u = true;

    }
    if (e.keyCode === 40) {
        p2d = true;

    }
}
window.onkeyup = function (e) {
    if (e.keyCode === 87) {
        p1u = false;

    } else if (e.keyCode === 83) {
        p1d = false;

    }
    if (e.keyCode === 38) {
        p2u = false;

    }
    if (e.keyCode === 40) {
        p2d = false;

    }
}

function start() {
    p1.style.display = 'none';
    p2.style.display = 'none';
}

function gameOver() {
    window.cancelAnimationFrame(draw);
    p1.style.display = 'block';
    p2.style.display = 'block';
    canvas.style.visibility = "hidden";
    ball.x = width / 2;
    ball.y = height / 2;
    brick.y = height / 2 - 60;
    brick2.y = height / 2 - 60;
    b1image.style.display = 'block';
    bg = false;
    score1.style.display = "none";
}



var img = new Image();
img.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Water_texture_1380389_Nevit.jpg';
img.onload = function () {
    ctx.drawImage(img, 0, 20, window.innerWidth, window.innerHeight - 20);
}
var img2 = new Image();
img2.src = 'http://www.techtbh.com/wp-content/uploads/2016/05/Rough-Wooden-Plank-Texture.jpg';
img2.onload = function () {
    ctx.drawImage(img2, 0, 0, window.innerWidth, 20);
    ctx.drawImage(img2, 0, window.innerHeight - 20, window.innerWidth, 20);
};


function draw() {
    canvas.style.visibility = "visible";
    canvas.style.cursor = 'none';
    ctx.drawImage(img, 0, 20, window.innerWidth, window.innerHeight - 20);
    ctx.drawImage(img2, 0, 0, window.innerWidth, 20);
    ctx.drawImage(img2, 0, window.innerHeight - 20, window.innerWidth, 20);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx *= 1.0003;
    ball.vy *= 1.0003;

    if (ball.y + ball.vy > canvas.height - 35 ||
        ball.y + ball.vy < 35) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width - 40 && ball.y >= brick2.y - 1 && ball.y <= brick2.y + 121) {
        ball.vx = -ball.vx;
    }
    if (ball.x + ball.vx < 40 && ball.y >= brick.y - 1 && ball.y <= brick.y + 121) {
        ball.vx = -ball.vx;
    }

    brick.draw();
    brick2.draw();
    if (p1u === true && brick.y - brick.vy > 20) {
        brick.y -= brick.vy;
    };
    if (p1d === true && brick.y + brick.vy < window.innerHeight - 140) {
        brick.y += brick.vy;
    };
    if (p2u === true && brick2.y - brick2.vy > 20) {
        brick2.y -= brick2.vy;
    };
    if (p2d === true && brick2.y + brick2.vy < window.innerHeight - 140) {
        brick2.y += brick2.vy;
    };

    b1image.style.display = 'none';
    p1.style.display = 'none';
    p2.style.display = 'none';

    if (ball.x + ball.vx < canvas.width &&
        ball.x + ball.vx > 0) {
        window.requestAnimationFrame(draw);
    } else {
        if (ball.x > window.innerWidth / 2) {
            p1Score.textContent = "Player 1 won!";
            ball.vy = 3;
            ball.vx = 6;
        } else {
            p1Score.textContent = "Player 2 won!";
            ball.vy = -3;
            ball.vx = -6;
        }
        gameOver();
    }
};


function draw2() {
    bg = true;
    canvas.style.visibility = "visible";
    score1.style.display = "block";
    canvas.style.cursor = 'none';
    ctx.drawImage(img, 0, 20, window.innerWidth, window.innerHeight - 20);
    ctx.drawImage(img2, 0, 0, window.innerWidth, 20);
    ctx.drawImage(img2, 0, window.innerHeight - 20, window.innerWidth, 20);
    score.textContent = 'Your score: ' + count;
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx *= 1.0003;
    ball.vy *= 1.0003;
    if (ball.y + ball.vy > canvas.height - 35 ||
        ball.y + ball.vy < 35) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width - 40 && ball.y >= brick2.y - 1 && ball.y <= brick2.y + 121) {
        ball.vx = -ball.vx;
        count = count + 1;
    }
    if (ball.x + ball.vx < 40 && ball.y >= brick.y - 1 && ball.y <= brick.y + 121) {
        ball.vx = -ball.vx;
        count = count + 1;
    }

    brick.draw();
    brick2.draw();

    if (p1u === true && brick.y - brick.vy > 20) {
        brick.y -= brick.vy;
    };
    if (p1d === true && brick.y + brick.vy < window.innerHeight - 140) {
        brick.y += brick.vy;
    };

    if (ball.y > 80 && ball.y < window.innerHeight - 80) {
        brick2.y = ball.y - 60;
    };
    b1image.style.display = 'none';
    p1.style.display = 'none';
    p2.style.display = 'none';
    if (ball.x + ball.vx < canvas.width &&
        ball.x + ball.vx > 0) {
        window.requestAnimationFrame(draw2);
    } else {
        ball.vy = 3;
        ball.vx = 6;
        gameOver();
        p1Score.textContent = "Your score is: " + count;
    }
};
if (bg === true) {
    drawBg();
    drawMargin();
};