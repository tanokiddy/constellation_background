let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
  x: null,
  y: null,
};

canvas.onmousemove = function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
};

canvas.onmouseleave = function () {
  mouse.x = null;
  mouse.y = null;
};

class Particles {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 1;
    this.dx = Math.random() / 2;
    this.dy = Math.random() / 2;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width) {
      this.dx = -this.dx;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.dy = -this.dy;
    }
    for (let i = 0; i < particles.length; i++) {
      let distMouseX = Math.abs(this.x - mouse.x);
      let distMouseY = Math.abs(this.y - mouse.y);
      let distanceMouse = Math.sqrt(distMouseX ** 2 + distMouseY ** 2);

      let distX = Math.abs(this.x - particles[i].x);
      let distY = Math.abs(this.y - particles[i].y);
      let distance = Math.sqrt(distX ** 2 + distY ** 2);

      if (distanceMouse < 200 && distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(particles[i].x, particles[i].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

let particles = [];

function init(n) {
  for (let i = 0; i < n; i++) {
    particles.push(new Particles());
  }
}

init(220);

function animate() {
  ctx.fillStyle = "rgba(83, 83, 83, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
