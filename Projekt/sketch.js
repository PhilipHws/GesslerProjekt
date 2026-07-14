let lange = 50;
let row = 20;
let col = 10;
let dropInterval;
let dropTimer = 0;
let score = 0;
let timer = 0;
let time = 0;
let gameOver = 0;
let nextPiece;
let farbIndex;
let start;
// let settings;
let left = 68;
let right = 65;
let down = 83;
let drop = 32;
let dreh = 69;
let fest = 81;
let linien = 0;
let verzoegerung = 1;
let repeat = 0;
let punkte = [10, 25, 50, 100];
const farbe = {
  background: [0, 0, 0],
  red: [255, 48, 48],
  blue: [48, 48, 255],
  green: [48, 255, 48],
  yellow: [255, 255, 48, 150],
  purple: [204,0,255],
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
  background(0,50,50);
  start = createButton("Start");
  start.size(100, 40);
  start.style('font-size', '30px');
  start.position(310, 400);
  start.mousePressed(startGame);

  /*settings = createButton("Settings");
  settings.size(150, 40);
  settings.style('font-size', '30px');
  settings.position(285, 470);
  settings.mousePressed(settingsScreen);*/
}

function startGame() {
  repeat = 0;
  start.hide();
  //settings.hide();
  theGrid = new gameGrid(row, col);
  dropTimer = 0;
  score = 0;
  timer = 0;
  gameOver = 1;
  newPieceVariables();
  newPiece();
}

function draw() { // Kordinatensystem
  if (gameOver === 1) {
    dropInterval = 48 * verzoegerung;
    background(220);
    stroke(150);
    theGrid.drawGrid();
    piece1.show();
    vorschau();
    if (dropTimer++ >= dropInterval) {
      piece1.slowdrop();
    }
    if (keyIsDown(down)) {
      dropTimer += 6;
    }
    textAlign(LEFT, TOP);
    textSize(32);
    fill(0);
    text("Score: " + score, 505, 70);
    text("Time: " + timer, 505, 110);
    if (frameCount % 60 == 0) {
      timer++;
  }
  }
  else if(gameOver === 2){
    gameOverScreen();
  }
  else{
    startScreen();
  }
}

function keyPressed() {
  if (gameOver !== 0) {
    if (keyCode === right) {
      piece1.move(-1);
    }
    else if (keyCode === left) {
      piece1.move(1);
    }
    else if (keyCode === drop) {
      piece1.fullDrop();
    }
    else if (keyCode === dreh) {
      piece1.rotate();
    }
    else if (keyCode === fest) {
      if (piece1.ability === 4) {
        piece1.lock();
      }
    }
  }
  if(gameOver  === 2){
    if(keyCode === 13){
      gameOver = 0;
      repeat = 0;
      startScreen();
    }
  }
  return false; // prevent default
}

function mousePressed() {
  if (mouseButton === LEFT) { //E?         as
    piece1.rotate();
  }
}

function startScreen(){
  start.show();
  //settings.show();
  if(repeat++ <= 160){
  for(let x = 0; x<20; x++){
    fill(0, random(10) + 45,random(10) + 45);
    circle(random(width),random(height), random(80) + 20);
  }
}
  textAlign(CENTER, CENTER);
  fill(255, 255, 48);
  textSize(50);
  text("Tetris", width / 2, height/ 2 - 200);
}

function settingsScreen(){
  
}

function gameOverScreen() {    // Game over screen mit punkten ergänzen
  if(repeat++ <= 160){
    for(let x = 0; x<20; x++){
      fill(random(40)+ 164, random(10)+ 10, random(10)+10);
      circle(random(width+20),random(height), random(80) +20 );
    }
  }
  noStroke();
  textSize(64);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 100);
  fill(0);
  text("Score: " + score,width/2  , height / 2 + 0 );
  stroke(0);
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
  if (gameOver === 1) {
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