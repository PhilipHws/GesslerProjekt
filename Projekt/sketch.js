let lange = 50;
let row = 20;
let col = 10;
let dropInterval;
let startInterval = 48;
let dropTimer = 0;
let score = 0;
let timer = 0;
let time = 0;
let gameOver = 0;
let nextPiece;
let farbIndex;
let start;
let left = 68;
let right = 65;
let down = 83;
let drop = 32;
let dreh = 69;
let fest1 = 81;
let fest2 = 16;
let fest3 = 82;
let linien = 0;
let verzoegerung = 1;
let repeat = 0;
let music;
let line;
let boom;
let meinCanvas;
let punkte = [10, 25, 50, 100];

const farbe = {  //Objekt mit den RGB werten der Farben
  background: [25, 25, 32],
  red: [239, 32, 41],
  blue: [90, 101, 173],
  green: [66, 182, 66],
  yellow: [247, 211, 8, 150],
  purple: [173, 77, 156],
}
const farbenArray = Object.values(farbe);   //RGB werte des Objekts in ein Array schreiben

const formen = {      //Objekt das in einer Matrix sagt welche werte 1 sind somit form der blöcke angibt
  I: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
};
const formenArray = Object.values(formen);    //speichert die Matrixen in ein array

const lila = {      //Objekt das in einer Matrix sagt welche werte 1 sind somit form angibt    hier nur die Lilanen Blöcke
  1: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
  2: [[1, 1, 0], [0, 1, 0], [0, 1, 1]],
  3: [[0, 1, 1], [0, 1, 0], [1, 1, 0]],
  4: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  5: [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  6: [[1, 1, 0], [1, 1, 1], [1, 1, 1]],
  7: [[1, 0, 1], [1, 1, 1], [1, 1, 1]],
  8: [[1, 1, 0], [0, 1, 0], [0, 0, 0]],
  9: [[0, 1, 1], [0, 1, 0], [0, 0, 0]],
  10: [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  11: [[1, 1, 1], [1, 1, 1], [0, 0, 0]],
  12: [[1, 0, 1], [1, 1, 1], [0, 0, 0]],
  13: [[0, 0, 0], [0, 1, 1], [0, 0, 0]],
  14: [[1, 1, 0], [1, 1, 1], [0, 1, 1]],
  15: [[0, 1, 1], [1, 1, 1], [1, 1, 0]],
}
const lilaArray = Object.values(lila);    //speichert die Matrixen in ein array



function setup() {    //Knopf wird erstellt und musik wird eingestellt
  meinCanvas = createCanvas(720, 1002);
  meinCanvas.position((windowWidth - width)/2, (windowHeight - height)/2);
  background(0, 50, 50);
  start = createButton("Start");
  start.size(100, 40);
  start.style('font-size', '30px');
  start.style('backgroundColor', 'rgba(247, 211, 8, 0.588)');
  start.position(windowWidth / 2 - 50, windowHeight/2 -30);
  start.mousePressed(startGame);
  music.setVolume(0.005);
  line.setVolume(0.02);
  boom.setVolume(0.1);
  music.loop();
}

function preload() {    //Musik wird geladen und in eine Variable gespeichert
  music = loadSound('cool.mp3');
  line = loadSound('line2.mp3');
  boom = loadSound('boom.mp3');
}

function startGame() {   //Konfiguriert die Variablen so das das spiel gestartet werden kann und startet es dann somit
  repeat = 0;
  start.hide();
  theGrid = new gameGrid(row, col);
  dropTimer = 0;
  score = 0;
  timer = 0;
  gameOver = 1;
  newPieceVariables();
  newPiece();
}

function draw() { //Sie ruft die Funktionen entsprechend der gameover variable auf, und stellt ein paar generelle dinge so wit text dar
  if (gameOver === 1) {
    dropInterval = startInterval * verzoegerung;
    background(42, 42, 51);
    stroke(42, 42, 51);
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
    fill(233, 229, 221);
    text("Score: " + score, 505, 55);
    text("Time: " + timer, 505, 105);
    textSize(20)
    text("A to move left", 510, 800);
    text("D to move right", 510, 830);
    text("S to move down", 510, 860);
    text("Space to drop", 510, 890);
    text("Left Click/E to rotate", 510, 920);
    text("Q/R/Shift to lock yellow", 510, 950);
    if (frameCount % 60 == 0) {
      timer++;
    }
  }
  else if (gameOver === 2) {
    gameOverScreen();
  }
  else {
    startScreen();
  }
}

function keyPressed() {  //prüft welche knöpfe gedrückt werden und ruft entsprechende funktionen auf
  if (gameOver === 1) {
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
    else if (keyCode === fest1 || keyCode === fest2 || keyCode === fest3) {
      if (piece1.ability === 4) {
        piece1.lock();
      }
    }
  }
  if (keyCode === 13) {
    if (gameOver === 0) {
      repeat = 0;
      startGame();
    }
    if (gameOver === 2) {
      music.loop();
      gameOver = 0;
      repeat = 0;
    }
  }
  return false; // prevent default
}

function mousePressed() {
  if (mouseButton === LEFT) {
    piece1.rotate();
  }
}

function startScreen() { //TitleScreen von dem man das Spiel startet mit Knopf oder Enter
  start.show();
  if (repeat++ <= 160) {
    for (let x = 0; x < 20; x++) {
      fill(0, random(10) + 45, random(10) + 45);
      circle(random(width), random(height), random(80) + 20);
    }
  }
  textAlign(CENTER, CENTER);
  fill(233, 229, 221);
  textSize(100);
  text("Not Tetris", width / 2, height / 2 - 200);
}

function gameOverScreen() {    // Game over screen mit erreichten Punkten, wenn man hier enter drückt kommt man zum titlescreen
  if (repeat++ <= 160) {
    for (let x = 0; x < 20; x++) {
      fill(random(60) + 190, random(25) + 15, random(25) + 16);
      circle(random(width + 20), random(height), random(80) + 20);
    }
  }
  noStroke();
  textSize(130);
  fill(233, 229, 221);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 180);
  textSize(90);
  text("Score: " + score, width / 2, height / 2 + 0);
  stroke(0);
}

function newPiece() { //erstellt ein neuen stein als objekt anhand zuvor definierten variablem
  for (let i = 0; i < 10; i++) {
    if (floor(nextPiece.length / 2 + i) === 5) {
      if (!theGrid.checkCollision(i, 0, nextPiece, farbIndex)) {
        piece1 = new piece(i, farbIndex, nextPiece);
        break;
      }
      else { //new
        boom.play();
        gameOver = 2;
      }
    }
  }
  newPieceVariables();
}

function vorschau() {  //Zeigt an wo und wie ein stein landen würde wenn man ihn full droppt
  fill(farbenArray[farbIndex]);
  if (nextPiece !== formenArray[0]) {
    for (let i = 0; i < nextPiece.length; i++) {
      for (let j = 0; j < nextPiece[i].length; j++) {
        if (nextPiece[i][j] === 1) {
          square(j * lange * 0.85 + 550, i * lange * 0.85 + height / 2, lange * 0.85);
        }
      }
    }
  }
  else {
    for (let i = 0; i < nextPiece.length; i++) {
      for (let j = 0; j < nextPiece[i].length; j++) {
        if (nextPiece[i][j] === 1) {
          square(j * lange * 0.85 + 525, i * lange * 0.85 + height / 2, lange * 0.85);
        }
      }
    }
  }
}

function newPieceVariables() {  //erstellt die Variablen für den nächsten stein, in einer extra funktion damit man die Variablen hat um nächsten stein anzeigen zu lassen
  if (gameOver === 1) {
    dropTimer = 0;
    nextPiece = formenArray[floor(random(formenArray.length))];
    farbIndex = floor(random(5) + 1);
    if (farbIndex === 5) {
      nextPiece = lilaArray[floor(random(lilaArray.length))]
    }
  }
}
