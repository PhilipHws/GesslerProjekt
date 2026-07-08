let lange = 50;
let row = 20;
let col = 10;
let dropInterval = 60;
let dropTimer = 0;
const farbe = {
    background:[155, 155, 155],
    red:[255, 48, 48],
    blue:[48, 48, 255],
    green:[48, 255, 48],
    yellow:[255, 255, 48],
    purple:[128, 0, 128],
}
const farbenArray = Object.values(farbe);



function setup() {
  createCanvas(720, 1002);
  startGame();
}

function startGame() {
  theGrid = new gameGrid(row, col);
  dropTimer = 0;
  newPiece();
}

function draw() { // Kordinatensystem
  background(220);
  theGrid.drawGrid();
  piece1.show();
  if (dropTimer++ >= dropInterval) {
    piece1.slowdrop();
  }
}

function keyPressed() {
  if (keyCode === 65) {
    piece1.move(-1);
  }
  else if (keyCode === 68) {
    piece1.move(1);
  }
  else if (keyCode === 83) {
    piece1.slowdrop();
  }
}


function newPiece() {
  randomColorIndex = floor(random(5)+1);
  const color = farbenArray[randomColorIndex];
  piece1 = new piece(floor(col / 2), color);
}