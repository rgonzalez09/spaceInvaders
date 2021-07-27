const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const backgroundImg = new Image();

backgroundImg.src = `./images/background.jpg`;

let i = 0;
let j = canvas.width;

const draw = () => {
  requestAnimationFrame(draw);
  context.clearRect(0, 0, canvas.width, canvas.height);
  i--;

  if (i <= -canvas.width) i = canvas.width;

  j--;
  if (j <= -canvas.width) j = canvas.width;

  context.drawImage(backgroundImg, i, 0, canvas.width, canvas.height);
  context.drawImage(backgroundImg, j, 0, canvas.width, canvas.height);
};

const xwing = {
  x: 350,
  y: 400,
  width: 50,
  height: 50,
};
const xwingImg = new Image();
xwingImg.src = `./images/xwing ready.png`;

//xwingImg.addEventListener("load", ()=>{
//  context.drawImage(xwingImg, xwing.x, xwing.y, xwing.width, xwing.height)
//})
const laser = {
  x: xwing.x + 22,
  y: xwing.y,
  width: 5,
  height: 15,
};
const laserImg = new Image();
laserImg.src = `../images/laser-blue-1.png`;

const tieFighter = {
  x: 350,
  y: 10,
  width: 50,
  height: 50,
};
const tieFighterImg = new Image();
tieFighterImg.src = `../images/tie_fighter-removebg-preview.png`;
//tieFighterImg.addEventListener("load", ()=>{
//context.drawImage(tieFighterImg, tieFighter.x, tieFighter.y, tieFighter.width, tieFighter.height)
//})

const drawEverything = () => {
  context.drawImage(xwingImg, xwing.x, xwing.y, xwing.width, xwing.height);
  context.drawImage(
    tieFighterImg,
    tieFighter.x,
    tieFighter.y,
    tieFighter.width,
    tieFighter.height
  );
  context.drawImage(laserImg, laser.x, laser.y, laser.width, laser.height);
};

const drawLoop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  drawEverything();

  requestAnimationFrame(drawLoop);
};

drawLoop();
