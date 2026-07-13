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
let farbIndex;
const farbe = {
  background: [155, 155, 155],
  red: [255, 48, 48],
  blue: [48, 48, 255],
  green: [48, 255, 48],
  yellow: [255, 255, 48],
  purple: [128, 0, 128],
}
const farbenArray = Object.values(farbe);

const formen = {
  I: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
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
  newPieceVariables();
  newPiece();
}

function draw() { // Kordinatensystem
  background(220);
  theGrid.drawGrid();
  if (!gameOver) {
    piece1.show();
    vorschau();
    if (dropTimer++ >= dropInterval) {
      piece1.slowdrop();
    }
  }
  else {
    gameOverScreen();
  }
  textSize(32);
  fill(0);
  text("Score: " + score, 505, 70);
  text("Time: " + timer, 505, 110);
  if (frameCount % 60 == 0 && !gameOver) {
    timer++;
  }
}

function keyPressed() {
  if (!gameOver) {
    if (keyCode === 65) {
      piece1.move(-1);
    }
    else if (keyCode === 68) {
      piece1.move(1);
    }
    else if (keyCode === 83) {
      piece1.slowdrop();
    }
    else if (keyCode === 32) {
      piece1.fullDrop();
    }
    else if (keyCode === 81) {
      if (piece1.ability === 4) {
        piece1.lock();
      }
    }
  }
  else if (keyCode === 82) {
    startGame();
  }
  return false; // prevent default
}

function mousePressed() {
  if (mouseButton === LEFT) {
    piece1.rotate();
  }
}

function gameOverScreen() {
  fill(255, 48, 48, 100);
  rect(0, 0, width, height);
  textSize(64);
  fill(255, 48, 48);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2 - 100, height / 2);
}

function newPiece() {

  for (let i = 0; i < 10; i++) {
    if (floor(nextPiece.length / 2 + i) === 5) {
      if (!theGrid.checkCollision(i, 0, nextPiece, farbIndex)) {
        piece1 = new piece(i, farbIndex, nextPiece);
        break;
      }
    }
  }
  newPieceVariables();
}

function vorschau() {
  fill(farbenArray[farbIndex]);
  for (let i = 0; i < nextPiece.length; i++) {
    for (let j = 0; j < nextPiece[i].length; j++) {
      if (nextPiece[i][j] === 1) {
        square(j * lange * 0.4 + 630, i * lange * 0.4 + 5, lange * 0.4);
      }
    }
  }
}

function newPieceVariables() {
  if (!gameOver) {
    dropTimer = 0;
    nextPiece = formenArray[floor(random(formenArray.length))];
    farbIndex = floor(random(5) + 1);
    if (farbIndex === 5) {
      nextPiece = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
      for (let i = 0; i < 1; i++) {
        let wahrscheinlichkeit = 10;
        if (random(wahrscheinlichkeit) < 5) {
          wahrscheinlichkeit -= 0.5;
          nextPiece[1 - i][0] = 1;
        }
        else {
          nextPiece[1 - i][0] = 0;
        }
        if (random(wahrscheinlichkeit) < 5) {
          wahrscheinlichkeit -= 0.5;
          nextPiece[1 + i][0] = 1;
        }
        else {
          nextPiece[1 - i][0] = 0;
        }
        for (let j = 0; j < 1; j++) {
          if (random(wahrscheinlichkeit) < 5) {
            wahrscheinlichkeit -= 0.5;
            nextPiece[i][1 + j] = 1;
          }
          else {
            nextPiece[i][j] = 0;
          }
          if (random(wahrscheinlichkeit) < 5) {
            wahrscheinlichkeit -= 0.5;
            nextPiece[i][1 - j] = 1;
          }
          else {
            nextPiece[i][j] = 0;
          }
        }
      }
    }
  }
}