let lange = 50;
let row = 20;
let col = 10;
let dropInterval = 60;
let dropTimer = 0;
let score = 0;
let timer = 0;
let time = 0;
let gameOver = false;
let nextPiece;
const farbe = {
    background:[155, 155, 155],
    red:[255, 48, 48],
    blue:[48, 48, 255],
    green:[48, 255, 48],
    yellow:[255, 255, 48],
    purple:[128, 0, 128],
}
const farbenArray = Object.values(farbe);

const formen = {
  I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
  O:[[1,1],[1,1]],
  T:[[0,1,0],[1,1,1],[0,0,0]],
  S:[[0,1,1],[1,1,0],[0,0,0]],
  Z:[[1,1,0],[0,1,1],[0,0,0]],
  J:[[1,0,0],[1,1,1],[0,0,0]],
  L:[[0,0,1],[1,1,1],[0,0,0]]
};
const formenArray = Object.values(formen);



function setup() {
  createCanvas(720, 1002);
  startGame();
}

function startGame() {
  theGrid = new gameGrid(row, col);
  dropTimer = 0;
  score = 0;
  timer = 0;
  gameOver = false;
  newPiece();
}

function draw() { // Kordinatensystem
  background(220);
  theGrid.drawGrid();
  if(!gameOver){
    piece1.show();
    if (dropTimer++ >= dropInterval) {
      piece1.slowdrop();
    }
    textSize(32);
    fill(0);
    text("Score: " + score, 505, 30);
    text("Time: " + timer, 505, 70);
    if (frameCount % 60 == 0 && !gameOver) {
      timer++;
    }
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
  else if (keyCode === 82) {
    startGame();
  }
  else if (keyCode === 32) {
    piece1.fullDrop();
  }
  else if (keyCode === 81) {
    piece1.rotate();
  }
  else if (keyCode === 69) {
    piece1.rotate();
  }
}


function newPiece() {
  dropTimer = 0;
  nextPiece = formenArray[floor(random(formenArray.length))];
  for (let i = 0; i < 10; i++) {
    if(floor(nextPiece.length/2+i) === 5){
      piece1 = new piece(i, floor(random(5)+1), nextPiece);
      break;
    }
  }
}