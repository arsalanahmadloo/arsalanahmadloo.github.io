// game.js

let playerName = localStorage.getItem("playerName") || "بازیکن";
let score = 0;
let health = 100;

document.addEventListener("DOMContentLoaded", () => {
  const playerEl = document.getElementById("player");
  const enemyEl = document.getElementById("enemy");
  const scoreEl = document.getElementById("score");

  document.addEventListener("keydown", (e) => {
    let left = parseInt(window.getComputedStyle(playerEl).getPropertyValue("left"));
    if (e.key === "ArrowRight" && left < 450) {
      playerEl.style.left = left + 10 + "px";
    } else if (e.key === "ArrowLeft" && left > 0) {
      playerEl.style.left = left - 10 + "px";
    }
  });

  function moveEnemy() {
    let top = parseInt(window.getComputedStyle(enemyEl).getPropertyValue("top"));
    if (top >= 500) {
      top = 0;
      score++;
      scoreEl.textContent = `امتیاز: ${score}`;
      enemyEl.style.left = Math.floor(Math.random() * 480) + "px";
    } else {
      top += 5;
    }
    enemyEl.style.top = top + "px";
  }

  setInterval(moveEnemy, 100);
});
