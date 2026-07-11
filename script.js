document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(function(img) {
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    
    // Also disable dragging via JS as a backup
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  });
});   


const canvas = document.createElement("canvas");
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.zIndex = "-1";

let scrollY = 0;

window.addEventListener("scroll", () => {
    scrollY = window.scrollY * 0.25; // background movement speed
    draw();
});

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

window.addEventListener("resize", resize);

function draw() {
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // dark background
    ctx.fillStyle = "#050805";
    ctx.fillRect(0, 0, w, h);

    const glows = [
        {x: w * 0.15, y: h * 0.2 - scrollY, size: 450},
        {x: w * 0.85, y: h * 0.35 - scrollY, size: 350},
        {x: w * 0.5, y: h * 1 - scrollY, size: 550}
    ];

    glows.forEach(g => {
        const gradient = ctx.createRadialGradient(
            g.x,
            g.y,
            0,
            g.x,
            g.y,
            g.size
        );

        gradient.addColorStop(0, "rgba(0,255,100,0.20)");
        gradient.addColorStop(1, "rgba(0,255,100,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // grid effect
    ctx.strokeStyle = "rgba(0,255,100,0.03)";

    for (let x = 0; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    for (let y = 0; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y - (scrollY % 60));
        ctx.lineTo(w, y - (scrollY % 60));
        ctx.stroke();
    }
}

resize();
