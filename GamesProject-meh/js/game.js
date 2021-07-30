const button = document.querySelector(".button");
const mainPage = document.getElementById("main-page");

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let width = 600;
let height = 600;

canvas.width = width;
canvas.height = height;

let ship = [width / 2, height - 50];
let moveLeft = false;
let moveRight = false;

let shipBullet = [-10, -10];
let shipShoot = false;

let enemy = [];
let enemySpeed = 20;
let enemyUpdateSpeed = 55;
let counter = 0;
let reverse = false;
let enemyRemaining = 50;
//push ship to array
let createEnemy = () => {
  for (i = 0; i < 5; i++) {
    let column = []; //column numbers
    for (j = 0; j < 10; j++) {
      column.push([j * 35 + 50, i * 40 + 150]);
    }
    enemy.push(column);
  }
};
//enemyShip
let drawEnemy = () => {
  for (i in enemy) {
    let column = enemy[i];
    for (j in column) {
      context.fillStyle = "#3366ff";
      context.fillRect(column[j][0], column[j][1], 20, 20);
    }
  }
};
//enemy bullets
let drawEnemyBullet = () => {
  context.fillStyle = "#99ee66";
  context.fillRect(enemyBullet[0], enemyBullet[1], 2, 15);
};
//bullets
let drawBullet = () => {
  context.fillStyle = "#ee9966";
  context.fillRect(shipBullet[0], shipBullet[1], 2, 15);
};
//Ship
let drawShip = () => {
  context.fillStyle = "#FFFFFF";
  context.fillRect(ship[0] - 20, ship[1], 40, 20);
};

let newGame = () => {
  ship = [width / 2, height - 50];
  moveLeft = false;
  moveRight = false;

  shipBullet = [-10, -10];
  shipShoot = false;

  enemy = [];
  createEnemy();

  enemySpeed = 20;
  enemyUpdateSpeed = 55;
  counter = 0;
  reverse = false;
  enemyRemaining = 50;

  enemyBullet = [-10, -10];
};
newGame();
let gameover = false;
let gameLoop = () => {
  if (!gameover) {
    //Score box
    context.fillStyle = "#111111";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#eeeeee";
    context.beginPath();
    context.moveTo(10, 100);
    context.lineTo(width - 10, 100);
    context.lineTo(width - 10, 10);
    context.lineTo(10, 10);
    context.lineTo(10, 100);
    context.stroke();
    if (moveLeft) {
      ship[0] -= 10;
      if (ship[0] < 30) {
        ship[0] = 30;
      }
    }
    if (moveRight) {
      ship[0] += 10;
      if (ship[0] > width - 30) {
        ship[0] = width - 30;
      }
    }
    //collision
    if (shipShoot) {
      shipBullet[1] -= 15;
      for (i in enemy) {
        let column = enemy[i];
        for (j in column) {
          if (
            shipBullet[0] + 2 > column[j][0] &&
            shipBullet[0] < column[j][0] + 20 &&
            shipBullet[1] + 15 > column[j][1] &&
            shipBullet[1] < column[j][1] + 20
          ) {
            shipShoot = false;
            enemyRemaining -= 1;
            column.splice(j, 1);
            if (enemyUpdateSpeed > enemy.length) {
              enemyUpdateSpeed -= 1;
            }
            // Win Condition
            if (enemyRemaining == 0) {
              window.alert("You Win!");
              gameover = true;
              setTimeout(() => {
                gameover = false;
                newGame();
              }, 2000);
            }
          }
        }
      }
      if (shipBullet[1] < 100) {
        shipShoot = false;
      } else {
        drawBullet();
      }
    }
    enemyBullet[1] += 15;
    //Lose Condition
    if (enemyBullet[1] >= ship[1]) {
      if (enemyBullet[0] + 2 > ship[0] - 20 && enemyBullet[0] < ship[0] + 20) {
        window.alert("Game Over...");
        gameover = true;
        setTimeout(() => {
          gameover = false;
          newGame();
        }, 2000);
      } else {
        for (i in enemy) {
          let column = enemy[i];
          let enemyShooting = false;
          for (j in column) {
            if (i == 4 && j == column.length - 1) {
              enemyBullet = [column[j][0] + 10, column[j][1]];
            } else {
              let rnd = Math.floor(Math.random() * 10);
              if (rnd == 1) {
                enemyBullet = [column[j][0] + 10, column[j][1]];
                enemyShooting = true;
                break;
              }
            }
          }
          if (enemyShooting) {
            break;
          }
        }
      }
    }
    drawEnemyBullet(); //movement
    if (counter < enemy.length) {
      let column = enemy[counter];
      for (j in column) {
        column[j][0] += enemySpeed;
        if (column[j][0] < 40 || column[j][0] > width - 60) {
          reverse = true; //reverse movement
        }
      }
    } else if (reverse) {
      for (i in enemy) {
        let column = enemy[i];
        for (j in column) {
          column[j][1] += 20;
          if (column[j][1] >= ship[1]) {
            gameover = true;
            setTimeout(() => {
              gameover = false;
              newGame();
            }, 2000);
          }
        }
      }

      enemySpeed = -enemySpeed;
      reverse = false;
    }
    drawShip();
    drawEnemy();
    //Score
    context.fillStyle = "#eeeeee";
    context.fillText((50 - enemyRemaining) * 10, width / 2, 80);

    counter++;
    if (counter >= enemyUpdateSpeed) {
      counter = 0;
    }
  }
};
setInterval(gameLoop, 1000 / 30);

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = true;
      break;
    case "Space":
      if (!shipShoot) {
        shipBullet = [ship[0], ship[1]];
        shipShoot = true;
      }
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;
  }
});
