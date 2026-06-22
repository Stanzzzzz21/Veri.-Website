const c = document.getElementById("c");
const x = c.getContext("2d");

c.width = innerWidth;
c.height = innerHeight;

let p = Array(20).fill().map(() => [
  Math.random() * c.width,
  Math.random() * c.height
]);

function a() {
  x.fillStyle = "#0b0f14";
  x.fillRect(0, 0, c.width, c.height);

  x.fillStyle = "#4C944A";

  p.forEach(d => {
    d[1] -= 0.3;

    // Respawn at bottom when off-screen
    if (d[1] < 0) {
      d[0] = Math.random() * c.width;
      d[1] = c.height;
    }

    x.fillRect(d[0], d[1], 2, 2);
  });

  requestAnimationFrame(a);
}

a();