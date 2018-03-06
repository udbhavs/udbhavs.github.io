//globals
var canvas, context;

window.onload = function() {
    initCanvas();
    canvasRandomCircles(10);
}

function initCanvas() {
    canvas = document.getElementById("front-canvas");
    context = canvas.getContext("2d");
    //canvas has to fit in with the header
    canvas.width = window.innerWidth;
    canvas.height = (92/100) * window.innerHeight;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function Circle() {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.fillStyle = "rgb(255, 255, 255)";
    this.draw = function() {
        context.fillStyle = this.fillStyle;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        context.fill();
    }
    this.init = function(x, y, ax, ay, size) {
        this.x = x;
        this.y = y;
        this.ax = ax;
        this.ay = ay;
        this.size = size;
    }
    this.update = function() {
        this.vx = 0;
        this.vy = 0;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.check()
    }
    this.run = function() {
        this.update();
        this.draw();
    }
    this.check = function() {
        if (this.y > canvas.height || this.y < 0 || this.x > canvas.width || this.width < 0) {
            this.x = Math.round(Math.random() * canvas.width);
            this.y = Math.round(Math.random() * canvas.height);
            this.ax = Math.random() > 0.5 ? Math.round(Math.random() * 20) : -Math.round(Math.random() * 20);
            this.ay = Math.random() > 0.5 ? Math.round(Math.random() * 20) : -Math.round(Math.random() * 20);
        }
    }
}
function canvasRandomCircles(num) {
    var circles = []
    for(var i = 0; i < num; i++) {
        var temp = new Circle();
        temp.x = Math.round(Math.random() * canvas.width);
        temp.y = Math.round(Math.random() * canvas.height);
        temp.ax = Math.random() > 0.5 ? Math.round(Math.random() * 20) : -Math.round(Math.random() * 20);
        temp.ay = Math.random() > 0.5 ? Math.round(Math.random() * 20) : -Math.round(Math.random() * 20);
        temp.size = Math.round(Math.random() * 40);
        temp.fillStyle = "rgb(" + rndNum() + "," + rndNum() + ","+ rndNum() + ")";
        circles.push(temp);
    }
    function animate() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        for (var i in circles) {
            circles[i].run();
        }
        requestAnimationFrame(animate);
    }
    function rndNum() {
        return Math.round(Math.random() * 255);
    }
    animate();
}

